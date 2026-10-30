package com.example.kafkareliability.model;

import jakarta.validation.constraints.NotBlank;

public record PostRequest(String eventId, @NotBlank String content, FailureMode failureMode) { }
