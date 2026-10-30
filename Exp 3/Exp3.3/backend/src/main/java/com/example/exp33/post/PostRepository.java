package com.example.exp33.post;
import java.time.Instant;
import java.util.*;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
public interface PostRepository extends JpaRepository<Post,UUID> {
 List<Post> findByWorkspaceIdOrderByCreatedAtDesc(UUID workspaceId);
 List<Post> findTop50ByStatusAndScheduledAtBeforeOrderByScheduledAtAsc(PostStatus status,Instant date);
 @Modifying @Transactional
 @Query("update Post p set p.status=:next, p.updatedAt=:now where p.id=:id and p.status=:expected")
 int transition(@Param("id") UUID id,@Param("expected") PostStatus expected,@Param("next") PostStatus next,@Param("now") Instant now);
 @Modifying @Transactional
 @Query("update Post p set p.status=:nextStatus, p.updatedAt=:now where p.status=:previousStatus and p.updatedAt<:cutoff")
 int requeueStale(@Param("cutoff") Instant cutoff,@Param("now") Instant now,@Param("nextStatus") PostStatus nextStatus,@Param("previousStatus") PostStatus previousStatus);
}
