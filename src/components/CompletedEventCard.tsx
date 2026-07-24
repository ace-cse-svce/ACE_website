import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ImageOff } from "lucide-react";
import EventTypeBadge from "@/components/EventTypeBadge";
import { CompletedEvent, isInterruptSymposiumEvent, getEventRoute } from "@/data/completedEvents";

interface CompletedEventCardProps {
  event: CompletedEvent;
}

export default function CompletedEventCard({ event }: CompletedEventCardProps) {
  const isSymposium = isInterruptSymposiumEvent(event);
  const to = getEventRoute(event);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative h-[380px] w-full cursor-pointer"
    >
      <Link
        to={to}
        className="relative h-full w-full overflow-hidden rounded-[1.75rem] glass shadow-lg transition-all duration-500 group-hover:shadow-glow group-hover:-translate-y-1.5 flex flex-col no-underline block"
      >
        <div className="relative h-[52%] w-full overflow-hidden bg-white/30">
          {event.image ? (
            <img
              src={event.image}
              alt={event.name}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-teal-100 to-cyan-100">
              <ImageOff size={32} className="text-teal-400/50" />
            </div>
          )}

          <div className="absolute top-4 left-4">
            <EventTypeBadge type={event.type} />
          </div>
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 rounded-full bg-white/80 backdrop-blur-md shadow-sm text-xs font-bold text-muted-foreground tracking-wider">
              {event.year}
            </span>
          </div>
        </div>

        <div className="relative h-[48%] p-5 md:p-6 flex flex-col justify-between">
          <div>
            {isSymposium && (
              <span className="text-primary font-bold text-[10px] tracking-widest uppercase mb-1 block">
                National Level Symposium
              </span>
            )}
            <h3 className="text-xl md:text-2xl font-black text-foreground mb-1.5 tracking-tight group-hover:text-teal-600 transition-colors duration-300 line-clamp-2">
              {event.name}
            </h3>
            <p className="text-muted-foreground text-sm font-medium leading-relaxed line-clamp-2">
              {event.description}
            </p>
          </div>

          <div className="pt-3 flex items-center justify-between">
            <span className="text-xs font-bold text-foreground/70">
              {isSymposium ? "View events" : "View details"}
            </span>
            <div className="w-9 h-9 rounded-full bg-white/60 border border-white flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-300 shadow-sm">
              <ArrowRight size={16} className="text-muted-foreground group-hover:text-white transition-colors" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
