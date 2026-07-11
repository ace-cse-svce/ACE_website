export interface FlagshipEvent {
  id: string;
  title: string;
  year: string;
  desc: string;
  link: string;
  gradient: string;
  image: string;
}

export const flagshipEvents: FlagshipEvent[] = [
  {
    id: "01",
    title: "Hackerrupt '26",
    year: "2026",
    desc: "A 24-hour national level hackathon where innovation meets execution. Solve real-world problems and win massive prizes.",
    link: "https://www.acesvce.in/",
    gradient: "from-teal-400 to-cyan-300",
    image: "/hackerrupt.webp",
  },
  {
    id: "02",
    title: "Interrupt '25",
    year: "2025",
    desc: "The flagship technical symposium featuring coding contests, workshops, and paper presentations from the best minds.",
    link: "https://ace-interrupt.netlify.app/",
    gradient: "from-cyan-400 to-teal-300",
    image: "/interrupt25.webp",
  },
];
