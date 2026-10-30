# Exp3.1 — Apache Kafka Event-Driven Communication & Reliability

**Combined Experiment 3.1**: event-driven scheduled-post processing using **Kafka producer + consumer**, along with **exponential-backoff retries, a dead-letter queue (DLQ), and idempotency**. This is one project, intended to be placed at **`Exp 3/Exp3.1/`** inside the existing **`Kumar11rudra/FULL-STACK`** GitHub repository (branch `main`).

## 1. Aim

To implement an event-driven communication system using Apache Kafka for asynchronous processing of scheduled-post events and to ensure reliability through retry strategies, dead-letter queues, and idempotent message processing.

## 2. Objectives

1. Understand failure handling in distributed/event-driven systems.
2. Publish and consume scheduled-post events asynchronously via Kafka.
3. Implement retries with exponential backoff.
4. Configure a dead-letter queue for events that exhaust retries.
5. Prevent duplicate processing with event tracking and idempotency.
6. Test normal processing, temporary failure, permanent failure, and duplicate events.

**CO mapping (combined from both supplied outlines):** CO2–BT2, CO3–BT3, CO5–BT5, CO6–BT6.

**Prerequisites:** Producer-consumer basics, backend event processing, Java exception handling.

**Tools:** Java JDK 17+, Spring Boot 3.5.7, Maven 3.9+, Apache Kafka 3.9.1, Docker Desktop/Engine, IntelliJ/Eclipse/VS Code, Postman (optional).

## 3. Architecture

```text
REST Client                         Apache Kafka                    Spring Boot Consumer
POST /api/posts/schedule               |                                  |
    |                                 |                                  |
    v                                 v                                  v
PostController -> PostProducer -> [scheduled-posts] -> PostConsumer -> PostProcessingService
                                                                          |
                                                                    H2 eventId lookup
                                                                          |
                                                     duplicate? ----------+----> SKIP
                                                                          |
                                                      processing succeeds? +----> SAVE once
                                                                          |
                                                   simulated failure ------+
                                                                          |
                                                            Retry 1s -> 2s -> 4s
                                                                          |
                                                          retries exhausted
                                                                          v
                                                                [scheduled-posts.DLQ]
                                                                          |
                                                                     DlqConsumer
```

The app models a **scheduled-post event workflow**, not a clock-based future publishing scheduler. REST publication and Kafka processing are asynchronous (HTTP acknowledgement means queued on Kafka, not already processed).

## 4. Files / what they do

| File | Purpose |
|---|---|
| `pom.xml` | Spring Boot and Maven dependencies |
| `docker-compose.yml` | Single-node local Kafka broker |
| `src/main/resources/application.yml` | Kafka connection, serialization, H2 settings |
| `src/main/java/com/example/kafkareliability/KafkaReliabilityApplication.java` | App entry point |
| `src/main/java/com/example/kafkareliability/service/PostProducer.java` | Producer publishes a post event |
| `src/main/java/com/example/kafkareliability/consumer/PostConsumer.java` | Processes events asynchronously |
| `src/main/java/com/example/kafkareliability/config/KafkaConfig.java` | Topic creation, retries, exponential backoff, DLQ forwarding |
| `src/main/java/com/example/kafkareliability/consumer/DlqConsumer.java` | Monitors DLQ messages |
| `src/main/java/com/example/kafkareliability/service/PostProcessingService.java` | Simulated failure cases and idempotency |
| `src/main/java/com/example/kafkareliability/entity/ProcessedPost.java` | Table mapping; `eventId` unique key |
| `src/main/java/com/example/kafkareliability/repository/ProcessedPostRepository.java` | H2 persistence |
| `src/main/java/com/example/kafkareliability/controller/PostController.java` | HTTP endpoint for testing |
| `src/main/java/com/example/kafkareliability/model/` | Event, validation and failure modes |
| `src/test/java/com/example/kafkareliability/service/PostProcessingServiceTest.java` | Unit tests |
| `Exp3.1_Report.md` | Aim, theory, procedure, expected outcomes, COs |
| `requests.http` | Four example HTTP requests for testing |

## 5. Run on your computer

In a terminal **inside `Exp3.1/`**, run:

```bash
docker compose up -d
mvn spring-boot:run
```

Keep Spring Boot running in the terminal. The local Kafka broker uses `localhost:9092` and the REST API uses `localhost:8080`. The topics are auto-created as `scheduled-posts` and `scheduled-posts.DLQ`.

> Requirement: Docker must be running. Maven and JDK 17+ must be installed. The database lives under the ignored `data/` folder and preserves processed IDs between application restarts.

## 6. Test the four scenarios

Open Postman (or use `requests.http` with a REST Client extension). Method: `POST` to `http://localhost:8080/api/posts/schedule` with `Content-Type: application/json`.

### A. Normal delivery

```json
{"eventId":"exp31-normal-01","content":"Hello from Kafka!","failureMode":"NONE"}
```

**Expected:** API returns HTTP `202 Accepted` with `PUBLISHED_TO_KAFKA`; Spring Boot logs `PROCESSED SUCCESS ...`.

### B. Retry with exponential backoff

```json
{"eventId":"exp31-retry-01","content":"Temporary error demo","failureMode":"TRANSIENT"}
```

**Expected:** two simulated transient failures, then success on the third processing attempt. Retry configuration supports up to **three retries after the initial attempt** with waiting times of **1, 2, 4 seconds**.

### C. Dead-letter queue

```json
{"eventId":"exp31-dlq-01","content":"Permanent error demo","failureMode":"PERMANENT"}
```

**Expected:** original attempt + three retries fail; the event is routed to the `scheduled-posts.DLQ` topic. The DLQ consumer logs `DLQ RECEIVED ...`.

### D. Duplicate / idempotency

Re-send the **same eventId** from test A, even with a new `content` field.

**Expected:** `DUPLICATE SKIPPED eventId=exp31-normal-01`, without creating a second database row. Check processed posts with:

```bash
curl http://localhost:8080/api/posts/processed
```

To inspect the dead-letter Kafka topic directly:

```bash
docker compose exec kafka /opt/kafka/bin/kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic scheduled-posts.DLQ --from-beginning
```

Press Ctrl+C to stop the Kafka console consumer.

### Automated tests

```bash
mvn test
```

Unit tests exercise normal processing, duplicates, transient recovery, and permanent failure. **Manual Kafka tests are still required** for the full end-to-end behavior.

## 7. Add to the **existing** GitHub repository

**Repository:** `https://github.com/Kumar11rudra/FULL-STACK`

**Target location:** `Exp 3/Exp3.1/` on branch `main`.

**Website upload method:**

1. Open the existing folder at `https://github.com/Kumar11rudra/FULL-STACK/tree/main/Exp%203`.
2. Choose **Add file → Upload files** (requires GitHub sign-in and repository write access).
3. Extract `FULL-STACK-Exp3.1-Ready.zip`. Inside the extracted `Exp 3/` folder, locate **`Exp3.1/`**.
4. Drag the **`Exp3.1/` folder**, not its enclosing `Exp 3/` folder, into GitHub's upload area. This prevents making `Exp 3/Exp 3/Exp3.1/` by mistake.
5. Verify the preview paths are under `Exp 3/Exp3.1/` and do not overwrite other files. Commit with message: `Add Exp3.1 Kafka reliability experiment`.
6. Check that the URL `https://github.com/Kumar11rudra/FULL-STACK/tree/main/Exp%203/Exp3.1` shows README, pom.xml, docker-compose.yml, and src.

**Terminal method** (when your existing `FULL-STACK` repository is cloned): extract `FULL-STACK-Exp3.1-Ready.zip` **at the local repository root** and run:

```bash
git add 'Exp 3/Exp3.1/'
git commit -m "Add Exp3.1 Kafka reliability experiment"
git push origin main
```

**Do not upload just the ZIP file as a GitHub file**; the source files must appear within `Exp 3/Exp3.1/`. Do not create a new GitHub repository.

## 8. Evidence for lab submission

Take authentic screenshots after running the project. Suggested screenshot filenames inside optional `Exp3.1/screenshots/`:

- `01-broker-running.png` — `docker compose ps`
- `02-producer-consumer-success.png` — successful post and log
- `03-retry-backoff.png` — retry messages
- `04-dead-letter-queue.png` — DLQ message
- `05-idempotency-duplicate.png` — duplicate skip

No screenshot is bundled or claimed as execution evidence, because this project was not executed against Kafka in the creation environment.

## 9. Limitations / notes

- Local demo uses **one Kafka broker and one partition**; production deployments need appropriate replication/monitoring.
- Producer `enable.idempotence=true` and a database primary key provide different protections. The database check is the **consumer-side idempotency** mechanism in this lab; a robust production application additionally needs concurrency and side-effect coordination.
- `TRANSIENT` and `PERMANENT` deliberately simulate error scenarios for demonstrations.
- Duplicate `eventId` across messages is treated as already processed; use a fresh ID for each independent test.
- Graceful shutdown: `docker compose down`.

**Reference:** [Spring Kafka exception handling and DLT documentation](https://docs.spring.io/spring-kafka/reference/kafka/annotation-error-handling.html); [Apache Kafka Docker documentation](https://kafka.apache.org/39/getting-started/docker/).
