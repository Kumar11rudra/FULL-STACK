package com.example.exp32.notes;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Note {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String content;

    protected Note() { }

    public Note(String content) {
        this.content = content;
    }

    public Long getId() { return id; }
    public String getContent() { return content; }
}
