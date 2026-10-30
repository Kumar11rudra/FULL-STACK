package com.example.kafkareliability.consumer;

import com.example.kafkareliability.config.KafkaConfig;
import com.example.kafkareliability.model.PostEvent;
import com.example.kafkareliability.service.PostProcessingService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
public class DlqConsumer {
    private static final Logger log = LoggerFactory.getLogger(DlqConsumer.class);
    private final PostProcessingService processingService;

    public DlqConsumer(PostProcessingService processingService) {
        this.processingService = processingService;
    }

    @KafkaListener(topics = KafkaConfig.DLQ_TOPIC, groupId = "scheduled-posts-dlq-monitor")
    public void listen(PostEvent event) {
        log.error("DLQ RECEIVED eventId={} mode={} content={}",
                event.eventId(), event.failureMode(), event.content());
        processingService.clearDemoAttempt(event.eventId());
        // Real systems should alert operators and persist DLQ diagnostics.
        // Do not automatically reprocess poisoned events.
    }
}
