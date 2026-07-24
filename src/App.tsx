import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { useEffect } from "react";
import Home from "./pages/Home";
import Teams from "./pages/Teams";
import Events from "./pages/Events";
import CompletedEventDetail from "./pages/CompletedEventDetail";
import InterruptHub from "./pages/InterruptHub";
import Gallery from "./pages/Gallery";
import Join from "./pages/Join";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import RecruitmentBanner from "./components/RecruitmentBanner";

const queryClient = new QueryClient();

function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <div className="flex flex-col min-h-screen">
            <ScrollToTop />
            <Navbar />
            <RecruitmentBanner />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/teams" element={<Teams />} />
                <Route path="/events" element={<Events />} />
                <Route path="/events/interrupt/:year" element={<InterruptHub />} />
                <Route path="/events/completed/:slug" element={<CompletedEventDetail />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/join" element={<Join />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
          <Toaster />
          <Sonner />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
