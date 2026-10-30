package com.example.exp33.post;
import jakarta.persistence.*;
import java.time.Instant;
import java.util.UUID;
@Entity @Table(name="processed_events")
public class ProcessedEvent {
 @Id public UUID id;
 @Column(nullable=false) public UUID postId;
 @Column(nullable=false) public Instant processedAt;
 protected ProcessedEvent() {}
 public ProcessedEvent(UUID eventId,UUID postId){this.id=eventId;this.postId=postId;this.processedAt=Instant.now();}
}
