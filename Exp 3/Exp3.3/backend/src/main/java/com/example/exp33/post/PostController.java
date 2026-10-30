package com.example.exp33.post;
import com.example.exp33.security.TokenService;
import java.util.*;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
@RestController @RequestMapping("/api/workspaces/{workspaceId}/posts")
public class PostController {
 private final PostService service;
 public PostController(PostService service){this.service=service;}
 @GetMapping public List<Post> list(@PathVariable UUID workspaceId,Authentication auth){return service.list(workspaceId,TokenService.userId(auth));}
 @PostMapping @ResponseStatus(HttpStatus.CREATED)
 public Post create(@PathVariable UUID workspaceId,@RequestBody PostService.PostRequest input,Authentication auth){
  return service.create(workspaceId,TokenService.userId(auth),input);
 }
 @PostMapping("/{postId}/publish")
 public Post publish(@PathVariable UUID workspaceId,@PathVariable UUID postId,Authentication auth){
  return service.publishNow(workspaceId,postId,TokenService.userId(auth));
 }
 @DeleteMapping("/{postId}") @ResponseStatus(HttpStatus.NO_CONTENT)
 public void delete(@PathVariable UUID workspaceId,@PathVariable UUID postId,Authentication auth){
  service.delete(workspaceId,postId,TokenService.userId(auth));
 }
}
