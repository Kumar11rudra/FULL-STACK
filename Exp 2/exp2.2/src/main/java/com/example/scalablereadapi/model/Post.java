package com.example.scalablereadapi.model;

import java.time.Instant;
import jakarta.persistence.*;

@Entity
@Table(name = "posts")
public class Post {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @Column(nullable = false, length = 100) private String title;
    @Column(nullable = false, length = 2000) private String content;
    @Column(nullable = false) private Instant createdAt;
    @Column(nullable = false) private long viewCount;
    @ManyToOne(fetch = FetchType.LAZY, optional = false) @JoinColumn(name = "category_id") private Category category;
    protected Post() { }
    public Post(String title, String content, Category category, Instant createdAt, long viewCount) { this.title = title; this.content = content; this.category = category; this.createdAt = createdAt; this.viewCount = viewCount; }
    public Long getId() { return id; } public String getTitle() { return title; } public String getContent() { return content; }
    public Instant getCreatedAt() { return createdAt; } public long getViewCount() { return viewCount; } public Category getCategory() { return category; }
    public void update(String title, String content, Category category) { this.title = title; this.content = content; this.category = category; }
}
