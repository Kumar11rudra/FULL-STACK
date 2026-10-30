package com.example.exp33.team;
import com.example.exp33.security.TokenService;
import java.util.*;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
@RestController @RequestMapping("/api/workspaces")
public class WorkspaceController {
 private final WorkspaceService service;
 public WorkspaceController(WorkspaceService service){this.service=service;}
 @GetMapping public List<WorkspaceService.WorkspaceView> list(Authentication auth){return service.list(TokenService.userId(auth));}
 @GetMapping("/{id}/members") public List<WorkspaceService.MemberView> members(@PathVariable UUID id,Authentication auth){return service.listMembers(id,TokenService.userId(auth));}
 @PostMapping("/{id}/members") public WorkspaceService.MemberView add(@PathVariable UUID id,@RequestBody WorkspaceService.AddMember req,Authentication auth){return service.addMember(id,TokenService.userId(auth),req);}
}
