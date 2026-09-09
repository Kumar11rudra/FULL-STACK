# Experiment 2.3 - JWT, RBAC, Encryption, and Token Lifecycle

Implements Experiment 2.3.1 and 2.3.2 using Spring Security, JWT access/refresh tokens, method-level RBAC, AES-GCM encryption, and encrypted OAuth credential storage.

## Live output
https://exp23-tan.vercel.app/

## Run

```bash
mvn spring-boot:run
```

Seed accounts: `admin / Admin@123` (ADMIN) and `user / User@123` (USER). For production, set `JWT_SECRET` and `APP_ENCRYPTION_KEY` to Base64-encoded 32-byte secrets; do not use the development defaults.

## API

- `POST /api/auth/login` - returns a 15-minute access token and a 7-day refresh token.
- `POST /api/auth/refresh` - validates and rotates the refresh token.
- `GET /api/user/profile` - authenticated USER or ADMIN.
- `GET /api/admin/audit` - ADMIN only, enforced with `@PreAuthorize`.
- `POST /api/user/credentials` - encrypts OAuth access/refresh credentials with AES-GCM before storage.

Use `Authorization: Bearer <access-token>` for protected endpoints.
