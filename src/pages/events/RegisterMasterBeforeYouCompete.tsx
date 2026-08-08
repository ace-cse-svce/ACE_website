import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, Monitor, Info } from "lucide-react";
import Seo from "@/components/Seo";
import Footer from "@/components/Footer";
import RegistrationForm from "@/components/events/RegistrationForm";
import RegistrationSuccess from "@/components/events/RegistrationSuccess";

const RegisterMasterBeforeYouCompete: React.FC = () => {
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const originalBodyBg = document.body.style.backgroundColor;
    document.body.style.backgroundColor = "#0D0D11";
    return () => {
      document.body.style.backgroundColor = originalBodyBg || "";
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#0D0D11] font-sans">
      <Seo
        title="Register — Prompt Forge | ACE"
        description="Register for Prompt Forge, an online prompt engineering workshop and AI image recreation challenge organized by ACE."
        image="/master_brfore_you-complete.jpeg"
        url={`${window.location.origin}/events/master-before-you-compete/register`}
        type="website"
      />
      
      {/* Premium Engineering Matrix Canvas */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Core Vacuum Space */}
        <div className="absolute inset-0 bg-[#0D0D11]" />
        
        {/* Engineering Mesh Pattern with Vignette Mask */}
        <div 
          className="absolute inset-0 bg-[length:3rem_3rem] md:bg-[length:5rem_5rem]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.012) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.012) 1px, transparent 1px)
            `,
            maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)'
          }}
        />

        {/* Volumetric Chromatic Engine */}
        <div className="absolute top-[10%] left-[5%] w-64 h-64 md:w-[40vw] md:h-[40vw] max-w-[600px] max-h-[600px] bg-[#8A2BE2] rounded-full blur-[60px] md:blur-[120px] opacity-20 mix-blend-screen" />
        <div className="absolute bottom-[10%] right-[5%] w-64 h-64 md:w-[35vw] md:h-[35vw] max-w-[500px] max-h-[500px] bg-[#00F2FE] rounded-full blur-[60px] md:blur-[120px] opacity-20 mix-blend-screen" />
      </div>

      <main className="relative z-10 max-w-3xl mx-auto px-6 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center flex flex-col items-center"
        >
          <div className="bg-[#A020F0]/10 border border-[#A020F0]/30 rounded-full px-4 py-1.5 mb-6 shadow-[0_0_15px_rgba(160,32,240,0.15)]">
            <span className="text-[#A020F0] font-semibold tracking-[0.2em] uppercase text-[11px]">
              AI WORKSHOP + COMPETITION
            </span>
          </div>
          <div className="filter drop-shadow-2xl">
            <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-b from-white to-[#888] text-transparent bg-clip-text tracking-normal px-4 py-6 leading-[1.2]">
              Prompt Forge
            </h1>
          </div>
          <div className="flex flex-col gap-1 mt-2">
            <p className="text-white text-xl md:text-2xl font-medium tracking-wide">
              Learn Prompt Engineering.
            </p>
            <p className="bg-gradient-to-r from-[#00F2FE] to-[#4FACFE] text-transparent bg-clip-text text-xl md:text-2xl font-bold tracking-wide drop-shadow-[0_0_10px_rgba(0,242,254,0.3)]">
              Compete with Precision.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col md:flex-row md:items-center justify-center bg-[#111111]/80 backdrop-blur-md border border-[rgba(255,255,255,0.08)] rounded-[2rem] p-4 md:px-8 mb-12 gap-6 mx-auto w-max shadow-2xl shadow-cyan-500/5 relative overflow-hidden"
        >
          {/* Subtle glow behind the card */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-cyan-500/5 pointer-events-none" />
          
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-10 h-10 rounded-full bg-[#1A1A24] flex items-center justify-center border border-white/5 shadow-[0_0_10px_rgba(160,32,240,0.2)]">
              <Calendar size={16} className="text-[#A020F0]" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-[#A1A1AA] uppercase tracking-wider font-semibold">Date</span>
              <span className="text-white font-semibold text-sm">12 August 2026</span>
            </div>
          </div>
          
          <div className="hidden md:block w-px h-8 bg-gradient-to-b from-transparent via-[rgba(255,255,255,0.1)] to-transparent relative z-10" />
          
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-10 h-10 rounded-full bg-[#1A1A24] flex items-center justify-center border border-white/5 shadow-[0_0_10px_rgba(0,242,254,0.2)]">
              <Clock size={16} className="text-[#00F2FE]" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-[#A1A1AA] uppercase tracking-wider font-semibold">Time</span>
              <span className="text-white font-semibold text-sm">6:30 PM</span>
            </div>
          </div>
          
          <div className="hidden md:block w-px h-8 bg-gradient-to-b from-transparent via-[rgba(255,255,255,0.1)] to-transparent relative z-10" />
          
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-10 h-10 rounded-full bg-[#1A1A24] flex items-center justify-center border border-white/5 shadow-[0_0_10px_rgba(160,32,240,0.2)]">
              <Monitor size={16} className="text-[#A020F0]" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-[#A1A1AA] uppercase tracking-wider font-semibold">Venue</span>
              <span className="text-white font-semibold text-sm">Online</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="w-full relative py-10"
              >
                <RegistrationForm onSuccess={() => setIsSuccess(true)} />
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <RegistrationSuccess />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {!isSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex items-start gap-3 text-[rgba(255,255,255,0.4)] text-sm px-2"
          >
            <Info size={16} className="shrink-0 mt-0.5 text-[#00F2FE]" />
            <p>
              Please ensure your email address is correct as all event communications, including the meeting link and submission forms, will be sent there.
            </p>
          </motion.div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default RegisterMasterBeforeYouCompete;
