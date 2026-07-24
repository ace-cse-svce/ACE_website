import {
  Trophy,
  Presentation,
  Wrench,
  Cpu,
  Mic,
  Swords,
  Sparkles,
  HelpCircle,
  Video,
  Tag,
  type LucideIcon,
} from "lucide-react";

const TYPE_ICONS: Record<string, LucideIcon> = {
  Hackathon: Trophy,
  Symposium: Presentation,
  Workshop: Wrench,
  "Technical Event": Cpu,
  "Guest Lecture": Mic,
  Competition: Swords,
  "Cultural Event": Sparkles,
  Quiz: HelpCircle,
  Webinar: Video,
  Other: Tag,
};

interface EventTypeBadgeProps {
  type: string;
  className?: string;
}

export default function EventTypeBadge({ type, className = "" }: EventTypeBadgeProps) {
  const Icon = TYPE_ICONS[type] ?? Tag;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 backdrop-blur-md shadow-sm text-xs font-bold text-muted-foreground tracking-wider ${className}`}
    >
      <Icon size={13} className="text-primary" />
      {type}
    </span>
  );
}
