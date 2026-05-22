# Deployment & Environment Setup Guide — AURA

This guide provides instructions for setting up the environment variables and database configuration for the AURA application on production hosting platforms (e.g., Vercel, Netlify, Railway, Render).

---

## 🔐 Environment Variables

You need to add the following environment variables to your deployment dashboard (e.g. Vercel Project Settings > Environment Variables):

| Variable Name | Description | Recommended Production Value |
| :--- | :--- | :--- |
| `JWT_SECRET` | A secure, random string used to sign and verify authentication tokens. | Generat a high-entropy string (e.g. `openssl rand -hex 32` or a long random password). |
| `JWT_EXPIRES_IN` | Duration for which the authentication token remains valid. | `7d` (7 days) |
| `NEXT_PUBLIC_APP_URL` | The public URL of your deployed website. | E.g., `https://your-aura-website.vercel.app` |

---

## 🗄️ Database Setup & Serverless Platforms

The application is configured to run on **SQLite** using `better-sqlite3` out-of-the-box. It stores data locally in a file named `aura.db`.

### ⚠️ Crucial Serverless Alert (Vercel, Netlify, etc.)
* **Ephemeral Disk:** Serverless hosting platforms run code in stateless, short-lived containers. Any SQLite file (like `aura.db`) created inside these containers is **ephemeral** and will be deleted when the container spins down or restarts.
* **Read-only Filesystem:** On platforms like Vercel, the runtime environment filesystem is read-only except for the `/tmp` directory.
* **Result:** Users registering, adding items to cart, or changing products will lose their data on next redeploy, container restart, or cold start.

### Recommended Production Solutions

#### Option A: Move to Neon (PostgreSQL)
To run a production-ready database that scales to zero and integrates with Vercel seamlessly:
1. Provision a free database on [Neon.tech](https://neon.tech/).
2. Add your PostgreSQL connection URI to your environment variables:
   `DATABASE_URL="postgresql://user:password@ep-name.region.neon.tech/dbname?sslmode=require"`
3. If you decide to transition the codebase to PostgreSQL:
   * A postgres driver (`pg`) is already installed in `package.json`.
   * Update `src/lib/db.ts` to connect to `process.env.DATABASE_URL` using `pg.Pool` or Prisma/Kysely, and update queries to utilize PostgreSQL's syntax (e.g. replace `?` with `$1`, `$2` placeholders, and adjust standard SQLite keywords).

#### Option B: Move to Turso (Serverless SQLite)
If you want to keep SQLite syntax but run it globally:
1. Set up a database on [Turso](https://turso.tech).
2. Install the `@libsql/client` driver.
3. Update `src/lib/db.ts` to use `@libsql/client` instead of `better-sqlite3`. Turso supports remote database hosting, letting you keep SQLite while achieving persistent serverless storage!

---

## 🚀 Pre-build Database Initialization
If you continue using SQLite locally or on a server with persistent disk (like Railway, Render, VPS):
* You must initialize and seed the database before your first deployment.
* Run the following commands in your deploy script or build step:
  ```bash
  npm run db:init
  npm run db:seed
  ```
  This creates the tables and seeds default objects and a demo user (`username: demo`, `password: password123`).
