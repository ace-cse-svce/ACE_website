import { Search, X } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { academicYears, getAllEventTypes, getAllMonths } from "@/data/completedEvents";

const ALL_TYPES = getAllEventTypes();
const ALL_MONTHS = getAllMonths();
const ALL_YEARS = [...academicYears].reverse();

interface EventFilterBarProps {
  query: string;
  onQueryChange: (value: string) => void;
  type: string | null;
  onTypeChange: (value: string | null) => void;
  month: string | null;
  onMonthChange: (value: string | null) => void;
  year: string | null;
  onYearChange: (value: string | null) => void;
  searchPlaceholder?: string;
}

export default function EventFilterBar({
  query,
  onQueryChange,
  type,
  onTypeChange,
  month,
  onMonthChange,
  year,
  onYearChange,
  searchPlaceholder = "Search by event name...",
}: EventFilterBarProps) {
  const hasActiveFilters = query.trim() !== "" || type !== null || month !== null || year !== null;

  return (
    <div className="flex flex-col gap-3 mb-10 max-w-4xl mx-auto">
      <div className="relative">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/60" />
        <input
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder={searchPlaceholder}
          className="w-full h-11 pl-10 pr-4 rounded-full glass bg-white/50 border border-white/60 text-sm font-medium placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-shadow"
        />
      </div>

      <div className="flex flex-wrap gap-3 items-center justify-center">
        <Select value={year ?? "all"} onValueChange={(v) => onYearChange(v === "all" ? null : v)}>
          <SelectTrigger className="h-11 w-[140px] rounded-full glass bg-white/50 border-white/60 text-sm font-semibold">
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Years</SelectItem>
            {ALL_YEARS.map((y) => (
              <SelectItem key={y} value={y}>{y}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={type ?? "all"} onValueChange={(v) => onTypeChange(v === "all" ? null : v)}>
          <SelectTrigger className="h-11 w-[170px] rounded-full glass bg-white/50 border-white/60 text-sm font-semibold">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {ALL_TYPES.map((t) => (
              <SelectItem key={t} value={t}>{t}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={month ?? "all"} onValueChange={(v) => onMonthChange(v === "all" ? null : v)}>
          <SelectTrigger className="h-11 w-[150px] rounded-full glass bg-white/50 border-white/60 text-sm font-semibold">
            <SelectValue placeholder="Month" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Months</SelectItem>
            {ALL_MONTHS.map((m) => (
              <SelectItem key={m} value={m}>{m}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        {hasActiveFilters && (
          <button
            onClick={() => {
              onQueryChange("");
              onTypeChange(null);
              onMonthChange(null);
              onYearChange(null);
            }}
            className="h-11 px-4 inline-flex items-center justify-center gap-1.5 rounded-full text-sm font-bold text-muted-foreground hover:text-primary hover:bg-white/40 transition-colors shrink-0"
          >
            <X size={14} />
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
