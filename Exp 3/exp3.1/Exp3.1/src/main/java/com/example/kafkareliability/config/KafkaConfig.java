package com.example.kafkareliability.config;

import com.example.kafkareliability.model.PostEvent;
import org.apache.kafka.common.TopicPartition;
import org.apache.kafka.clients.admin.NewTopic;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.TopicBuilder;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.listener.DefaultErrorHandler;
import org.springframework.kafka.listener.DeadLetterPublishingRecoverer;
import org.springframework.kafka.support.ExponentialBackOffWithMaxRetries;

@Configuration
public class KafkaConfig {
    private static final Logger log = LoggerFactory.getLogger(KafkaConfig.class);

    public static final String POSTS_TOPIC = "scheduled-posts";
    public static final String DLQ_TOPIC = "scheduled-posts.DLQ";

    @Bean
    public NewTopic scheduledPostsTopic() {
        return TopicBuilder.name(POSTS_TOPIC).partitions(1).replicas(1).build();
    }

    @Bean
    public NewTopic deadLetterTopic() {
        return TopicBuilder.name(DLQ_TOPIC).partitions(1).replicas(1).build();
    }

    @Bean
    public DefaultErrorHandler errorHandler(KafkaTemplate<String, PostEvent> template) {
        DeadLetterPublishingRecoverer recoverer = new DeadLetterPublishingRecoverer(
                template,
                (record, exception) -> new TopicPartition(DLQ_TOPIC, record.partition())
        );

        // 3 retries after the initial failure: wait 1s, 2s, then 4s.
        ExponentialBackOffWithMaxRetries backoff = new ExponentialBackOffWithMaxRetries(3);
        backoff.setInitialInterval(1000L);
        backoff.setMultiplier(2.0);
        backoff.setMaxInterval(5000L);

        DefaultErrorHandler handler = new DefaultErrorHandler(recoverer, backoff);
        handler.setRetryListeners((record, exception, deliveryAttempt) ->
                log.warn("Retry delivery attempt {} for event key={} because {}",
                        deliveryAttempt, record.key(), exception.getMessage()));
        return handler;
    }
}
