package com.example.exp33.team;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
public interface WorkspaceRepository extends JpaRepository<Workspace,UUID> {}
