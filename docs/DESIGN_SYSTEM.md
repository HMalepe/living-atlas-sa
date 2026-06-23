# Design System — Living Atlas SA

## Visual atmosphere

Premium, exploratory, cinematic, intelligent, African, contemporary, calm.

**Avoid:** safari clichés, random tribal patterns, loud flag colours, generic "Africa tech" stereotypes.

## Dual visual language

### Ground mode

| Token | Value | Use |
|-------|-------|-----|
| `--ground-stone` | `#c4b5a0` | Warm backgrounds |
| `--ground-asphalt` | `#2a2a28` | Text, roads |
| `--ground-mineral` | `#6b6b66` | Muted text |
| `--ground-sand` | `#d4c4a8` | Page background |
| `--ground-rust` | `#a65d3f` | Ground accent |
| `--ground-vegetation` | `#2d4a3e` | Map vegetation |
| `--ground-survey-line` | `#8a8578` | Grid, survey lines |

### Sky mode

| Token | Value | Use |
|-------|-------|-----|
| `--sky-midnight` | `#0b0f1a` | Deep background |
| `--sky-atmosphere` | `#121a2e` | Surface |
| `--sky-lunar` | `#d8dce8` | Secondary text |
| `--sky-starlight` | `#f5f0e6` | Primary text |
| `--sky-violet` | `#4a3f6b` | Gradient depth |
| `--sky-constellation` | `#6b8cce` | Sky accent, lines |

Tokens are defined in `src/app/globals.css`.

## Typography

- **Sans:** Geist Sans (UI, body)
- **Mono:** Geist Mono (coordinates, catalogue refs)
- Headings: semibold, tight tracking
- Body: relaxed line height for long-form research content

## Components

Built on shadcn/ui (New York style) with Lucide icons. Custom variants:

- `Button` variants: `ground`, `sky`, `outline`, `ghost`
- Confidence badges (colour + icon, not colour alone)
- Source citation cards
- Timeline scrubber (Milestone 3)
- Horizon transition wrapper

## Motion

- Purposeful only — clarifies relationships
- Selected roads glow; related roads fade in
- Constellation lines trace; do not pop
- `prefers-reduced-motion`: disable transforms (implemented on homepage hero)
- No confetti for serious historical content

## Confidence badge colours

| Level | Token |
|-------|-------|
| Verified official | `--confidence-verified` |
| Strongly supported | `--confidence-supported` |
| Supported / reported | `--confidence-reported` |
| Community / oral | `--confidence-community` |
| Disputed | `--confidence-disputed` |
| Unknown | `--confidence-unknown` |

Always pair colour with text label and icon.

## Responsive breakpoints

Mobile-first. Map and sky views full-bleed on mobile; side panels on desktop.

## Horizon transition

Shared animation between Ground ↔ Sky module switches. Duration: `--motion-duration-slow` (600ms) unless reduced motion.
