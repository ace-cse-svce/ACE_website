import y2017 from "./completed/2017-18.json";
import y2018 from "./completed/2018-19.json";
import y2019 from "./completed/2019-20.json";
import y2020 from "./completed/2020-21.json";
import y2021 from "./completed/2021-22.json";
import y2022 from "./completed/2022-23.json";
import y2023 from "./completed/2023-24.json";
import y2024 from "./completed/2024-25.json";

export interface EventWinner {
  position: string;
  name: string;
  detail?: string | null;
}

export interface CompletedEvent {
  slug: string;
  name: string;
  type: string;
  date: string | null;
  year: string;
  venue?: string | null;
  description: string;
  participants?: string | null;
  winners: EventWinner[];
  prizes?: string | null;
  requirements?: string | null;
  academicYear: string;
  isInterruptSubEvent: boolean;
  interruptYear?: string | null;
  image?: string | null;
  /** Google Drive album link for this event's photos. Populated later; null/absent until provided. */
  driveLink?: string | null;
}

interface YearBundle {
  academicYear: string;
  events: CompletedEvent[];
}

const bundles = [y2017, y2018, y2019, y2020, y2021, y2022, y2023, y2024] as YearBundle[];

export const completedEvents: CompletedEvent[] = bundles.flatMap((b) => b.events);

export const academicYears: string[] = bundles.map((b) => b.academicYear);

function interruptSuffixFromName(name: string): string | null {
  const match = name.match(/Interrupt'(\d{2})$/i);
  return match ? match[1] : null;
}

export function getEventsForYear(academicYear: string): CompletedEvent[] {
  return completedEvents.filter(
    (e) => e.academicYear === academicYear && !e.isInterruptSubEvent,
  );
}

export function getInterruptSubEvents(yearSuffix: string): CompletedEvent[] {
  return completedEvents.filter(
    (e) => e.isInterruptSubEvent && e.interruptYear === `'${yearSuffix}`,
  );
}

export function getInterruptSymposium(yearSuffix: string): CompletedEvent | undefined {
  return completedEvents.find(
    (e) => !e.isInterruptSubEvent && interruptSuffixFromName(e.name) === yearSuffix,
  );
}

export function getAllInterruptSymposiums(): CompletedEvent[] {
  return completedEvents.filter(
    (e) => !e.isInterruptSubEvent && interruptSuffixFromName(e.name) !== null,
  );
}

export function getEventBySlug(slug: string): CompletedEvent | undefined {
  return completedEvents.find((e) => e.slug === slug);
}

export function isInterruptSymposiumEvent(e: CompletedEvent): boolean {
  return !e.isInterruptSubEvent && interruptSuffixFromName(e.name) !== null;
}

export function getInterruptYearSuffix(e: CompletedEvent): string | null {
  return interruptSuffixFromName(e.name);
}

/** Route to navigate to for this event: the Interrupt hub for symposium parents, otherwise its own detail page. */
export function getEventRoute(e: CompletedEvent): string {
  if (isInterruptSymposiumEvent(e)) {
    return `/events/interrupt/${getInterruptYearSuffix(e)}`;
  }
  return `/events/completed/${e.slug}`;
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/** Best-effort: the first month name mentioned in a free-text date string, or null if none found/given. */
export function extractMonth(dateStr: string | null): string | null {
  if (!dateStr) return null;
  const match = dateStr.match(
    /January|February|March|April|May|June|July|August|September|October|November|December/i,
  );
  if (!match) return null;
  const found = match[0].toLowerCase();
  return MONTH_NAMES.find((m) => m.toLowerCase() === found) ?? null;
}

export function getAllEventTypes(): string[] {
  return Array.from(new Set(completedEvents.map((e) => e.type))).sort();
}

export function getAllMonths(): string[] {
  const present = new Set(
    completedEvents.map((e) => extractMonth(e.date)).filter((m): m is string => m !== null),
  );
  return MONTH_NAMES.filter((m) => present.has(m));
}

interface EventFilters {
  query?: string;
  type?: string | null;
  month?: string | null;
  academicYear?: string | null;
}

/** Case-insensitive substring match on event name only (not description), plus optional type/month/year filters. */
export function filterEvents(events: CompletedEvent[], filters: EventFilters): CompletedEvent[] {
  const q = filters.query?.trim().toLowerCase() ?? "";
  return events.filter((e) => {
    if (q && !e.name.toLowerCase().includes(q)) return false;
    if (filters.type && e.type !== filters.type) return false;
    if (filters.month && extractMonth(e.date) !== filters.month) return false;
    if (filters.academicYear && e.academicYear !== filters.academicYear) return false;
    return true;
  });
}

/** All events, including Interrupt sub-events — useful for search where a user may look up a sub-event by name directly. */
export function getSearchableEvents(): CompletedEvent[] {
  return completedEvents;
}
