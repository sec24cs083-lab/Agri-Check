import React from 'react';
import { 
  TrendingUp, 
  IndianRupee, 
  ShieldAlert, 
  AlertCircle, 
  CloudRain, 
  Droplets, 
  Sprout, 
  Bug, 
  Store
} from 'lucide-react';
import { Language } from '../../types/agri';
import { translations } from '../../data/translations';
import { DisclaimerBadge } from '../Disclaimers';

interface ProfitRiskScreenProps {
  language: Language;
}

export const ProfitRiskScreen: React.FC<ProfitRiskScreenProps> = ({ language }) => {
  const t = translations[language];

  const riskFactors = [
    { name: 'Weather Risk (மழை வாய்ப்பு)', score: 20, level: 'Low', icon: CloudRain, color: 'bg-emerald-500' },
    { name: 'Water Stress (நீர் தேவை)', score: 40, level: 'Medium', icon: Droplets, color: 'bg-amber-500' },
    { name: 'Soil Quality (மண் வளம்)', score: 15, level: 'Low', icon: Sprout, color: 'bg-emerald-500' },
    { name: 'Pest & Disease (பூச்சி தாக்குதல்)', score: 35, level: 'Medium', icon: Bug, color: 'bg-amber-500' },
    { name: 'Market Price (சந்தை விலை)', score: 30, level: 'Medium', icon: Store, color: 'bg-amber-500' },
  ];

  return (
    <div className="space-y-4 pb-20 pt-1 animate-in fade-in duration-200">
      {/* Financial Overview Banner */}
      <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-stone-900 text-white rounded-3xl p-5 shadow-lg space-y-4">
        <div>
          <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider block">
            {language === 'en' ? 'Farm Decision Matrix' : 'பண்ணை நிதி & அபாய மேலாண்மை'}
          </span>
          <h2 className="text-xl font-extrabold text-white mt-0.5">
            {t.profitRiskTitle}
          </h2>
          <p className="text-xs text-emerald-100/90 font-medium mt-1">
            {language === 'en'
              ? 'Projections for Groundnut on 2.5 acres in Salem District.'
              : 'உங்கள் 2.5 ஏக்கர் நிலத்தில் மணிலா சாகுபடிக்கான கணக்கீடு.'}
          </p>
        </div>

        {/* Big Profit Hero Badge */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-emerald-200 uppercase block">
              {t.estProfitLabel}
            </span>
            <span className="text-3xl font-black text-amber-300 mt-0.5 block">
              ₹48,000
            </span>
            <span className="text-[10px] text-emerald-200 font-semibold">
              Per Acre Net Return
            </span>
          </div>

          <div className="text-right">
            <span className="text-[10px] font-bold text-emerald-200 uppercase block">
              {t.riskScoreLabel}
            </span>
            <span className="text-2xl font-black text-emerald-400 mt-0.5 block">
              28 / 100
            </span>
            <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-500 text-stone-950 inline-block mt-0.5">
              {t.lowRisk}
            </span>
          </div>
        </div>

        {/* Breakdown Row */}
        <div className="grid grid-cols-2 gap-2 text-center text-xs pt-1">
          <div className="bg-white/5 p-3 rounded-xl border border-white/10">
            <span className="text-[10px] text-emerald-200 uppercase font-semibold block">{t.estInvestment}</span>
            <span className="text-base font-extrabold text-white mt-0.5 block">₹22,000 / Acre</span>
          </div>
          <div className="bg-white/5 p-3 rounded-xl border border-white/10">
            <span className="text-[10px] text-emerald-200 uppercase font-semibold block">{t.estRevenueLabel}</span>
            <span className="text-base font-extrabold text-white mt-0.5 block">₹70,000 / Acre</span>
          </div>
        </div>
      </div>

      {/* Mandatory Financial Disclaimer */}
      <DisclaimerBadge language={language} variant="financialNote" />

      {/* Risk Factors Breakdown */}
      <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-sm space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-stone-100">
          <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-emerald-600" />
            {t.riskFactorBreakdown}
          </h3>
          <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            Overall Low (28/100)
          </span>
        </div>

        <div className="space-y-3">
          {riskFactors.map((factor, idx) => {
            const Icon = factor.icon;

            return (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-stone-800 flex items-center gap-1.5">
                    <Icon className="w-4 h-4 text-stone-500 shrink-0" />
                    {factor.name}
                  </span>
                  <span className="font-extrabold text-stone-900">{factor.level} ({factor.score}%)</span>
                </div>
                <div className="w-full bg-stone-100 h-2.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${factor.color}`}
                    style={{ width: `${factor.score}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
