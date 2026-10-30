package com.example.exp32;

import au.com.dius.pact.consumer.MockServer;
import au.com.dius.pact.consumer.dsl.PactDslJsonBody;
import au.com.dius.pact.consumer.dsl.PactDslWithProvider;
import au.com.dius.pact.consumer.junit5.PactConsumerTestExt;
import au.com.dius.pact.consumer.junit5.PactTestFor;
import au.com.dius.pact.core.model.RequestResponsePact;
import au.com.dius.pact.core.model.annotations.Pact;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Map;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(PactConsumerTestExt.class)
class GreetingConsumerPactTest {
    @Pact(consumer = "FrontendClient", provider = "GreetingProvider")
    RequestResponsePact greetingPact(PactDslWithProvider builder) {
        return builder
                .given("greeting service is available")
                .uponReceiving("a greeting for Ada")
                    .path("/api/greetings/Ada")
                    .method("GET")
                .willRespondWith()
                    .status(200)
                    .headers(Map.of("Content-Type", "application/json"))
                    .body(new PactDslJsonBody().stringValue("message", "Hello, Ada"))
                .toPact();
    }

    @Test
    @PactTestFor(pactMethod = "greetingPact")
    void frontendExpectsGreetingContract(MockServer mockServer) throws Exception {
        HttpClient client = HttpClient.newHttpClient();
        {
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(mockServer.getUrl() + "/api/greetings/Ada"))
                    .GET().build();
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            assertEquals(200, response.statusCode());
            assertTrue(response.body().contains("Hello, Ada"));
        }
    }
}
