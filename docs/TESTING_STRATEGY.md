# Testing Strategy — Living Atlas SA

## Test pyramid

```
        E2E (Playwright)
       /                \
  Integration (API, RLS)
 /                        \
Unit (Vitest + RTL)
```

## Tools

| Tool | Scope |
|------|-------|
| Vitest | Unit and component tests |
| React Testing Library | Component behaviour |
| Playwright | End-to-end flows |
| ESLint | Static analysis |
| `tsc --noEmit` | Type safety |
| `verify:migrations` | Migration conventions |

## CI pipeline

On every push/PR to `main` and `develop`:

1. `npm ci`
2. `npm run lint`
3. `npm run typecheck`
4. `npm run test`
5. `npm run verify:migrations`
6. `npm run build`
7. `npm run test:e2e` (Chromium)

## Required test coverage by milestone

### Milestone 0 (current)

- [x] Environment parsing
- [x] Error utilities
- [x] Homepage e2e smoke
- [x] Migration verification script

### Milestone 1

- Authentication flows
- RLS policy tests (Supabase local)
- Role permission matrix
- Profile creation on signup

### Milestone 2

- Road search (fuzzy, former names)
- Map selection state
- Geometry bounding-box queries
- Preview card rendering

### Milestone 3

- Claim-source rendering
- Confidence label display
- Road relationship rendering
- Compare mode

### Milestone 4

- Sky calculations (deterministic test dates)
- Timezone correctness (Africa/Johannesburg)
- Moon phase display
- Location-denied behaviour

### Milestone 5

- Constellation tracing state machine
- Quiz scoring

### Milestone 6

- Passport progress
- Journey completion
- Discovery logging

### Milestone 7

- Community submission moderation
- Consent validation

### Milestone 8

- Full accessibility audit
- Mobile navigation
- Keyboard navigation
- Performance budget checks

## Conventions

- Co-locate unit tests: `*.test.ts` next to source
- E2E tests in `tests/e2e/`
- Deterministic dates for astronomical tests: `2025-06-21T20:00:00+02:00` (winter solstice evening, SAST)
- No snapshot tests for dynamic map/sky canvases
- Mock Supabase in unit tests; use local Supabase for RLS integration tests

## Seed data in tests

Use `development_sample` tier only. Never assert sample data as verified facts.
