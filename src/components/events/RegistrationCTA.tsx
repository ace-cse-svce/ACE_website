import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const RegistrationCTA: React.FC = () => {
  return (
    <section className="relative w-full py-32 overflow-hidden">

      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative p-12 md:p-24 rounded-[32px] bg-[#13131A]/50 backdrop-blur-[30px] border border-[rgba(255,255,255,0.05)] flex flex-col items-center overflow-hidden shadow-2xl"
        >
          {/* Top edge hairline glow trail */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00F2FE]/50 to-transparent opacity-80" />
          {/* Slight top inset shadow/glow for the glass effect */}
          <div className="absolute inset-0 rounded-[32px] pointer-events-none shadow-[inset_0_1px_15px_rgba(0,242,254,0.05)]" />

          {/* Top Badge */}
          <div className="flex items-center gap-3 px-4 py-1.5 rounded-full border border-[rgba(255,255,255,0.08)] bg-[#0D0D11]/50 mb-10 relative z-10 shadow-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-[#8A2BE2] shadow-[0_0_8px_#8A2BE2] animate-pulse" />
            <span className="text-white/80 text-[10px] font-bold tracking-[0.2em] uppercase">
              LIMITED AVAILABILITY WORKSPACE
            </span>
          </div>

          {/* Massive Variable Typography Headline */}
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black mb-8 relative z-10 tracking-tighter leading-[1.05] drop-shadow-sm pb-2">
            <span className="text-white">Ready to Master</span>{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#00F2FE] via-[#E4E4E7] to-[#FFFFFF]">
              Your Prompts?
            </span>
          </h2>
          
          {/* High-Contrast Sub-paragraph */}
          <p className="text-[#A1A1AA] text-lg md:text-xl mb-14 max-w-2xl relative z-10 font-medium leading-[1.8]">
            Join the intensive workshop, test your synthesis skills, and recreate AI images with absolute precision. 
            <br />
            <span className="text-[#00F2FE] font-bold tracking-wide mt-3 block drop-shadow-[0_0_8px_rgba(0,242,254,0.3)]">
              Entry nodes remain strictly constrained. Secure yours now.
            </span>
          </p>

          {/* Primary Action Control (CTA Button) */}
          <Link
            to="/events/master-before-you-compete/register"
            className="group relative inline-flex items-center gap-5 px-10 py-5 bg-[#13131A] text-white font-bold rounded-full transition-all duration-300 hover:-translate-y-1 z-10 shadow-[0_0_30px_rgba(138,43,226,0.2)] hover:shadow-[0_0_50px_rgba(0,242,254,0.3)]"
          >
            {/* Razor-sharp dual-color gradient line border */}
            <div className="absolute inset-0 rounded-full border-2 border-transparent pointer-events-none" style={{
              background: 'linear-gradient(#13131A, #13131A) padding-box, linear-gradient(to right, #8A2BE2, #00F2FE) border-box'
            }} />
            
            <span className="tracking-wide relative z-10 text-xl">Register Now</span>
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 relative z-10">
              <ArrowRight size={20} className="text-white" />
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default React.memo(RegistrationCTA);
