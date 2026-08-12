import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { assetUrl } from "@/lib/assetUrl";

export interface MasterBeforeYouCompeteCardProps {
  title: string;
  description: string;
  poster: string;
  date: string;
  time: string;
  mode: string;
  badge?: string;
  href: string;
}

const MasterBeforeYouCompeteCard: React.FC<MasterBeforeYouCompeteCardProps> = ({
  title,
  description,
  poster,
  date,
  time,
  mode,
  badge,
  href,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="group relative h-[380px] w-full cursor-pointer"
    >
      <Link
        to={href}
        className="relative h-full w-full overflow-hidden rounded-[1.75rem] glass shadow-lg transition-all duration-500 group-hover:shadow-glow group-hover:-translate-y-1.5 flex flex-col no-underline block"
      >
        {/* Top Graphic Area */}
        <div className="relative h-[52%] w-full overflow-hidden bg-white/20">
          <img
            src={assetUrl(poster)}
            alt={title}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-fuchsia-500 opacity-10 mix-blend-multiply transition-opacity duration-500" />

          {/* Type Badge */}
          {badge && (
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 backdrop-blur-md shadow-sm text-xs font-bold text-muted-foreground tracking-wider">
                <Sparkles size={13} className="text-primary" />
                {badge}
              </span>
            </div>
          )}

          {/* Year Badge */}
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 rounded-full bg-white/80 backdrop-blur-md shadow-sm text-xs font-bold text-muted-foreground tracking-wider">
              2026
            </span>
          </div>
        </div>

        {/* Content Area */}
        <div className="relative h-[48%] p-5 md:p-6 flex flex-col justify-between">
          <div>
            <span className="text-purple-600 dark:text-purple-400 font-bold text-[10px] tracking-widest uppercase mb-1 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
              Event Concluded
            </span>
            <h3 className="text-xl md:text-2xl font-black text-foreground mb-1.5 tracking-tight group-hover:text-purple-600 transition-colors duration-300 line-clamp-2">
              {title}
            </h3>
            <p className="text-muted-foreground text-sm font-medium leading-relaxed line-clamp-2">
              {description}
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
      </Link>
    </motion.div>
  );
};

export default React.memo(MasterBeforeYouCompeteCard);
