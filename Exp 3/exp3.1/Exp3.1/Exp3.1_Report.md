# Experiment 3.1 — Kafka Event-Driven Communication and Reliability

## Aim
To develop an event-driven communication system using Apache Kafka for asynchronous scheduled-post event processing, and implement reliable processing using retry strategies, dead-letter queues (DLQ), and idempotency patterns.

## Objectives
1. Understand the Kafka producer–consumer model, asynchronous event processing, and failure handling in distributed systems.
2. Develop Kafka producer and consumer components for scheduled-post events.
3. Implement retry handling with exponential backoff.
4. Configure a DLQ and move events there when retries are exhausted.
5. Implement idempotent processing using persistent event tracking.
6. Test success, temporary failure, permanent failure, and duplicate-delivery scenarios.

## COs Mapped
Combined mapping from the two experiment specifications: **CO2–BT2, CO3–BT3, CO5–BT5, CO6–BT6**.

## Pre-requisites
Basic understanding of Kafka producer/consumer, backend processing, asynchronous messaging, Java, and exception handling.

## Software Requirements
- Java JDK 17+
- Spring Boot and Spring for Apache Kafka
- Apache Kafka (local Docker broker)
- Docker and Docker Compose
- Maven and Java IDE (IntelliJ IDEA/Eclipse/VS Code)
- Postman or any HTTP client for testing

## Description / Theory
Apache Kafka is a distributed event-streaming platform. A **producer** writes events to a **topic** and a **consumer** receives the events independently, reducing tight coupling between services and allowing asynchronous processing.

Distributed systems may experience network interruptions, temporary service outages, and errors. **Retry processing** attempts the operation again after a failure. **Exponential backoff** increases the wait between retries (in this example, 1 s, 2 s, and 4 s), helping avoid excessive repeated requests.

A **dead-letter queue (DLQ)** is a separate Kafka topic used to store events that repeatedly fail processing; this lets subsequent events continue and provides an opportunity to inspect failures. The topic in this project is `scheduled-posts.DLQ`.

Kafka-based consumer processing can have **at-least-once behavior**, so a message may be delivered again. **Idempotency** means repeated processing of the same event has no additional business effect. This project checks `eventId` against the H2 `processed_posts` table and uses it as a primary key to avoid duplicate rows.

## Procedure / Algorithm
1. Start the Kafka broker using `docker compose up -d`.
2. Run the Spring Boot application using `mvn spring-boot:run`.
3. `KafkaConfig.java` creates `scheduled-posts` and `scheduled-posts.DLQ` topics.
4. Submit a post event through the `POST /api/posts/schedule` endpoint.
5. `PostProducer.java` publishes the event to the main Kafka topic.
6. `PostConsumer.java` receives and passes it to `PostProcessingService.java`.
7. First check the database for the event ID; skip it if already processed.
8. For a temporary simulated failure, retry with exponential backoff.
9. If the record still fails after the original attempt and three retries, forward it to the DLQ topic.
10. Inspect successful events in `GET /api/posts/processed`, failures in the DLQ listener, and duplicate-skip logs.
11. Record screenshots of real test runs and add observations to the experiment submission.

## Test Scenarios / Expected Output

| Scenario | Event ID | `failureMode` | Expected behavior |
|---|---|---|---|
| Normal event | `exp31-normal-01` | `NONE` | `PROCESSED SUCCESS`, 1 database row |
| Temporary failure | `exp31-retry-01` | `TRANSIENT` | Two failures, then success via retry |
| Permanent failure | `exp31-dlq-01` | `PERMANENT` | Original + 3 retries fail, event appears in DLQ |
| Duplicate event | Reuse `exp31-normal-01` | `NONE` | `DUPLICATE SKIPPED`, no second database row |

### Example HTTP payload

```json
{
  "eventId": "exp31-normal-01",
  "content": "Hello from Kafka!",
  "failureMode": "NONE"
}
```

Send to `POST http://localhost:8080/api/posts/schedule`.

## Expected Outcome / Result
The expected result is asynchronous post-event processing through Kafka, reliable recovery from simulated transient failures, routing of repeatedly failed events to a DLQ, and duplicate prevention using persistent event IDs. **Actual execution results should be added only after running and observing the application.**

## Learning Outcomes
- Understanding of Apache Kafka asynchronous communication.
- Implementation of producer and consumer services with Spring Boot.
- Implementation of exponential retry and DLQ handling.
- Application of idempotency patterns using database event tracking.
- Testing and analysis of normal and failure-processing scenarios.

## Important Source Files
- `src/main/java/com/example/kafkareliability/service/PostProducer.java`
- `src/main/java/com/example/kafkareliability/consumer/PostConsumer.java`
- `src/main/java/com/example/kafkareliability/config/KafkaConfig.java`
- `src/main/java/com/example/kafkareliability/service/PostProcessingService.java`
- `src/main/java/com/example/kafkareliability/consumer/DlqConsumer.java`

**Note:** This is an educational, single-broker demo. Scheduled-post events are handled after they are published to Kafka; no future-time scheduler is included.
