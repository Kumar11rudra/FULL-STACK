package com.example.exp33.config;
import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.*;
import org.springframework.kafka.config.TopicBuilder;
import org.springframework.kafka.listener.DefaultErrorHandler;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.listener.DeadLetterPublishingRecoverer;
import org.springframework.util.backoff.ExponentialBackOff;
@Configuration
public class KafkaTopicsConfig {
 @Bean NewTopic scheduledPosts(){return TopicBuilder.name("scheduled-posts").partitions(1).replicas(1).build();}
 @Bean NewTopic deadLetters(){return TopicBuilder.name("scheduled-posts.DLT").partitions(1).replicas(1).build();}
 @Bean DefaultErrorHandler errorHandler(KafkaTemplate<String,String> kafka){
  ExponentialBackOff backoff=new ExponentialBackOff(1000L,2.0);
  backoff.setMaxElapsedTime(7500L);
  return new DefaultErrorHandler(new DeadLetterPublishingRecoverer(kafka),backoff);
 }
}
