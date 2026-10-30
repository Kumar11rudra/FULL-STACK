package com.example.exp33.post;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.Instant;
import java.util.*;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
@ExtendWith(org.mockito.junit.jupiter.MockitoExtension.class)
class PublishConsumerTest {
 @Mock PostRepository posts;
 @Mock ProcessedEventRepository events;
 @Mock Publisher publisher;
 PublishConsumer consumer;
 ObjectMapper json=new ObjectMapper();
 @BeforeEach void setup(){consumer=new PublishConsumer(posts,events,json,publisher);}
 @Test void processesQueuedEventOnce() throws Exception {
  UUID event=UUID.randomUUID();Post post=new Post(UUID.randomUUID(),UUID.randomUUID(),"Hello","DEMO",Instant.now());post.status=PostStatus.QUEUED;
  when(posts.findById(post.id)).thenReturn(Optional.of(post));when(publisher.publish(post)).thenReturn(Instant.now());
  consumer.receive(json.writeValueAsString(new PublishEvent(event,post.id)));
  assertEquals(PostStatus.PUBLISHED,post.status);
  verify(events).save(argThat(e->e.id.equals(event)));
 }
 @Test void skipsProcessedEvent() throws Exception {
  UUID event=UUID.randomUUID();when(events.existsById(event)).thenReturn(true);
  consumer.receive(json.writeValueAsString(new PublishEvent(event,UUID.randomUUID())));
  verifyNoInteractions(posts,publisher);
 }
 @Test void badPostStateThrowsForKafkaRetry() throws Exception {
  Post post=new Post(UUID.randomUUID(),UUID.randomUUID(),"a","DEMO",null);
  when(posts.findById(post.id)).thenReturn(Optional.of(post));
  assertThrows(IllegalStateException.class,()->consumer.receive(json.writeValueAsString(new PublishEvent(UUID.randomUUID(),post.id))));
 }
}
