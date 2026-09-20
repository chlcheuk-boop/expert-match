/** Domain model for the Expert Match request history. */

export const INDUSTRIES = [
  "Restaurants & QSR",
  "Consumer Products",
  "Software & Technology",
  "Healthcare",
  "Financial Services",
  "Retail",
  "Media & Entertainment",
  "Manufacturing",
  "Real Estate",
  "Other",
] as const;

export type Industry = (typeof INDUSTRIES)[number];

export const REQUEST_STATUSES = [
  "Requested",
  "Matching",
  "Scheduled",
  "Completed",
  "Cancelled",
] as const;

export type RequestStatus = (typeof REQUEST_STATUSES)[number];

export const EXPERT_LEVELS = [
  "Founder / CEO",
  "C-Suite",
  "Senior Executive",
  "Director / Senior Leader",
  "Industry Professional",
] as const;

export type ExpertLevel = (typeof EXPERT_LEVELS)[number];

export const DATE_RANGES = [
  "Any time",
  "Past 30 days",
  "Past 3 months",
  "Past 6 months",
  "Past year",
] as const;

export type DateRange = (typeof DATE_RANGES)[number];

export interface Expert {
  id: string;
  name: string;
  /** Current or most relevant title, e.g. "Founder & CEO". */
  title: string;
  company: string;
  level: ExpertLevel;
  /** Hourly consultation rate in whole US dollars. */
  hourlyRate: number;
  /** One-line credibility summary shown in the request drawer. */
  background: string;
}

export interface ExpertRequest {
  id: string;
  title: string;
  description: string;
  /** The user's original, longer-form request. */
  fullRequest: string;
  industry: Industry;
  status: RequestStatus;
  expert: Expert;
  /** ISO date of the consultation, or of the request when not yet scheduled. */
  date: string;
  /** Consultation length in minutes, when a call is scheduled or completed. */
  durationMinutes?: number;
  tags: string[];
  notes?: string;
  /** Prompts prepared ahead of an upcoming call. */
  suggestedQuestions?: string[];
}

export interface RequestFilterState {
  query: string;
  industry: Industry | null;
  status: RequestStatus | null;
  level: ExpertLevel | null;
  dateRange: DateRange;
}

export const EMPTY_FILTERS: RequestFilterState = {
  query: "",
  industry: null,
  status: null,
  level: null,
  dateRange: "Any time",
};
