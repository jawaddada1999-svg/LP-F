import React, { useState, useCallback, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { VslPlayer } from './components/VslPlayer';
import { PostVideoCta } from './components/PostVideoCta';
import { CapabilitiesSection } from './components/CapabilitiesSection';
import { BenefitsSection } from './components/BenefitsSection';
import { RoiCalculator } from './components/RoiCalculator';
import { WorkflowComparison } from './components/WorkflowComparison';
import { FaqSection } from './components/FaqSection';
import { BookingSection } from './components/BookingSection';
import { Footer } from './components/Footer';
import { translations, Language } from './translations';
import { CONSULTATION_TYPE, CONTACT_EMAIL } from './config';

/**
 * ============================================================================
 * GLOBAL CONFIGURATION
 * Real Estate Agency Management & Automation SaaS
 * ============================================================================
 */
export const OWNER_CONFIG = {
  CONSULTATION_TYPE,
  CONTACT_EMAIL,
};

export default function App() {
  // Multilingual state stored in React state only (ar = Arabic RTL default, en = English LTR, fr = French LTR)
  const [language, setLanguage] = useState<Language>('ar');
  const [videoCompleted, setVideoCompleted] = useState<boolean>(false);

  const t = translations[language];

  // Sync HTML direction, lang, and font classes with current language
  useEffect(() => {
    document.documentElement.dir = t.dir;
    document.documentElement.lang = t.lang;
    if (t.dir === 'rtl') {
      document.body.style.fontFamily = "var(--font-cairo), system-ui, sans-serif";
    } else {
      document.body.style.fontFamily = "var(--font-latin), system-ui, sans-serif";
    }
  }, [language, t.dir, t.lang]);

  // Smart CTA Routing: scrolls to video section if videoCompleted is false, and to booking form if true
  const handleCtaClick = () => {
    if (!videoCompleted) {
      const vslEl = document.getElementById('vsl-section');
      if (vslEl) {
        vslEl.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      const bookingEl = document.getElementById('booking');
      if (bookingEl) {
        bookingEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const scrollToVideo = () => {
    const vslEl = document.getElementById('vsl-section');
    if (vslEl) {
      vslEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToBooking = () => {
    const bookingEl = document.getElementById('booking');
    if (bookingEl) {
      bookingEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Video end listener: reveals booking section and scrolls smoothly
  const handleVideoEnd = useCallback(() => {
    setVideoCompleted(true);
    setTimeout(() => {
      const bookingEl = document.getElementById('booking');
      if (bookingEl) {
        bookingEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 400);
  }, []);

  return (
    <div className={`min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-blue-600 selection:text-white ${t.dir === 'rtl' ? 'font-cairo' : 'font-latin'}`} dir={t.dir}>
      
      {/* Sticky Header with Language Switcher & Primary Consultation CTA */}
      <Navbar
        currentLang={language}
        onLanguageChange={setLanguage}
        onBookClick={handleCtaClick}
        t={t}
      />

      <main className="flex-1">
        {/* SECTION A — HERO & SECTION B — VSL VIDEO PLAYER */}
        <section className="relative pt-16 sm:pt-24 pb-20 overflow-hidden hero-glow">
          
          {/* Subtle atmospheric ambient lighting */}
          <div className="absolute top-0 right-1/2 translate-x-1/2 w-full max-w-5xl h-[550px] ambient-blue-light pointer-events-none" />

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            
            {/* Trust-oriented label */}
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-blue-400 mb-6 tracking-wide">
              <span>{t.hero.trustBadge}</span>
              <span aria-hidden="true">·</span>
              <span className="font-latin font-bold">IBONDA</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.25] mb-6 text-balance max-w-4xl mx-auto">
              {t.hero.title}
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto mb-12 font-normal">
              {t.hero.subtitle}
            </p>

            {/* SECTION B — VSL VIDEO PLAYER (Sharp thumbnail - no blur, opening pace 1.5x, forward seeking locked) */}
            <div className="mb-6">
              <VslPlayer
                t={t}
                onVideoEnd={handleVideoEnd}
                onGoToBooking={scrollToBooking}
              />
            </div>

            {/* SECTION C — POST-VIDEO CTA (Revealed smoothly once video ends) */}
            <PostVideoCta
              isVisible={videoCompleted}
              onBookClick={scrollToBooking}
              t={t}
            />

          </div>
        </section>

        {/* SECTION D — SUPPORTING CONTENT: 1. CAPABILITIES */}
        <CapabilitiesSection t={t} />

        {/* SECTION D — SUPPORTING CONTENT: 2. BUSINESS BENEFITS (Green accents) */}
        <BenefitsSection t={t} />

        {/* SECTION 6 — ROI / LOSS CALCULATOR (CTA smartly routes to video or booking) */}
        <RoiCalculator
          t={t}
          onBookClick={handleCtaClick}
        />

        {/* SECTION D — SUPPORTING CONTENT: 3. TRADITIONAL WORKFLOW VS IBONDA (Red & Green accents) */}
        <WorkflowComparison t={t} />

        {/* SECTION 1 & 5 — VIDEO-GATED CONSULTATION BOOKING & CALENDAR SYSTEM */}
        <BookingSection
          t={t}
          isUnlocked={videoCompleted}
          onScrollToVideo={scrollToVideo}
        />

        {/* SECTION 6 — FAQ ACCORDION (3 selected questions, before footer) */}
        <FaqSection t={t} />
      </main>

      {/* SECTION 7 & 9 — FOOTER (Contact block removed) */}
      <Footer t={t} />
    </div>
  );
}
