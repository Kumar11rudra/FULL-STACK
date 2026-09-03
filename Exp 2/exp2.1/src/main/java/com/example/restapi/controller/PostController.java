package com.example.restapi.controller;

import com.example.restapi.dto.PostRequest;
import com.example.restapi.model.Post;
import com.example.restapi.response.ApiResponse;
import com.example.restapi.service.PostService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    private final PostService service;

    public PostController(PostService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Post>>> getAllPosts() {

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Posts fetched successfully",
                        service.getAllPosts()
                )
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Post>> getPostById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Post fetched successfully",
                        service.getPostById(id)
                )
        );
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Post>> createPost(
            @Valid @RequestBody PostRequest request) {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(
                        new ApiResponse<>(
                                true,
                                "Post created successfully",
                                service.createPost(request)
                        )
                );
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Post>> updatePost(
            @PathVariable Long id,
            @Valid @RequestBody PostRequest request) {

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Post updated successfully",
                        service.updatePost(id, request)
                )
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deletePost(
            @PathVariable Long id) {

        service.deletePost(id);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Post deleted successfully",
                        null
                )
        );
    }
}
