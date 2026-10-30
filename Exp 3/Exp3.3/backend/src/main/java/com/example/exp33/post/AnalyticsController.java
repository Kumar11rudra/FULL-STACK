package com.example.exp33.post;
import com.example.exp33.security.TokenService;
import java.util.*;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
@RestController @RequestMapping("/api/workspaces/{workspaceId}/analytics")
public class AnalyticsController {
 private final PostService posts;
 public AnalyticsController(PostService posts){this.posts=posts;}
 public record Analytics(long total,long draft,long scheduled,long queued,long published,Map<String,Long> byPlatform) {}
 @GetMapping public Analytics get(@PathVariable UUID workspaceId,Authentication auth){
  List<Post> data=posts.list(workspaceId,TokenService.userId(auth));
  Map<String,Long> platforms=new TreeMap<>();
  data.forEach(p->platforms.merge(p.platform,1L,Long::sum));
  return new Analytics(data.size(),count(data,PostStatus.DRAFT),count(data,PostStatus.SCHEDULED),
    count(data,PostStatus.QUEUED),count(data,PostStatus.PUBLISHED),platforms);
 }
 private long count(List<Post> posts,PostStatus status){return posts.stream().filter(p->p.status==status).count();}
}
