package com.example.exp33.auth;
import jakarta.persistence.*;
import java.util.UUID;
@Entity @Table(name="app_accounts",uniqueConstraints=@UniqueConstraint(columnNames="email"))
public class Account {
 @Id public UUID id;
 @Column(nullable=false,unique=true) public String email;
 @Column(nullable=false) public String name;
 @Column(nullable=false) public String passwordHash;
 protected Account() {}
 public Account(String email,String name,String hash) {
  this.id=UUID.randomUUID(); this.email=email; this.name=name; this.passwordHash=hash;
 }
}
