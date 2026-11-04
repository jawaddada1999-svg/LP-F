import React, { useState } from 'react';
import {
  TrendingDown,
  DollarSign,
  AlertTriangle,
  Calendar,
  Sparkles,
  Info
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { Translations } from '../translations';

interface RoiCalculatorProps {
  t: Translations;
  onBookClick: () => void;
}

export const RoiCalculator: React.FC<RoiCalculatorProps> = ({ t, onBookClick }) => {
  const [leadsLost, setLeadsLost] = useState<number>(10);
  const [avgCommission, setAvgCommission] = useState<number>(5000);
  const [closingRate, setClosingRate] = useState<number>(10);

  // Math Calculations
  const closingRateFraction = closingRate / 100;
  const lostDealsPerMonth = Math.round(leadsLost * closingRateFraction * 10) / 10;
  const moneyLostPerMonth = Math.round(lostDealsPerMonth * avgCommission);
  const moneyLostPerYear = Math.round(moneyLostPerMonth * 12);

  // Danger Level determination
  const getDangerInfo = (monthlyLoss: number) => {
    if (monthlyLoss < 10000) {
      return {
        level: 'low',
        color: '#10b981', // Emerald green
        badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
        label: t.calculator.dangerLow,
        message: t.calculator.dangerMsgLow,
      };
    } else if (monthlyLoss <= 50000) {
      return {
        level: 'medium',
        color: '#f59e0b', // Amber/Orange
        badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
        label: t.calculator.dangerMedium,
        message: t.calculator.dangerMsgMedium,
      };
    } else {
      return {
        level: 'high',
        color: '#ef4444', // Red
        badgeColor: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
        label: t.calculator.dangerHigh,
        message: t.calculator.dangerMsgHigh,
      };
    }
  };

  const currentDanger = getDangerInfo(moneyLostPerMonth);

  // 4 Scenarios Bar Data
  const calculateLossForLeads = (leads: number) => {
    const deals = Math.round(leads * closingRateFraction * 10) / 10;
    return Math.round(deals * avgCommission);
  };

  const chartData = [
    {
      name: t.calculator.chartScenario1,
      loss: calculateLossForLeads(10),
      isUser: false,
    },
    {
      name: t.calculator.chartScenario2,
      loss: calculateLossForLeads(25),
      isUser: false,
    },
    {
      name: t.calculator.chartScenario3,
      loss: calculateLossForLeads(50),
      isUser: false,
    },
    {
      name: `${t.calculator.chartCurrentScenario} (${leadsLost})`,
      loss: moneyLostPerMonth,
      isUser: true,
    },
  ];

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('fr-MA', { maximumFractionDigits: 0 }).format(val);
  };

  return (
    <section id="calculator" className="py-24 bg-slate-950 text-slate-100 border-t border-slate-900 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/10 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-start">
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 mb-2">
            <span>{t.calculator.kicker}</span>
            <span aria-hidden="true">·</span>
            <span>{t.calculator.category}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            {t.calculator.title}
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            {t.calculator.subtitle}
          </p>
        </div>

        {/* Calculator Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column (Inputs: Sliders + Numbers) */}
          <div className="lg:col-span-6 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-7 backdrop-blur-md">
            
            {/* Input 1: Leads Lost Per Month */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold text-slate-200">
                  {t.calculator.leadsLostLabel}
                </label>
                <div className="flex items-center gap-1.5">
                  <input
                    type="number"
                    min={1}
                    max={200}
                    value={leadsLost}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      if (!isNaN(val)) setLeadsLost(Math.max(1, Math.min(200, val)));
                    }}
                    className="w-20 bg-slate-950 border border-slate-700 focus:border-blue-500 rounded-lg px-2.5 py-1 text-sm font-bold text-blue-400 text-center focus:outline-none"
                  />
                  <span className="text-xs text-slate-400">/ شهر</span>
                </div>
              </div>
              <input
                type="range"
                min={1}
                max={200}
                value={leadsLost}
                onChange={(e) => setLeadsLost(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                <span>1</span>
                <span>100</span>
                <span>200</span>
              </div>
            </div>

            {/* Input 2: Average Commission per Closed Deal in MAD */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold text-slate-200">
                  {t.calculator.avgCommissionLabel}
                </label>
                <div className="flex items-center gap-1.5">
                  <input
                    type="number"
                    min={500}
                    max={100000}
                    step={500}
                    value={avgCommission}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      if (!isNaN(val)) setAvgCommission(Math.max(500, Math.min(100000, val)));
                    }}
                    className="w-24 bg-slate-950 border border-slate-700 focus:border-blue-500 rounded-lg px-2.5 py-1 text-sm font-bold text-blue-400 text-center focus:outline-none"
                  />
                  <span className="text-xs text-slate-400">MAD</span>
                </div>
              </div>
              <input
                type="range"
                min={500}
                max={100000}
                step={500}
                value={avgCommission}
                onChange={(e) => setAvgCommission(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                <span>500 MAD</span>
                <span>50,000 MAD</span>
                <span>100,000 MAD</span>
              </div>
            </div>

            {/* Input 3: Closing Rate from Leads */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold text-slate-200">
                  {t.calculator.closingRateLabel}
                </label>
                <div className="flex items-center gap-1.5">
                  <input
                    type="number"
                    min={1}
                    max={50}
                    value={closingRate}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      if (!isNaN(val)) setClosingRate(Math.max(1, Math.min(50, val)));
                    }}
                    className="w-20 bg-slate-950 border border-slate-700 focus:border-blue-500 rounded-lg px-2.5 py-1 text-sm font-bold text-blue-400 text-center focus:outline-none"
                  />
                  <span className="text-xs text-slate-400">%</span>
                </div>
              </div>
              <input
                type="range"
                min={1}
                max={50}
                value={closingRate}
                onChange={(e) => setClosingRate(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                <span>1%</span>
                <span>25%</span>
                <span>50%</span>
              </div>
            </div>

            {/* Output KPI Mini Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-800">
              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-start">
                <div className="text-[11px] text-slate-400 mb-1">{t.calculator.lostDealsTitle}</div>
                <div className="text-lg font-extrabold text-white">
                  {lostDealsPerMonth} <span className="text-xs font-normal text-slate-400">{t.calculator.lostDealsUnit}</span>
                </div>
              </div>

              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-start">
                <div className="text-[11px] text-slate-400 mb-1">{t.calculator.moneyLostMonthTitle}</div>
                <div className="text-lg font-extrabold text-rose-400 font-latin">
                  {formatCurrency(moneyLostPerMonth)} <span className="text-xs font-normal text-slate-400">MAD</span>
                </div>
              </div>

              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-start">
                <div className="text-[11px] text-slate-400 mb-1">{t.calculator.moneyLostYearTitle}</div>
                <div className="text-lg font-extrabold text-amber-400 font-latin">
                  {formatCurrency(moneyLostPerYear)} <span className="text-xs font-normal text-slate-400">MAD</span>
                </div>
              </div>
            </div>

          </div>

          {/* Chart & Danger Evaluation Column */}
          <div className="lg:col-span-6 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between backdrop-blur-md space-y-6">
            
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <TrendingDown className="w-4 h-4 text-blue-400" />
                  <span>{t.calculator.chartTitle}</span>
                </h3>

                <div className={`text-xs px-2.5 py-1 rounded-full font-bold border ${currentDanger.badgeColor} flex items-center gap-1.5`}>
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>{currentDanger.label}</span>
                </div>
              </div>

              {/* Bar Chart Container */}
              <div className="h-64 w-full select-none" dir="ltr">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 20, right: 10, left: -10, bottom: 20 }}>
                    <XAxis
                      dataKey="name"
                      tick={{ fill: '#94a3b8', fontSize: 11 }}
                      axisLine={{ stroke: '#334155' }}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fill: '#94a3b8', fontSize: 10 }}
                      axisLine={{ stroke: '#334155' }}
                      tickLine={false}
                      tickFormatter={(v) => `${Math.round(v / 1000)}k`}
                    />
                    <Tooltip
                      cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
                      contentStyle={{
                        backgroundColor: '#0f172a',
                        borderColor: '#334155',
                        borderRadius: '0.75rem',
                        color: '#fff',
                        fontSize: '12px',
                      }}
                      formatter={(value: any) => [`${formatCurrency(Number(value))} MAD`, t.calculator.moneyLostMonthTitle]}
                    />
                    <Bar dataKey="loss" radius={[6, 6, 0, 0]}>
                      {chartData.map((entry, index) => {
                        const info = getDangerInfo(entry.loss);
                        return (
                          <Cell
                            key={`cell-${index}`}
                            fill={info.color}
                            stroke={entry.isUser ? '#ffffff' : 'none'}
                            strokeWidth={entry.isUser ? 2 : 0}
                          />
                        );
                      })}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Danger Level Evaluation Banner */}
              <div className={`mt-4 p-4 rounded-xl border ${currentDanger.badgeColor} text-start flex items-start gap-3`}>
                <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold mb-1">
                    {currentDanger.label} — {formatCurrency(moneyLostPerMonth)} MAD / شهر
                  </div>
                  <p className="text-xs leading-relaxed opacity-90">
                    {currentDanger.message}
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="space-y-3 pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={onBookClick}
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>{t.calculator.ctaButton}</span>
              </button>

              <p className="text-[11px] text-slate-500 flex items-center justify-center gap-1.5 text-center">
                <Info className="w-3.5 h-3.5" />
                <span>{t.calculator.disclaimer}</span>
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
