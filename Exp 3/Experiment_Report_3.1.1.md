# Experiment 3.1.1 — Reliability in Event-Driven System using Apache Kafka

## Aim
To implement reliability mechanisms in an event-driven system using retry strategies, dead-letter queues (DLQ), and idempotency patterns.

## Objectives
1. Understand failure handling in distributed systems.
2. Implement exponential backoff retry for processing failures.
3. Route repeatedly failed events to a dead-letter queue.
4. Avoid duplicate event processing through idempotency.

## Software Requirements
Java JDK 17+, Maven, Spring Boot, Apache Kafka, Docker, any Java IDE (IntelliJ IDEA, Eclipse or VS Code).

## Theory
Apache Kafka connects producers and consumers asynchronously through topics. Transient errors may be solved by retrying after a delay. Exponential backoff gradually increases retry delays to reduce load. A dead-letter queue stores messages that still cannot be processed after the configured retries. At-least-once processing may redeliver messages, so idempotency ensures a duplicate event does not create a duplicate database record.

## Algorithm / Procedure
1. Start Kafka with Docker Compose.
2. Start the Spring Boot application and create Kafka topics `scheduled-posts` and `scheduled-posts.DLQ`.
3. Publish a post event with a unique `eventId` through the REST API.
4. The consumer checks the H2 database for an existing event ID.
5. If processed earlier, skip it; otherwise attempt processing.
6. Retry processing failures with exponential delays of 1, 2 and 4 seconds (max 3 retries).
7. If failures continue, route the record to the DLQ topic.
8. Verify successful events through the REST endpoint and failures in the Kafka logs/DLQ.

## Test Cases / Expected Output

| Test | Input | Expected observation |
| --- | --- | --- |
| Normal | `post-101`, `NONE` | `PROCESSED SUCCESS`; one row in H2 |
| Retry | `post-102`, `TRANSIENT` | Two simulated failures, then `PROCESSED SUCCESS` |
| DLQ | `post-103`, `PERMANENT` | Four failed delivery attempts and `DLQ RECEIVED` |
| Duplicate | Resend `post-101` | `DUPLICATE SKIPPED`; no new row |

## Result
**Expected:** Events are processed asynchronously. Temporary processing failures can be retried, permanently failed records are moved to DLQ, and repeated event IDs are not processed twice. Fill in your actual observations and attach screenshots after running the project.

## Learning Outcomes
- Implemented a Kafka producer-consumer workflow.
- Understood retry handling using exponential backoff.
- Understood routing failed records to a dead-letter topic.
- Applied persistent idempotency using a database primary key.
- Learned how to verify normal, duplicate and failure cases.

## COs Mapped
CO2 - BT2, CO3 - BT3, CO5 - BT5.
