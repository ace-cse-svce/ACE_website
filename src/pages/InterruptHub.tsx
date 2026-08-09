import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, MapPin, Users } from "lucide-react";
import { getInterruptSymposium, getInterruptSubEvents } from "@/data/completedEvents";
import { assetUrl } from "@/lib/assetUrl";
import CompletedEventCard from "@/components/CompletedEventCard";
import EventTypeBadge from "@/components/EventTypeBadge";
import Seo from "@/components/Seo";
import BackgroundGlow from "@/components/BackgroundGlow";

export default function InterruptHub() {
  const { year } = useParams<{ year: string }>();
  const symposium = year ? getInterruptSymposium(year) : undefined;
  const subEvents = year ? getInterruptSubEvents(year) : [];

  if (!symposium) {
    return <Navigate to="/events" replace />;
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden gradient-page font-sans">
      <Seo
        title={symposium.name}
        description={symposium.description}
      />
      <BackgroundGlow fixed />

      <section className="relative py-24 px-6 max-w-7xl mx-auto z-10 pt-32">
        <Link
          to={`/events?year=${symposium.academicYear}`}
          className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors mb-8 no-underline"
        >
          <ArrowLeft size={16} />
          Back to Events
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-[2.5rem] overflow-hidden glass shadow-xl mb-16"
        >
          {symposium.image && (
            <div className="relative h-[240px] md:h-[360px] w-full overflow-hidden bg-white/20">
              <img
                src={assetUrl(symposium.image)}
                alt={symposium.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          )}
          <div className="p-8 md:p-12">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <EventTypeBadge type={symposium.type} />
              <span className="px-3 py-1 rounded-full bg-white/80 backdrop-blur-md shadow-sm text-xs font-bold text-muted-foreground tracking-wider">
                {symposium.year}
              </span>
              <span className="px-3 py-1 rounded-full bg-teal-400/10 text-teal-600 text-xs font-bold tracking-wider">
                Completed
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-foreground mb-6 tracking-tight">
              {symposium.name}
            </h1>
            <div className="grid sm:grid-cols-3 gap-4 mb-6">
              <div className="flex items-start gap-3">
                <Calendar size={18} className="text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground/70">Date</p>
                  <p className="font-semibold text-foreground">{symposium.date ?? "Date not recorded"}</p>
                </div>
              </div>
              {symposium.venue && (
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground/70">Venue</p>
                    <p className="font-semibold text-foreground">{symposium.venue}</p>
                  </div>
                </div>
              )}
              {symposium.participants && (
                <div className="flex items-start gap-3">
                  <Users size={18} className="text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground/70">Participation</p>
                    <p className="font-semibold text-foreground">{symposium.participants}</p>
                  </div>
                </div>
              )}
            </div>
            <p className="text-muted-foreground leading-relaxed">{symposium.description}</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-primary font-extrabold tracking-[0.2em] uppercase text-sm mb-3 block">
            {subEvents.length} Events
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Events at {symposium.name}
          </h2>
          <div className="w-24 h-2 bg-teal-400 mx-auto rounded-full shadow-glow mt-4" />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {subEvents.map((event) => (
            <CompletedEventCard key={event.slug} event={event} />
          ))}
        </div>
      </section>

          </div>
  );
}
