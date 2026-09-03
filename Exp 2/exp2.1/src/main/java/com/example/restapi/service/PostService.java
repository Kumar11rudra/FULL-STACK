package com.example.restapi.service;

import com.example.restapi.dto.PostRequest;
import com.example.restapi.exception.ResourceNotFoundException;
import com.example.restapi.model.Post;
import com.example.restapi.repository.PostRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostService {

    private static final Logger logger =
            LoggerFactory.getLogger(PostService.class);

    private final PostRepository repository;

    public PostService(PostRepository repository) {
        this.repository = repository;
    }

    public List<Post> getAllPosts() {

        logger.info("Fetching all posts");

        return repository.findAll();
    }

    public Post getPostById(Long id) {

        logger.info("Fetching post with id: {}", id);

        Post post = repository.findById(id);

        if (post == null) {
            throw new ResourceNotFoundException(
                    "Post not found with id: " + id
            );
        }

        return post;
    }

    public Post createPost(PostRequest request) {

        logger.info("Creating new post");

        Post post = new Post(
                null,
                request.getTitle(),
                request.getContent()
        );

        return repository.save(post);
    }

    public Post updatePost(Long id, PostRequest request) {

        logger.info("Updating post with id: {}", id);

        Post post = new Post(
                id,
                request.getTitle(),
                request.getContent()
        );

        Post updatedPost = repository.update(id, post);

        if (updatedPost == null) {
            throw new ResourceNotFoundException(
                    "Post not found with id: " + id
            );
        }

        return updatedPost;
    }

    public void deletePost(Long id) {

        logger.info("Deleting post with id: {}", id);

        boolean deleted = repository.delete(id);

        if (!deleted) {
            throw new ResourceNotFoundException(
                    "Post not found with id: " + id
            );
        }
    }
}
