import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { isApplicationsClosed } from "@/data/recruitment";

const DISMISS_KEY = "ace-join-banner-dismissed";

export default function RecruitmentBanner() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const applicationsClosed = isApplicationsClosed();

  useEffect(() => {
    if (location.pathname === "/join") return;
    if (applicationsClosed) return;
    if (sessionStorage.getItem(DISMISS_KEY)) return;

    const timer = setTimeout(() => setOpen(true), 1200);
    return () => clearTimeout(timer);
  }, [location.pathname]); // eslint-disable-line react-hooks/exhaustive-deps

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
          className="fixed inset-0 z-[300] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={dismiss}
          role="dialog"
          aria-modal="true"
          aria-label="ACE recruitment announcement"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 24 }}
            transition={{ type: "spring", damping: 24, stiffness: 280 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-xs sm:max-w-sm rounded-2xl overflow-hidden shadow-2xl bg-white max-h-[90vh] flex flex-col"
          >
            <button
              onClick={dismiss}
              aria-label="Close announcement"
              className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center transition-colors text-white"
            >
              <X size={16} />
            </button>

            <Link to="/join" onClick={dismiss} className="block min-h-0 overflow-hidden">
              <img
                src="/join-poster.webp"
                alt="ACE Recruitment Drive AY 2026-27 — Core, Executive & Team roles open. Applications close 15 July 2026."
                className="block w-full h-auto"
              />
            </Link>

            <div className="p-4 pt-3 text-center shrink-0">
              <Link
                to="/join"
                onClick={dismiss}
                className="block w-full py-3 bg-teal-700 hover:bg-teal-800 text-white font-bold text-sm uppercase tracking-wider rounded-lg shadow-md transition-colors"
              >
                Apply Now
              </Link>
              <button
                onClick={dismiss}
                className="mt-3 text-xs text-zinc-400 hover:text-zinc-600 transition-colors underline underline-offset-4"
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
