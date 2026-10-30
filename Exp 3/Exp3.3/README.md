# Experiment 3.3 — Full-Stack Social Media Manager (3.3.1 + 3.3.2)

**GitHub destination:** `Kumar11rudra/FULL-STACK/Exp 3/Exp3.3`  
**Workflow location:** repository root `.github/workflows/exp3-3-ci-cd.yml`.

A working-source educational capstone combining React/Redux, Spring Boot/Security, PostgreSQL, Kafka, Docker and GitHub Actions. **All “publishing” is simulated**: it marks a post as published in the application's own database, not on an actual social network. Nothing about platform credentials, follower metrics or real deployments is faked.

## Features

| Area | Included | Notes |
|---|---|---|
| Frontend | React 19 + Redux Toolkit + Vite | Login, Overview, Composer, Calendar, Analytics, Team |
| Backend | Spring Boot 3.5 (JDK 17), REST | Workspace-scoped API |
| Security | JWT bearer access tokens, BCrypt | Admin/Editor/Viewer roles, authorization checks |
| Collaboration | Team membership | Admin can add a user **already registered** in the app |
| Data | PostgreSQL | Account, workspace, member, post, processed event |
| Scheduling | `@Scheduled` + Kafka | Scans due posts every 10 sec; requeues stale events |
| Reliability | Idempotency, retry, DLT | One Kafka consumer group; duplicate events tracked |
| Analytics | Workspace counts | No external platform engagement metrics |
| Docs | Swagger UI | `http://localhost:8080/swagger-ui.html` |
| Tests | JUnit 5, Mockito, MockMvc, Testcontainers, Vitest | JaCoCo min 80% for `PostService` only |
| CI/CD | GitHub Actions + GHCR | Publishes Docker images; **not** a live production rollout |

## Start using Docker Compose (easiest)

Install Docker Desktop. From **`Exp 3/Exp3.3/`**, run:

```bash
# optional local env file containing a development-only JWT secret
cp .env.example .env
# stronger secret for anything beyond local demo: openssl rand -base64 32

docker compose up --build -d
docker compose ps
docker compose logs -f backend
```

- **React UI**: http://localhost:3000
- **Spring Boot REST API**: http://localhost:8080/api
- **Swagger UI**: http://localhost:8080/swagger-ui.html

For a clean reset that removes the local database volume: `docker compose down -v` (**deletes sample data**).

### Use the app
1. Register `admin@example.com` with a password (at least 8 characters). Registration creates a personal workspace and sets the owner role to **ADMIN**.
2. Sign in. Create a draft or choose a date/time for a scheduled demo post. The schedule must be at least 5 seconds in the future.
3. The backend scans due posts every 10 seconds, queues a Kafka event, and a consumer sets the post's status to **PUBLISHED** after simulated processing.
4. View counts in Analytics and due posts in Calendar.
5. Open another private window, register `editor@example.com`, then switch to the Admin account and add that email via Team as **EDITOR**. The second user can log in and select the shared workspace. A **VIEWER** can only view.

### Run backend and frontend separately (hot reload)

Start infrastructure from the `Exp3.3` directory:

```bash
docker compose up -d db kafka
cd backend
mvn spring-boot:run
```

Then open a **new terminal**:

```bash
cd 'Exp 3/Exp3.3/frontend'  # if starting from the repository root
npm install
npm run dev
```

Visit http://localhost:5173; frontend uses http://localhost:8080/api by default in development. The `frontend/.env.example` documents the optional override.

## API overview

| Method | Endpoint | Access |
|---|---|---|
| POST | `/api/auth/register` | Public |
| POST | `/api/auth/login` | Public |
| GET | `/api/workspaces` | Authenticated |
| GET | `/api/workspaces/{id}/members` | Workspace Viewer+ |
| POST | `/api/workspaces/{id}/members` | Workspace Admin |
| GET | `/api/workspaces/{id}/posts` | Workspace Viewer+ |
| POST | `/api/workspaces/{id}/posts` | Workspace Editor+ |
| POST | `/api/workspaces/{id}/posts/{postId}/publish` | Workspace Editor+ |
| DELETE | `/api/workspaces/{id}/posts/{postId}` | Workspace Editor+ (draft/scheduled only) |
| GET | `/api/workspaces/{id}/analytics` | Workspace Viewer+ |

Use `Authorization: Bearer <token>` for protected endpoints. `requests.http` contains manual API request examples.

## Testing and coverage

```bash
cd backend
mvn clean verify
# Open backend/target/site/jacoco/index.html
```

Unit tests cover role checks, post workflows, deduplication, and a MockMvc route. PostgreSQL Testcontainers integration test runs **when Docker is available**, otherwise Testcontainers may skip it. The Maven JaCoCo `check` rule enforces **at least 80% LINE coverage for the `PostService` class**, the core business service. It **does not** guarantee that 80% of every line across this project is covered.

```bash
cd frontend
npm install
npm test
npm run build
```

## GitHub upload to the *existing* FULL-STACK repository

Archive layout is designed to merge into the **repository root**:

```text
FULL-STACK/
├── Exp 3/
│   ├── Exp3.1/           # existing work — leave untouched
│   ├── Exp3.2/           # existing work — leave untouched
│   └── Exp3.3/           # add this complete folder
│       ├── README.md
│       ├── Exp3.3_Report.md
│       ├── compose.yaml
│       ├── backend/       # Spring Boot application
│       └── frontend/      # React application
└── .github/
    └── workflows/
        └── exp3-3-ci-cd.yml
```

**Recommended local Git commands (from a clone of FULL-STACK)**:

```bash
# Unzip the supplied archive elsewhere, then merge its two top-level folders
# ("Exp 3" and ".github") into the repository root.
git add 'Exp 3/Exp3.3' .github/workflows/exp3-3-ci-cd.yml
git commit -m "Add Exp3.3 full-stack social media capstone"
git push origin main
```

**Browser-only GitHub upload:** Upload files from `Exp3.3` under `Exp 3/Exp3.3/`, and separately upload `.github/workflows/exp3-3-ci-cd.yml` at the repository root. GitHub may not preserve folder structure when dragging directories in all browser versions; verify each uploaded path before committing.

## GitHub Actions pipeline

Workflow `.github/workflows/exp3-3-ci-cd.yml` triggers on changes in this experiment on `main` or a pull request. It does:
1. Backend JUnit + MockMvc + JaCoCo `mvn clean verify`.
2. Frontend Vitest + Vite production build.
3. On successful **push to `main`**, publishes API and UI Docker images to `ghcr.io/<owner>/<repository>/exp33-api:latest` and `.../exp33-web:latest`, using GitHub's `GITHUB_TOKEN` if Packages write is permitted.

**This is an automated image release, not deployment to a live host.** A real production destination (Render/AWS/etc.), service credentials and a deployment job must be added for true continuous deployment.

## Limitations / production checklist

This is an academic capstone source project, not a security-audited live SaaS. To ship publicly: replace demo API publisher with genuine OAuth platform connectors; use an outbox for reliable DB/Kafka atomicity; configure secret rotation, HTTPS, account verification, rate limiting, cookie/token hardening, DB migrations, observability, IaC, backups, and a hosting deployment. For shared environments, **do not use the development DB password or JWT secret** provided in Compose.

**Version references:** [Spring Boot 3.5.16](https://spring.io/blog/2026/06/25/spring-boot-3-5-16-available-now/), [Spring Security JWT](https://docs.spring.io/spring-security/reference/servlet/oauth2/resource-server/jwt.html), [springdoc for Boot 3](https://springdoc.org/v2/).
