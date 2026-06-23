# Accessibility — Living Atlas SA

## Target

WCAG 2.2 Level AA where practical.

## Requirements

### Perceivable

- Sufficient colour contrast (4.5:1 body text, 3:1 large text)
- Confidence badges use colour + icon + text (not colour alone)
- Text alternatives for maps, diagrams, and intersection anatomy
- Captions and transcripts for audio content
- Adjustable text size (respect browser zoom; no `max-zoom` blocking)

### Operable

- Full keyboard navigation for all interactive features
- Visible focus states (`:focus-visible` ring — implemented in globals.css)
- Reduced motion support (`prefers-reduced-motion` — homepage hero)
- No interaction-heavy driving mode; passenger/parked modes
- Touch targets ≥ 44×44px on mobile

### Understandable

- Simple-language summaries with expert detail on demand
- Consistent navigation across Ground and Sky
- Error messages explain what happened and how to recover

### Robust

- Semantic HTML landmarks (`header`, `main`, `nav`, `footer`)
- ARIA labels on map and sky canvas controls
- Screen reader announcements for discovery events

## Map and sky accessibility

- Map is **not** the only way to access information — every map feature has a text/list alternative
- Road and object detail pages work without map interaction
- Constellation tracing offers keyboard alternative path (Milestone 5)
- Live sky lists visible objects even if canvas unavailable

## Language expansion

Architecture supports `locale` and `content_translations` tables (Milestone 8+). MVP in English with South African English conventions.

## Testing

- Automated: axe-core in Playwright (Milestone 8)
- Manual: screen reader spot checks (NVDA, VoiceOver)
- Keyboard-only navigation test in CI checklist
