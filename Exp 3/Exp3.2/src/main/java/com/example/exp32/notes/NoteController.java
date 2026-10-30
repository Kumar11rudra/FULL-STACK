package com.example.exp32.notes;

import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/notes")
public class NoteController {
    private final NoteRepository repository;

    public NoteController(NoteRepository repository) { this.repository = repository; }

    @PostMapping
    public ResponseEntity<Note> create(@RequestBody Map<String, String> body) {
        String content = body.getOrDefault("content", "").trim();
        if (content.isBlank()) return ResponseEntity.badRequest().build();
        return ResponseEntity.status(HttpStatus.CREATED).body(repository.save(new Note(content)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Note> get(@PathVariable Long id) {
        return repository.findById(id).map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
