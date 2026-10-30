package com.example.kafkareliability.controller;

import com.example.kafkareliability.entity.ProcessedPost;
import com.example.kafkareliability.model.FailureMode;
import com.example.kafkareliability.model.PostEvent;
import com.example.kafkareliability.model.PostRequest;
import com.example.kafkareliability.repository.ProcessedPostRepository;
import com.example.kafkareliability.service.PostProducer;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/posts")
public class PostController {
    private final PostProducer producer;
    private final ProcessedPostRepository repository;

    public PostController(PostProducer producer, ProcessedPostRepository repository) {
        this.producer = producer;
        this.repository = repository;
    }

    @PostMapping("/schedule")
    public ResponseEntity<Map<String, String>> schedule(@Valid @RequestBody PostRequest request) {
        String eventId = request.eventId() == null || request.eventId().isBlank()
                ? UUID.randomUUID().toString() : request.eventId().trim();
        if (eventId.length() > 100 || request.content().length() > 2000) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "eventId/content too long");
        }
        FailureMode failureMode = request.failureMode() == null
                ? FailureMode.NONE : request.failureMode();
        PostEvent event = new PostEvent(eventId, request.content(), failureMode);
        try {
            producer.publish(event);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new ResponseStatusException(HttpStatus.SERVICE_UNAVAILABLE,
                    "Interrupted while publishing to Kafka", e);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.SERVICE_UNAVAILABLE,
                    "Failed to publish to Kafka", e);
        }
        return ResponseEntity.accepted().body(Map.of(
                "status", "PUBLISHED_TO_KAFKA",
                "eventId", eventId,
                "mode", failureMode.name()
        ));
    }

    @GetMapping("/processed")
    public List<ProcessedPost> processed() {
        return repository.findAll();
    }
}
