package com.example.kafkareliability.service;

import com.example.kafkareliability.entity.ProcessedPost;
import com.example.kafkareliability.model.FailureMode;
import com.example.kafkareliability.model.PostEvent;
import com.example.kafkareliability.repository.ProcessedPostRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

@Service
public class PostProcessingService {
    private static final Logger log = LoggerFactory.getLogger(PostProcessingService.class);
    private final ProcessedPostRepository repository;

    // Simulated transient failures for demo only; not a production retry counter.
    private final ConcurrentHashMap<String, AtomicInteger> attempts = new ConcurrentHashMap<>();

    public PostProcessingService(ProcessedPostRepository repository) {
        this.repository = repository;
    }

    @Transactional
    public void process(PostEvent event) {
        // Database primary key provides the durable idempotency key.
        if (repository.existsById(event.eventId())) {
            log.info("DUPLICATE SKIPPED eventId={}", event.eventId());
            attempts.remove(event.eventId());
            return;
        }

        int attempt = attempts.computeIfAbsent(event.eventId(), id -> new AtomicInteger())
                .incrementAndGet();
        FailureMode mode = event.failureMode() == null ? FailureMode.NONE : event.failureMode();

        if (mode == FailureMode.PERMANENT) {
            log.warn("PERMANENT FAILURE eventId={} attempt={}", event.eventId(), attempt);
            throw new IllegalStateException("Simulated permanent processing failure");
        }
        if (mode == FailureMode.TRANSIENT && attempt <= 2) {
            log.warn("TRANSIENT FAILURE eventId={} attempt={}", event.eventId(), attempt);
            throw new IllegalStateException("Simulated temporary service failure");
        }

        // The insert and database transaction commit before Kafka offset acknowledgement.
        repository.saveAndFlush(new ProcessedPost(event.eventId(), event.content()));
        attempts.remove(event.eventId());
        log.info("PROCESSED SUCCESS eventId={} attempt={}", event.eventId(), attempt);
    }

    public void clearDemoAttempt(String eventId) {
        attempts.remove(eventId);
    }
}
