package com.example.exp32.release;

import java.util.Map;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class VersionController {
    @Value("${app.version:dev}")
    private String version;

    @GetMapping("/api/version")
    public Map<String, String> version() {
        return Map.of("version", version);
    }
}
