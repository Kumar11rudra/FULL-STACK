package com.example.exp33.post;

import com.example.exp33.team.*;
import java.time.Instant;
import java.util.*;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
public class PostService {
 private final PostRepository posts;
 private final WorkspaceService teams;
 public PostService(PostRepository posts,WorkspaceService teams){this.posts=posts;this.teams=teams;}
 public record PostRequest(String content,String platform,Instant scheduledAt) {}
 @Transactional
 public Post create(UUID workspaceId,UUID userId,PostRequest request){
  teams.requireRole(workspaceId,userId,Role.EDITOR);
  if(request.content()==null || request.content().isBlank() || request.content().length()>2000)
   throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Content must be 1-2000 characters");
  String platform=request.platform()==null?"DEMO":request.platform().toUpperCase(Locale.ROOT);
  if(!Set.of("DEMO","INSTAGRAM","LINKEDIN","X").contains(platform))
   throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Unsupported platform");
  if(request.scheduledAt()!=null && request.scheduledAt().isBefore(Instant.now().plusSeconds(5)))
   throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Schedule at least 5 seconds in the future");
  return posts.save(new Post(workspaceId,userId,request.content().strip(),platform,request.scheduledAt()));
 }
 public List<Post> list(UUID workspaceId,UUID userId){
  teams.requireRole(workspaceId,userId,Role.VIEWER);
  return posts.findByWorkspaceIdOrderByCreatedAtDesc(workspaceId);
 }
 @Transactional
 public Post publishNow(UUID workspaceId,UUID postId,UUID userId){
  teams.requireRole(workspaceId,userId,Role.EDITOR);
  Post post=posts.findById(postId).orElseThrow(()->new ResponseStatusException(HttpStatus.NOT_FOUND,"Post not found"));
  if(!post.workspaceId.equals(workspaceId)) throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Post not found");
  if(post.status!=PostStatus.DRAFT && post.status!=PostStatus.SCHEDULED)
   throw new ResponseStatusException(HttpStatus.CONFLICT,"Post is already queued or published");
  post.scheduledAt=Instant.now();post.status=PostStatus.SCHEDULED;post.updatedAt=Instant.now();
  return posts.save(post);
 }
 @Transactional
 public void delete(UUID workspaceId,UUID postId,UUID userId){
  teams.requireRole(workspaceId,userId,Role.EDITOR);
  Post post=posts.findById(postId).orElseThrow(()->new ResponseStatusException(HttpStatus.NOT_FOUND,"Post not found"));
  if(!post.workspaceId.equals(workspaceId)) throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Post not found");
  if(post.status==PostStatus.PUBLISHED || post.status==PostStatus.QUEUED)
   throw new ResponseStatusException(HttpStatus.CONFLICT,"Cannot delete queued/published post");
  posts.delete(post);
 }
}
