package com.example.scalablereadapi.controller;

import java.util.List;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import org.springframework.http.*;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import com.example.scalablereadapi.dto.ApiDtos.*;
import com.example.scalablereadapi.service.PostService;

@Validated @RestController @RequestMapping("/api/v1/posts")
public class PostController {
    private final PostService service;
    public PostController(PostService service) { this.service = service; }
    @GetMapping public PageResponse<PostResponse> list(@RequestParam(defaultValue = "0") @Min(0) int page, @RequestParam(defaultValue = "10") @Min(1) @Max(100) int size, @RequestParam(defaultValue = "createdAt") String sortBy, @RequestParam(defaultValue = "desc") String direction) { return service.list(page, size, sortBy, direction); }
    @GetMapping("/{id}") public PostResponse get(@PathVariable long id) { return service.get(id); }
    @GetMapping("/category-stats") public List<CategoryStatsResponse> stats() { return service.categoryStats(); }
    @PostMapping public ResponseEntity<PostResponse> create(@Valid @RequestBody PostRequest request) { return ResponseEntity.status(HttpStatus.CREATED).body(service.create(request)); }
    @PutMapping("/{id}") public PostResponse update(@PathVariable long id, @Valid @RequestBody PostRequest request) { return service.update(id, request); }
    @DeleteMapping("/{id}") public ResponseEntity<Void> delete(@PathVariable long id) { service.delete(id); return ResponseEntity.noContent().build(); }
}
