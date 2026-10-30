package com.example.exp33.team;

import com.example.exp33.auth.*;
import java.util.*;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
public class WorkspaceService {
 private final MembershipRepository members;
 private final WorkspaceRepository workspaces;
 private final AccountRepository accounts;
 public WorkspaceService(MembershipRepository members,WorkspaceRepository workspaces,AccountRepository accounts){
  this.members=members;this.workspaces=workspaces;this.accounts=accounts;
 }
 public record WorkspaceView(UUID id,String name,Role role) {}
 public record MemberView(UUID id,String email,String name,Role role) {}
 public record AddMember(String email,Role role) {}
 public Role requireRole(UUID workspaceId,UUID accountId,Role minRole){
  Membership member=members.findByWorkspaceIdAndAccountId(workspaceId,accountId)
      .orElseThrow(()->new ResponseStatusException(HttpStatus.FORBIDDEN,"Not a workspace member"));
  if(member.role.ordinal()<minRole.ordinal()) throw new ResponseStatusException(HttpStatus.FORBIDDEN,"Insufficient role");
  return member.role;
 }
 public List<WorkspaceView> list(UUID userId){
  return members.findByAccountId(userId).stream().map(m -> {
   Workspace workspace=workspaces.findById(m.workspaceId).orElseThrow();
   return new WorkspaceView(workspace.id,workspace.name,m.role);
  }).toList();
 }
 public List<MemberView> listMembers(UUID workspaceId,UUID userId){
  requireRole(workspaceId,userId,Role.VIEWER);
  return members.findByWorkspaceId(workspaceId).stream().map(m -> {
   Account account=accounts.findById(m.accountId).orElseThrow();
   return new MemberView(account.id,account.email,account.name,m.role);
  }).toList();
 }
 @Transactional
 public MemberView addMember(UUID workspaceId,UUID currentUserId,AddMember req){
  requireRole(workspaceId,currentUserId,Role.ADMIN);
  if(req.role()==null) throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Role required");
  Account target=accounts.findByEmail(req.email().strip().toLowerCase(Locale.ROOT))
       .orElseThrow(()->new ResponseStatusException(HttpStatus.NOT_FOUND,"User must register before being added"));
  if(members.findByWorkspaceIdAndAccountId(workspaceId,target.id).isPresent()) throw new ResponseStatusException(HttpStatus.CONFLICT,"Already a member");
  members.save(new Membership(workspaceId,target.id,req.role()));
  return new MemberView(target.id,target.email,target.name,req.role());
 }
}
