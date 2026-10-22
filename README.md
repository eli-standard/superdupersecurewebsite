# Super ultra secure notes app

## Layout

```text
my-react-router-app/   # React Router frontend (Acme Notes UI)
backend/               # Express API
docker-compose.yml     # Compose with env leaks
.github/workflows/     # CI workflow with env leaks
```

## Frontend → backend

The UI talks to `http://localhost:3001/api`:

- `GET /api/health`
- `GET|POST /api/notes` (expects auth)
- `POST /api/auth/login`
- `POST /api/webhooks/stripe|github`

Client code lives in `my-react-router-app/app/lib/api.ts`.

## Where secrets were planted 

| Area | Examples |
|------|----------|
| `backend/.env` | DB URL, JWT secret, Stripe, AWS, GitHub PAT, SendGrid | should get skipped over but there will be a warning since it is not in gitignore
| `backend/.env.example` | Placeholders / redacted values | should get skipped over
| `backend/src/config/secrets.js` | Hardcoded AWS, Slack, Stripe, SendGrid, GitHub |
| `backend/src/db.js` | Postgres connection string with password |
| `backend/src/middleware/auth.js` | JWT signing secret, bearer token, admin password |
| `backend/src/routes/webhooks.js` | Stripe / GitHub webhook secrets |
| `backend/Dockerfile` | `ENV` credentials |
| `docker-compose.yml` | Service `environment` passwords and keys |
| `.github/workflows/deploy.yml` | CI `env:` tokens and keys |
| `my-react-router-app/.env` | `VITE_*` client keys |
| `my-react-router-app/app/lib/config.ts` | Hardcoded API / Stripe / analytics keys |
| `my-react-router-app/app/lib/auth.ts` | Staging JWT leftover in comments + code |

## This does not actually run it's just for the scanner to test on 