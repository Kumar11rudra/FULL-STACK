package com.example.exp33.post;
import java.util.UUID;
public record PublishEvent(UUID eventId,UUID postId) {}
