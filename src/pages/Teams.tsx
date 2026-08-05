import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { teams } from "@/data/teams";
import { assetUrl } from "@/lib/assetUrl";
import Seo from "@/components/Seo";
import BackgroundGlow from "@/components/BackgroundGlow";
import Footer from "@/components/Footer";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.1 } 
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 100, damping: 15 } 
  }
};

export default function TeamsPage() {
  const [activeTab, setActiveTab] = useState("Core Team");
  const [clickedMember, setClickedMember] = useState<string | null>(null);

  return (
    <div className="relative min-h-screen w-full overflow-hidden gradient-page">
      <Seo
        title="Teams"
        description="Meet the leadership, executive members, and coordinators behind the Association of Computer Engineers (ACE)."
      />
      {/* Background Glows */}
      <BackgroundGlow />

      <div className="relative z-20 pt-32 pb-20 px-6 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tighter text-foreground">Our Leadership</h1>
          <div className="w-24 h-2 bg-teal-400 mx-auto rounded-full mb-6 shadow-glow" />
          <p className="text-muted-foreground text-lg font-medium italic">The brilliant minds behind ACE</p>
        </motion.div>

        {/* Tab Selection */}
        <div className="flex flex-wrap justify-center gap-3 p-2 mb-24 glass-strong rounded-[2rem] w-fit mx-auto shadow-lg">
          {Object.keys(teams).map((team) => (
            <button 
              key={team}
              onClick={() => setActiveTab(team)}
              className={`px-6 md:px-8 py-3 rounded-[1.5rem] text-xs md:text-sm font-black uppercase tracking-widest transition-all duration-300 ${
                activeTab === team 
                  ? "bg-teal-400 text-white shadow-glow" 
                  : "text-muted-foreground hover:text-foreground hover:bg-teal-400/10"
              }`}
            >
              {team}
            </button>
          ))}
        </div>

        {/* Members Grid */}
        <div className="flex justify-center">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            key={activeTab}
            className="flex flex-wrap justify-center gap-8 w-full"
          >
            <AnimatePresence mode="wait">
              {teams[activeTab]?.map((member) => (
                <motion.div 
                  variants={itemVariants}
                  key={member.name} 
                  whileHover={{ y: -10 }}
                  onClick={() => setClickedMember(clickedMember === member.name ? null : member.name)}
                  className="group cursor-pointer"
                >
                  {/* Glass Card */}
                  <div className={`relative w-[280px] overflow-hidden transition-all duration-500 backdrop-blur-3xl border rounded-[2.5rem] p-6 text-center ${
                    clickedMember === member.name 
                    ? "bg-teal-400/20 border-teal-400 shadow-glow-lg scale-[1.02]" 
                    : "bg-foreground/5 border-white/60 hover:border-white/90 shadow-2xl"
                  }`}>
                    
                    {/* Interior Lighting */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-40 pointer-events-none" />

                    {/* Image Squircle */}
                    <div className="relative w-full aspect-square mb-6">
                      <div className={`absolute inset-0 rounded-[2rem] blur-2xl transition-opacity duration-500 ${
                        clickedMember === member.name ? "bg-teal-400/60 opacity-100" : "bg-teal-400/20 opacity-0 group-hover:opacity-100"
                      }`} />
                      <div className={`relative w-full h-full rounded-[2rem] overflow-hidden border-2 transition-all duration-500 shadow-lg ${
                        clickedMember === member.name ? "border-teal-400" : "border-white/50 group-hover:border-teal-400"
                      }`}>
                        <img
                          src={assetUrl(member.image)}
                          alt={member.name}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                    </div>

                    {/* Text Content */}
                    <div className="space-y-4">
                      <h3 className={`font-bold text-lg tracking-tight transition-colors duration-300 ${
                        clickedMember === member.name ? "text-foreground" : "text-foreground/80"
                      }`}>
                        {member.name}
                      </h3>

                      {/* Position Badge */}
                      <div className={`inline-block px-5 py-2 rounded-xl backdrop-blur-xl border transition-all duration-500 ${
                        clickedMember === member.name 
                        ? "bg-teal-400 text-white border-teal-400 shadow-glow" 
                        : "bg-white/50 border-white text-primary shadow-sm group-hover:shadow-glow group-hover:border-teal-400/40"
                      }`}>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em]">
                          {member.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
