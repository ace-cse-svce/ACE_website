import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Mail, MapPin, Instagram, Linkedin } from "lucide-react";
import { useState, useEffect } from "react";
import Seo from "@/components/Seo";
import BackgroundGlow from "@/components/BackgroundGlow";
import Footer from "@/components/Footer";

const heroImages = [
  { src: "/gallery1.jpeg", alt: "Students collaborating on engineering project" },
  { src: "/hero2.webp", alt: "Community development field work" },
  { src: "/hero3.webp", alt: "Team group photo at conference" },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const navHeight = 72;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden gradient-page font-sans">
      <Seo
        title="Home"
        description="Association of Computer Engineers (ACE) at Sri Venkateswara College of Engineering — innovating today, leading tomorrow."
      />
      {/* Global Background Glows */}
      <BackgroundGlow fixed />

      {/* HERO SECTION */}
      <section id="home" className="relative h-[60vh] sm:h-[70vh] md:h-[90vh] overflow-hidden">
        {/* Hero Images */}
        <div className="absolute inset-0 bg-foreground">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? "opacity-100" : "opacity-0"}`}
            >
              <img
                src={image.src}
                alt={image.alt}
                loading={index === 0 ? "eager" : "lazy"}
                className="w-full h-full object-cover object-center md:object-top animate-ken-burns"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/70" />
            </div>
          ))}
        </div>

        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center text-white px-6 md:px-4 animate-fade-in-up">
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-white via-accent to-cyan-400 bg-clip-text text-transparent animate-pulse-slow py-2 leading-tight">
              Association of <br className="md:hidden" /> Computer Engineers
            </h1>
            <p className="text-lg md:text-2xl text-gray-200 mb-8 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              Innovating Today, Leading Tomorrow
            </p>
            <button
              onClick={() => scrollToSection("#about")}
              className="px-8 py-3 bg-primary hover:bg-teal-600 text-primary-foreground font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-primary/50 animate-fade-in-up"
              style={{ animationDelay: "0.4s" }}
            >
              Explore More
            </button>
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-10">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === currentSlide}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === currentSlide ? "bg-primary w-8" : "bg-white/60"}`}
            />
          ))}
        </div>

        {/* Arrows */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length)}
          aria-label="Previous slide"
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-primary text-white p-2 md:p-3 rounded-full backdrop-blur-sm transition-all z-10 hidden sm:flex"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % heroImages.length)}
          aria-label="Next slide"
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-primary text-white p-2 md:p-3 rounded-full backdrop-blur-sm transition-all z-10 hidden sm:flex"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
        </button>
      </section>

{/* ABOUT SECTION */}
      <section id="about" className="pt-24 pb-12 px-6 w-full relative overflow-hidden font-sans">
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Centered Heading */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl font-bold mb-4 text-foreground">About us</h2>
            {/* Changed from amber to blue gradient */}
            <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-cyan-400 mx-auto rounded-full shadow-[0_0_15px_rgba(37,99,235,0.5)]" />
          </motion.div>

          {/* Grid Layout */}
          <div className="grid lg:grid-cols-[1.8fr_1fr] gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-lg md:text-xl leading-relaxed text-muted-foreground font-medium mb-10 w-full text-left">
                ACE is the cradle of innovation within the department, nurturing young minds who have brought pride and recognition to the college. For over two decades, ACE has served as an active platform that bridges academic learning with real-world applications, encouraging students to discover their talents, overcome inhibitions, and stay aligned with the latest technological advancements.
                <br /><br />
                Run entirely by students under the guidance of dedicated faculty, ACE fosters creativity, teamwork, and holistic development. Through seminars, workshops, guest lectures, technical contests, and community-oriented activities, ACE continues to extract the best from every student — inspiring them to grow as skilled engineers, responsible individuals, and future leaders.
              </p>

              <div className="flex flex-wrap gap-4">
                {["Innovation", "Technology", "Leadership"].map((tag) => (
                  <span
                    key={tag}
                    /* Changed tags from amber to blue theme */
                    className="px-6 py-2 rounded-full border border-blue-500/20 bg-blue-50 text-blue-700 text-sm font-bold uppercase tracking-widest shadow-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Right Side - Celestial Decoration */}
            <div className="relative flex items-center justify-center">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20 + i * 5, repeat: Infinity, ease: "linear" }}
                  className="absolute border border-blue-400/20 rounded-full"
                  style={{
                    width: `${240 + i * 40}px`,
                    height: `${240 + i * 40}px`,
                  }}
                />
              ))}

              {/* Floating Particles - Updated to Blue/Cyan */}
              <div className="absolute inset-0 pointer-events-none">
                <motion.div
                  animate={{ y: [-10, 10, -10], opacity: [0.4, 0.8, 0.4] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute top-10 right-10 w-3 h-3 bg-blue-400 rounded-full blur-sm"
                />
                <motion.div
                  animate={{ y: [10, -10, 10], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 6, repeat: Infinity }}
                  className="absolute bottom-10 left-10 w-2 h-2 bg-cyan-500 rounded-full blur-sm"
                />
              </div>

              {/* Central Logo */}
              <motion.div
                animate={{
                  y: [0, -15, 0],
                  rotateY: [0, -360]
                }}
                transition={{
                  y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                  rotateY: { duration: 15, repeat: Infinity, ease: "linear" }
                }}
                className="relative z-10 w-56 h-56 md:w-72 md:h-72 flex items-center justify-center"
              >
                {/* Updated Glow to Blue */}
                <div className="absolute inset-0 bg-blue-500/10 blur-[60px] rounded-full animate-pulse" />
                <img
                  src="/ace_logo1.webp"
                  alt="ACE Logo"
                  /* Updated drop-shadow to Blue */
                  className="w-full h-full object-contain filter drop-shadow-[0_0_30px_rgba(37,99,235,0.3)]"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="relative pt-12 pb-24 bg-transparent overflow-hidden">
        {/* Ambient Glow Orbs */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-teal-400/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-foreground">Contact Us</h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full shadow-glow" />
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-8 items-stretch">
            {/* MAIN INFO PANEL */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3 p-10 md:p-12 rounded-[3.5rem] bg-secondary/60 backdrop-blur-xl border border-white/40 shadow-glow flex flex-col relative"
            >
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-10 text-center sm:text-left">
                {/* Larger Logo Container */}
                <div className="relative shrink-0">
                  {/* Subtle glow behind logo */}
                  <div className="absolute inset-0 bg-[#14b8a6]/20 blur-2xl rounded-full" />
                  <img
                    src="/ace_logo1.webp"
                    alt="ACE Logo"
                    className="relative w-32 h-32 md:w-40 md:h-40 object-contain drop-shadow-[0_0_12px_rgba(20,184,166,0.3)]"
                  />
                </div>

                <div className="flex flex-col justify-center h-full">
                  <h3 className="text-2xl md:text-4xl font-black tracking-tighter uppercase leading-tight bg-gradient-to-r from-primary to-teal-400 bg-clip-text text-transparent">
                    Association of <br className="hidden sm:block" /> Computer Engineers
                  </h3>
                  <p className="text-primary font-bold tracking-[0.3em] text-[10px] md:text-xs mt-2 uppercase">
                    Innovating Today, Leading Tomorrow
                  </p>
                </div>
              </div>

              <div className="space-y-8 flex-grow">
                {/* Venue Glass Box */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex gap-5 items-start p-6 rounded-[2rem] glass transition-all cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/80 flex items-center justify-center shrink-0 shadow-sm group-hover:bg-primary group-hover:text-white transition-all">
                    <MapPin size={20} className="text-primary group-hover:text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-muted-foreground uppercase text-[10px] tracking-widest mb-1">Venue Address</h4>
                    <p className="text-sm text-foreground font-semibold leading-relaxed">
                      Sri Venkateswara College of Engineering, Pennalur, Sriperumbudur, Tamil Nadu – 602117
                    </p>
                  </div>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-4">
                  {/* Email Glass Box */}
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    className="flex items-center gap-4 p-5 rounded-2xl glass cursor-pointer"
                  >
                    <Mail className="text-primary" size={20} />
                    <p className="text-sm font-bold text-foreground">ace@svce.ac.in</p>
                  </motion.div>

                  {/* Links Glass Box */}
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    className="flex flex-col gap-2 p-5 rounded-2xl glass"
                  >
                    <h4 className="text-[13px] font-black text-primary uppercase tracking-tighter">Additional Links</h4>
                    <div className="flex gap-3">
                      <a href="https://ace-interrupt.netlify.app/" className="text-xs font-bold text-muted-foreground hover:text-primary transition-colors">Interrupt'25</a>
                      <span className="text-border">|</span>
                      <a href="https://www.acesvce.in/" className="text-xs font-bold text-muted-foreground hover:text-primary transition-colors">Hackerrupt'25</a>
                    </div>
                  </motion.div>
                </div>

                {/* Leadership Boxes */}
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { name: "Mithun S", role: "President" },
                    { name: "Kiran M S", role: "Vice President" }
                  ].map((lead) => (
                    <motion.div
                      key={lead.role}
                      whileHover={{ scale: 1.03 }}
                      className="p-6 rounded-[2rem] glass cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-glow" />
                        <p className="text-sm font-black text-foreground uppercase">{lead.name} <span className="text-primary text-[10px] ml-1">({lead.role})</span></p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Social Buttons */}
              <div className="flex gap-4 mt-10">
                {['Instagram', 'LinkedIn'].map((platform) => (
                  <motion.a
                    key={platform}
                    whileHover={{ y: -5, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href={platform === 'Instagram' ? "https://www.instagram.com/acesvce?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw%3D%3D" : "https://www.linkedin.com/company/ace-svce/"}
                    className="flex-1 flex items-center justify-center gap-3 py-4 rounded-2xl glass-strong group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-teal-400 flex items-center justify-center text-white shadow-glow">
                      {platform === 'Instagram' ? <Instagram size={18} /> : <Linkedin size={18} />}
                    </div>
                    <span className="text-xs font-black uppercase tracking-widest text-foreground group-hover:text-primary transition-colors">{platform}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* MAP PANEL */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.01 }}
              className="lg:col-span-2 rounded-[3.5rem] overflow-hidden shadow-glow relative min-h-[500px] transition-transform duration-500"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.763301321454!2d79.96946397585732!3d12.986985514539215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a528cd0cfb6e7ab%3A0x3294da3faad96a9!2sSri%20Venkateswara%20College%20of%20Engineering!5e0!3m2!1sen!2sin!4v1769799605909!5m2!1sen!2sin"
                width="100%"
                height="100%"
                className="absolute inset-0"
                style={{ border: 0, filter: "grayscale(0.1) contrast(1.1)" }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
