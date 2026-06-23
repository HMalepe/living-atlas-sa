# Changelog — Living Atlas SA

All notable changes to this project are documented here.

Format based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added — Milestone 3 polish

- Roads map page uses shared site header with Intersections and Compare shortcuts
- Ground and Explore hubs surface intersections and compare mode
- Preview card compare action, footer links, homepage deep links
- Relationship list shows proper road names from catalogue

### Added — Milestone 3

- Road depth data layer: 20 sources, 20 segments, 15 intersections, 20 relationships, 30 timeline events
- Confidence badges, claim display, source citations, timeline scrubber UI
- Enhanced `/ground/roads/[slug]` with anatomy, timeline, relationships, intersections, tiny details
- `/ground/roads/compare` side-by-side compare mode with parallel corridor explanations
- `/ground/intersections` index and `/ground/intersections/[slug]` detail pages
- Migration `20250626000000_road_depth.sql` (road_intersections, road_relationships)
- Unit and e2e tests for road depth features

### Added — Polish pass

- Shared site header, footer, and shell with skip link
- Custom 404, contribute placeholder, sky/live preview page
- Seed tier badges, explore hub redesign, homepage featured roads
- Migrated `middleware.ts` → `proxy.ts` (Next.js 16)
- OpenGraph metadata, smooth scroll, consistent navigation

### Added — Milestone 2

- Road domain migration (roads, segments, geometries, names, search functions)
- MapLibre GL map with OpenFreeMap tiles and Johannesburg bounding box
- Ten MVP roads with placeholder geometries (development_sample tier)
- `/ground/roads` interactive explorer with preview card
- `/ground/roads/[slug]` detail page scaffold
- `/search` and `/api/search` with former-name match explanations
- `/api/ground/roads` bbox-filtered GeoJSON endpoint

### Added — Milestone 1

- Shared core database migration (entities, claims, sources, names, places, timeline, community submissions)
- Auth and RBAC migration with Row Level Security policies
- Profile auto-creation trigger on sign-up with default Viewer role
- Supabase client, server, and middleware integration
- Sign-in and sign-up pages with Zod-validated server actions
- Protected `/admin` research dashboard with role gate (Researcher+)
- Seed data: roles, permissions, entity types, subscription plan placeholders
- Role and permission unit tests; auth e2e tests
- RLS policy test scaffold for local Supabase

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
