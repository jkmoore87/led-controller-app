# LED Controller Backend

## Setup
1. Copy `.env.example` to `.env` and set values.
2. `npm install`
3. `npm run dev`

## API Summary
- `POST /api/auth/register` — create user
- `POST /api/auth/login` — get JWT
- `GET /api/health` — health check
- `POST /api/forum` (auth) — create forum post
- `GET /api/forum` (public) — list posts
- `PUT /api/forum/:id` (auth, owner) — update
- `DELETE /api/forum/:id` (auth, owner) — delete
- `GET /api/resources` (auth) — list resources
- `POST /api/resources` (auth) — create resource (for demo)
- `PUT /api/resources/:id` (auth) — update
- `DELETE /api/resources/:id` (auth) — delete
- `POST /api/controller/apply` (auth) — apply LED state (simulated)
- `CRUD /api/controller/presets` (auth) — manage user presets
