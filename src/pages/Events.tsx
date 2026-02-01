import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const flagshipEvents = [
  {
    id: "01",
    title: "Hackerrupt '26",
    year: "2026",
    desc: "A 24-hour national level hackathon where innovation meets execution. Solve real-world problems and win massive prizes.",
    link: "https://www.acesvce.in/",
    gradient: "from-teal-400 to-cyan-300",
    image: "/hackerrupt.png"
  },
  {
    id: "02",
    title: "Interrupt '25",
    year: "2025",
    desc: "The flagship technical symposium featuring coding contests, workshops, and paper presentations from the best minds.",
    link: "https://ace-interrupt.netlify.app/",
    gradient: "from-cyan-400 to-teal-300",
    image: "/interrupt25.png"
  }
];

export default function EventsPage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden gradient-page font-sans">

      {/* Global Background Glows */}
      <div className="fixed top-[-10%] right-[-10%] w-[60%] h-[60%] bg-teal-400/10 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="fixed bottom-[-5%] left-[-5%] w-[50%] h-[50%] bg-teal-400/5 blur-[100px] rounded-full pointer-events-none z-0" />

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
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${event.gradient} opacity-10 mix-blend-multiply transition-opacity duration-500`} />

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

      {/* FOOTER */}
      <footer className="py-10 text-center text-sm text-muted-foreground border-t border-border/50 bg-white/20 backdrop-blur-md relative z-10">
        © 2025 Association Of Computer Engineers. All rights reserved.
      </footer>
    </div>
  );
}
