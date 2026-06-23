# Changelog — Living Atlas SA

All notable changes to this project are documented here.

Format based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added — Milestone 0

- Next.js 16 App Router project with TypeScript strict mode
- Tailwind CSS 4 with Living Atlas SA design tokens (Ground + Sky palettes)
- shadcn/ui foundation (`Button` component, `components.json`)
- Framer Motion horizon hero on homepage
- Environment validation (`src/lib/env.ts`) with Zod
- Structured logging and `AppError` error handling utilities
- Vitest + React Testing Library unit test setup
- Playwright e2e test setup with homepage smoke tests
- GitHub Actions CI workflow (lint, typecheck, test, migrations, build, e2e)
- Supabase project structure with initial migration (PostGIS, enums)
- Migration verification script
- Complete documentation suite in `/docs`
- Placeholder routes: `/explore`, `/ground`, `/ground/roads`, `/sky`, `/about`, `/methodology`
- README with quick start and script reference

### Decisions

- Package name: `living-atlas-sa` (npm lowercase requirement)
- Supabase optional at M0 — app runs without credentials
- MapLibre deferred to Milestone 2 (not in bundle yet)
- English-first UI; i18n architecture documented for later

## [0.1.0] — 2025-06-23

### Added

- Milestone 0 foundation release
