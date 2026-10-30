package com.example.exp33.team;
import java.util.*;
import org.springframework.data.jpa.repository.JpaRepository;
public interface MembershipRepository extends JpaRepository<Membership,UUID> {
 Optional<Membership> findByWorkspaceIdAndAccountId(UUID workspaceId,UUID accountId);
 List<Membership> findByAccountId(UUID accountId);
 List<Membership> findByWorkspaceId(UUID workspaceId);
}
