package com.example.securityapi.repository;
import java.util.*; import org.springframework.data.jpa.repository.*; import com.example.securityapi.model.Entities.*;
public final class Repositories { private Repositories(){} public interface UserRepository extends JpaRepository<AppUser,Long>{ Optional<AppUser> findByUsername(String username); } public interface CredentialRepository extends JpaRepository<OAuthCredential,Long>{} }
