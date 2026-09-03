package com.example.restapi.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class PostRequest {

    @NotBlank(message = "Title is required")
    @Size(min = 3, max = 100, message = "Title must be between 3 and 100 characters")
    private String title;

    @NotBlank(message = "Content is required")
    @Size(min = 5, message = "Content must contain at least 5 characters")
    private String content;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
