package com.example.scalablereadapi.config;

import java.time.*;
import java.time.temporal.ChronoUnit;
import java.util.List;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.*;
import com.example.scalablereadapi.model.*;
import com.example.scalablereadapi.repository.Repositories.*;

@Configuration
public class DataInitializer {
    @Bean CommandLineRunner seed(CategoryRepository categories, PostRepository posts) {
        return args -> { if (posts.count() > 0) return; List<Category> all = List.of(categories.save(new Category("Engineering")), categories.save(new Category("Product")), categories.save(new Category("News"))); for (int i = 1; i <= 60; i++) posts.save(new Post("Sample post " + i, "Seed data for pagination, sorting, caching, and optimized reads.", all.get((i - 1) % all.size()), Instant.now().minus(i, ChronoUnit.HOURS), i * 17L)); };
    }
}
