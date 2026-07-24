import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { flagshipEvents } from "@/data/events";
import { academicYears, getEventsForYear, getSearchableEvents, filterEvents } from "@/data/completedEvents";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CompletedEventCard from "@/components/CompletedEventCard";
import EventFilterBar from "@/components/EventFilterBar";
import EventTypeBadge from "@/components/EventTypeBadge";
import Seo from "@/components/Seo";
import BackgroundGlow from "@/components/BackgroundGlow";
import Footer from "@/components/Footer";

const orderedYears = [...academicYears].reverse();

export default function EventsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const yearParam = searchParams.get("year");
  const activeYear = yearParam && orderedYears.includes(yearParam) ? yearParam : orderedYears[0];

  const [query, setQuery] = useState("");
  const [type, setType] = useState<string | null>(null);
  const [month, setMonth] = useState<string | null>(null);

  const isSearching = query.trim() !== "" || type !== null || month !== null;

  const searchResults = useMemo(
    () => filterEvents(getSearchableEvents(), { query, type, month }),
    [query, type, month],
  );

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
        description="Explore ACE's flagship events and browse our full archive of past hackathons, symposiums, workshops, and technical events."
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
            Our Legacy
          </span>
          <h2 className="text-5xl md:text-6xl font-bold mb-4 text-foreground">
            Flagship Events
          </h2>
          <div className="w-32 h-2 bg-teal-400 mx-auto rounded-full shadow-glow" />
        </motion.div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {flagshipEvents.map((event) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group relative h-[520px] w-full cursor-pointer perspective-1000"
            >
              <a
                href={event.link}
                target="_blank"
                rel="noopener noreferrer"
                className="relative h-full w-full overflow-hidden rounded-[2.5rem] glass shadow-xl transition-all duration-500 group-hover:shadow-glow-lg group-hover:-translate-y-2 flex flex-col no-underline block"
              >
                {/* Top Graphic Area */}
                <div className="relative h-[55%] w-full overflow-hidden bg-white/20">
                  <img
                    src={event.image}
                    alt={event.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${event.gradient} opacity-10 mix-blend-multiply transition-opacity duration-500`} />

                  {/* Type Badge */}
                  <div className="absolute top-6 left-6 z-10">
                    <EventTypeBadge type={event.type} />
                  </div>

                  {/* Year Badge */}
                  <div className="absolute top-6 right-6 z-10">
                    <span className="px-4 py-2 rounded-full bg-white/80 backdrop-blur-md shadow-sm text-xs font-bold text-muted-foreground tracking-wider flex items-center gap-2">
                      {event.year} <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                    </span>
                  </div>
                </div>

                {/* Content Area */}
                <div className="relative h-[45%] p-8 md:p-10 flex flex-col justify-between">
                  <div>
                    <span className="text-primary font-bold text-xs tracking-widest uppercase mb-2 block">
                      Flagship Event {event.id}
                    </span>
                    <h3 className="text-3xl md:text-4xl font-black text-foreground mb-3 tracking-tight group-hover:text-teal-600 transition-colors duration-300">
                      {event.title}
                    </h3>
                    <p className="text-muted-foreground font-medium leading-relaxed line-clamp-3">
                      {event.desc}
                    </p>
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 text-foreground font-bold group/btn">
                      <span className="relative">
                        Explore Event
                        <span className="absolute left-0 bottom-0 w-full h-[2px] bg-primary transform scale-x-0 transition-transform duration-300 group-hover/btn:scale-x-100 origin-left"></span>
                      </span>
                    </span>

                    <div className="w-12 h-12 rounded-full bg-white/60 border border-white flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-300 shadow-sm">
                      <ArrowUpRight size={20} className="text-muted-foreground group-hover:text-white transition-colors" />
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
        />

        {isSearching ? (
          <div>
            <p className="text-center text-sm font-semibold text-muted-foreground mb-8">
              {searchResults.length} result{searchResults.length === 1 ? "" : "s"} across all years
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
          <Tabs value={activeYear} onValueChange={handleYearChange} className="w-full">
            <div className="flex justify-center mb-12">
              <TabsList className="glass h-auto p-1.5 rounded-full flex-wrap justify-center gap-1 bg-white/40">
                {orderedYears.map((yr) => (
                  <TabsTrigger
                    key={yr}
                    value={yr}
                    className="rounded-full px-5 py-2.5 text-sm font-bold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm"
                  >
                    {yr}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {orderedYears.map((yr) => {
              const yearEvents = getEventsForYear(yr);
              return (
                <TabsContent key={yr} value={yr} className="mt-0">
                  {yearEvents.length > 0 ? (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                      {yearEvents.map((event) => (
                        <CompletedEventCard key={event.slug} event={event} />
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-muted-foreground py-12">
                      No events recorded for this year yet.
                    </p>
                  )}
                </TabsContent>
              );
            })}
          </Tabs>
        )}
      </section>

      <Footer />
    </div>
  );
}
