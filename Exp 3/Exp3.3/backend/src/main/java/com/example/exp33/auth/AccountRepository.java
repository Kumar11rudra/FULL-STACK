package com.example.exp33.auth;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
public interface AccountRepository extends JpaRepository<Account,UUID> { Optional<Account> findByEmail(String email); }
