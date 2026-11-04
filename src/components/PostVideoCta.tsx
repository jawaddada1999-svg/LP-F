import React from 'react';
import { Calendar, ArrowDown, Sparkles } from 'lucide-react';
import { Translations } from '../translations';

interface PostVideoCtaProps {
  isVisible: boolean;
  onBookClick: () => void;
  t: Translations;
}

export const PostVideoCta: React.FC<PostVideoCtaProps> = ({
  isVisible,
  onBookClick,
  t,
}) => {
  if (!isVisible) return null;

  return (
    <div className="w-full max-w-2xl mx-auto mt-8 px-4 text-center animate-in fade-in zoom-in-95 duration-500">
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-blue-950/70 to-slate-900/90 border border-blue-500/30 shadow-xl shadow-blue-950/40 relative overflow-hidden">
        <div className="relative z-10 flex flex-col items-center">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-400 mb-2">
            <Sparkles className="w-4 h-4" />
            <span>{t.postCta.badge}</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
            {t.postCta.title}
          </h3>

          <p className="text-sm text-slate-300 max-w-lg mb-6 leading-relaxed">
            {t.postCta.subtitle}
          </p>

          <button
            type="button"
            onClick={onBookClick}
            className="w-full sm:w-auto px-8 py-4 text-base font-bold text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 rounded-xl transition-all duration-200 shadow-xl shadow-blue-600/40 hover:shadow-blue-600/60 hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-3"
          >
            <Calendar className="w-5 h-5" />
            <span>{t.postCta.button}</span>
            <ArrowDown className="w-4 h-4" />
          </button>

          <p className="text-xs text-slate-400 mt-3 font-medium">
            {t.postCta.note}
          </p>
        </div>
      </div>
    </div>
  );
};
