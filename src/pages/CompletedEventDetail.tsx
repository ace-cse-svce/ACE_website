import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, MapPin, Users, Award, Gift, ListChecks } from "lucide-react";
import { getEventBySlug } from "@/data/completedEvents";
import EventTypeBadge from "@/components/EventTypeBadge";
import Seo from "@/components/Seo";
import BackgroundGlow from "@/components/BackgroundGlow";
import Footer from "@/components/Footer";

export default function CompletedEventDetail() {
  const { slug } = useParams<{ slug: string }>();
  const event = slug ? getEventBySlug(slug) : undefined;

  if (!event) {
    return <Navigate to="/events" replace />;
  }

  const backTo = event.isInterruptSubEvent && event.interruptYear
    ? `/events/interrupt/${event.interruptYear.replace("'", "")}`
    : `/events?year=${event.academicYear}`;
  const backLabel = event.isInterruptSubEvent
    ? `Back to Interrupt ${event.interruptYear}`
    : "Back to Events";

  return (
    <div className="relative min-h-screen w-full overflow-hidden gradient-page font-sans">
      <Seo
        title={event.name}
        description={event.description}
      />
      <BackgroundGlow fixed />

      <section className="relative py-24 px-6 max-w-5xl mx-auto z-10 pt-32">
        <Link
          to={backTo}
          className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors mb-8 no-underline"
        >
          <ArrowLeft size={16} />
          {backLabel}
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-[2.5rem] overflow-hidden glass shadow-xl"
        >
          {event.image && (
            <div className="relative h-[280px] md:h-[420px] w-full overflow-hidden bg-white/20">
              <img
                src={event.image}
                alt={event.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-8 md:p-12">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <EventTypeBadge type={event.type} />
              <span className="px-3 py-1 rounded-full bg-white/80 backdrop-blur-md shadow-sm text-xs font-bold text-muted-foreground tracking-wider">
                {event.year}
              </span>
              <span className="px-3 py-1 rounded-full bg-teal-400/10 text-teal-600 text-xs font-bold tracking-wider">
                Completed
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-black text-foreground mb-6 tracking-tight">
              {event.name}
            </h1>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-start gap-3">
                <Calendar size={18} className="text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground/70">Date</p>
                  <p className="font-semibold text-foreground">{event.date ?? "Date not recorded"}</p>
                </div>
              </div>
              {event.venue && (
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground/70">Venue</p>
                    <p className="font-semibold text-foreground">{event.venue}</p>
                  </div>
                </div>
              )}
              {event.participants && (
                <div className="flex items-start gap-3">
                  <Users size={18} className="text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground/70">Participation</p>
                    <p className="font-semibold text-foreground">{event.participants}</p>
                  </div>
                </div>
              )}
              {event.prizes && (
                <div className="flex items-start gap-3">
                  <Gift size={18} className="text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground/70">Prizes</p>
                    <p className="font-semibold text-foreground">{event.prizes}</p>
                  </div>
                </div>
              )}
            </div>

            <p className="text-muted-foreground leading-relaxed mb-8 whitespace-pre-line">
              {event.description}
            </p>

            {event.requirements && (
              <div className="mb-8">
                <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-foreground mb-2">
                  <ListChecks size={16} className="text-primary" />
                  Format & Rules
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{event.requirements}</p>
              </div>
            )}

            {event.winners.length > 0 && (
              <div>
                <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-foreground mb-4">
                  <Award size={16} className="text-primary" />
                  Winners
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {event.winners.map((w, i) => (
                    <div
                      key={i}
                      className="rounded-2xl bg-white/50 border border-white/70 p-4"
                    >
                      <p className="text-xs font-bold uppercase tracking-wider text-primary mb-1">
                        {w.position}
                      </p>
                      <p className="font-bold text-foreground">{w.name}</p>
                      {w.detail && (
                        <p className="text-xs text-muted-foreground mt-0.5">{w.detail}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
