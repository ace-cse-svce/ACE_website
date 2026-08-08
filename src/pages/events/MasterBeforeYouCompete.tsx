import React from "react";
import Seo from "@/components/Seo";
import Footer from "@/components/Footer";
import HeroSection from "@/components/events/HeroSection";
import AboutSection from "@/components/events/AboutSection";
import EventSchedule from "@/components/events/EventSchedule";
import CompetitionSection from "@/components/events/CompetitionSection";
import RegistrationCTA from "@/components/events/RegistrationCTA";
import { eventData } from "@/data/masterBeforeYouCompete";

const MasterBeforeYouCompete: React.FC = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#0D0D11] text-white font-sans">
      <Seo
        title={`${eventData.title} | ACE`}
        description={eventData.description}
        image={eventData.poster}
        url={`${window.location.origin}/events/master-before-you-compete`}
        type="website"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Event",
          "name": eventData.title,
          "description": eventData.description,
          "startDate": "2026-08-12T18:30:00+05:30",
          "eventStatus": "https://schema.org/EventScheduled",
          "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
          "organizer": {
            "@type": "Organization",
            "name": "Association of Computer Engineers (ACE)",
            "url": window.location.origin
          },
          "image": [
            `${window.location.origin}${eventData.poster}`
          ]
        }}
      />
      
      {/* Global Atmospheric Canvas Engine */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Core Vacuum Space */}
        <div className="absolute inset-0 bg-[#0D0D11]" />
        
        {/* Engineering Mesh Pattern with Vignette Mask */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.015) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.015) 1px, transparent 1px)
            `,
            backgroundSize: '5rem 5rem',
            maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 100%)'
          }}
        />

        {/* Volumetric Chromatic Engine */}
        <div className="absolute top-[10%] left-[5%] w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] bg-[#8A2BE2] rounded-full blur-[120px] opacity-20 mix-blend-screen" />
        <div className="absolute bottom-[10%] right-[5%] w-[35vw] h-[35vw] max-w-[500px] max-h-[500px] bg-[#00F2FE] rounded-full blur-[120px] opacity-20 mix-blend-screen" />
      </div>
      
      {/* Navbar is rendered in App.tsx globally */}
      
      <main className="relative z-10">
        <HeroSection
          badge="AI Workshop + Competition"
          title={eventData.title}
          tagline={"Master before you\ncomplete."}
          description="An online workshop followed by a two-round AI image recreation challenge designed to improve your prompt engineering skills."
          date={eventData.date}
          time={eventData.time}
          mode={eventData.mode}
          poster={eventData.poster}
          registrationLink="/events/master-before-you-compete/register"
        />
        <AboutSection 
          aboutText={eventData.aboutText}
          highlights={eventData.highlights}
        />
        <EventSchedule schedule={eventData.schedule} />
        <CompetitionSection format={eventData.competitionFormat} />
        <RegistrationCTA />
      </main>
      
      <Footer />
    </div>
  );
};

export default MasterBeforeYouCompete;
