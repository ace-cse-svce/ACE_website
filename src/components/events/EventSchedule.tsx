import React, { useRef } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { Clock, Presentation, Image as ImageIcon, Upload, CheckCircle, LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Clock,
  Presentation,
  Image: ImageIcon,
  Upload,
  CheckCircle,
};

export interface ScheduleItem {
  time: string;
  title: string;
  description: string;
  icon: string;
}

export interface EventScheduleProps {
  schedule: ScheduleItem[];
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

const EventSchedule: React.FC<EventScheduleProps> = ({ schedule }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Calculate the height of the active line based on scroll
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="timeline" className="relative w-full py-32 overflow-hidden">

      <div className="max-w-6xl mx-auto px-6 w-full relative z-10">
        
        {/* Section Header */}
        <motion.div 
          className="flex flex-col items-center text-center mb-28"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="text-[#00F2FE] text-xs font-bold tracking-[0.2em] uppercase mb-5 drop-shadow-[0_0_15px_rgba(0,242,254,0.6)]">
            Event Roadmap
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter">
            A Precision Pulse of the <br className="hidden md:block"/> Experience
          </h2>
        </motion.div>

        {/* Central Kinetic Timeline */}
        <div ref={containerRef} className="relative pb-24">
          
          {/* Central Thread Axis */}
          <div className="absolute left-[24px] md:left-1/2 top-0 bottom-0 w-[2px] bg-[rgba(255,255,255,0.03)] md:-translate-x-1/2 z-0 rounded-full overflow-hidden">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-gradient-to-b from-[#8A2BE2] to-[#00F2FE] drop-shadow-[0_0_20px_rgba(138,43,226,0.8)] rounded-full origin-top"
            />
          </div>

          <div className="space-y-12 md:space-y-24">
            {schedule.map((item, index) => {
              const Icon = iconMap[item.icon] || Clock;
              const isLeft = index % 2 === 0;
              const isFirst = index === 0;

              return (
                <div key={index} className={`relative flex flex-col md:flex-row items-start md:items-center justify-between group ${!isLeft ? 'md:flex-row-reverse' : ''}`}>
                  
                  {/* Empty space for symmetric flex balancing on Desktop */}
                  <div className="hidden md:block w-5/12" />

                  {/* Central Node - Multi-layered Pulse Beacon */}
                  <div className="absolute left-[0px] md:left-1/2 transform md:-translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full bg-[#13131A] border border-[rgba(255,255,255,0.05)] z-10 transition-all duration-500 group-hover:border-[#00F2FE] group-hover:shadow-[0_0_30px_rgba(0,242,254,0.4)] mt-2 md:mt-0 shadow-lg">
                    {/* Glowing Neon Ring Halo */}
                    <div className="absolute inset-[-4px] rounded-full border border-transparent group-hover:border-[#00F2FE]/50 transition-all duration-500" />
                    
                    {/* Inner Pulsing Glow Core */}
                    <div className="absolute inset-2 bg-gradient-to-r from-[#8A2BE2]/40 to-[#00F2FE]/40 rounded-full blur-[4px] opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-500" />
                    
                    <Icon size={20} className="text-[#888] group-hover:text-white transition-colors relative z-10 duration-300 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
                  </div>

                  {/* Content Card */}
                  <motion.div 
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className={`w-full pl-16 md:pl-0 md:w-5/12 ${isLeft ? 'md:pr-12 lg:pr-16 md:text-right' : 'md:pl-12 lg:pl-16 md:text-left'}`}
                  >
                    <motion.div 
                      whileHover={{ y: -5, scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                      className={`relative bg-[#13131A] backdrop-blur-[25px] p-6 lg:p-8 rounded-[24px] border border-[rgba(255,255,255,0.05)] transition-all duration-500 hover:border-[rgba(255,255,255,0.15)] group overflow-hidden ${
                        index === 2 || index === 5 ? 'shadow-[0_0_40px_rgba(138,43,226,0.15)] hover:shadow-[0_20px_80px_rgba(138,43,226,0.4)] border-[rgba(138,43,226,0.1)]' : 'hover:shadow-[0_20px_80px_rgba(0,0,0,0.6)]'
                      }`}
                    >
                       {/* Volumetric Back-glow */}
                       <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 blur-3xl pointer-events-none"
                            style={{ background: `radial-gradient(circle at ${isLeft ? 'right' : 'left'} center, ${isFirst ? '#00F2FE' : '#8A2BE2'}, transparent 65%)` }} />
                       
                       <div className={`flex flex-col gap-4 relative z-10 ${isLeft ? 'md:items-end' : 'md:items-start'}`}>
                          <div className={`flex flex-wrap items-center gap-3 ${isLeft ? 'md:flex-row-reverse' : ''}`}>
                             <h3 className="text-white text-2xl lg:text-3xl font-black tracking-tight drop-shadow-sm">
                               {item.time}
                             </h3>

                          </div>
                          
                          <div className="w-full">
                            <h4 className="text-[#F4F4F5] text-lg lg:text-xl font-bold mb-2">
                               {item.title}
                            </h4>
                            <p className="text-[#A1A1AA] text-sm lg:text-base leading-relaxed font-medium">
                               {item.description}
                            </p>
                          </div>
                       </div>
                    </motion.div>
                  </motion.div>

                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default React.memo(EventSchedule);
