package com.example.exp33.post;
import jakarta.persistence.*;
import java.time.Instant;
import java.util.UUID;
@Entity @Table(name="social_posts")
public class Post {
 @Id public UUID id;
 @Column(nullable=false) public UUID workspaceId;
 @Column(nullable=false) public UUID authorId;
 @Column(nullable=false,length=2000) public String content;
 @Column(nullable=false,length=32) public String platform;
 @Enumerated(EnumType.STRING) @Column(nullable=false) public PostStatus status;
 public Instant scheduledAt;
 public Instant publishedAt;
 @Column(nullable=false) public Instant createdAt;
 @Column(nullable=false) public Instant updatedAt;
 protected Post() {}
 public Post(UUID workspaceId,UUID authorId,String content,String platform,Instant scheduledAt) {
  this.id=UUID.randomUUID();this.workspaceId=workspaceId;this.authorId=authorId;
  this.content=content;this.platform=platform;this.scheduledAt=scheduledAt;
  this.status=scheduledAt==null?PostStatus.DRAFT:PostStatus.SCHEDULED;
  this.createdAt=Instant.now();this.updatedAt=this.createdAt;
 }
}
