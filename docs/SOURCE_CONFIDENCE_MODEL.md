# Source and Confidence Model — Living Atlas SA

## Principle

Every important factual statement is a **claim**. Claims link to **sources** with a **confidence level** and **review status**.

## Confidence levels

| Level | Meaning | UI treatment |
|-------|---------|--------------|
| `verified_official` | Government gazette, official dataset, signed engineering record | Green badge, "Official record" |
| `strongly_supported` | Multiple independent reputable sources agree | Badge + source count |
| `supported` | Credible single source | Standard citation |
| `reported` | Reported but not independently verified | "Reported" label |
| `community_memory` | Community submission, not independently verified | Distinct memory styling |
| `oral_history` | Recorded oral account | Audio icon, attribution |
| `disputed` | Competing evidence exists | Show both sides |
| `unverified` | Candidate information awaiting review | Hidden from public until reviewed |
| `unknown` | Research has not established this | Explicit unknown marker |

## Source categories

```
government_gazette, municipal_minutes, engineering_report, historical_map,
archival_record, academic_source, book, newspaper, oral_history,
community_submission, official_dataset, astronomical_catalogue,
research_paper, institutional_website
```

## Claim structure

```typescript
interface Claim {
  id: string;
  entityId: string;
  statement: string;
  confidence: ConfidenceLevel;
  status: PublicationStatus;
  fieldKey?: string;        // e.g. "construction.start_date"
  earliestDate?: string;
  latestDate?: string;
  sources: ClaimSource[];
  competingClaimIds?: string[];
  aiGenerated: boolean;
  aiReviewStatus?: string;
}
```

## UI rules

1. Never flatten confidence levels into one paragraph
2. Official documentation ≠ historical interpretation ≠ community memory ≠ folklore
3. Disputed claims show link to competing claims
4. Unknown fields render: "Research has not yet established this."
5. Source panel shows: type, date, author/authority, page/section, URL/archive ref

## AI provenance

AI-assisted drafts stored with `ai_generated = true` and `ai_review_status`. Never auto-published.
