package com.example.exp32;

import com.example.exp32.greeting.GreetingService;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class GreetingServiceTest {
    private final GreetingService service = new GreetingService();

    @Test
    void producesExpectedGreeting() {
        assertEquals("Hello, Ada", service.greet("Ada"));
    }

    @Test
    void trimsName() {
        assertEquals("Hello, Sam", service.greet(" Sam "));
    }

    @Test
    void rejectsBlankName() {
        assertThrows(IllegalArgumentException.class, () -> service.greet(" "));
    }
}
