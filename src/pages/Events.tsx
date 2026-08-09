import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { flagshipEvents } from "@/data/events";
import { assetUrl } from "@/lib/assetUrl";
import { academicYears, getEventsForYear, getSearchableEvents, filterEvents } from "@/data/completedEvents";
import CompletedEventCard from "@/components/CompletedEventCard";
import EventFilterBar from "@/components/EventFilterBar";
import EventTypeBadge from "@/components/EventTypeBadge";
import YearPager from "@/components/YearPager";
import Seo from "@/components/Seo";
import BackgroundGlow from "@/components/BackgroundGlow";
import MasterBeforeYouCompeteCard from "@/components/events/MasterBeforeYouCompeteCard";

const orderedYears = [...academicYears].reverse();

export default function EventsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const yearParam = searchParams.get("year");
  const activeYear = yearParam && orderedYears.includes(yearParam) ? yearParam : orderedYears[0];

  const [query, setQuery] = useState("");
  const [type, setType] = useState<string | null>(null);
  const [month, setMonth] = useState<string | null>(null);
  const [yearFilter, setYearFilter] = useState<string | null>(null);

  const isSearching = query.trim() !== "" || type !== null || month !== null || yearFilter !== null;

  const searchResults = useMemo(
    () => filterEvents(getSearchableEvents(), { query, type, month, academicYear: yearFilter }),
    [query, type, month, yearFilter],
  );

  const activeYearEvents = useMemo(() => getEventsForYear(activeYear), [activeYear]);

  const handleYearChange = (yr: string) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("year", yr);
      return next;
    }, { replace: true });
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden gradient-page font-sans">
      <Seo
        title="Events"
        description="Explore ACE's upcoming events and browse our full archive of past hackathons, symposiums, workshops, and technical events."
      />

      {/* Global Background Glows */}
      <BackgroundGlow fixed />

      <section className="relative py-24 px-6 max-w-7xl mx-auto z-10 pt-32">

        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-primary font-extrabold tracking-[0.2em] uppercase text-sm mb-3 block">
            What's Next
          </span>
          <h2 className="text-5xl md:text-6xl font-bold mb-4 text-foreground">
            Upcoming Events
          </h2>
          <div className="w-32 h-2 bg-teal-400 mx-auto rounded-full shadow-glow" />
        </motion.div>

        {/* Events Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <MasterBeforeYouCompeteCard
            title="Prompt Forge"
            description="Learn Prompt Engineering and compete in an AI Image Recreation Challenge."
            poster="/Prompt_Forge.jpeg"
            date="12 August 2026"
            time="6:30 PM"
            mode="Online"
            href="/events/master-before-you-compete"
          />
          {flagshipEvents.map((event) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group relative h-[380px] w-full cursor-pointer"
            >
              <a
                href={event.link}
                target="_blank"
                rel="noopener noreferrer"
                className="relative h-full w-full overflow-hidden rounded-[1.75rem] glass shadow-lg transition-all duration-500 group-hover:shadow-glow group-hover:-translate-y-1.5 flex flex-col no-underline block"
              >
                {/* Top Graphic Area */}
                <div className="relative h-[52%] w-full overflow-hidden bg-white/20">
                  <img
                    src={assetUrl(event.image)}
                    alt={event.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${event.gradient} opacity-10 mix-blend-multiply transition-opacity duration-500`} />

                  {/* Type Badge */}
                  <div className="absolute top-4 left-4">
                    <EventTypeBadge type={event.type} />
                  </div>

                  {/* Year Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 rounded-full bg-white/80 backdrop-blur-md shadow-sm text-xs font-bold text-muted-foreground tracking-wider">
                      {event.year}
                    </span>
                  </div>
                </div>

                {/* Content Area */}
                <div className="relative h-[48%] p-5 md:p-6 flex flex-col justify-between">
                  <div>
                    <span className="text-primary font-bold text-[10px] tracking-widest uppercase mb-1 block">
                      Upcoming Event {event.id}
                    </span>
                    <h3 className="text-xl md:text-2xl font-black text-foreground mb-1.5 tracking-tight group-hover:text-teal-600 transition-colors duration-300 line-clamp-2">
                      {event.title}
                    </h3>
                    <p className="text-muted-foreground text-sm font-medium leading-relaxed line-clamp-2">
                      {event.desc}
                    </p>
                  </div>

                  <div className="pt-3 flex items-center justify-between">
                    <span className="text-xs font-bold text-foreground/70">
                      Explore Event
                    </span>

                    <div className="w-9 h-9 rounded-full bg-white/60 border border-white flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-300 shadow-sm">
                      <ArrowUpRight size={16} className="text-muted-foreground group-hover:text-white transition-colors" />
                    </div>
                  </div>
                </div>
              </a>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Completed Events Archive */}
      <section className="relative py-16 px-6 max-w-7xl mx-auto z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-primary font-extrabold tracking-[0.2em] uppercase text-sm mb-3 block">
            Our Journey
          </span>
          <h2 className="text-5xl md:text-6xl font-bold mb-4 text-foreground">
            Completed Events
          </h2>
          <div className="w-32 h-2 bg-teal-400 mx-auto rounded-full shadow-glow mb-6" />
          <p className="text-muted-foreground text-lg font-medium max-w-2xl mx-auto">
            Browse our archive of past hackathons, symposiums, workshops, and technical events by year.
          </p>
        </motion.div>

        <EventFilterBar
          query={query}
          onQueryChange={setQuery}
          type={type}
          onTypeChange={setType}
          month={month}
          onMonthChange={setMonth}
          year={yearFilter}
          onYearChange={setYearFilter}
        />

        {isSearching ? (
          <div>
            <p className="text-center text-sm font-semibold text-muted-foreground mb-8">
              {searchResults.length} result{searchResults.length === 1 ? "" : "s"}
            </p>
            {searchResults.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {searchResults.map((event) => (
                  <CompletedEventCard key={event.slug} event={event} />
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-12">
                No events match your search or filters.
              </p>
            )}
          </div>
        ) : (
          <>
            <YearPager years={orderedYears} activeYear={activeYear} onChange={handleYearChange} />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeYear}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
              >
                {activeYearEvents.length > 0 ? (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {activeYearEvents.map((event) => (
                      <CompletedEventCard key={event.slug} event={event} />
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-12">
                    No events recorded for this year yet.
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
          </>
        )}
      </section>

          </div>
  );
}
