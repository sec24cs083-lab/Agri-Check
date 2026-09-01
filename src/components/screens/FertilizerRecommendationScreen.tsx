import React from 'react';
import { 
  FlaskConical, 
  AlertTriangle, 
  CheckCircle2, 
  Info, 
  Leaf, 
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { Language } from '../../types/agri';
import { translations } from '../../data/translations';
import { DisclaimerBadge } from '../Disclaimers';

interface FertilizerRecommendationScreenProps {
  language: Language;
  onNavigate: (screenId: string) => void;
}

export const FertilizerRecommendationScreen: React.FC<FertilizerRecommendationScreenProps> = ({
  language,
  onNavigate,
}) => {
  const t = translations[language];

  return (
    <div className="space-y-4 pb-20 pt-1 animate-in fade-in duration-200">
      {/* Title */}
      <div className="bg-gradient-to-r from-purple-900 via-purple-800 to-indigo-900 text-white rounded-3xl p-5 shadow-lg flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-purple-200 uppercase tracking-wider block">
            {language === 'en' ? 'Agronomic Nutrition' : 'மண் உர வழிகாட்டி'}
          </span>
          <h2 className="text-xl font-extrabold text-white mt-0.5">
            {t.fertilizerTitle}
          </h2>
          <p className="text-xs text-purple-100 mt-1 max-w-xs font-medium">
            {language === 'en' 
              ? 'Balanced fertilizer guidance tailored for Groundnut & Paddy.'
              : 'உங்கள் பயிருக்கான சீரான உரப் பயன்பாடு வழிகாட்டுதல்.'}
          </p>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-3xl shrink-0 border border-white/15">
          🧪
        </div>
      </div>

      {/* Context Check Card */}
      <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-sm space-y-2 text-xs">
        <h3 className="font-bold text-stone-900 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          {language === 'en' ? 'Inputs Analyzed by AgriAI Engine:' : 'பகுப்பாய்வு செய்யப்பட்ட விவரங்கள்:'}
        </h3>
        <div className="grid grid-cols-2 gap-2 pt-1 font-semibold text-stone-700">
          <div className="p-2 bg-stone-50 rounded-xl border border-stone-100">
            ✓ Soil pH: <span className="font-extrabold text-stone-900">6.7 (Optimal)</span>
          </div>
          <div className="p-2 bg-stone-50 rounded-xl border border-stone-100">
            ✓ Weather: <span className="font-extrabold text-stone-900">65% Rain Tomorrow</span>
          </div>
          <div className="p-2 bg-stone-50 rounded-xl border border-stone-100">
            ✓ Moisture: <span className="font-extrabold text-stone-900">31% (ESP32)</span>
          </div>
          <div className="p-2 bg-stone-50 rounded-xl border border-stone-100">
            ✓ Previous Crop: <span className="font-extrabold text-stone-900">Groundnut</span>
          </div>
        </div>
      </div>

      {/* Primary Recommendation Card */}
      <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-md space-y-3">
        <div className="flex items-center gap-2 text-rose-700 font-bold text-xs bg-rose-50 p-2.5 rounded-xl border border-rose-200">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>"Nitrogen level appears to be low (AI Estimate)."</span>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-extrabold text-stone-900">
            {t.fertRecommendation}
          </h4>
          <p className="text-xs text-stone-600 leading-relaxed font-medium">
            {t.fertNote}
          </p>
        </div>

        {/* Action Guidelines */}
        <div className="space-y-2 pt-2 border-t border-stone-100 text-xs">
          <h5 className="font-bold text-stone-900">Recommended Agricultural Practices:</h5>
          <ul className="space-y-2 text-stone-700 font-medium">
            <li className="flex items-start gap-2 bg-emerald-50 p-2.5 rounded-xl border border-emerald-100">
              <Leaf className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Organic First:</strong> Apply 5 tonnes/acre of well-decomposed Farmyard Manure (FYM) or Vermicompost before sowing.</span>
            </li>
            <li className="flex items-start gap-2 bg-amber-50 p-2.5 rounded-xl border border-amber-100">
              <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span><strong>Split Dosage:</strong> Never apply all chemical nitrogen at once. Divide Urea dosage into 2–3 splits during early vegetative growth.</span>
            </li>
            <li className="flex items-start gap-2 bg-sky-50 p-2.5 rounded-xl border border-sky-100">
              <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
              <span><strong>Delay Broadcast:</strong> Do not broadcast fertilizer today due to 65% rain forecast tomorrow (prevents wash-off).</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Critical Safety Disclaimer */}
      <div className="bg-amber-50 rounded-2xl p-4 border border-amber-300 text-amber-950 text-xs leading-relaxed font-medium space-y-1">
        <p className="font-extrabold text-amber-900 flex items-center gap-1.5 text-sm">
          <AlertTriangle className="w-4 h-4 text-amber-700" />
          Safety Guidance
        </p>
        <p>
          "Confirm nutrient deficiency with a physical laboratory soil test before major commercial fertilizer application. Do not over-apply chemical nitrogen."
        </p>
      </div>

      <button
        onClick={() => onNavigate('schemes')}
        className="w-full bg-stone-900 hover:bg-stone-800 text-amber-400 font-extrabold text-xs py-3.5 rounded-2xl shadow-sm flex items-center justify-center gap-2 cursor-pointer"
      >
        <span>Check Fertilizer Subsidies under PM-KISAN & Schemes</span>
        <ChevronRight className="w-4 h-4" />
      </button>

      <DisclaimerBadge language={language} variant="labNote" />
    </div>
  );
};
