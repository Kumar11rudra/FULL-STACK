package com.example.scalablereadapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableCaching
@EnableJpaRepositories(considerNestedRepositories = true)
public class ScalableReadApiApplication {
    public static void main(String[] args) {
        SpringApplication.run(ScalableReadApiApplication.class, args);
    }
}
