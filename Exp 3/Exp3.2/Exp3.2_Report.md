# Experiment 3.2 — Continuous Integration and Continuous Deployment

## Experiments Combined
- **3.2.1:** Continuous Integration (CI): build, unit testing, API integration testing, Pact contracts, PostgreSQL Testcontainers.
- **3.2.2:** Continuous Deployment (CD): Docker images, GitHub Actions, registry publishing, canary verification and promotion.

## Aim
To design and implement a Continuous Integration and Continuous Deployment pipeline that automatically builds, tests, containerizes, verifies and publishes a Spring Boot application using a canary deployment strategy.

## Objectives
1. Understand CI/CD practices, builds and automated testing.
2. Implement unit tests with JUnit 5 and REST API tests with MockMvc.
3. Verify consumer-provider API contracts using Pact.
4. Test persistence using PostgreSQL Testcontainers.
5. Package the application as a Docker image and publish to GitHub Container Registry (GHCR).
6. Demonstrate canary routing (80% stable / 20% new) and automatic promotion after passing smoke tests.

## COs Mapped
CO6 — BT6 (both 3.2.1 and 3.2.2).

## Prerequisites
Java and Spring Boot fundamentals, REST APIs, testing, Docker and basic GitHub Actions knowledge.

## Software Requirements
JDK 17+, Maven 3.9+, Spring Boot, JUnit 5, MockMvc, Pact, Docker and Docker Compose, Testcontainers, GitHub Actions and GHCR.

## Theory
**CI** automatically builds and verifies code on a pull request or push. Unit tests isolate business logic; MockMvc tests HTTP endpoints; Pact contracts assert consumer/provider compatibility; and Testcontainers tests the repository against a real temporary PostgreSQL instance.

**CD** packages verified code as a Docker image. The GitHub Actions workflow first runs all tests, then creates a new image. A demonstration Nginx gateway initially sends 80% of requests to a stable instance and 20% to a candidate. The verification script checks traffic and then changes routing to 100% candidate after successful health/smoke tests. The image is then published to GHCR.

This project demonstrates a **runner-local canary deployment**. GitHub-hosted runners are ephemeral, so the containers are removed at the end. A permanent production deployment would require a persistent server or Kubernetes cluster, credentials, monitoring and rollback automation.

## Algorithm / Procedure
1. Create a Java 17 Spring Boot application with a greeting API and note persistence API.
2. Add JUnit 5 unit tests for greeting logic.
3. Add a MockMvc API test to check status and JSON contract.
4. Define a Pact consumer test and verify its matching contract against the actual provider API.
5. Start a PostgreSQL Testcontainer and verify repository read/write behaviour.
6. Create a multi-stage Dockerfile to build a self-contained application image.
7. Add a root-level GitHub Actions workflow targeting `Exp 3/Exp3.2/`.
8. Automatically run `mvn clean verify` on pushes/pull requests, build the Docker image and execute a local canary demonstration.
9. Smoke-test 80:20 routing, promote to the candidate on success, then publish image tags to GHCR on a `main` branch push.
10. Observe the workflow status and capture authentic output screenshots from GitHub Actions or the terminal.

## Expected Outcome
- Automatic build and test pipeline, with tests blocking release on failure.
- API unit, MVC, Pact and PostgreSQL integration test coverage.
- Dockerized Spring Boot application and published image after successful checks.
- A reproducible 80:20 canary and tested 100% promotion in a local demo environment.

## Result (fill after execution)
The pipeline should pass the unit/API/contract and Testcontainers checks, build the container and execute canary verification before publication. **Attach real screenshots and observed logs after running it. No execution result is claimed in this template.**

## Learning Outcomes
Learned CI/CD pipeline design, automatic testing, contract compatibility checking, isolated infrastructure testing, Docker packaging and progressive delivery.
