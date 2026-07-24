import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, ImageOff, ImagesIcon, Clock } from "lucide-react";
import EventTypeBadge from "@/components/EventTypeBadge";
import { CompletedEvent, getEventRoute } from "@/data/completedEvents";

interface GalleryEventCardProps {
  event: CompletedEvent;
}

export default function GalleryEventCard({ event }: GalleryEventCardProps) {
  const detailRoute = getEventRoute(event);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative w-full overflow-hidden rounded-[1.75rem] glass shadow-lg transition-all duration-500 hover:shadow-glow hover:-translate-y-1.5 flex flex-col"
    >
      <div className="relative h-48 w-full overflow-hidden bg-white/30">
        {event.image ? (
          <img
            src={event.image}
            alt={event.name}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-teal-100 to-cyan-100">
            <ImageOff size={28} className="text-teal-400/50" />
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

      <div className="p-5 flex flex-col gap-3 flex-1">
        <div>
          <h3 className="text-lg font-black text-foreground mb-1 tracking-tight line-clamp-2">
            {event.name}
          </h3>
          <p className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
            <Calendar size={12} />
            {event.date ?? "Date not recorded"}
          </p>
        </div>

        <div className="mt-auto flex items-center gap-2 pt-2">
          <Link
            to={detailRoute}
            className="flex-1 text-center px-3 py-2 rounded-full text-xs font-bold text-foreground/70 bg-white/50 hover:bg-white/80 border border-white/60 transition-colors no-underline"
          >
            Event Details
          </Link>

          {event.driveLink ? (
            <a
              href={event.driveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-full text-xs font-bold text-white bg-gradient-to-r from-teal-500 to-cyan-500 hover:shadow-md transition-all no-underline"
            >
              <ImagesIcon size={13} />
              View Photos
            </a>
          ) : (
            <span
              title="Photo album link will be added soon"
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-full text-xs font-bold text-muted-foreground/60 bg-white/30 border border-white/40 cursor-not-allowed"
            >
              <Clock size={13} />
              Coming Soon
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
