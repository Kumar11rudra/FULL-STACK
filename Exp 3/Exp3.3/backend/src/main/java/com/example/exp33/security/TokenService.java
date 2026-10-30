package com.example.exp33.security;

import com.example.exp33.auth.Account;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.UUID;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.stereotype.Service;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.security.core.Authentication;

@Service
public class TokenService {
 private final JwtEncoder encoder;
 public TokenService(JwtEncoder encoder) { this.encoder = encoder; }
 public String create(Account account) {
  Instant now = Instant.now();
  JwtClaimsSet claims = JwtClaimsSet.builder().subject(account.id.toString()).issuedAt(now)
      .expiresAt(now.plus(12, ChronoUnit.HOURS)).claim("email",account.email).build();
  return encoder.encode(JwtEncoderParameters.from(JwsHeader.with(MacAlgorithm.HS256).build(),claims)).getTokenValue();
 }
 public static UUID userId(Authentication authentication) {
  if (!(authentication instanceof JwtAuthenticationToken token)) throw new org.springframework.web.server.ResponseStatusException(org.springframework.http.HttpStatus.UNAUTHORIZED);
  return UUID.fromString(token.getToken().getSubject());
 }
}
