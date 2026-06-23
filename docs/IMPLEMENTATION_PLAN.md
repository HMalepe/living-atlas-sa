# Implementation Plan — Living Atlas SA

## Current status: Milestone 2 complete

This document is the master engineering plan. All agents must read relevant `/docs` files before editing code.

---

## Phase overview

| Milestone | Focus | Duration (est.) |
|-----------|-------|-----------------|
| M0 | Repository, docs, tooling | ✅ Complete |
| M1 | Auth, core DB, RLS, admin shell | ✅ Complete |
| M2 | Ground map (MapLibre, roads) | ✅ Complete |
| M3 | Road depth (claims, compare) | 2 weeks |
| M4 | Sky foundation | 2 weeks |
| M5 | Constellation learning | 1–2 weeks |
| M6 | Passport, journeys | 1–2 weeks |
| M7 | Community memory | 1 week |
| M8 | Polish, launch | 2 weeks |

---

## Milestone 0 deliverables ✅

- [x] Next.js + TypeScript + Tailwind + shadcn foundation
- [x] Design tokens (Ground / Sky palettes, motion, confidence colours)
- [x] Environment validation with Zod
- [x] Logger and error utilities
- [x] Vitest, Playwright, ESLint, CI
- [x] Supabase folder with extensions/enums migration
- [x] Full documentation suite (18 docs + this plan + ERD)
- [x] Runnable homepage with horizon concept
- [x] Placeholder routes proving IA

---

## Milestone 1 plan (next)

### 1.1 Supabase setup

1. Create Supabase project (production + staging)
2. Apply migrations via CLI
3. Configure `.env.local` with URL, anon key, service role key
4. Add `src/lib/supabase/client.ts`, `server.ts`, `middleware.ts`

### 1.2 Core schema migration

Single migration (or split logically):

- `profiles` (extends `auth.users`)
- `roles`, `permissions`, `user_roles`
- `entities`, `entity_types`
- `claims`, `sources`, `claim_sources`
- `names`, `places`, `timeline_events`
- `media_assets`, `tags`, `entity_tags`
- `editorial_reviews`, `change_history`
- `community_submissions`, `moderation_actions`
- Organisation/plan/entitlement placeholders

### 1.3 RLS policies

- Public read: `published` entities only
- Authenticated: own profile, own submissions, own passport data
- Role-based write: researcher+ for entities, editor+ for publish, moderator for community

### 1.4 Auth UI

- Sign up / sign in pages
- Profile creation trigger
- Protected `/admin` layout with role gate

### 1.5 Seed scripts

- Entity types enum rows
- Role definitions
- `development_sample` tier markers
- No fake historical claims

### 1.6 Tests

- RLS policy tests against local Supabase
- Auth flow e2e
- Role permission unit tests

---

## Milestone 2–8 summary

See [`ROADMAP.md`](./ROADMAP.md) for full checklist.

Key technical decisions deferred to their milestones:

| Decision | Milestone | Options considered |
|----------|-----------|-------------------|
| Map tile provider | M2 | OpenFreeMap, MapTiler free tier, self-hosted |
| Road geometry source | M2 | OSM extract (Johannesburg bbox), manual digitisation for MVP roads |
| Sky calculation library | M4 | `astronomy-engine`, `suncalc`, custom ephemeris adapter |
| Sky renderer | M4 | Canvas 2D adapter first; Stellarium Web later |
| Search engine | M2/3 | PostgreSQL full-text + trigram; Typesense later if needed |

---

## Folder structure (final)

```
living-atlas-sa/
├── .github/workflows/ci.yml
├── docs/                          # All product + engineering docs
├── public/
├── scripts/
│   └── verify-migrations.mjs
├── src/
│   ├── app/                       # Routes only — thin wrappers
│   │   ├── (auth)/
│   │   ├── (public)/
│   │   ├── admin/
│   │   ├── ground/
│   │   ├── sky/
│   │   ├── journeys/
│   │   └── ...
│   ├── components/
│   │   ├── ui/                    # shadcn
│   │   ├── layout/
│   │   └── home/
│   ├── features/                  # Feature modules
│   │   ├── ground/
│   │   ├── sky/
│   │   ├── journeys/
│   │   ├── passport/
│   │   ├── search/
│   │   ├── contribute/
│   │   ├── admin/
│   │   └── auth/
│   ├── domain/                    # Types, enums — no React
│   ├── repositories/              # Supabase data access
│   ├── services/                  # Business logic
│   ├── hooks/
│   └── lib/
├── supabase/
│   ├── migrations/
│   ├── seed/
│   └── config.toml
├── tests/e2e/
├── .env.example
├── components.json
├── vitest.config.ts
├── playwright.config.ts
└── package.json
```

---

## Environment variables

| Variable | Required | Milestone |
|----------|----------|-----------|
| `NEXT_PUBLIC_APP_URL` | Yes (defaults to localhost) | M0 |
| `NEXT_PUBLIC_SUPABASE_URL` | For data features | M1 |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | For data features | M1 |
| `SUPABASE_SERVICE_ROLE_KEY` | Server only | M1 |

---

## Risks and mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Invented seed data | Trust destruction | Tiered seeds; unknown markers; editorial review |
| Map performance | Poor mobile UX | Bbox queries, zoom simplification, lazy load |
| RLS complexity | Security holes | Integration tests per policy; defence in depth |
| Scope creep | Delayed MVP | Strict MVP_SCOPE; milestone gates |
| Cultural sensitivity | Harm to communities | Permission model; community review step |
| Astronomical accuracy | Credibility loss | Deterministic tests; catalogue refs |

---

## Definition of done per milestone

After each milestone:

1. `npm run verify` passes
2. `npm run verify:migrations` passes
3. Documentation updated
4. CHANGELOG updated
5. Summary: complete, incomplete, risky

**Do not begin Milestone 2 until M1 checks are coherent.**

M1 is coherent. **Proceed to Milestone 3.**
