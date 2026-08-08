import React from "react";
import { motion, Variants } from "framer-motion";
import { Brain, Image as ImageIcon, Sparkles, Award, FileCode2, TerminalSquare, CheckCircle2 } from "lucide-react";

export interface CompetitionStage {
  id: string;
  icon: string;
  title: string;
  description: string;
  details?: string[];
  scores?: { label: string; points: string }[];
}

export interface CompetitionSectionProps {
  format: {
    description: string;
    stages: CompetitionStage[];
    submission: {
      requirements: string[];
      note: string;
    };
  };
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

const CompetitionSection: React.FC<CompetitionSectionProps> = ({ format }) => {
  const workshop = format.stages.find((s) => s.id === "workshop");
  const round1 = format.stages.find((s) => s.id === "round1");
  const round2 = format.stages.find((s) => s.id === "round2");
  const evaluation = format.stages.find((s) => s.id === "evaluation");

  return (
    <section className="relative w-full py-32 overflow-hidden">

      <div className="max-w-6xl mx-auto px-6 w-full relative z-10">
        
        {/* Section Header */}
        <motion.div 
          className="flex flex-col items-center text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="text-[#8A2BE2] text-xs font-bold tracking-[0.2em] uppercase mb-5 drop-shadow-[0_0_15px_rgba(138,43,226,0.6)]">
            THE TRACK MATRIX
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter mb-6">
            How the Competition Works
          </h2>
          <p className="text-[#A1A1AA] text-lg max-w-2xl font-medium leading-relaxed">
            {format.description}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col gap-8"
        >
          {/* Top Phase Container (The Workshop Anchor) */}
          {workshop && (
            <motion.div variants={itemVariants} className="w-full bg-[#13131A]/50 backdrop-blur-[30px] border border-[rgba(255,255,255,0.05)] rounded-[24px] p-8 md:p-12 overflow-hidden relative group shadow-lg">
              <div className="grid md:grid-cols-2 gap-10 items-center relative z-10">
                {/* Left Column */}
                <div className="flex flex-col items-start">
                  <div className="w-16 h-16 rounded-2xl bg-[#8A2BE2]/10 flex items-center justify-center border border-[#8A2BE2]/30 mb-6 relative group-hover:scale-105 transition-transform duration-500">
                    <div className="absolute inset-0 bg-[#8A2BE2]/20 rounded-2xl blur-xl animate-pulse" />
                    <Brain size={32} className="text-[#8A2BE2] relative z-10" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black text-white mb-4 tracking-tight">
                    Prompt Engineering Workshop
                  </h3>
                  <p className="text-[#A1A1AA] leading-relaxed text-lg">
                    {workshop.description}
                  </p>
                </div>

                {/* Right Column (Code Badges) */}
                <div className="flex flex-col gap-4">
                  {["Prompt Fundamentals", "Optimization Techniques", "Image Synthesis Architecture"].map((topic, i) => (
                    <div key={i} className="flex items-center gap-4 bg-white/[0.02] border border-[rgba(255,255,255,0.05)] rounded-[12px] p-4 transition-all hover:bg-[rgba(255,255,255,0.04)] hover:border-[rgba(255,255,255,0.15)]">
                      <TerminalSquare size={18} className="text-[#00F2FE]" />
                      <span className="text-[#F4F4F5] font-mono text-sm tracking-tight">{topic}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Lower Phase Matrix (3-Column Asymmetric Bento Core) */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1: Round 1 */}
            {round1 && (
              <motion.div variants={itemVariants} className="bg-[#13131A]/50 backdrop-blur-[30px] border border-[rgba(255,255,255,0.05)] rounded-[24px] p-8 flex flex-col group transition-all duration-500 hover:border-[rgba(255,255,255,0.1)] hover:-translate-y-2 shadow-lg">
                <ImageIcon size={28} className="text-white/30 mb-6 group-hover:text-white transition-colors duration-500" />
                <h4 className="text-white text-xl font-bold tracking-tight mb-3">
                  Round 1 — Image Recreation
                </h4>
                <p className="text-[#A1A1AA] text-sm leading-relaxed mb-8 flex-grow">
                  {round1.description}
                </p>
                <div className="flex flex-col gap-3">
                  {round1.details?.map((detail, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 size={14} className="text-[#8A2BE2]" />
                      <span className="text-[#E4E4E7] text-xs font-semibold tracking-wide">{detail}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Card 2: Round 2 */}
            {round2 && (
              <motion.div variants={itemVariants} className="bg-[#13131A]/50 backdrop-blur-[30px] border border-[rgba(255,255,255,0.05)] rounded-[24px] p-8 flex flex-col group transition-all duration-500 hover:border-[rgba(255,255,255,0.1)] hover:-translate-y-2 shadow-lg">
                <Sparkles size={28} className="text-white/30 mb-6 group-hover:text-white transition-colors duration-500" />
                <h4 className="text-white text-xl font-bold tracking-tight mb-3">
                  Round 2 — Advanced Challenge
                </h4>
                <p className="text-[#A1A1AA] text-sm leading-relaxed mb-8 flex-grow">
                  {round2.description}
                </p>
                <div className="flex flex-col gap-3">
                  {round2.details?.map((detail, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 size={14} className="text-[#8A2BE2]" />
                      <span className="text-[#E4E4E7] text-xs font-semibold tracking-wide">{detail}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Card 3: Evaluation Criteria */}
            {evaluation && (
              <motion.div variants={itemVariants} className="bg-[#13131A]/50 backdrop-blur-[30px] border border-[rgba(255,255,255,0.05)] rounded-[24px] p-8 flex flex-col group transition-all duration-500 hover:border-[rgba(255,255,255,0.1)] hover:-translate-y-2 shadow-lg">
                <Award size={28} className="text-white/30 mb-6 group-hover:text-white transition-colors duration-500" />
                <h4 className="text-white text-xl font-bold tracking-tight mb-6">
                  {evaluation.title}
                </h4>
                
                <div className="flex flex-col gap-7 flex-grow justify-end">
                  {evaluation.scores?.map((score, i) => {
                     // Extract the number from "40 Marks"
                     const percentage = parseInt(score.points.replace(/\D/g,'')) || 33;
                     // Multiply by 2.5 to make 40 -> 100% width, 20 -> 50% width
                     const barWidth = percentage * 2.5; 
                     return (
                      <div key={i} className="flex flex-col gap-3">
                        <div className="flex justify-between items-end">
                          <span className="text-white text-[11px] font-black uppercase tracking-widest">{score.label}</span>
                          <span className="text-[#00F2FE] text-xs font-mono font-bold drop-shadow-[0_0_8px_rgba(0,242,254,0.8)]">{score.points}</span>
                        </div>
                        {/* Ultra-thin tracking lane */}
                        <div className="h-[2px] w-full bg-[rgba(255,255,255,0.05)] relative overflow-visible rounded-full">
                           <motion.div 
                             className="absolute top-0 left-0 bottom-0 bg-[#00F2FE] shadow-[0_0_10px_rgba(0,242,254,1)] rounded-full flex items-center justify-end"
                             initial={{ width: 0 }}
                             whileInView={{ width: `${barWidth}%` }}
                             viewport={{ once: true }}
                             transition={{ duration: 1.5, delay: 0.2 + i * 0.2, ease: [0.16, 1, 0.3, 1] }}
                           >
                              {/* Neon pulse tracker node resting precisely on the leading edge */}
                              <div className="w-1.5 h-1.5 bg-white rounded-full translate-x-1/2 shadow-[0_0_12px_#00F2FE,0_0_5px_white]" />
                           </motion.div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </motion.div>
            )}
          </div>

          {/* Bottom Subsection (Submission Requirements) */}
          <motion.div variants={itemVariants} className="w-full bg-[#13131A]/50 backdrop-blur-[30px] border border-[rgba(255,255,255,0.05)] rounded-[24px] p-6 md:p-8 mt-4 overflow-hidden relative group shadow-lg">
             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none" />
             <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 relative z-10">
               <div className="flex-1">
                 <h4 className="text-white text-lg font-bold tracking-tight mb-2 flex items-center gap-3">
                   <FileCode2 size={20} className="text-[#8A2BE2]" />
                   Target Deliverables
                 </h4>
                 <p className="text-[#A1A1AA] text-sm max-w-lg leading-relaxed">
                   {format.submission.note}
                 </p>
               </div>
               
               <div className="flex flex-wrap gap-3 flex-1 justify-start lg:justify-end">
                 {format.submission.requirements.map((req, i) => (
                   <div key={i} className="px-4 py-2.5 border border-[rgba(255,255,255,0.08)] bg-[#0D0D11] rounded-[8px] flex items-center justify-center">
                     <span className="text-xs font-mono text-[#E4E4E7] tracking-tight">{req}</span>
                   </div>
                 ))}
               </div>
             </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default React.memo(CompetitionSection);
