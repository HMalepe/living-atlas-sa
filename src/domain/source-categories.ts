/** Source categories — mirror database / editorial taxonomy. */

export const SOURCE_CATEGORIES = [
  "government_gazette",
  "municipal_minutes",
  "engineering_report",
  "historical_map",
  "archival_record",
  "academic_source",
  "book",
  "newspaper",
  "oral_history",
  "community_submission",
  "official_dataset",
  "astronomical_catalogue",
  "research_paper",
  "institutional_website",
] as const;

export type SourceCategory = (typeof SOURCE_CATEGORIES)[number];

const LABELS: Record<SourceCategory, string> = {
  government_gazette: "Government gazette",
  municipal_minutes: "Municipal minutes",
  engineering_report: "Engineering report",
  historical_map: "Historical map",
  archival_record: "Archival record",
  academic_source: "Academic source",
  book: "Book",
  newspaper: "Newspaper",
  oral_history: "Oral history",
  community_submission: "Community submission",
  official_dataset: "Official dataset",
  astronomical_catalogue: "Astronomical catalogue",
  research_paper: "Research paper",
  institutional_website: "Institutional website",
};

export function sourceCategoryLabel(category: SourceCategory): string {
  return LABELS[category];
}
