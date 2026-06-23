# Living Atlas SA

**Point anywhere. Understand what you are seeing, why it exists, what it was called, how it connects, and what people believed about it.**

Living Atlas SA is an interactive learning platform that transforms South Africa's roads, skies, places, histories, languages, infrastructure, and community memories into an explorable digital universe.

## Status

**Milestone 1 complete** — auth, core database schema, RLS, admin portal.

## Supabase setup

1. Create a project at [supabase.com](https://supabase.com)
2. Copy `.env.example` → `.env.local` and add your keys
3. Install the [Supabase CLI](https://supabase.com/docs/guides/cli) and run:

```bash
supabase link --project-ref YOUR_PROJECT_REF
supabase db push
```

4. Seed runs automatically on `supabase db reset`, or apply `supabase/seed.sql` manually

To grant admin access, assign the `researcher` role (or above) in the `user_roles` table.

## Quick start

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript strict check |
| `npm run test` | Vitest unit tests |
| `npm run test:e2e` | Playwright end-to-end tests |
| `npm run verify` | Full verification pipeline |
| `npm run verify:migrations` | Migration file conventions |

First-time e2e setup: `npx playwright install chromium`

## Documentation

All product, architecture, and editorial documentation lives in [`/docs`](./docs/). Start with:

- [`docs/IMPLEMENTATION_PLAN.md`](./docs/IMPLEMENTATION_PLAN.md)
- [`docs/TECHNICAL_ARCHITECTURE.md`](./docs/TECHNICAL_ARCHITECTURE.md)
- [`docs/MVP_SCOPE.md`](./docs/MVP_SCOPE.md)

## Technology

- Next.js (App Router) · TypeScript · Tailwind CSS · shadcn/ui
- Supabase · PostgreSQL · PostGIS
- MapLibre GL JS (Milestone 2+)
- Vitest · Playwright · GitHub Actions CI

## License

Private — founding repository.
