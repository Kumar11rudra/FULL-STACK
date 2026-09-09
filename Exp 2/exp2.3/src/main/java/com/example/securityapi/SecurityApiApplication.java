package com.example.securityapi;
import org.springframework.boot.*; import org.springframework.boot.autoconfigure.*; import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity; import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
@SpringBootApplication @EnableMethodSecurity @EnableJpaRepositories(considerNestedRepositories = true) public class SecurityApiApplication { public static void main(String[] args) { SpringApplication.run(SecurityApiApplication.class, args); } }
