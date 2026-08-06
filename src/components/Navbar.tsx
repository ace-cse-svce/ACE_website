import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import GlobalSearch from "@/components/GlobalSearch";
import { navLinks, type NavLink } from "@/data/navLinks";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Home");
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const isManualClick = useRef(false);

  // Scroll observer logic
  useEffect(() => {
    if (location.pathname !== "/") {
      const currentLink = navLinks.find(l => l.href === location.pathname && l.type === "link");
      if (currentLink) setActiveTab(currentLink.name);
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -50% 0px",
      threshold: 0,
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      if (isManualClick.current) return;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const link = navLinks.find((l) => l.target === `#${entry.target.id}`);
          if (link) setActiveTab(link.name);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    navLinks.forEach((link) => {
      if (link.type === "scroll" && link.target) {
        const el = document.querySelector(link.target);
        if (el) observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, [location.pathname]);

  // Scroll background logic
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Navigation handler
  const handleNavClick = (link: NavLink) => {
    setIsOpen(false);
    setActiveTab(link.name);

    if (link.type === "scroll" && link.target) {
      isManualClick.current = true;

      const performScroll = () => {
        const element = document.querySelector(link.target!);
        if (element) {
          const yOffset = -100;
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
        setTimeout(() => { isManualClick.current = false; }, 800);
      };

      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(performScroll, 150);
      } else {
        performScroll();
      }
    } else {
      navigate(link.href);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="fixed top-0 inset-x-0 z-[100] flex justify-center pt-4 sm:pt-6 px-4 pointer-events-none">
        <motion.nav
          layout
          className={`pointer-events-auto relative flex items-center justify-between gap-4 transition-all duration-500 w-full md:w-auto ${isScrolled
              ? "py-3 px-6 rounded-2xl md:py-2.5 md:px-4 md:rounded-full bg-white/90 backdrop-blur-xl border border-zinc-200/50 shadow-sm"
              : "py-3 px-6 rounded-2xl bg-white/80 backdrop-blur-lg border border-white/50 shadow-sm"
            }`}
          style={{ maxWidth: "1280px" }}
        >
          {/* Logo Section */}
          <div onClick={() => handleNavClick(navLinks[0])} className="flex items-center gap-3 cursor-pointer group shrink-0">
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 bg-teal-400 blur-[20px] opacity-0 group-hover:opacity-30 transition-opacity duration-500 rounded-full" />
              <img src="/ace_logo1.webp" alt="ACE Logo" className="relative w-10 h-10 object-contain drop-shadow-sm transition-transform duration-300 group-hover:scale-110" />
            </div>
            <span className="font-black tracking-tight text-xl bg-gradient-to-r from-teal-700 to-emerald-800 bg-clip-text text-transparent">ACE</span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeTab === link.name;
              return (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link)}
                  onMouseEnter={() => setHoveredTab(link.name)}
                  onMouseLeave={() => setHoveredTab(null)}
                  className={`relative px-5 py-2 text-sm font-bold transition-colors duration-300 rounded-full ${isActive ? "text-white" : "text-zinc-700 hover:text-teal-700"}`}
                >
                  {(hoveredTab === link.name && !isActive) && (
                    <motion.div layoutId="nav-spotlight" className="absolute inset-0 bg-teal-50/50 rounded-full" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />
                  )}
                  {isActive && (
                    <motion.div layoutId="nav-active" className="absolute inset-0 bg-gradient-to-r from-teal-400 to-emerald-500 shadow-[0_4px_15px_rgba(20,184,166,0.3)] rounded-full" transition={{ type: "spring", bounce: 0.25, duration: 0.5 }} />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </button>
              );
            })}
          </div>

          {/* Search + Join Us CTA (desktop) */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            <GlobalSearch />

          </div>

          {/* Mobile Toggle */}
          <div className="flex md:hidden items-center gap-1">
            <GlobalSearch />
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isOpen}
              className="p-2 text-zinc-700 hover:text-teal-600 hover:bg-white/50 rounded-full transition-colors active:scale-95"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </motion.nav>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div initial={{ opacity: 0, scale: 0.95, y: -20 }} animate={{ opacity: 1, scale: 1, y: 12 }} exit={{ opacity: 0, scale: 0.95, y: -10 }} className="pointer-events-auto absolute top-full left-4 right-4 md:hidden">
              <div className="bg-white/95 backdrop-blur-xl border border-zinc-200/50 rounded-2xl p-2 shadow-xl flex flex-col gap-1 overflow-hidden">
                {navLinks.map((link, idx) => (
                  <motion.button
                    key={link.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => handleNavClick(link)}
                    className={`w-full flex items-center justify-between p-4 rounded-xl text-left transition-all ${activeTab === link.name ? "bg-gradient-to-r from-teal-400 to-emerald-500 text-white font-bold shadow-md" : "text-zinc-600 hover:bg-zinc-50 font-medium"}`}
                  >
                    <span>{link.name}</span>
                    {activeTab === link.name && <div className="w-2 h-2 rounded-full bg-white animate-pulse" />}
                  </motion.button>
                ))}


              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
