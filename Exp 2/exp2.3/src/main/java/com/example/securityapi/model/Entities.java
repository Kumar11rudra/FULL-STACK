package com.example.securityapi.model;
import jakarta.persistence.*;
public final class Entities {
 private Entities() { }
 @Entity @Table(name="app_users") public static class AppUser { @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id; @Column(unique=true,nullable=false) private String username; private String password; private String role; protected AppUser(){} public AppUser(String u,String p,String r){username=u;password=p;role=r;} public Long getId(){return id;} public String getUsername(){return username;} public String getPassword(){return password;} public String getRole(){return role;} }
 @Entity public static class OAuthCredential { @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id; private String provider; @Column(length=4096) private String encryptedAccessToken; @Column(length=4096) private String encryptedRefreshToken; @ManyToOne(fetch=FetchType.LAZY) private AppUser owner; protected OAuthCredential(){} public OAuthCredential(String p,String a,String r,AppUser o){provider=p;encryptedAccessToken=a;encryptedRefreshToken=r;owner=o;} }
}
