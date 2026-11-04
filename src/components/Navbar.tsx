import React from 'react';
import { Calendar, Globe } from 'lucide-react';
import { Language, Translations } from '../translations';

interface NavbarProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onBookClick: () => void;
  t: Translations;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onLanguageChange,
  onBookClick,
  t,
}) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4 sm:gap-8">
        
        {/* Zone 1: Single clean text wordmark */}
        <a 
          href="#" 
          className="font-latin text-2xl font-black tracking-tight text-white hover:text-blue-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
        >
          <span className="w-2.5 h-2.5 rounded-sm bg-blue-500 inline-block shadow-sm shadow-blue-500/50" />
          <span>IBONDA</span>
        </a>

        {/* Zone 2: Navigation Links (Desktop - Testimonials removed) */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
          <a 
            href="#capabilities" 
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            {t.nav.capabilities}
          </a>
          <a 
            href="#benefits" 
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            {t.nav.benefits}
          </a>
          <a 
            href="#calculator" 
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            {t.nav.calculator}
          </a>
          <a 
            href="#comparison" 
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            {t.nav.comparison}
          </a>
          <a 
            href="#faq" 
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            {t.nav.faq}
          </a>
          <a 
            href="#booking" 
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            {t.nav.booking}
          </a>
        </nav>

        {/* Zone 3: Language Switcher & Primary Action */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* Language Switcher */}
          <div className="relative flex items-center bg-slate-900 border border-slate-800 rounded-lg p-1 text-xs font-medium">
            <Globe className="w-3.5 h-3.5 text-slate-400 mx-1 hidden sm:block shrink-0" />
            <div className="flex items-center gap-0.5">
              <button
                type="button"
                onClick={() => onLanguageChange('ar')}
                className={`px-2 py-1 rounded transition-colors ${
                  currentLang === 'ar'
                    ? 'bg-blue-600 text-white font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="العربية"
              >
                العربية
              </button>
              <button
                type="button"
                onClick={() => onLanguageChange('en')}
                className={`px-2 py-1 rounded font-latin transition-colors ${
                  currentLang === 'en'
                    ? 'bg-blue-600 text-white font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="English"
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => onLanguageChange('fr')}
                className={`px-2 py-1 rounded font-latin transition-colors ${
                  currentLang === 'fr'
                    ? 'bg-blue-600 text-white font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Français"
              >
                FR
              </button>
            </div>
          </div>

          {/* Primary CTA Button: Scrolls to video if not completed, or booking form if completed */}
          <button
            type="button"
            onClick={onBookClick}
            className="px-3.5 sm:px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 rounded-lg transition-all shadow-md shadow-blue-600/30 whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>{t.nav.bookCta}</span>
          </button>
        </div>

      </div>
    </header>
  );
};
