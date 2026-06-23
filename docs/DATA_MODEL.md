# Data Model — Living Atlas SA

## Core concept

A connected knowledge graph expressed through relational data. The central unit is not an unstructured article — it is **entities** linked by **relationships**, described by **claims** backed by **sources**.

## Entity-relationship overview

See [`DATABASE_ERD.md`](./DATABASE_ERD.md) for the full diagram.

## Shared core tables

| Table | Purpose |
|-------|---------|
| `profiles` | User profile extending Supabase auth |
| `roles` / `permissions` | RBAC |
| `entities` | Universal entity registry |
| `entity_types` | road, intersection, star, constellation, … |
| `entity_relationships` | Typed graph edges |
| `names` | Current and historical names with temporal scope |
| `name_origins` | Etymology and naming authority |
| `people` / `organisations` | Actors in history |
| `places` | Named geographic places |
| `timeline_events` | Dated events with uncertainty ranges |
| `claims` | Factual statements |
| `sources` | Bibliographic / archival references |
| `claim_sources` | Many-to-many with page/section |
| `media_assets` | Images, audio, documents |
| `tags` / `entity_tags` | Faceted classification |
| `editorial_reviews` | Review workflow |
| `change_history` | Audit trail |
| `community_submissions` | User contributions |
| `moderation_actions` | Moderation log |

## Road domain tables

`roads`, `road_segments`, `route_designations`, `road_names`, `road_geometries`, `road_intersections`, `road_relationships`, `road_construction_phases`, `road_cost_records`, `road_engineering_records`, `road_purpose_records`, `road_communities`, `road_places`, `road_landmarks`, `road_statistics`, `road_observation_points`

## Sky domain tables

`celestial_objects`, `celestial_object_types`, `stars`, `planets`, `moons`, `constellations`, `constellation_stars`, `constellation_lines`, `cultural_sky_traditions`, `sky_names`, `sky_events`, `observation_guides`, `visibility_records`, `astronomical_catalogue_refs`

## Gamification tables

`collections`, `collection_entities`, `journeys`, `journey_stops`, `challenges`, `challenge_steps`, `quiz_questions`, `quiz_options`, `user_discoveries`, `user_challenge_progress`, `user_collection_progress`, `user_observations`, `user_saved_entities`, `user_achievements`

## Schema principles

- UUID primary keys
- `created_at`, `updated_at`, audit fields
- Soft deletion where history matters (`deleted_at`)
- PostGIS `geometry` types for spatial data
- Roads: multiple segments, multiple names, segment-scoped names
- Uncertain dates: `earliest_date`, `latest_date`, `date_precision`
- Costs: currency, nominal amount, price year, source, optional inflation display
- Competing claims supported
- Multiple cultural interpretations without forced universal narrative
- Publication status enum on publishable records
- Source quality levels preserved
- Edit history never overwritten

## Seed data tiers

```text
verified            → production-safe
development_sample  → never shown as historical truth in production
placeholder         → explicitly incomplete
```

## Migration strategy

One migration per logical change, committed to `supabase/migrations/`. Milestone 0: extensions and enums. Milestone 1: full shared core + RLS.
