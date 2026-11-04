import React from 'react';
import {
  Users,
  MessageSquare,
  CheckCircle,
  CalendarDays,
  BellRing,
  FolderKanban,
  Building2,
  LayoutDashboard,
} from 'lucide-react';
import { Translations } from '../translations';

interface CapabilitiesSectionProps {
  t: Translations;
}

export const CapabilitiesSection: React.FC<CapabilitiesSectionProps> = ({ t }) => {
  const icons = [
    Users,
    MessageSquare,
    CheckCircle,
    CalendarDays,
    BellRing,
    FolderKanban,
    Building2,
    LayoutDashboard,
  ];

  const colSpans = [
    'md:col-span-2',
    'md:col-span-1',
    'md:col-span-1',
    'md:col-span-2',
    'md:col-span-1',
    'md:col-span-1',
    'md:col-span-1',
    'md:col-span-3',
  ];

  return (
    <section id="capabilities" className="py-24 bg-white text-slate-900 border-t border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-start">
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 mb-2">
            <span>{t.capabilities.kicker}</span>
            <span aria-hidden="true">·</span>
            <span>{t.capabilities.category}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight mb-4">
            {t.capabilities.title}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            {t.capabilities.subtitle}
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.capabilities.items.map((cap, idx) => {
            const Icon = icons[idx] || Users;
            const colSpan = colSpans[idx] || 'md:col-span-1';
            return (
              <div
                key={idx}
                className={`${colSpan} p-6 sm:p-7 rounded-2xl bg-slate-50/70 border border-slate-200 hover:border-blue-400 hover:bg-white transition-all duration-200 group flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors flex items-center justify-center border border-blue-100">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-medium text-slate-500 font-latin">
                      0{idx + 1}. {cap.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {cap.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {cap.desc}
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
