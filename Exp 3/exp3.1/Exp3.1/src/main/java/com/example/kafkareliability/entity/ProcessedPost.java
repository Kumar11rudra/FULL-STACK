package com.example.kafkareliability.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.Instant;

@Entity
@Table(name = "processed_posts")
public class ProcessedPost {
    @Id
    @Column(nullable = false, length = 100)
    private String eventId;

    @Column(nullable = false, length = 2000)
    private String content;

    @Column(nullable = false)
    private Instant processedAt;

    protected ProcessedPost() { }

    public ProcessedPost(String eventId, String content) {
        this.eventId = eventId;
        this.content = content;
        this.processedAt = Instant.now();
    }

    public String getEventId() { return eventId; }
    public String getContent() { return content; }
    public Instant getProcessedAt() { return processedAt; }
}
