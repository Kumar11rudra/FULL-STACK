package com.example.exp33.post;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
public interface ProcessedEventRepository extends JpaRepository<ProcessedEvent,UUID> {}
