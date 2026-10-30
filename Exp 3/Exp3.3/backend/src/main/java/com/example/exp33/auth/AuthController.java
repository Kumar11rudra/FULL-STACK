package com.example.exp33.auth;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
@RestController @RequestMapping("/api/auth")
public class AuthController {
 private final AuthService service;
 public AuthController(AuthService service){this.service=service;}
 @PostMapping("/register") public AuthService.AuthResponse register(@Valid @RequestBody AuthService.RegisterRequest input){return service.register(input);}
 @PostMapping("/login") public AuthService.AuthResponse login(@Valid @RequestBody AuthService.LoginRequest input){return service.login(input);}
}
