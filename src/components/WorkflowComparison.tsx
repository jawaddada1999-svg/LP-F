import React from 'react';
import { X, Check } from 'lucide-react';
import { Translations } from '../translations';

interface WorkflowComparisonProps {
  t: Translations;
}

export const WorkflowComparison: React.FC<WorkflowComparisonProps> = ({ t }) => {
  return (
    <section id="comparison" className="py-24 bg-white text-slate-900 border-t border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16 text-start">
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 mb-2">
            <span>{t.comparison.kicker}</span>
            <span aria-hidden="true">·</span>
            <span>{t.comparison.category}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight mb-4">
            {t.comparison.title}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            {t.comparison.subtitle}
          </p>
        </div>

        {/* Comparison Cards Side-by-Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Traditional Workflow Card (RED ACCENTS) */}
          <div className="rounded-2xl border-2 border-rose-300 bg-rose-50/20 p-6 sm:p-8 flex flex-col justify-between relative shadow-sm">
            {/* Top Red Status Accent Badge */}
            <div className="absolute top-0 end-8 -translate-y-1/2 bg-rose-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md font-latin">
              {t.comparison.traditionalBadge}
            </div>

            <div>
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-rose-200/80">
                <div>
                  <span className="text-xs font-bold text-rose-600 block mb-1">
                    {t.comparison.traditionalBadge}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900">
                    {t.comparison.traditionalTitle}
                  </h3>
                </div>
                <div className="w-9 h-9 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center font-bold">
                  <X className="w-5 h-5" />
                </div>
              </div>

              <div className="space-y-6">
                {t.comparison.items.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
                      <X className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900 mb-0.5">
                        {item.category}
                      </h4>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {item.traditional}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Result Line in RED */}
            <div className="mt-8 pt-6 border-t border-rose-200 text-xs font-semibold text-rose-600 text-start">
              {t.comparison.traditionalFooter}
            </div>
          </div>

          {/* IBONDA Workflow Card (GREEN ACCENTS) */}
          <div className="rounded-2xl border-2 border-emerald-500/50 bg-emerald-50/25 p-6 sm:p-8 relative shadow-lg shadow-emerald-500/5 flex flex-col justify-between">
            {/* Top Green Highlight Accent Badge */}
            <div className="absolute top-0 end-8 -translate-y-1/2 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md font-latin">
              {t.comparison.ibondaBadge}
            </div>

            <div>
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-emerald-200/80">
                <div>
                  <span className="text-xs font-bold text-emerald-600 block mb-1">
                    {t.comparison.ibondaBadge}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900">
                    {t.comparison.ibondaTitle}
                  </h3>
                </div>
                <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shadow-md shadow-emerald-600/30">
                  <Check className="w-5 h-5" />
                </div>
              </div>

              <div className="space-y-6">
                {t.comparison.items.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900 mb-0.5">
                        {item.category}
                      </h4>
                      <p className="text-sm text-slate-700 leading-relaxed">
                        {item.ibonda}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Result Line in GREEN */}
            <div className="mt-8 pt-6 border-t border-emerald-200 text-xs font-semibold text-emerald-700 text-start">
              {t.comparison.ibondaFooter}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
