# Database ERD — Living Atlas SA

Initial entity-relationship diagram for the shared core and domain modules. Full DDL arrives in Milestone 1 migrations.

## High-level modules

```mermaid
erDiagram
    profiles ||--o{ user_roles : has
    roles ||--o{ user_roles : assigned
    roles ||--o{ role_permissions : grants
    permissions ||--o{ role_permissions : includes

    entities ||--o{ claims : described_by
    entities ||--o{ entity_relationships : source
    entities ||--o{ entity_relationships : target
    entities ||--o{ names : called
    entities ||--o{ entity_tags : tagged
    entities ||--o{ timeline_events : experiences
    entity_types ||--o{ entities : classifies

    claims ||--o{ claim_sources : supported_by
    sources ||--o{ claim_sources : cites
    claims ||--o{ editorial_reviews : reviewed

    roads ||--|| entities : is_a
    roads ||--o{ road_segments : composed_of
    roads ||--o{ road_geometries : shaped_by
    roads ||--o{ road_names : named
    roads ||--o{ road_relationships : relates
  road_intersections ||--o{ road_intersections : contains

    celestial_objects ||--|| entities : is_a
    celestial_objects ||--o{ sky_names : called
    constellations ||--o{ constellation_stars : includes
    stars ||--o{ constellation_stars : member
    constellations ||--o{ constellation_lines : drawn

    journeys ||--o{ journey_stops : contains
    journey_stops }o--|| entities : references
    user_discoveries }o--|| profiles : earned_by
    user_discoveries }o--|| entities : about
```

## Shared core (detail)

```mermaid
erDiagram
    entities {
        uuid id PK
        uuid entity_type_id FK
        text slug UK
        publication_status status
        seed_data_tier seed_tier
        timestamptz created_at
        timestamptz updated_at
        timestamptz deleted_at
    }

    claims {
        uuid id PK
        uuid entity_id FK
        text statement
        confidence_level confidence
        publication_status status
        text field_key
        date earliest_date
        date latest_date
        boolean ai_generated
        timestamptz created_at
    }

    sources {
        uuid id PK
        source_category category
        text title
        text author
        date publication_date
        text url
        text archive_ref
        confidence_level quality
        timestamptz created_at
    }

    claim_sources {
        uuid claim_id FK
        uuid source_id FK
        text page_section
        text excerpt
    }

    names {
        uuid id PK
        uuid entity_id FK
        text name
        text language
        date valid_from
        date valid_to
        boolean is_preferred
        confidence_level confidence
    }

    entity_relationships {
        uuid id PK
        uuid source_entity_id FK
        uuid target_entity_id FK
        text relationship_type
        text notes
        confidence_level confidence
    }
```

## Road domain (detail)

```mermaid
erDiagram
    roads {
        uuid id PK
        uuid entity_id FK
        text primary_route_number
        numeric total_length_km
    }

    road_segments {
        uuid id PK
        uuid road_id FK
        int segment_order
        text direction
        geometry centerline
        numeric length_km
    }

    road_geometries {
        uuid id PK
        uuid road_id FK
        uuid segment_id FK
        geometry geom
        int simplify_tolerance
    }

    road_intersections {
        uuid id PK
        uuid entity_id FK
        geometry point
        text local_nickname
    }

    road_relationships {
        uuid id PK
        uuid road_a_id FK
        uuid road_b_id FK
        text relationship_type
        geometry overlap_geom
        text explanation_claim_id
    }

    road_construction_phases {
        uuid id PK
        uuid road_id FK
        text phase_name
        date earliest_date
        date latest_date
        text contractor
    }

    road_cost_records {
        uuid id PK
        uuid road_id FK
        numeric amount
        text currency
        int price_year
        uuid source_id FK
        confidence_level confidence
    }
```

## Sky domain (detail)

```mermaid
erDiagram
    celestial_objects {
        uuid id PK
        uuid entity_id FK
        uuid object_type_id FK
        text designation
        numeric ra_hours
        numeric dec_degrees
        numeric magnitude
    }

    constellations {
        uuid id PK
        uuid celestial_object_id FK
        text iau_abbreviation
    }

    constellation_stars {
        uuid constellation_id FK
        uuid star_id FK
        int anchor_order
        boolean is_anchor
    }

    constellation_lines {
        uuid id PK
        uuid constellation_id FK
        uuid star_a_id FK
        uuid star_b_id FK
    }

    cultural_sky_traditions {
        uuid id PK
        uuid entity_id FK
        text tradition_name
        text community
        text permission_status
        text display_restrictions
    }

    sky_events {
        uuid id PK
        uuid entity_id FK
        timestamptz event_time
        text event_type
        geometry visibility_footprint
    }
```

## Gamification (detail)

```mermaid
erDiagram
    journeys {
        uuid id PK
        uuid entity_id FK
        text slug UK
        text title
        boolean supports_passenger_mode
    }

    journey_stops {
        uuid id PK
        uuid journey_id FK
        uuid entity_id FK
        int stop_order
        text stop_type
    }

    user_discoveries {
        uuid id PK
        uuid user_id FK
        uuid entity_id FK
        timestamptz discovered_at
        text discovery_type
        int xp_earned
    }

    user_saved_entities {
        uuid user_id FK
        uuid entity_id FK
        timestamptz saved_at
    }
```

## Relationship types (road)

```
intersects, runs_parallel_to, merges_with, splits_from, continues_as,
formerly_continued_as, shares_alignment_with, feeds_into, provides_relief_for,
replaced, was_replaced_by, crosses_over, passes_under, follows_old_boundary,
follows_watercourse, follows_ridge, connects_place, divides_place
```

## Indexes (planned)

- GIST on all geometry columns
- Trigram GIN on `names.name`, `roads.primary_route_number`
- Full-text on `claims.statement`, entity search vectors
- Composite: `(entity_id, status)` on claims
- `(user_id, entity_id)` unique on `user_saved_entities`

## Migration file plan

| File | Contents |
|------|----------|
| `20250623000000_extensions_and_enums.sql` | ✅ PostGIS, enums |
| `20250624000000_shared_core.sql` | M1: entities, claims, sources, names |
| `20250624000001_auth_roles_rls.sql` | M1: profiles, roles, RLS |
| `20250625000000_road_domain.sql` | M2: roads, segments, geometries |
| `20250626000000_sky_domain.sql` | M4: celestial objects, constellations |
| `20250627000000_gamification.sql` | M6: journeys, discoveries |
| `20250628000000_business_placeholders.sql` | M1: orgs, plans, entitlements |
