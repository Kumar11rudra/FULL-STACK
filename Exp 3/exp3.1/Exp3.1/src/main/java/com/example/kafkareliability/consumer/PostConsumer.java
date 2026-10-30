package com.example.kafkareliability.consumer;

import com.example.kafkareliability.config.KafkaConfig;
import com.example.kafkareliability.model.PostEvent;
import com.example.kafkareliability.service.PostProcessingService;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
public class PostConsumer {
    private final PostProcessingService processingService;

    public PostConsumer(PostProcessingService processingService) {
        this.processingService = processingService;
    }

    @KafkaListener(topics = KafkaConfig.POSTS_TOPIC)
    public void consume(PostEvent event) {
        processingService.process(event);
    }
}
