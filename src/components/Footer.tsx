import React, { useState } from 'react';
import { Shield, FileText, X } from 'lucide-react';
import { Translations } from '../translations';

interface FooterProps {
  t: Translations;
}

export const Footer: React.FC<FooterProps> = ({ t }) => {
  const [showPrivacyModal, setShowPrivacyModal] = useState<boolean>(false);
  const [showTermsModal, setShowTermsModal] = useState<boolean>(false);

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 pt-16 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Upper Footer Row: Brand, Description, Navigation (Contact Block Removed Completely) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-12 border-b border-slate-900 text-start">
          
          {/* Brand & Description (Col span 2) */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-sm bg-blue-500 inline-block" />
              <span className="font-latin text-2xl font-black text-white tracking-tight">IBONDA</span>
            </div>
            <p className="text-sm text-slate-400 max-w-lg leading-relaxed">
              {t.footer.desc}
            </p>
            <div className="text-xs text-slate-400 font-medium">
              {t.footer.tagline}
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              IBONDA
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#capabilities" className="hover:text-blue-400 transition-colors">
                  {t.nav.capabilities}
                </a>
              </li>
              <li>
                <a href="#benefits" className="hover:text-blue-400 transition-colors">
                  {t.nav.benefits}
                </a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-blue-400 transition-colors">
                  {t.nav.calculator}
                </a>
              </li>
              <li>
                <a href="#comparison" className="hover:text-blue-400 transition-colors">
                  {t.nav.comparison}
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-blue-400 transition-colors">
                  {t.nav.faq}
                </a>
              </li>
              <li>
                <a href="#booking" className="hover:text-blue-400 transition-colors">
                  {t.nav.booking}
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            {t.footer.copyright} · {t.footer.allRightsReserved}.
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setShowPrivacyModal(true)}
              className="hover:text-slate-300 transition-colors underline underline-offset-4 cursor-pointer"
            >
              {t.footer.privacyLink}
            </button>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={() => setShowTermsModal(true)}
              className="hover:text-slate-300 transition-colors underline underline-offset-4 cursor-pointer"
            >
              {t.footer.termsLink}
            </button>
            <span aria-hidden="true">·</span>
            <span>{t.footer.timezone}</span>
          </div>
        </div>

      </div>

      {/* Privacy Policy Modal with Moroccan CNDP compliance */}
      {showPrivacyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl text-start">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-400" />
                <h3 className="text-base font-bold text-white">
                  {t.footer.privacyModalTitle}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowPrivacyModal(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-xs text-slate-300 space-y-3 leading-relaxed max-h-72 overflow-y-auto pe-1">
              <p>
                {t.footer.privacyIntro}
              </p>
              <p>
                <strong>{t.footer.privacySection1Title}</strong> {t.footer.privacySection1Text}
              </p>
              <p>
                <strong>{t.footer.privacySection2Title}</strong> {t.footer.privacySection2Text}
              </p>
              <p>
                <strong>{t.footer.privacySection3Title}</strong> {t.footer.privacySection3Text}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 text-end">
              <button
                type="button"
                onClick={() => setShowPrivacyModal(false)}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
              >
                {t.footer.closeModal}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Terms and Conditions Modal */}
      {showTermsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl text-start">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-400" />
                <h3 className="text-base font-bold text-white">
                  {t.footer.termsModalTitle}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowTermsModal(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-xs text-slate-300 space-y-3 leading-relaxed max-h-72 overflow-y-auto pe-1">
              <p>
                {t.footer.termsIntro}
              </p>
              <p>
                <strong>{t.footer.termsSection1Title}</strong> {t.footer.termsSection1Text}
              </p>
              <p>
                <strong>{t.footer.termsSection2Title}</strong> {t.footer.termsSection2Text}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 text-end">
              <button
                type="button"
                onClick={() => setShowTermsModal(false)}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
              >
                {t.footer.closeModal}
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
