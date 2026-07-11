import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

const DISMISS_KEY = "ace-join-banner-dismissed";

// No recruitment poster yet — the design team is making one. Once it's ready,
// drop it in public/ and swap the text block below for an <img> of the poster.
export default function RecruitmentBanner() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (location.pathname === "/join") return;
    if (sessionStorage.getItem(DISMISS_KEY)) return;

    const timer = setTimeout(() => setOpen(true), 1200);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  const dismiss = () => {
    setOpen(false);
    sessionStorage.setItem(DISMISS_KEY, "1");
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[300] bg-foreground/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={dismiss}
          role="dialog"
          aria-modal="true"
          aria-label="ACE recruitment announcement"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 22, stiffness: 260 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-teal-500 via-teal-400 to-cyan-400 text-white shadow-2xl"
          >
            <button
              onClick={dismiss}
              aria-label="Close announcement"
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
            >
              <X size={18} />
            </button>

            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />

            <div className="relative p-10 text-center">
              <img src="/ace_logo1.webp" alt="ACE Logo" className="w-20 h-20 mx-auto mb-5 drop-shadow-lg" />
              <p className="text-xs font-black uppercase tracking-[0.3em] text-white/80 mb-2">Recruitment Open</p>
              <h2 className="text-3xl font-black mb-3 leading-tight">We're Recruiting!</h2>
              <p className="text-white/90 font-medium mb-8">
                Core, executive, and team roles are open. Bring your ideas, skills, and energy to ACE.
              </p>
              <Link
                to="/join"
                onClick={dismiss}
                className="inline-block px-8 py-3 bg-white text-teal-600 font-bold rounded-full shadow-lg hover:scale-105 transition-transform"
              >
                Join Us
              </Link>
              <button
                onClick={dismiss}
                className="block mx-auto mt-4 text-xs text-white/70 hover:text-white transition-colors underline underline-offset-4"
              >
                Maybe later
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
