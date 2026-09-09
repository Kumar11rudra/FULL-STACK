package com.example.securityapi.security;
import java.time.*; import java.util.*; import javax.crypto.*; import javax.crypto.spec.GCMParameterSpec; import io.jsonwebtoken.*; import io.jsonwebtoken.io.Decoders; import io.jsonwebtoken.security.Keys; import org.springframework.beans.factory.annotation.Value; import org.springframework.stereotype.Service;
@Service public class JwtService {
 private final String jwtSecret; private final String aesSecret;
 public JwtService(@Value("${app.jwt-secret}") String jwtSecret,@Value("${app.aes-secret}") String aesSecret){this.jwtSecret=jwtSecret;this.aesSecret=aesSecret;}
 private javax.crypto.SecretKey jwtKey(){return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));}
 public String token(String username,String role,String type,Duration ttl){Instant now=Instant.now();return Jwts.builder().subject(username).claim("role",role).claim("type",type).issuedAt(Date.from(now)).expiration(Date.from(now.plus(ttl))).signWith(jwtKey()).compact();}
 public Claims claims(String token){return Jwts.parser().verifyWith(jwtKey()).build().parseSignedClaims(token).getPayload();}
 public String encrypt(String value){try{byte[] iv=new byte[12];new java.security.SecureRandom().nextBytes(iv);Cipher c=Cipher.getInstance("AES/GCM/NoPadding");c.init(Cipher.ENCRYPT_MODE,new javax.crypto.spec.SecretKeySpec(Decoders.BASE64.decode(aesSecret),"AES"),new GCMParameterSpec(128,iv));byte[] data=c.doFinal(value.getBytes(java.nio.charset.StandardCharsets.UTF_8));byte[] joined=new byte[iv.length+data.length];System.arraycopy(iv,0,joined,0,iv.length);System.arraycopy(data,0,joined,iv.length,data.length);return Base64.getEncoder().encodeToString(joined);}catch(Exception e){throw new IllegalStateException("Encryption failed",e);}}
}
