package com.example.exp32;

import com.example.exp32.greeting.GreetingController;
import com.example.exp32.greeting.GreetingService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(GreetingController.class)
class GreetingControllerWebMvcTest {
    @Autowired MockMvc mockMvc;
    @MockBean GreetingService greetingService;

    @Test
    void greetingEndpointReturnsJson() throws Exception {
        when(greetingService.greet("Ada")).thenReturn("Hello, Ada");
        mockMvc.perform(get("/api/greetings/Ada"))
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith("application/json"))
                .andExpect(jsonPath("$.message").value("Hello, Ada"));
    }
}
