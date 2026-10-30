package com.example.exp33.team;

import com.example.exp33.auth.*;
import java.util.*;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;

@ExtendWith(org.mockito.junit.jupiter.MockitoExtension.class)
class WorkspaceServiceTest {
 @Mock MembershipRepository members;
 @Mock WorkspaceRepository workspaces;
 @Mock AccountRepository accounts;
 @InjectMocks WorkspaceService service;
 UUID workspace=UUID.randomUUID(), user=UUID.randomUUID();
 @Test void viewerCanRead(){
  when(members.findByWorkspaceIdAndAccountId(workspace,user)).thenReturn(Optional.of(new Membership(workspace,user,Role.VIEWER)));
  assertEquals(Role.VIEWER,service.requireRole(workspace,user,Role.VIEWER));
 }
 @Test void viewerCannotEdit(){
  when(members.findByWorkspaceIdAndAccountId(workspace,user)).thenReturn(Optional.of(new Membership(workspace,user,Role.VIEWER)));
  assertEquals(HttpStatus.FORBIDDEN,assertThrows(ResponseStatusException.class,()->service.requireRole(workspace,user,Role.EDITOR)).getStatusCode());
 }
 @Test void outsiderCannotRead(){
  when(members.findByWorkspaceIdAndAccountId(workspace,user)).thenReturn(Optional.empty());
  assertThrows(ResponseStatusException.class,()->service.requireRole(workspace,user,Role.VIEWER));
 }
 @Test void listsUserWorkspaces(){
  Workspace w=new Workspace("Team");
  when(members.findByAccountId(user)).thenReturn(List.of(new Membership(w.id,user,Role.ADMIN)));
  when(workspaces.findById(w.id)).thenReturn(Optional.of(w));
  assertEquals("Team",service.list(user).get(0).name());
 }
 @Test void adminCanAddRegisteredMember(){
  Account target=new Account("other@example.com","Other","hash");
  when(members.findByWorkspaceIdAndAccountId(workspace,user)).thenReturn(Optional.of(new Membership(workspace,user,Role.ADMIN)));
  when(accounts.findByEmail("other@example.com")).thenReturn(Optional.of(target));
  assertEquals(Role.EDITOR,service.addMember(workspace,user,new WorkspaceService.AddMember("other@example.com",Role.EDITOR)).role());
  verify(members).save(any(Membership.class));
 }
}
