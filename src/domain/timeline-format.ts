import type { DatePrecision } from "@/domain/road-detail";

export function formatTimelineDate(event: {
  earliestDate?: string;
  latestDate?: string;
  datePrecision: DatePrecision;
}): string {
  if (event.datePrecision === "unknown" || !event.earliestDate) {
    return "Date not established";
  }

  if (event.datePrecision === "year_range" && event.latestDate) {
    return `${event.earliestDate}–${event.latestDate}`;
  }

  if (event.datePrecision === "circa") {
    return `c. ${event.earliestDate}`;
  }

  return event.earliestDate;
}
