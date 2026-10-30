# Experiment 3.1.1 — Kafka Reliability (Retry, DLQ & Idempotency)

A **Java 17 + Spring Boot + Apache Kafka** event-driven scheduled-post demo. An HTTP producer publishes messages to Kafka; a consumer processes them asynchronously. The system retries temporary failures, sends unprocessable events to a dead-letter queue, and prevents duplicate processing by event ID.

## Aim

Implement reliability mechanisms in an event-driven system using **exponential retry**, **dead-letter queues (DLQ)**, and **idempotency**.

## Technology

- Java 17 or newer; Maven 3.9+
- Spring Boot 3.5.7, Spring Kafka
- Apache Kafka 3.9.1 (Docker)
- H2 file-backed database for persistent processed-event IDs

## Architecture

```text
POST /api/posts/schedule
         |
         v
   PostProducer
         |
         v
Kafka topic: scheduled-posts
         |
         v
   PostConsumer ----> PostProcessingService ----> H2 processed_posts
         |                    |
         |                 eventId exists?
         |                    +---- yes -> SKIP DUPLICATE
         |
         +-- failure -> retry after 1s, 2s, 4s
                               |
                     retries exhausted
                               |
                               v
                 scheduled-posts.DLQ
                               |
                          DlqConsumer
```

> This is a **scheduled-post event-processing demo**, not a real clock-based scheduler. Messages are processed after publication. It demonstrates Kafka reliability mechanisms required for the experiment.

## Folder structure

```text
Experiment-3.1.1-Kafka-Reliability/
├── .gitignore
├── docker-compose.yml
├── pom.xml
├── README.md
├── Experiment_Report_3.1.1.md
└── src/
    ├── main/
    │   ├── java/com/example/kafkareliability/
    │   │   ├── KafkaReliabilityApplication.java
    │   │   ├── config/KafkaConfig.java
    │   │   ├── consumer/DlqConsumer.java
    │   │   ├── consumer/PostConsumer.java
    │   │   ├── controller/PostController.java
    │   │   ├── entity/ProcessedPost.java
    │   │   ├── model/FailureMode.java
    │   │   ├── model/PostEvent.java
    │   │   ├── model/PostRequest.java
    │   │   ├── repository/ProcessedPostRepository.java
    │   │   ├── service/PostProcessingService.java
    │   │   └── service/PostProducer.java
    │   └── resources/application.yml
    └── test/java/com/example/kafkareliability/service/
        └── PostProcessingServiceTest.java
```

## Run locally

1. Install **JDK 17+**, **Maven**, **Docker Desktop**. Make sure Docker Desktop is running.
2. Open a terminal in the repository root.
3. Start Kafka:

   ```bash
   docker compose up -d
   ```

4. Start the Java application (a second terminal):

   ```bash
   mvn spring-boot:run
   ```

5. Open `http://localhost:8080/api/posts/processed` to view completed posts (initially `[]`).

Kafka is on `localhost:9092`; Spring Boot API is on `localhost:8080`. The app auto-creates topics `scheduled-posts` and `scheduled-posts.DLQ`.

> If you already have Kafka on port 9092 or Spring Boot on 8080, stop that service or change the port appropriately. First startup may download Docker images and Maven dependencies.

## Test 1 — Normal event

Send an HTTP POST to `http://localhost:8080/api/posts/schedule` with JSON body:

```json
{
  "eventId": "post-101",
  "content": "My first scheduled post",
  "failureMode": "NONE"
}
```

The API should return HTTP **202 Accepted**, with `status: PUBLISHED_TO_KAFKA`. Watch the terminal for `PROCESSED SUCCESS eventId=post-101`. Then GET `/api/posts/processed` to see it stored.

## Test 2 — Exponential retry

```json
{
  "eventId": "post-102",
  "content": "Temporary failure, will recover",
  "failureMode": "TRANSIENT"
}
```

The consumer intentionally fails twice and succeeds on the next delivery. The configured backoff is **1 second, 2 seconds, then 4 seconds** for up to 3 retries after the original attempt (only the first two retries are needed in this test).

Expected messages include:

```text
TRANSIENT FAILURE eventId=post-102 attempt=1
TRANSIENT FAILURE eventId=post-102 attempt=2
PROCESSED SUCCESS eventId=post-102 attempt=3
```

## Test 3 — Dead-letter queue

```json
{
  "eventId": "post-103",
  "content": "This post cannot be processed",
  "failureMode": "PERMANENT"
}
```

Every attempt fails. After the original attempt plus 3 retries, Spring Kafka publishes it to `scheduled-posts.DLQ`. The DLQ listener should log:

```text
DLQ RECEIVED eventId=post-103 mode=PERMANENT content=This post cannot be processed
```

To inspect the Kafka DLQ topic directly, run:

```bash
docker compose exec kafka /opt/kafka/bin/kafka-console-consumer.sh \
  --bootstrap-server localhost:9092 --topic scheduled-posts.DLQ --from-beginning
```

Stop the consumer with Ctrl+C after you see the event. `post-103` will **not** appear in `/api/posts/processed`.

## Test 4 — Idempotency / duplicates

Send Test 1 (`eventId: post-101`) again, even with different content.

Expected log:

```text
DUPLICATE SKIPPED eventId=post-101
```

The H2 table has **one** record for `post-101` because `eventId` is the primary key, and the consumer checks it before processing. The H2 database resides under `data/` and persists across application restarts.

## Optional: use cURL in Terminal / Git Bash

```bash
curl -X POST http://localhost:8080/api/posts/schedule \
  -H "Content-Type: application/json" \
  -d '{"eventId":"post-101","content":"Hello Kafka","failureMode":"NONE"}'

curl http://localhost:8080/api/posts/processed
```

On Windows PowerShell, you can use Postman or:

```powershell
Invoke-RestMethod -Method Post -Uri http://localhost:8080/api/posts/schedule `
  -ContentType 'application/json' `
  -Body '{"eventId":"post-101","content":"Hello Kafka","failureMode":"NONE"}'
```

## Run unit tests

```bash
mvn test
```

Unit tests cover normal processing, duplicate handling, transient failures, and permanent failures. End-to-end Kafka behavior must also be checked by running the application and sending HTTP requests as shown above.

## Stop services

```bash
docker compose down
```

## Upload to GitHub

1. Make a new public/private GitHub repository, e.g. `kafka-reliability-experiment-3.1.1`.
2. **Extract the ZIP first**. Upload the `pom.xml`, `src/`, `README.md`, `docker-compose.yml`, and all other files, preserving the exact folder structure. Do not upload only the ZIP.
3. Or use Git from inside the extracted project root:

```bash
git init
git add .
git commit -m "Implement Kafka retry DLQ and idempotency"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/kafka-reliability-experiment-3.1.1.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username and create the empty repository before pushing.

## Screenshots for lab submission

Capture **real screenshots after running**, such as:

1. `01-kafka-running.png`: output of `docker compose ps`
2. `02-success.png`: Postman request plus `PROCESSED SUCCESS` terminal output
3. `03-retry.png`: failure/retry logs for `post-102`
4. `04-dlq.png`: `DLQ RECEIVED` log or Kafka console consumer
5. `05-idempotency.png`: `DUPLICATE SKIPPED` log and GET `/api/posts/processed`

Create a `screenshots/` folder and commit those images if required by your instructor.

## Notes and limits

- Producer-side `enable.idempotence=true` helps avoid duplicate broker writes caused by producer retries. Application-side idempotency is separately implemented using a durable event ID in H2.
- `TRANSIENT` and `PERMANENT` are intentional failure simulation modes for demonstrating the required behavior.
- In a production-scale system, use a shared database, concurrency controls, observability and DLQ alerting, and consider coordination of DB commit and Kafka offsets. This lab is a local single-broker demonstration.
