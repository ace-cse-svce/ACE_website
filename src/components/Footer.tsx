import { Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-8 border-t border-white/5 bg-[#0D0D11] relative z-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-sm text-[#A1A1AA]">
          © Association of Computer Engineers. All rights reserved.
        </div>
        
        <div className="flex items-center gap-4">
          <a 
            href="https://www.instagram.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 text-[#A1A1AA] hover:text-[#E4E4E7] hover:bg-white/10 transition-all duration-300"
            aria-label="Instagram"
          >
            <Instagram size={18} />
          </a>
          <a 
            href="https://www.linkedin.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 text-[#A1A1AA] hover:text-[#E4E4E7] hover:bg-white/10 transition-all duration-300"
            aria-label="LinkedIn"
          >
            <Linkedin size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
