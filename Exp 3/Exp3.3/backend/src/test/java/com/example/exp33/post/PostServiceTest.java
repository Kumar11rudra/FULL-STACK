package com.example.exp33.post;

import com.example.exp33.team.*;
import java.time.Instant;
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
class PostServiceTest {
 @Mock PostRepository posts;
 @Mock WorkspaceService teams;
 @InjectMocks PostService service;
 UUID workspace=UUID.randomUUID(), user=UUID.randomUUID();
 Post existing;
 @BeforeEach void setup(){
  existing=new Post(workspace,user,"Hello","DEMO",null);
 }
 @Test void createsDraft(){
  when(posts.save(any(Post.class))).thenAnswer(i->i.getArgument(0));
  Post p=service.create(workspace,user,new PostService.PostRequest(" Hello ",null,null));
  assertEquals("Hello",p.content);assertEquals("DEMO",p.platform);assertEquals(PostStatus.DRAFT,p.status);
  verify(teams).requireRole(workspace,user,Role.EDITOR);
 }
 @Test void createsScheduledPost(){
  Instant future=Instant.now().plusSeconds(3600);
  when(posts.save(any(Post.class))).thenAnswer(i->i.getArgument(0));
  Post p=service.create(workspace,user,new PostService.PostRequest("New post","instagram",future));
  assertEquals(PostStatus.SCHEDULED,p.status);assertEquals("INSTAGRAM",p.platform);
 }
 @Test void rejectsMissingContent(){
  assertEquals(HttpStatus.BAD_REQUEST,assertThrows(ResponseStatusException.class,()->service.create(workspace,user,new PostService.PostRequest(" ","DEMO",null))).getStatusCode());
 }
 @Test void rejectsNullContent(){
  assertThrows(ResponseStatusException.class,()->service.create(workspace,user,new PostService.PostRequest(null,"DEMO",null)));
 }
 @Test void rejectsLongContent(){
  assertThrows(ResponseStatusException.class,()->service.create(workspace,user,new PostService.PostRequest("x".repeat(2001),"DEMO",null)));
 }
 @Test void rejectsUnknownPlatform(){
  assertThrows(ResponseStatusException.class,()->service.create(workspace,user,new PostService.PostRequest("hi","tiktok",null)));
 }
 @Test void rejectsPastSchedule(){
  assertThrows(ResponseStatusException.class,()->service.create(workspace,user,new PostService.PostRequest("hi","DEMO",Instant.now().minusSeconds(5))));
 }
 @Test void rejectsScheduleTooSoon(){
  assertThrows(ResponseStatusException.class,()->service.create(workspace,user,new PostService.PostRequest("hi","DEMO",Instant.now().plusSeconds(1))));
 }
 @Test void listsByWorkspaceOnly(){
  when(posts.findByWorkspaceIdOrderByCreatedAtDesc(workspace)).thenReturn(List.of(existing));
  assertEquals(1,service.list(workspace,user).size());
  verify(teams).requireRole(workspace,user,Role.VIEWER);
 }
 @Test void publishDraftNow(){
  when(posts.findById(existing.id)).thenReturn(Optional.of(existing));
  when(posts.save(any(Post.class))).thenAnswer(i->i.getArgument(0));
  Post result=service.publishNow(workspace,existing.id,user);
  assertEquals(PostStatus.SCHEDULED,result.status);assertNotNull(result.scheduledAt);
 }
 @Test void publishScheduledNow(){
  existing.status=PostStatus.SCHEDULED;
  when(posts.findById(existing.id)).thenReturn(Optional.of(existing));
  when(posts.save(any(Post.class))).thenAnswer(i->i.getArgument(0));
  assertEquals(PostStatus.SCHEDULED,service.publishNow(workspace,existing.id,user).status);
 }
 @Test void cannotPublishQueued(){
  existing.status=PostStatus.QUEUED;
  when(posts.findById(existing.id)).thenReturn(Optional.of(existing));
  assertEquals(HttpStatus.CONFLICT,assertThrows(ResponseStatusException.class,()->service.publishNow(workspace,existing.id,user)).getStatusCode());
 }
 @Test void cannotPublishOtherWorkspace(){
  existing.workspaceId=UUID.randomUUID();
  when(posts.findById(existing.id)).thenReturn(Optional.of(existing));
  assertEquals(HttpStatus.NOT_FOUND,assertThrows(ResponseStatusException.class,()->service.publishNow(workspace,existing.id,user)).getStatusCode());
 }
 @Test void publishMissingPost(){
  when(posts.findById(existing.id)).thenReturn(Optional.empty());
  assertEquals(HttpStatus.NOT_FOUND,assertThrows(ResponseStatusException.class,()->service.publishNow(workspace,existing.id,user)).getStatusCode());
 }
 @Test void deletesDraft(){
  when(posts.findById(existing.id)).thenReturn(Optional.of(existing));
  service.delete(workspace,existing.id,user);
  verify(posts).delete(existing);
 }
 @Test void cannotDeletePublished(){
  existing.status=PostStatus.PUBLISHED;
  when(posts.findById(existing.id)).thenReturn(Optional.of(existing));
  assertEquals(HttpStatus.CONFLICT,assertThrows(ResponseStatusException.class,()->service.delete(workspace,existing.id,user)).getStatusCode());
 }
 @Test void cannotDeleteQueued(){
  existing.status=PostStatus.QUEUED;
  when(posts.findById(existing.id)).thenReturn(Optional.of(existing));
  assertThrows(ResponseStatusException.class,()->service.delete(workspace,existing.id,user));
 }
 @Test void cannotDeleteOtherWorkspace(){
  existing.workspaceId=UUID.randomUUID();
  when(posts.findById(existing.id)).thenReturn(Optional.of(existing));
  assertThrows(ResponseStatusException.class,()->service.delete(workspace,existing.id,user));
 }
 @Test void deletingMissingPostReturns404(){
  when(posts.findById(existing.id)).thenReturn(Optional.empty());
  assertThrows(ResponseStatusException.class,()->service.delete(workspace,existing.id,user));
 }
 @Test void deniesViewerCreation(){
  doThrow(new ResponseStatusException(HttpStatus.FORBIDDEN)).when(teams).requireRole(workspace,user,Role.EDITOR);
  assertThrows(ResponseStatusException.class,()->service.create(workspace,user,new PostService.PostRequest("hello","DEMO",null)));
  verify(posts,never()).save(any());
 }
}
