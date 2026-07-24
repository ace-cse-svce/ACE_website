import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { getSearchableEvents, getEventRoute, CompletedEvent } from "@/data/completedEvents";
import { flagshipEvents } from "@/data/events";

export default function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const events = getSearchableEvents();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const goToEvent = (event: CompletedEvent) => {
    setOpen(false);
    navigate(getEventRoute(event));
  };

  const goToFlagship = (link: string) => {
    setOpen(false);
    window.open(link, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Search events"
        title="Search events (Ctrl+K)"
        className="p-2 text-zinc-700 hover:text-teal-600 hover:bg-white/50 rounded-full transition-colors active:scale-95"
      >
        <Search size={18} />
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search events by name..." />
        <CommandList>
          <CommandEmpty>No events found.</CommandEmpty>
          <CommandGroup heading="Flagship Events">
            {flagshipEvents.map((e) => (
              <CommandItem key={e.title} value={e.title} onSelect={() => goToFlagship(e.link)}>
                <span className="flex-1">{e.title}</span>
                <span className="text-xs text-muted-foreground">{e.year}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Completed Events">
            {events.map((e) => (
              <CommandItem
                key={e.slug}
                value={`${e.name} ${e.academicYear} ${e.type}`}
                onSelect={() => goToEvent(e)}
              >
                <span className="flex-1 truncate">{e.name}</span>
                <span className="text-xs text-muted-foreground shrink-0 ml-2">
                  {e.type} &middot; {e.academicYear}
                </span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
