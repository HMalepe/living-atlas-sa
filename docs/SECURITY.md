# Security — Living Atlas SA

## Authentication

- Supabase Auth with email (social providers optional later)
- JWT validated server-side for protected routes
- Session refresh via `@supabase/ssr` middleware

## Authorization

- Role-based access: viewer, contributor, researcher, editor, moderator, administrator
- Row Level Security on all tables from Milestone 1
- Admin routes protected by middleware + server-side role check (defence in depth)

## Secrets

| Secret | Location | Exposure |
|--------|----------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Client + server | Public |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Client + server | Public (RLS protects data) |
| `SUPABASE_SERVICE_ROLE_KEY` | Server only | **Never** in client bundles |

Environment validated in `src/lib/env.ts`.

## Data protection

- Contributor contact info separated from public profile
- Signed URLs for protected media (expiring)
- EXIF stripped from uploaded images
- Precise location not stored by default for observations
- Users can delete observations and location history

## Input validation

- Zod schemas on all form submissions
- Server-side re-validation (never trust client)
- Rate limits on public submissions (Supabase Edge Function or API route — Milestone 7)

## Content safety

- Community submissions require moderation before publication
- No user-generated content without review workflow
- Reporting tools for inappropriate content

## Transport and headers

- HTTPS enforced (Vercel)
- Security headers via `next.config.ts` (Milestone 8): CSP, X-Frame-Options, etc.

## Dependency management

- `npm audit` in CI advisory
- Pin major versions; review updates monthly

## Threat model (MVP)

| Threat | Mitigation |
|--------|------------|
| RLS bypass | Service role server-only; RLS tests in CI |
| XSS via UGC | Sanitise rich text; CSP |
| Secret leak | Env validation; no service key in client |
| Location tracking abuse | Opt-in; no continuous tracking default |
| Fake historical data | Editorial workflow; confidence labels |
