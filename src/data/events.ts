export interface FlagshipEvent {
  id: string;
  title: string;
  type: string;
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
    type: "Hackathon",
    year: "2026",
    desc: "A 24-hour national level hackathon where innovation meets execution. Solve real-world problems and win massive prizes.",
    link: "https://www.acesvce.in/",
    gradient: "from-teal-400 to-cyan-300",
    image: "/hackerrupt.webp",
  },
];
