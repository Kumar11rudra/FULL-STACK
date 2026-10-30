package com.example.kafkareliability.service;

import com.example.kafkareliability.config.KafkaConfig;
import com.example.kafkareliability.model.PostEvent;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Service
public class PostProducer {
    private static final Logger log = LoggerFactory.getLogger(PostProducer.class);
    private final KafkaTemplate<String, PostEvent> kafkaTemplate;

    public PostProducer(KafkaTemplate<String, PostEvent> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void publish(PostEvent event) throws Exception {
        // Wait for the broker acknowledgement before the API reports success.
        kafkaTemplate.send(KafkaConfig.POSTS_TOPIC, event.eventId(), event)
                .get(10, TimeUnit.SECONDS);
        log.info("PRODUCED eventId={} mode={}", event.eventId(), event.failureMode());
    }
}
