# AURA — Essential Objects

> *A curation of essential objects. Stripped of the unnecessary, built for endurance, and designed for absolute focus.*

AURA is a full-stack minimalist luxury e-commerce platform built around the philosophy of **quiet luxury**. It offers a handpicked collection of essential objects across multiple categories — each selected for quality, endurance, and intentional design. The interface is intentionally understated, letting the products speak for themselves.

---

## ✨ Features

- 🔍 **Real-time search & filtering** — Instant product search with category filters and sort options
- 🛒 **Persistent cart** — Add items and manage your cart with live item count in the header
- 🔐 **Secure authentication** — JWT-based Sign Up / Login with bcrypt password hashing
- 📦 **Order management** — Checkout flow with order confirmation
- 🌙 **Dark / Light mode** — Theme toggle with zero flash on page load
- 📱 **Fully responsive** — Premium mobile navigation with staggered animations and scroll lock
- ⚡ **Performance-first** — Self-hosted fonts via `next/font`, debounced search, optimized SQL queries
- 🎨 **Understated Luxury design** — Champagne gold accents, Playfair Display serifs, cinematic animations

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 + Vanilla CSS |
| Database | SQLite via `better-sqlite3` |
| Auth | JWT (`jsonwebtoken`) + `bcryptjs` |
| Fonts | Inter + Playfair Display via `next/font/google` |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm

### 1. Clone the repository

```bash
git clone https://github.com/Goodnews-code/e-commerce.git
cd e-commerce
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy the example env file and fill in your values:

```bash
cp .env.example .env
```

```env
JWT_SECRET=your-secret-key-here
JWT_EXPIRES_IN=7d
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Initialize and seed the database

```bash
npm run db:init
npm run db:seed
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Default Credentials

After seeding, a demo account is available:

| Field | Value |
|---|---|
| Username | `demo` |
| Password | `password123` |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── api/              # REST API routes (products, auth, orders)
│   ├── cart/             # Cart page
│   ├── checkout/         # Checkout page (auth required)
│   ├── login/            # Login page
│   ├── signup/           # Sign up page
│   ├── profile/          # User profile (auth required)
│   ├── spaces/           # Spaces collection page
│   ├── journal/          # Journal page
│   ├── globals.css       # Global styles & design tokens
│   └── layout.tsx        # Root layout with providers
├── components/
│   ├── Header.tsx        # Responsive navigation header
│   ├── ProductCard.tsx   # Individual product card
│   ├── ProductCatalog.tsx # Product grid with search & filters
│   ├── AuthCheck.tsx     # Route protection wrapper
│   └── ThemeToggle.tsx   # Dark/light mode toggle
├── lib/
│   ├── db.ts             # SQLite database connection & query helper
│   ├── auth.ts           # JWT authentication utilities
│   ├── auth-context.tsx  # React auth context provider
│   ├── cart-context.tsx  # React cart context provider
│   ├── init-db.ts        # Database schema initializer
│   └── seed-db.ts        # Database seeder
└── types/
    └── product.ts        # TypeScript type definitions
```

---

## 📜 Available Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
npm run db:init    # Initialize database schema
npm run db:seed    # Seed database with sample data
```

---

## 🔒 Route Protection

| Route | Access |
|---|---|
| `/`, `/spaces`, `/journal`, `/cart` | Public — no login required |
| `/checkout`, `/profile` | Protected — redirects to `/login` |

---

## 🌐 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions including environment variables, SQLite persistence considerations, and production build steps.

> ⚠️ **Note:** SQLite is ephemeral on serverless platforms (Vercel, Netlify). For persistent production storage, consider migrating to [Turso](https://turso.tech) or [Neon](https://neon.tech) PostgreSQL.

---

## 📄 License

MIT — free to use, modify, and distribute.

---

<p align="center">
  Built with precision. Designed with restraint. &nbsp;·&nbsp; <strong>AURA</strong>
</p>
