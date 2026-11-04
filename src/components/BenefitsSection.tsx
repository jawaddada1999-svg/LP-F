import React from 'react';
import {
  Clock,
  Target,
  Sparkles,
  ShieldCheck,
  Layers,
  TrendingUp,
} from 'lucide-react';
import { Translations } from '../translations';

interface BenefitsSectionProps {
  t: Translations;
}

export const BenefitsSection: React.FC<BenefitsSectionProps> = ({ t }) => {
  const icons = [
    Clock,
    Target,
    Sparkles,
    Layers,
    ShieldCheck,
    TrendingUp,
  ];

  return (
    <section id="benefits" className="py-24 bg-slate-50 text-slate-900 border-t border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title with GREEN ACCENTS per user requirement */}
        <div className="max-w-3xl mb-16 text-start">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 mb-2">
            <span>{t.benefits.kicker}</span>
            <span aria-hidden="true">·</span>
            <span>{t.benefits.category}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight mb-4">
            {t.benefits.title}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            {t.benefits.subtitle}
          </p>
        </div>

        {/* Benefits Cards with GREEN ACCENTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.benefits.items.map((b, i) => {
            const Icon = icons[i] || Clock;
            return (
              <div
                key={i}
                className="p-7 rounded-2xl bg-white border border-slate-200/90 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-500/5 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5 border border-emerald-100">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2.5">
                    {b.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {b.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
