import React, { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { Calendar, Clock, Monitor, ArrowRight, CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";
import { assetUrl } from "@/lib/assetUrl";

export interface HeroSectionProps {
  badge: string;
  title: string;
  tagline: string;
  description: string;
  date: string;
  time: string;
  mode: string;
  poster: string;
  registrationLink?: string;
  scheduleLink?: string;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const typewriterSentences = [
  "Master AI Prompting.",
  "Engineer Precision Prompts.",
  "Compete. Innovate. Dominate.",
  "Unlock Generative AI."
];

const TypewriterText = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const handleTyping = () => {
      const currentWord = typewriterSentences[wordIndex];
      
      if (isDeleting) {
        setText(currentWord.substring(0, text.length - 1));
        setTypingSpeed(30); // Faster deletion for sentences
      } else {
        setText(currentWord.substring(0, text.length + 1));
        setTypingSpeed(80); // Slightly faster typing for sentences
      }

      if (!isDeleting && text === currentWord) {
        setTimeout(() => setIsDeleting(true), 2500);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % typewriterSentences.length);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIndex, typingSpeed]);

  return (
    <span className="inline-flex items-center text-[#00F2FE] drop-shadow-[0_0_15px_rgba(0,242,254,0.6)] text-center">
      <span>{text}</span>
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="inline-block w-[4px] h-[0.9em] bg-[#00F2FE] ml-2 shadow-[0_0_10px_#00F2FE]"
      />
    </span>
  );
};

const HeroSection: React.FC<HeroSectionProps> = ({
  badge,
  title,
  tagline,
  description,
  date,
  time,
  mode,
  poster,
  registrationLink = "#register",
  scheduleLink = "#timeline",
}) => {
  return (
    <section className="relative w-full min-h-[85vh] flex items-center overflow-hidden pt-28 md:pt-20 pb-24 md:pb-32 perspective-1000">

      {/* ACE Logo - Top Left */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 md:top-12 md:left-12 md:translate-x-0 z-20">
        <img 
          src={assetUrl("/ace_logo.png")} 
          alt="ACE Logo" 
          className="h-16 md:h-20 w-auto object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.15)] opacity-90" 
        />
      </div>

      <div className="max-w-5xl mx-auto px-6 w-full relative z-10">
        <div className="flex flex-col items-center justify-center text-center">
          
          {/* Typographic Core */}
          <motion.div
            className="flex flex-col items-center w-full"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {/* Event Badge */}
            <motion.div variants={itemVariants} className="mb-6">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-[rgba(138,43,226,0.3)] bg-[#8A2BE2]/10 text-[#8A2BE2] text-xs font-bold tracking-[0.2em] uppercase shadow-[0_0_20px_rgba(138,43,226,0.4)] backdrop-blur-md">
                {badge}
              </span>
            </motion.div>

            {/* Title */}
            <motion.div variants={itemVariants} className="filter drop-shadow-sm flex flex-col items-center">
              <h1
                className="text-6xl md:text-7xl lg:text-8xl font-black leading-tight mb-2 px-4 pt-6 pb-6 tracking-normal bg-clip-text text-transparent bg-gradient-to-b from-[#FFFFFF] via-[#F4F4F5] to-[#A1A1AA]"
              >
                {title}
              </h1>
              <div className="h-[2em] md:h-[1.5em] text-xl md:text-2xl lg:text-3xl font-bold mb-6 flex items-center justify-center max-w-4xl px-4">
                <TypewriterText />
              </div>
            </motion.div>

            {/* Tagline */}
            <motion.h2
              variants={itemVariants}
              className="text-2xl md:text-3xl font-semibold mb-8 leading-snug tracking-tight"
            >
              <span className="text-[#E4E4E7]">Learn Prompt Engineering.</span>
              <br className="hidden md:block" />
              <span className="text-[#00F2FE] drop-shadow-[0_0_15px_rgba(0,242,254,0.6)] ml-0 md:ml-2 relative">
                Compete with Precision.
                <span className="absolute inset-0 bg-[#00F2FE] blur-2xl opacity-20 pointer-events-none"></span>
              </span>
            </motion.h2>

            {/* Organized Metadata Bay */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-6 mb-12 bg-[#13131A]/40 backdrop-blur-md border border-[rgba(255,255,255,0.03)] px-8 py-5 rounded-[16px] shadow-2xl">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#8A2BE2]/10 flex items-center justify-center border border-[#8A2BE2]/20">
                  <Calendar size={16} className="text-[#8A2BE2]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-wider text-[#71717A] font-bold">Date</span>
                  <span className="text-sm text-white font-medium">{date}</span>
                </div>
              </div>
              
              <div className="w-px h-10 bg-gradient-to-b from-transparent via-[#8A2BE2]/40 to-transparent hidden md:block" />
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#00F2FE]/10 flex items-center justify-center border border-[#00F2FE]/20">
                  <Clock size={16} className="text-[#00F2FE]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-wider text-[#71717A] font-bold">Time</span>
                  <span className="text-sm text-white font-medium">{time}</span>
                </div>
              </div>

              <div className="w-px h-10 bg-gradient-to-b from-transparent via-[#00F2FE]/40 to-transparent hidden md:block" />
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#8A2BE2]/10 flex items-center justify-center border border-[#8A2BE2]/20">
                  <Monitor size={16} className="text-[#8A2BE2]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-wider text-[#71717A] font-bold">Venue</span>
                  <span className="text-sm text-white font-medium">{mode}</span>
                </div>
              </div>
            </motion.div>

            {/* Primary CTA */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-5">
              <Link
                to={registrationLink}
                className="group relative inline-flex items-center gap-5 px-10 py-5 bg-[#13131A] text-white font-bold rounded-full transition-all duration-300 hover:-translate-y-1 shadow-[0_0_30px_rgba(138,43,226,0.2)] hover:shadow-[0_0_50px_rgba(0,242,254,0.3)]"
              >
                {/* Razor-sharp dual-color gradient line border */}
                <div className="absolute inset-0 rounded-full border-2 border-transparent pointer-events-none" style={{
                  background: 'linear-gradient(#13131A, #13131A) padding-box, linear-gradient(to right, #8A2BE2, #00F2FE) border-box'
                }} />

                <span className="relative z-10 text-xl tracking-wide">Register Now</span>
                <div className="relative z-10 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-transform group-hover:translate-x-1">
                  <ArrowRight size={20} className="text-white" />
                </div>
              </Link>
              
              <a
                href={scheduleLink}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-transparent text-[#A1A1AA] hover:text-white font-semibold rounded-full transition-all duration-300 hover:bg-white/5"
              >
                <CalendarDays size={18} />
                Event Schedule
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(HeroSection);
