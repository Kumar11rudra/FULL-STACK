package com.example.exp33;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.kafka.annotation.EnableKafka;
@SpringBootApplication @EnableScheduling @EnableKafka
public class Exp33Application {
 public static void main(String[] args) { SpringApplication.run(Exp33Application.class, args); }
}
