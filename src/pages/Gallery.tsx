import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Seo from "@/components/Seo";
import BackgroundGlow from "@/components/BackgroundGlow";
import Footer from "@/components/Footer";

const galleryImages = [
  { src: "/gallery1.webp", alt: "ACE Team AY 2025-2026" },
  { src: "/gallery2.webp", alt: "Inauguration Ceremony" },
  { src: "/gallery3.webp", alt: "ACE Team Group Photo" },
  { src: "/hero3.webp", alt: "Interrupt '25" },
  { src: "/gallery5.webp", alt: "Hackerrupt '25" },
];

export default function GalleryPage() {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const next = () => setIndex((prev) => (prev + 1) % galleryImages.length);
  const prev = () => setIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);

  return (
    <div className="relative min-h-screen w-full overflow-hidden gradient-page pt-24 pb-20 px-6">
      <Seo
        title="Gallery"
        description="Photos from ACE's events, hackathons, and team moments at Sri Venkateswara College of Engineering."
      />
      {/* Background Glows */}
      <BackgroundGlow blur={140} />

      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="text-center mb-2 relative z-10"
      >
        <h2 className="text-5xl md:text-6xl font-bold mb-4 text-foreground">
          Gallery
        </h2>
        <div className="w-24 h-2 bg-teal-400 mx-auto rounded-full mb-4 shadow-glow" />
        <p className="text-muted-foreground text-lg font-medium italic">
          Capturing the scale of our innovation and teamwork
        </p>
      </motion.div>

      {/* 3D Carousel Container */}
      <div className="relative h-[500px] md:h-[700px] flex items-center justify-center perspective-2000 z-20 -mt-8">
        <div className="relative w-full max-w-[1600px] h-full flex items-center justify-center">
          <AnimatePresence mode="popLayout" initial={false}>
            {[-1, 0, 1].map((offset) => {
              const itemIndex = (index + offset + galleryImages.length) % galleryImages.length;
              const isCenter = offset === 0;

              return (
                <motion.div
                  key={`${itemIndex}-${offset}`}
                  initial={{ opacity: 0, scale: 0.8, x: offset * 800 }}
                  animate={{
                    opacity: isCenter ? 1 : 0.4,
                    // Slightly reduced scale for mobile center card
                    scale: isCenter ? (isMobile ? 1.1 : 1.15) : 0.8,
                    // Adjusted X offset for the smaller mobile card width
                    x: offset * (isMobile ? 260 : 600),
                    zIndex: isCenter ? 50 : 10,
                    rotateY: offset * -15,
                  }}
                  exit={{ opacity: 0, scale: 0.8, x: offset * -800 }}
                  transition={{
                    type: "tween",
                    ease: [0.4, 0, 0.2, 1],
                    duration: 0.7
                  }}
                  onClick={() => isCenter ? setSelected(galleryImages[itemIndex].src) : setIndex(itemIndex)}
                  // Reduced mobile card width from 340px to 280px
                  className="absolute cursor-pointer w-[280px] md:w-[800px] aspect-video rounded-[2rem] md:rounded-[3rem] overflow-visible"
                >
                  <div className={`relative w-full h-full backdrop-blur-3xl overflow-hidden transition-all duration-700 rounded-[2rem] md:rounded-[3rem] ${
                    isCenter
                      ? "shadow-glow-lg ring-2 ring-teal-400/20"
                      : "opacity-60 ring-1 ring-white/20"
                  }`}>
                    <img
                      src={galleryImages[itemIndex].src}
                      alt={galleryImages[itemIndex].alt}
                      loading={isCenter ? "eager" : "lazy"}
                      className="w-full h-full object-cover"
                    />

                    {/* Desktop-only Description (Inside Image) */}
                    {isCenter && !isMobile && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute bottom-8 left-1/2 -translate-x-1/2 w-max px-10 py-4 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/50"
                      >
                        <p className="text-[11px] font-black uppercase tracking-[0.25em] text-primary">
                          {galleryImages[itemIndex].alt}
                        </p>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Mobile-only Description (Positioned below center card) */}
        {isMobile && (
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-[90%] z-[60]">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mx-auto w-fit max-w-[80vw] px-5 py-2.5 bg-white/90 backdrop-blur-xl rounded-xl shadow-xl border border-white/50 text-center"
            >
              <p className="text-[11px] font-black uppercase tracking-[0.15em] text-primary break-words">
                {galleryImages[index].alt}
              </p>
            </motion.div>
          </div>
        )}

        {/* Navigation Controls */}
        <div className="absolute bottom-0 flex gap-8 z-50">
          <button
            onClick={prev}
            aria-label="Previous image"
            className="p-4 md:p-5 rounded-full glass-strong text-primary hover:bg-teal-400 hover:text-white transition-all shadow-xl hover:scale-110 active:scale-95"
          >
            <ChevronLeft size={20} className="md:w-7 md:h-7" />
          </button>
          <button
            onClick={next}
            aria-label="Next image"
            className="p-4 md:p-5 rounded-full glass-strong text-primary hover:bg-teal-400 hover:text-white transition-all shadow-xl hover:scale-110 active:scale-95"
          >
            <ChevronRight size={20} className="md:w-7 md:h-7" />
          </button>
        </div>
      </div>

      {/* Thumbnail Indicators */}
      <div className="flex justify-center gap-2 mt-8 z-10 relative">
        {galleryImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Go to image ${i + 1}`}
            aria-current={i === index}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              i === index ? "bg-primary w-6" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
            }`}
          />
        ))}
      </div>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-foreground/90 backdrop-blur-2xl flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-[95vw] max-h-[90vh]"
            >
              <img
                src={selected}
                className="w-full h-full object-contain rounded-[2rem] shadow-2xl"
                alt={galleryImages.find((img) => img.src === selected)?.alt ?? "Gallery image enlarged"}
              />
              <button
                aria-label="Close enlarged image"
                className="absolute -top-12 right-0 text-white hover:text-teal-400 transition-colors"
                onClick={() => setSelected(null)}
              >
                <X size={32} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <Footer />
    </div>
  );
}