package com.example.exp33.post;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.Instant;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class PublishConsumer {
 private static final Logger LOG=LoggerFactory.getLogger(PublishConsumer.class);
 private final PostRepository posts;
 private final ProcessedEventRepository events;
 private final ObjectMapper json;
 private final Publisher publisher;
 public PublishConsumer(PostRepository posts,ProcessedEventRepository events,ObjectMapper json,Publisher publisher){
  this.posts=posts;this.events=events;this.json=json;this.publisher=publisher;
 }
 @KafkaListener(topics="scheduled-posts",groupId="exp33-publishers")
 @Transactional
 public void receive(String body) throws Exception {
  PublishEvent event=json.readValue(body,PublishEvent.class);
  if(events.existsById(event.eventId())) return;
  Post post=posts.findById(event.postId()).orElse(null);
  if(post==null || post.status==PostStatus.PUBLISHED){
   events.save(new ProcessedEvent(event.eventId(),event.postId())); return;
  }
  if(post.status!=PostStatus.QUEUED) throw new IllegalStateException("Unexpected post state: "+post.status);
  post.publishedAt=publisher.publish(post); // SIMULATED publishing, not external API delivery
  post.status=PostStatus.PUBLISHED;post.updatedAt=Instant.now();
  posts.save(post);
  events.save(new ProcessedEvent(event.eventId(),event.postId()));
  LOG.info("Demo-published post {} event {}",post.id,event.eventId());
 }
 @KafkaListener(topics="scheduled-posts.DLT",groupId="exp33-dlq-observers")
 public void observeDlt(String failedBody){LOG.error("Message moved to DLT, investigate: {}",failedBody);}
}
