package com.example.exp33.config;

import com.nimbusds.jose.jwk.source.ImmutableSecret;
import java.util.Base64;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import java.util.List;

@Configuration
public class SecurityConfig {
 @Bean SecretKey jwtSecret(@Value("${app.jwt.secret-base64}") String encoded) {
   byte[] bytes = Base64.getDecoder().decode(encoded);
   if (bytes.length < 32) throw new IllegalArgumentException("JWT secret must be >= 32 bytes");
   return new SecretKeySpec(bytes, "HmacSHA256");
 }
 @Bean JwtEncoder jwtEncoder(SecretKey secret) { return new NimbusJwtEncoder(new ImmutableSecret<>(secret)); }
 @Bean JwtDecoder jwtDecoder(SecretKey secret) {
   return NimbusJwtDecoder.withSecretKey(secret).macAlgorithm(MacAlgorithm.HS256).build();
 }
 @Bean CorsConfigurationSource corsConfigurationSource(@Value("${app.cors-origin}") String origin) {
   CorsConfiguration config = new CorsConfiguration();
   config.setAllowedOrigins(List.of(origin));
   config.setAllowedMethods(List.of("GET","POST","PUT","PATCH","DELETE","OPTIONS"));
   config.setAllowedHeaders(List.of("Authorization","Content-Type"));
   UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
   source.registerCorsConfiguration("/**", config);
   return source;
 }
 @Bean SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
   return http.csrf(csrf -> csrf.disable())
      .cors(Customizer.withDefaults())
      .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
      .authorizeHttpRequests(auth -> auth
         .requestMatchers(HttpMethod.POST, "/api/auth/login", "/api/auth/register").permitAll()
         .requestMatchers("/swagger-ui/**", "/swagger-ui.html", "/v3/api-docs/**", "/actuator/health").permitAll()
         .anyRequest().authenticated())
      .oauth2ResourceServer(oauth -> oauth.jwt(Customizer.withDefaults()))
      .build();
 }
}
