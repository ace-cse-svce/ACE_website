import { ChevronLeft, ChevronRight } from "lucide-react";

const WINDOW_SIZE = 2;

interface YearPagerProps {
  /** Years ordered newest-first. */
  years: string[];
  activeYear: string;
  onChange: (year: string) => void;
}

export default function YearPager({ years, activeYear, onChange }: YearPagerProps) {
  const activeIndex = Math.max(0, years.indexOf(activeYear));
  const canGoNewer = activeIndex > 0;
  const canGoOlder = activeIndex < years.length - 1;

  const goNewer = () => canGoNewer && onChange(years[activeIndex - 1]);
  const goOlder = () => canGoOlder && onChange(years[activeIndex + 1]);

  // Window always leads with the active year, so one click on an arrow both
  // shifts the view and switches the selection to that adjacent year.
  const visibleYears = years.slice(activeIndex, activeIndex + WINDOW_SIZE);

  return (
    <div className="flex items-center justify-center gap-3 mb-12">
      <button
        onClick={goNewer}
        disabled={!canGoNewer}
        aria-label="Go to newer year"
        title="Newer year"
        className="w-10 h-10 shrink-0 rounded-full glass bg-white/40 border border-white/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-white/70 transition-all disabled:opacity-30 disabled:pointer-events-none"
      >
        <ChevronLeft size={18} />
      </button>

      <div className="glass h-auto p-1.5 rounded-full flex items-center gap-1 bg-white/40 min-w-[220px] justify-center">
        {visibleYears.map((yr, i) => (
          <button
            key={yr}
            onClick={() => onChange(yr)}
            className={`rounded-full px-5 py-2.5 text-sm font-bold transition-all whitespace-nowrap ${
              yr === activeYear
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-foreground/70 hover:bg-white/60"
            } ${i === 1 ? "hidden sm:inline-flex" : ""}`}
          >
            {yr}
          </button>
        ))}
      </div>

      <button
        onClick={goOlder}
        disabled={!canGoOlder}
        aria-label="Go to older year"
        title="Older year"
        className="w-10 h-10 shrink-0 rounded-full glass bg-white/40 border border-white/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-white/70 transition-all disabled:opacity-30 disabled:pointer-events-none"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
