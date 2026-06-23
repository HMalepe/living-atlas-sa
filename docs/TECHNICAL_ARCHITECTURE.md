# Technical Architecture — Living Atlas SA

## Stack

| Layer | Technology |
|-------|------------|
| Application | Next.js 16 App Router, React 19, TypeScript strict |
| Styling | Tailwind CSS 4, shadcn/ui, Framer Motion |
| Forms | React Hook Form + Zod |
| Client cache | TanStack Query (where appropriate) |
| Database | Supabase PostgreSQL + PostGIS |
| Auth | Supabase Auth |
| Storage | Supabase Storage (signed URLs) |
| Maps | MapLibre GL JS + GeoJSON (Milestone 2) |
| Sky | Modular renderer adapter (Milestone 4) |
| Testing | Vitest, RTL, Playwright |
| CI | GitHub Actions |
| Deploy | Vercel (app) + Supabase (data) |

## Folder structure

```
src/
├── app/                    # Next.js routes (thin — delegate to features)
├── components/
│   ├── ui/                 # shadcn primitives
│   ├── layout/             # Shell, nav, headers
│   └── home/               # Homepage-specific
├── features/
│   ├── ground/
│   │   ├── roads/
│   │   ├── intersections/
│   │   └── map/
│   ├── sky/
│   │   ├── live/
│   │   ├── objects/
│   │   └── constellations/
│   ├── journeys/
│   ├── passport/
│   ├── search/
│   ├── contribute/
│   ├── admin/
│   └── auth/
├── lib/
│   ├── env.ts              # Validated environment
│   ├── logger.ts           # Structured logging
│   ├── errors.ts           # Error types
│   ├── supabase/           # Client, server, middleware
│   └── utils.ts
├── domain/                 # Shared types and enums (no React)
├── repositories/           # Data access modules
├── services/               # Business logic
└── hooks/                  # Shared React hooks

supabase/
├── migrations/             # Committed SQL migrations
├── seed/                   # Tiered seed data
└── config.toml

tests/
├── e2e/                    # Playwright
└── (unit tests co-located in src/)

docs/                       # Product and engineering docs
scripts/                    # Tooling scripts
```

## Architectural rules

1. **Thin routes** — `app/` pages compose feature components; no business logic in pages.
2. **Typed repositories** — all database access through `repositories/` or server modules.
3. **Server-first secrets** — service role key never in client bundles.
4. **RLS everywhere** — Row Level Security from Milestone 1.
5. **No unbounded queries** — pagination, bounding boxes, zoom-level geometry simplification.
6. **Claim-source model** — UI never flattens confidence levels.
7. **Modular sky adapter** — `SkyRenderer` interface for future Stellarium Web Engine swap.

## Data flow

```
Browser → Next.js route → Server Action / Route Handler
       → Supabase (anon key + user JWT, RLS enforced)
       → Repository → Domain model → UI

Privileged ops → Server-only service role → Repository
```

## Performance budget (targets)

| Metric | Target |
|--------|--------|
| First Contentful Paint | < 1.8s (4G) |
| Main bundle (initial) | < 200 KB gzipped (excl. maps) |
| Map chunk | Lazy-loaded |
| Lighthouse Performance | ≥ 85 mobile |

## External services

| Service | Purpose | Required for M0 |
|---------|---------|-----------------|
| Supabase | DB, Auth, Storage | No (M1) |
| Vercel | Hosting | Deploy only |
| Map tile provider | Base map | M2 (e.g. OpenFreeMap) |

## Error handling

- `AppError` for operational failures
- Structured `logger` with level, message, context
- User-facing error boundaries with retry
- No silent failures or empty catch blocks
