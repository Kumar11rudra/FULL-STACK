package com.example.kafkareliability.model;

public record PostEvent(String eventId, String content, FailureMode failureMode) { }
