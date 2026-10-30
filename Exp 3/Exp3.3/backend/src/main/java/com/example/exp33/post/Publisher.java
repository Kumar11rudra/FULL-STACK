package com.example.exp33.post;
import java.time.Instant;
import org.springframework.stereotype.Service;
@Service
public class Publisher {
 // This capstone deliberately simulates publishing; no social network APIs or credentials are configured.
 public Instant publish(Post post){return Instant.now();}
}
