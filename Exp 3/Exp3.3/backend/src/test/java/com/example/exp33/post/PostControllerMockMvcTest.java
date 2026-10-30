package com.example.exp33.post;
import com.example.exp33.security.TokenService;
import java.util.*;
import org.junit.jupiter.api.Test;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
class PostControllerMockMvcTest {
 @Test void listRouteReturnsJson() throws Exception {
  UUID workspace=UUID.randomUUID(), user=UUID.randomUUID();
  PostService service=mock(PostService.class);
  Jwt jwt=Jwt.withTokenValue("demo").header("alg","none").subject(user.toString()).build();
  JwtAuthenticationToken principal=new JwtAuthenticationToken(jwt);
  when(service.list(workspace,user)).thenReturn(List.of(new Post(workspace,user,"Demo","DEMO",null)));
  MockMvc mvc=MockMvcBuilders.standaloneSetup(new PostController(service)).build();
  mvc.perform(get("/api/workspaces/"+workspace+"/posts").principal(principal))
    .andExpect(status().isOk()).andExpect(jsonPath("$[0].content").value("Demo"));
 }
}
