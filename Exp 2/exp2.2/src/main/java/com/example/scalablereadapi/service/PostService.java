package com.example.scalablereadapi.service;

import java.time.Instant;
import java.util.List;
import java.util.Set;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import com.example.scalablereadapi.dto.ApiDtos.*;
import com.example.scalablereadapi.model.*;
import com.example.scalablereadapi.repository.Repositories.*;

@Service
public class PostService {
    private static final Set<String> SORT_FIELDS = Set.of("id", "title", "createdAt", "viewCount");
    private final PostRepository posts; private final CategoryRepository categories;
    public PostService(PostRepository posts, CategoryRepository categories) { this.posts = posts; this.categories = categories; }
    public PageResponse<PostResponse> list(int page, int size, String sortBy, String direction) {
        if (!SORT_FIELDS.contains(sortBy)) throw new IllegalArgumentException("sortBy must be one of: " + SORT_FIELDS);
        Sort.Direction order = Sort.Direction.fromOptionalString(direction).orElseThrow(() -> new IllegalArgumentException("direction must be asc or desc"));
        Page<PostResponse> result = posts.findAllWithCategory(PageRequest.of(page, size, Sort.by(order, sortBy))).map(this::response);
        return PageResponse.from(result);
    }
    @Cacheable(cacheNames = "posts", key = "#id") public PostResponse get(long id) { return response(post(id)); }
    public List<CategoryStatsResponse> categoryStats() { return posts.countPostsByCategory().stream().map(row -> new CategoryStatsResponse(row.getCategory(), row.getPostCount())).toList(); }
    @CacheEvict(cacheNames = "posts", allEntries = true) public PostResponse create(PostRequest request) { return response(posts.save(new Post(request.title(), request.content(), category(request.categoryId()), Instant.now(), 0))); }
    @CacheEvict(cacheNames = "posts", allEntries = true) public PostResponse update(long id, PostRequest request) { Post value = post(id); value.update(request.title(), request.content(), category(request.categoryId())); return response(posts.save(value)); }
    @CacheEvict(cacheNames = "posts", allEntries = true) public void delete(long id) { posts.delete(post(id)); }
    private Post post(long id) { return posts.findById(id).orElseThrow(() -> new IllegalArgumentException("Post not found: " + id)); }
    private Category category(long id) { return categories.findById(id).orElseThrow(() -> new IllegalArgumentException("Category not found: " + id)); }
    private PostResponse response(Post value) { return new PostResponse(value.getId(), value.getTitle(), value.getContent(), value.getCategory().getName(), value.getCreatedAt(), value.getViewCount()); }
}
