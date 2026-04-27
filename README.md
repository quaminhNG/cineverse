# 🎬 Cineverse — Movie Trailer Web App

A Netflix-inspired movie browsing app built with React 19, powered by the TMDB API. Built to practice real-world data fetching, caching, and authentication patterns.

**[Live Demo](https://cineverse-black-ten.vercel.app)**

---

## ✨ Features

- **Smart Caching** — TanStack Query caches API responses, reducing redundant requests by ~80%
- **Infinite Scroll** — Seamless pagination on search results without page reloads
- **Trailer Playback** — Embedded YouTube player for in-app trailer viewing
- **JWT Authentication** — Access/Refresh Token rotation with Axios Interceptors for silent renewal
- **Route Protection** — ProtectedRoute guards for authenticated-only pages
- **Performance** — Lazy loading per route, Error Boundary, Lighthouse score 96/100 (desktop)

---

## 🛠 Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React 19, Vite, Tailwind CSS |
| Data Fetching | TanStack Query v5, Axios |
| Routing | React Router DOM v6 |
| Auth | JWT (Access/Refresh Token) |
| API | TMDB (The Movie Database) |
| Deployment | Vercel |

---

## 🚀 Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/quaminhNG/cineverse.git
cd cineverse

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Add your TMDB API key: VITE_TMDB_API_KEY=your_key_here

# 4. Start dev server
npm run dev
```

> Get your free TMDB API key at [themoviedb.org](https://www.themoviedb.org/settings/api)

---

## 🔑 Test Account

| Field | Value |
|---|---|
| Email | admin@cineverse.com |
| Password | admin123 |

> *Note: Auth runs on mock data — no real backend.*

---

*For learning & portfolio purposes only.*
