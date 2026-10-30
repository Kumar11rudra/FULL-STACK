package com.example.kafkareliability.repository;

import com.example.kafkareliability.entity.ProcessedPost;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProcessedPostRepository extends JpaRepository<ProcessedPost, String> { }
