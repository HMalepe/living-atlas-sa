# Information Architecture — Living Atlas SA

## Primary routes

```
/                           Home (horizon, featured discoveries)
/explore                    Module entry hub
/ground                       Ground module home
/ground/roads                 Road index + map
/ground/roads/[slug]          Road detail
/ground/intersections/[slug]  Intersection detail
/sky                          Sky module home
/sky/live                     Live / tonight sky
/sky/objects/[slug]           Celestial object detail
/sky/constellations/[slug]    Constellation + tracing
/journeys                     Journey index
/journeys/[slug]              Journey experience
/passport                     User discoveries and progress
/collections                  Themed collections
/search                       Global search
/contribute                   Community submission
/about                        Product story
/methodology                  Claims and sources explained
/sources                      Source quality guide
/admin                        Protected research portal
```

## Entity page anatomy

### Road page sections

1. Identity (names, route numbers, pronunciation)
2. Spatial anatomy (map, length, municipalities)
3. Origin and purpose
4. Engineering
5. Money (with unknown markers)
6. Human consequences
7. Community memory (clearly labelled)
8. Things You Might Never Notice
9. Relationships and compare
10. Timeline
11. Sources and claims

### Sky object page sections

1. Identity and cultural names
2. Current position (rise, transit, set)
3. Physical characteristics
4. How to identify
5. Scientific history
6. Cultural interpretations (layered)
7. Related objects
8. Sources

## Navigation model

- **Mobile:** bottom tab bar (Explore, Sky, Passport, Search) + contextual back
- **Desktop:** persistent sidebar with module switcher (Ground / Sky / Journeys)
- **Horizon transition:** shared visual language when switching modules

## Search result types

Roads, former names, route numbers, intersections, places, celestial objects, community names, events, journeys — each with match explanation.

## Content states

`draft` → `in_review` → `published` | `disputed` | `archived` | `rejected`

Only `published` content shown to public users unless preview role.

## Cross-linking

- Place pages link Ground + Sky
- Journeys link stops to entity pages
- Claims link to sources
- Relationships link to compare mode
