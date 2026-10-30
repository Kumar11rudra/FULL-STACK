# Exp3.2 — CI + CD | FULL-STACK repository

**Combines Experiment 3.2.1 and Experiment 3.2.2** in one Java 17 Spring Boot project. CO6 — BT6.

## What is implemented
| Part | File(s) |
|---|---|
| JUnit 5 unit tests | `src/test/java/com/example/exp32/GreetingServiceTest.java` |
| MockMvc API test | `src/test/java/com/example/exp32/GreetingControllerWebMvcTest.java` |
| Pact contract — consumer + provider | `GreetingConsumerPactTest.java`, `GreetingProviderPactTest.java`, `src/test/resources/pacts/` |
| Testcontainers (PostgreSQL) integration | `NoteRepositoryIT.java` |
| Docker | `Dockerfile` |
| 80:20 canary + 100% promotion | `deploy/canary/` |
| CI + registry publish | Repo root `.github/workflows/exp3-2-ci-cd.yml` |
| Lab report | `Exp3.2_Report.md` |

## Important repository layout
Copy/upload **both** these locations to the existing `FULL-STACK` repository (main branch):

```text
FULL-STACK/
├── .github/workflows/exp3-2-ci-cd.yml   <-- workflow MUST be at repo root
└── Exp 3/Exp3.2/                        <-- this entire Java project
    ├── pom.xml
    ├── Dockerfile
    ├── README.md
    ├── Exp3.2_Report.md
    ├── deploy/canary/
    └── src/
```

**If only the `Exp3.2` folder is uploaded, GitHub Actions will NOT run.** Add the workflow file separately at repository root (use GitHub's **Add file → Create new file**, path `.github/workflows/exp3-2-ci-cd.yml`, and paste the supplied file).

## Prerequisites
JDK 17+, Maven, Docker Desktop/Engine with Compose, GitHub Actions enabled.

## Run locally
From `Exp 3/Exp3.2/`:

```bash
mvn clean test                 # Unit + MockMvc + Pact tests (no Docker needed)
mvn clean verify               # Also runs PostgreSQL Testcontainers (Docker needed)
mvn spring-boot:run            # Local API at http://localhost:8080
```

Example API call: `curl http://localhost:8080/api/greetings/Ada` => `{"message":"Hello, Ada"}`.

## Docker + canary

```bash
docker build -t exp3-2:candidate -t exp3-2:stable .
bash deploy/canary/run-canary.sh
```

The script launches `stable`, `canary` and an Nginx gateway, tests 80:20 weighted traffic, promotes the new service to 100%, checks promotion and shuts down containers. For a real previous version, tag the previous image `exp3-2:stable` instead. The script requires Bash, curl and Docker Compose. It binds gateway only to `127.0.0.1:8088`.

## GitHub Actions flow
- **Push/PR changing `Exp 3/Exp3.2/` or the workflow**: CI runs `mvn clean verify` (including Testcontainers).
- **On push to main only, and after CI succeeds**: CD builds a candidate Docker image, runs a runner-local demo canary, verifies promotion, then pushes `sha-<commit>` and `latest` tags to GitHub Container Registry `ghcr.io/<owner>/full-stack-exp3-2`.
- Publishing uses the built-in `GITHUB_TOKEN` with `packages: write` and does not require a Docker Hub account.
- GitHub-hosted runner is **temporary**: this demonstrates deployment and release promotion, but does **not** keep a production application online. To do permanent deployment, adapt the workflow to a persistent VM/Kubernetes cluster.

## Evidence for lab submission
After the workflow actually runs, capture screenshots of:
1. The Actions tab showing green CI test and CD jobs.
2. Unit / MVC / Pact and Testcontainers build logs.
3. Docker build output and GHCR image package.
4. Canary smoke-test logs (both routes + 100% promotion).

**Testing status:** Source/YAML/XML can be statically checked before delivery, but Java/Maven/Docker were not executed in the creation environment. Run `mvn clean verify` and confirm the Actions result. Do not submit invented terminal screenshots.
