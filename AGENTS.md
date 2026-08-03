<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Cursor Cloud specific instructions

This is the AURA e-commerce app (Next.js 16 App Router + Turbopack, SQLite via `better-sqlite3`). It lives at `/agent/repos/e-commerce`; run all commands from that directory. Standard scripts (`dev`, `lint`, `build`, `db:init`, `db:seed`) and demo credentials (`demo` / `password123`) are documented in `README.md`.

Non-obvious setup/run caveats:

- A local `.env` is required and is gitignored (there is no `.env.example` despite the README referencing one). Only `JWT_SECRET` and `JWT_EXPIRES_IN` are read in code (`src/lib/auth.ts`); a missing `JWT_SECRET` breaks auth token signing (login/signup). Create `.env` with `JWT_SECRET`, `JWT_EXPIRES_IN=7d`, `NEXT_PUBLIC_APP_URL=http://localhost:3000`.
- `aura.db` is committed and already seeded, so `db:init`/`db:seed` are not needed on a fresh clone. If you ever recreate it, run `npm run db:init` then `npm run db:seed` (both run via `tsx`). Seeding is idempotent (`INSERT OR IGNORE`).
- `npm run dev` serves on port 3000. After placing an order the app redirects to an empty-cart view rather than a dedicated confirmation page — this is existing app behavior; the order still persists and shows under Profile → Acquisition History.
- `npm run lint` currently reports pre-existing errors in `src/lib` (e.g. `no-explicit-any`, `set-state-in-effect`); these are code issues, not environment problems.
