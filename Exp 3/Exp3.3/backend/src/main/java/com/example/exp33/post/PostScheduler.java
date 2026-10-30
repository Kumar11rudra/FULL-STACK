package com.example.exp33.post;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.UUID;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class PostScheduler {
 private static final Logger LOG=LoggerFactory.getLogger(PostScheduler.class);
 private final PostRepository posts;
 private final KafkaTemplate<String,String> kafka;
 private final ObjectMapper json;
 public PostScheduler(PostRepository posts,KafkaTemplate<String,String> kafka,ObjectMapper json){
  this.posts=posts;this.kafka=kafka;this.json=json;
 }
 @Scheduled(fixedDelay=10000,initialDelay=15000)
 public void scan(){
  Instant now=Instant.now();
  posts.requeueStale(now.minus(2,ChronoUnit.MINUTES),now,PostStatus.SCHEDULED,PostStatus.QUEUED);
  for(Post post:posts.findTop50ByStatusAndScheduledAtBeforeOrderByScheduledAtAsc(PostStatus.SCHEDULED,now)){
   if(posts.transition(post.id,PostStatus.SCHEDULED,PostStatus.QUEUED,now)!=1) continue;
   try {
    PublishEvent event=new PublishEvent(UUID.randomUUID(),post.id);
    kafka.send("scheduled-posts",post.id.toString(),json.writeValueAsString(event))
      .whenComplete((result,error)->{
       if(error!=null){LOG.error("Kafka publish failed for {}",post.id,error);
        posts.transition(post.id,PostStatus.QUEUED,PostStatus.SCHEDULED,Instant.now());}
      });
   }catch(Exception error){
    LOG.error("Could not enqueue post {}",post.id,error);
    posts.transition(post.id,PostStatus.QUEUED,PostStatus.SCHEDULED,Instant.now());
   }
  }
 }
}
