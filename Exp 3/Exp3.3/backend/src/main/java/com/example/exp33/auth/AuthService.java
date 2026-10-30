package com.example.exp33.auth;

import com.example.exp33.security.TokenService;
import com.example.exp33.team.*;
import jakarta.transaction.Transactional;
import jakarta.validation.constraints.*;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AuthService {
 private final AccountRepository accounts;
 private final WorkspaceRepository workspaces;
 private final MembershipRepository members;
 private final TokenService tokens;
 private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
 public AuthService(AccountRepository accounts,WorkspaceRepository workspaces,MembershipRepository members,TokenService tokens) {
  this.accounts=accounts;this.workspaces=workspaces;this.members=members;this.tokens=tokens;
 }
 public record RegisterRequest(@Email @NotBlank String email,@NotBlank String name,@Size(min=8,max=72) String password) {}
 public record LoginRequest(@Email @NotBlank String email,@NotBlank String password) {}
 public record AuthResponse(String token,String email,String name) {}
 @Transactional
 public AuthResponse register(RegisterRequest req) {
  String email=req.email().strip().toLowerCase(java.util.Locale.ROOT);
  if(accounts.findByEmail(email).isPresent()) throw new ResponseStatusException(HttpStatus.CONFLICT,"Email already registered");
  Account account=accounts.save(new Account(email,req.name().strip(),encoder.encode(req.password())));
  Workspace workspace=workspaces.save(new Workspace(account.name+"'s workspace"));
  members.save(new Membership(workspace.id,account.id,Role.ADMIN));
  return new AuthResponse(tokens.create(account),account.email,account.name);
 }
 public AuthResponse login(LoginRequest req) {
  Account account=accounts.findByEmail(req.email().strip().toLowerCase(java.util.Locale.ROOT))
      .orElseThrow(()->new ResponseStatusException(HttpStatus.UNAUTHORIZED,"Invalid credentials"));
  if(!encoder.matches(req.password(),account.passwordHash)) throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,"Invalid credentials");
  return new AuthResponse(tokens.create(account),account.email,account.name);
 }
}
