package com.example.exp32;

import com.example.exp32.notes.Note;
import com.example.exp32.notes.NoteRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import static org.junit.jupiter.api.Assertions.*;

@Testcontainers
@SpringBootTest
class NoteRepositoryIT {
    @Container
    static final PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:16-alpine")
            .withDatabaseName("exp32")
            .withUsername("test")
            .withPassword("test");

    @DynamicPropertySource
    static void databaseProps(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", postgres::getJdbcUrl);
        registry.add("spring.datasource.username", postgres::getUsername);
        registry.add("spring.datasource.password", postgres::getPassword);
        registry.add("spring.datasource.driver-class-name", () -> "org.postgresql.Driver");
        registry.add("spring.jpa.hibernate.ddl-auto", () -> "create-drop");
    }

    @Autowired NoteRepository repository;

    @Test
    void canSaveAndReadNoteFromRealPostgresContainer() {
        Note saved = repository.save(new Note("CI test note"));
        assertNotNull(saved.getId());
        assertEquals("CI test note", repository.findById(saved.getId()).orElseThrow().getContent());
    }
}
