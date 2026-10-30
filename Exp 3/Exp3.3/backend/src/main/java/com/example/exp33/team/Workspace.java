package com.example.exp33.team;
import jakarta.persistence.*;
import java.util.UUID;
@Entity @Table(name="workspaces")
public class Workspace {
 @Id public UUID id;
 @Column(nullable=false) public String name;
 protected Workspace() {}
 public Workspace(String name) { id=UUID.randomUUID(); this.name=name; }
}
