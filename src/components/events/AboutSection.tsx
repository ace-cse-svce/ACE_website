import React from "react";
import { motion, Variants } from "framer-motion";
import { Brain, Image, Layers, Clock, Laptop, Award, LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Brain,
  Image,
  Layers,
  Clock,
  Laptop,
  Award,
};

export interface Highlight {
  icon: string;
  title: string;
  description: string;
}

export interface AboutSectionProps {
  aboutText: string[];
  highlights: Highlight[];
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const AboutSection: React.FC<AboutSectionProps> = ({ aboutText, highlights }) => {
  return (
    <section className="relative w-full py-24 overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12">
          
          {/* Left Column: About Event */}
          <motion.div 
            className="lg:col-span-4 flex flex-col items-start"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={itemVariants} className="mb-5">
              <span className="text-[#8A2BE2] text-xs font-bold tracking-[0.2em] uppercase drop-shadow-[0_0_15px_rgba(138,43,226,0.6)]">
                Event Overview
              </span>
            </motion.div>
            
            <motion.h2 
              variants={itemVariants} 
              className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-8 tracking-tighter leading-[1.1]"
            >
              About the Event
            </motion.h2>
            
            <div className="space-y-6">
              {aboutText.map((paragraph, index) => (
                <motion.p 
                  key={index} 
                  variants={itemVariants}
                  className="text-[#E4E4E7] text-base md:text-lg leading-relaxed font-medium"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>
          </motion.div>
          
          {/* Right Column: International-Grade Bento Grid */}
          <motion.div 
            className="lg:col-span-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="grid grid-cols-1 md:grid-cols-6 gap-5">
              {highlights.map((highlight, index) => {
                const Icon = iconMap[highlight.icon] || Brain;
                
                // Asymmetric Matrix Splitting
                let spanClass = "md:col-span-2";
                if (index === 0) spanClass = "md:col-span-4";
                else if (index === 1) spanClass = "md:col-span-2";
                else if (index === 2) spanClass = "md:col-span-2";
                else if (index === 3) spanClass = "md:col-span-4"; // Room for chart
                else if (index === 4) spanClass = "md:col-span-3";
                else if (index === 5) spanClass = "md:col-span-3";
                
                // Color Logic
                const isCard1 = index === 0;
                const isCard4 = index === 3;
                const accentColor = isCard1 ? "#00F2FE" : "#8A2BE2";
                
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className={`relative flex flex-col items-start p-6 md:p-8 rounded-3xl bg-[#13131A]/60 backdrop-blur-md border border-[rgba(255,255,255,0.04)] hover:bg-[#1A1A24]/80 hover:border-[rgba(255,255,255,0.1)] hover:shadow-2xl transition-all duration-300 group overflow-hidden ${spanClass}`}
                  >

                    {/* The Component Mini-Graph for Card 4 */}
                    {isCard4 && (
                      <div className="absolute top-6 right-6 flex items-end gap-1.5 h-12 opacity-80">
                        <motion.div className="w-1.5 bg-[#8A2BE2] rounded-t-sm" initial={{ height: "30%" }} animate={{ height: ["30%", "70%", "30%"] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} />
                        <motion.div className="w-1.5 bg-[#00F2FE] rounded-t-sm" initial={{ height: "60%" }} animate={{ height: ["60%", "100%", "60%"] }} transition={{ duration: 2.2, delay: 0.2, repeat: Infinity, ease: "easeInOut" }} />
                        <motion.div className="w-1.5 bg-[#8A2BE2] rounded-t-sm" initial={{ height: "40%" }} animate={{ height: ["40%", "80%", "40%"] }} transition={{ duration: 1.8, delay: 0.4, repeat: Infinity, ease: "easeInOut" }} />
                        <motion.div className="w-1.5 bg-[#00F2FE] rounded-t-sm" initial={{ height: "20%" }} animate={{ height: ["20%", "50%", "20%"] }} transition={{ duration: 2.5, delay: 0.1, repeat: Infinity, ease: "easeInOut" }} />
                        <motion.div className="w-1.5 bg-[#8A2BE2] rounded-t-sm" initial={{ height: "50%" }} animate={{ height: ["50%", "90%", "50%"] }} transition={{ duration: 2.1, delay: 0.3, repeat: Infinity, ease: "easeInOut" }} />
                      </div>
                    )}
                    
                    <div className="relative z-10 w-full h-full flex flex-col">
                      <div className="mb-6">
                        <div 
                          className="w-12 h-12 rounded-2xl flex items-center justify-center border"
                          style={{ 
                            backgroundColor: `${accentColor}1A`, 
                            borderColor: `${accentColor}33`,
                            boxShadow: `0 0 20px ${accentColor}20`
                          }}
                        >
                          <Icon size={24} strokeWidth={2} style={{ color: accentColor }} />
                        </div>
                      </div>
                      <div className="mt-auto">
                        <h3 className="text-white text-lg font-bold mb-2 tracking-tight">
                          {highlight.title}
                        </h3>
                        <p className="text-[#A1A1AA] text-sm leading-relaxed font-medium">
                          {highlight.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default React.memo(AboutSection);
