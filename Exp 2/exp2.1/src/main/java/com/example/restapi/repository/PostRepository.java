package com.example.restapi.repository;

import com.example.restapi.model.Post;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

@Repository
public class PostRepository {

    private final List<Post> posts = new ArrayList<>();

    private final AtomicLong idGenerator = new AtomicLong(1);

    public List<Post> findAll() {
        return new ArrayList<>(posts);
    }

    public Post findById(Long id) {

        return posts.stream()
                .filter(post -> post.getId().equals(id))
                .findFirst()
                .orElse(null);
    }

    public Post save(Post post) {

        post.setId(idGenerator.getAndIncrement());

        posts.add(post);

        return post;
    }

    public Post update(Long id, Post post) {

        Post existingPost = findById(id);

        if (existingPost == null) {
            return null;
        }

        existingPost.setTitle(post.getTitle());
        existingPost.setContent(post.getContent());

        return existingPost;
    }

    public boolean delete(Long id) {

        return posts.removeIf(
                post -> post.getId().equals(id)
        );
    }
}
