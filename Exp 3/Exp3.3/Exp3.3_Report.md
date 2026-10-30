# Experiment 3.3 — Full-Stack Integration & Capstone

**Combined experiments:** 3.3.1 and 3.3.2  
**COs mapped:** CO5–BT5 and CO6–BT6

## Aim
To integrate a React frontend and a Spring Boot backend to implement a full-stack social media management capstone with authentication, role-based collaboration, post scheduling, asynchronous Kafka processing, analytics, API documentation and automated build/test pipelines.

## Objectives
1. Connect the React + Redux Toolkit user interface to secure REST APIs.
2. Develop JWT registration/login and role-based workspace management (Admin, Editor, Viewer).
3. Build post composer, scheduling calendar and analytics dashboards.
4. Process due scheduled events asynchronously using Apache Kafka, with idempotent handling and a retry/DLT configuration.
5. Use PostgreSQL for data storage, Swagger UI for API documentation, and Docker for local deployment.
6. Automate tests/build and publish container images using GitHub Actions, aiming for >=80% tested business-service coverage.

## Software requirements
Java JDK 17+, Maven, Node.js 22+, npm, React, Redux Toolkit, Spring Boot, Spring Security, PostgreSQL, Kafka, Docker / Docker Compose, JUnit 5, Mockito, GitHub Actions.

## Theory
In full-stack integration, React captures user actions and sends authenticated REST requests to a Spring Boot service, which enforces authorization, persists data in PostgreSQL, and returns JSON for the UI. JWT bearer tokens authenticate requests while membership roles restrict access to a workspace. A scheduled job selects due posts and enqueues events to Kafka; a consumer updates demo publishing status asynchronously. Duplicate Kafka messages are handled idempotently using event IDs and persisted post state. Analytics show workspace post counts grouped by status and platform. GitHub Actions can run tests and publish versioned builds or container images after checks pass.

## Implementation / procedure
1. Launch PostgreSQL, Kafka, Spring Boot API and React UI using `docker compose up --build -d` from this `Exp3.3` folder.
2. Open `http://localhost:3000`, create an account, and sign in.
3. Create another account in another browser session; from the original Admin account, add it to the workspace as Editor or Viewer.
4. Create a draft with the Composer. Verify it is listed in Overview.
5. Create a post scheduled at least five seconds ahead; inspect Calendar, then observe the Kafka-based demo status after its scheduled time.
6. Inspect Analytics and verify that counts change as posts progress through statuses.
7. Open `http://localhost:8080/swagger-ui.html` for documented APIs.
8. From `backend`, run `mvn clean verify` (needs Docker for PostgreSQL Testcontainers test). Review `target/site/jacoco/index.html`.
9. From `frontend`, run `npm install`, `npm test`, `npm run build`.
10. Commit this `Exp3.3` directory and the root workflow file to GitHub, then review the Actions results and published images in GitHub Packages.

## Expected results (to be verified during execution)
- Registration and login yield valid JWTs, and read/write endpoints enforce workspace membership.
- Editors can create and schedule posts while Viewers are read-only.
- Kafka consumes scheduled events and transitions post status to `PUBLISHED` in **demo mode only**.
- Dashboard, calendar and analytics update using real backend data.
- JUnit tests and front-end tests pass, and the CI workflow enforces >=80% JaCoCo **line coverage of `PostService`** (not the entire codebase).
- GHCR images publish on successful push to the `main` branch if Actions permissions allow it.

## Result / conclusion
A modular demonstration of a social media management capstone is implemented in source code. Execution, measured coverage, Docker deployment and CI results must be verified by running the project; no test output screenshots or release results are claimed here.

## Important scope and limitations
- **No real Instagram / LinkedIn / X API publishing:** statuses are a teaching simulation.
- **Analytics are internal post counts, not social reach/engagement.**
- JWT secret and local database credentials in the sample are **development-only**.
- The GitHub Action builds/tests and publishes images to GHCR; it **does not deploy to a live server** without an actual hosting target and credentials.
- For production, add email verification/invitations, rate limiting, refresh-token strategy, secret management, durable outbox pattern, DB migrations, monitoring, a live deployment target and genuine platform API adapters.

## Screenshots to capture (real runs only)
1. Login/Register screen
2. Overview with posts
3. Scheduled post in Calendar
4. Analytics counts and Team roles
5. Kafka consumer logs from `docker compose logs -f backend`
6. Swagger UI
7. GitHub Actions successful run and JaCoCo report
