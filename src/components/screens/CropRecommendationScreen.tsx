import React from 'react';
import { 
  Award, 
  Droplets, 
  Clock, 
  IndianRupee, 
  TrendingUp, 
  SlidersHorizontal,
  ArrowRight,
  ShieldAlert,
  CheckCircle2
} from 'lucide-react';
import { cropRecommendations } from '../../data/mockAgriData';
import { Language } from '../../types/agri';
import { translations } from '../../data/translations';
import { DisclaimerBadge } from '../Disclaimers';

interface CropRecommendationScreenProps {
  language: Language;
  onNavigate: (screenId: string) => void;
  onSelectCrop: (cropName: string) => void;
}

export const CropRecommendationScreen: React.FC<CropRecommendationScreenProps> = ({
  language,
  onNavigate,
  onSelectCrop,
}) => {
  const t = translations[language];

  return (
    <div className="space-y-4 pb-20 pt-1 animate-in fade-in duration-200">
      {/* Title */}
      <div className="bg-emerald-600 text-white rounded-[28px] p-5 shadow-lg flex items-center justify-between border border-emerald-500">
        <div>
          <span className="text-[10px] font-bold text-emerald-100 uppercase tracking-widest block">
            {language === 'en' ? 'AI Crop Matcher' : 'AI பயிர் தேர்வு'}
          </span>
          <h2 className="text-xl font-bold text-white mt-0.5">
            {t.cropRecTitle}
          </h2>
          <p className="text-xs text-emerald-100 mt-1 max-w-xs font-medium">
            {language === 'en' 
              ? 'Ranked for your 2.5 acre farm in Salem based on soil pH (6.7) & rain forecast.'
              : 'உங்கள் மண் மற்றும் வானிலைக்கு உகந்த சிறந்த பயிர்கள்.'}
          </p>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-3xl shrink-0 border border-white/20">
          🥜
        </div>
      </div>

      {/* Simulator CTA */}
      <button
        onClick={() => onNavigate('simulator')}
        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm py-3.5 px-4 rounded-2xl shadow-md border border-emerald-500 flex items-center justify-between transition-transform active:scale-98 cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-white stroke-[2.2]" />
          <span className="font-extrabold">{t.compareCropsBtn}</span>
        </div>
        <ArrowRight className="w-5 h-5 stroke-[2.2]" />
      </button>

      {/* Ranked Crop Cards */}
      <div className="space-y-3.5">
        {cropRecommendations.map((crop) => {
          const isTopRank = crop.rank === 1;

          return (
            <div
              key={crop.id}
              className={`bg-white rounded-2xl p-4 border shadow-sm transition-all relative overflow-hidden ${
                isTopRank 
                  ? 'border-2 border-emerald-500 ring-2 ring-emerald-100' 
                  : 'border-stone-200 hover:border-stone-300'
              }`}
            >
              {/* Badge for Rank 1 */}
              {isTopRank && (
                <div className="bg-emerald-600 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-bl-xl absolute top-0 right-0 flex items-center gap-1 shadow-xs">
                  <Award className="w-3.5 h-3.5" />
                  <span>#1 Best Match</span>
                </div>
              )}

              {/* Crop Main Header */}
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-2xl bg-stone-100 flex items-center justify-center text-3xl shrink-0 border border-stone-200">
                  {crop.icon}
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-stone-900 leading-snug">
                    {crop.cropName[language]}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      {crop.suitabilityScore}% {t.suitability}
                    </span>
                    <span className="text-[11px] font-semibold text-stone-500">
                      {crop.season}
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-stone-600 font-medium leading-relaxed mt-2.5 bg-stone-50 p-2.5 rounded-xl border border-stone-100">
                {crop.description[language]}
              </p>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-stone-100 text-xs">
                <div className="flex items-center gap-2 bg-stone-50 p-2 rounded-xl">
                  <Droplets className="w-4 h-4 text-sky-600 shrink-0" />
                  <div>
                    <span className="text-[10px] font-bold text-stone-400 uppercase block">{t.waterReq}</span>
                    <span className="font-extrabold text-stone-800">{crop.waterRequirement}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-stone-50 p-2 rounded-xl">
                  <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                  <div>
                    <span className="text-[10px] font-bold text-stone-400 uppercase block">{t.duration}</span>
                    <span className="font-extrabold text-stone-800">{crop.growingDurationDays} Days</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-stone-50 p-2 rounded-xl">
                  <IndianRupee className="w-4 h-4 text-rose-600 shrink-0" />
                  <div>
                    <span className="text-[10px] font-bold text-stone-400 uppercase block">{t.estCost}/Acre</span>
                    <span className="font-extrabold text-stone-800">₹{crop.estimatedCostPerAcre.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-emerald-50 p-2 rounded-xl border border-emerald-200">
                  <TrendingUp className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <span className="text-[10px] font-bold text-emerald-800 uppercase block">{t.estProfit}/Acre</span>
                    <span className="font-black text-emerald-900">₹{crop.estimatedProfitPerAcre.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onSelectCrop(crop.cropName[language])}
                className="w-full mt-3 bg-stone-900 hover:bg-stone-800 text-white font-extrabold text-xs py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-transform active:scale-98 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Select {crop.cropName[language].split(' ')[0]} for Farm</span>
              </button>
            </div>
          );
        })}
      </div>

      <DisclaimerBadge language={language} variant="financialNote" />
    </div>
  );
};
