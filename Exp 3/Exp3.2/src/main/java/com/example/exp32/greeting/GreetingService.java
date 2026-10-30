package com.example.exp32.greeting;

import org.springframework.stereotype.Service;

@Service
public class GreetingService {
    public String greet(String name) {
        if (name == null || name.isBlank()) {
            throw new IllegalArgumentException("Name cannot be blank");
        }
        return "Hello, " + name.trim();
    }
}
