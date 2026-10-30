package com.example.exp33.team;
import jakarta.persistence.*;
import java.util.UUID;
@Entity @Table(name="memberships",uniqueConstraints=@UniqueConstraint(columnNames={"workspace_id","account_id"}))
public class Membership {
 @Id public UUID id;
 @Column(name="workspace_id",nullable=false) public UUID workspaceId;
 @Column(name="account_id",nullable=false) public UUID accountId;
 @Enumerated(EnumType.STRING) @Column(nullable=false) public Role role;
 protected Membership() {}
 public Membership(UUID workspaceId,UUID accountId,Role role) {
  id=UUID.randomUUID(); this.workspaceId=workspaceId; this.accountId=accountId;this.role=role;
 }
}
