package com.example.exp33.post;
import java.util.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import org.testcontainers.containers.PostgreSQLContainer;
import static org.junit.jupiter.api.Assertions.*;

@Testcontainers(disabledWithoutDocker=true)
@DataJpaTest @AutoConfigureTestDatabase(replace=AutoConfigureTestDatabase.Replace.NONE)
class DatabaseIntegrationTest {
 @Container static PostgreSQLContainer<?> db=new PostgreSQLContainer<>("postgres:16-alpine")
   .withDatabaseName("exp33test").withUsername("test").withPassword("test");
 @DynamicPropertySource static void dbProperties(DynamicPropertyRegistry registry){
  registry.add("spring.datasource.url",db::getJdbcUrl);
  registry.add("spring.datasource.username",db::getUsername);
  registry.add("spring.datasource.password",db::getPassword);
 }
 @Autowired PostRepository posts;
 @Test void postgresStoresAndFiltersWorkspacePosts(){
  UUID team=UUID.randomUUID(),user=UUID.randomUUID();
  posts.save(new Post(team,user,"A post","DEMO",null));
  assertEquals(1,posts.findByWorkspaceIdOrderByCreatedAtDesc(team).size());
  assertTrue(posts.findByWorkspaceIdOrderByCreatedAtDesc(UUID.randomUUID()).isEmpty());
 }
}
