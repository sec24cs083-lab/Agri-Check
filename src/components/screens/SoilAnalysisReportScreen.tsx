import React from 'react';
import { 
  Award, 
  Sparkles, 
  Info, 
  ChevronRight, 
  FlaskConical, 
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { SoilAnalysisReport, Language } from '../../types/agri';
import { translations } from '../../data/translations';
import { DisclaimerBadge } from '../Disclaimers';

interface SoilAnalysisReportScreenProps {
  report: SoilAnalysisReport;
  language: Language;
  onNavigate: (screenId: string) => void;
}

export const SoilAnalysisReportScreen: React.FC<SoilAnalysisReportScreenProps> = ({
  report,
  language,
  onNavigate,
}) => {
  const t = translations[language];

  return (
    <div className="space-y-4 pb-20 pt-1 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-emerald-600 text-white rounded-[28px] p-5 shadow-lg relative overflow-hidden border border-emerald-500">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-bold text-emerald-100 bg-white/20 px-3 py-1 rounded-full border border-white/20 uppercase tracking-widest">
            {t.reportTitle}
          </span>
          <div className="flex items-center gap-1.5 bg-white/20 px-2.5 py-1 rounded-full text-white text-xs font-bold border border-white/20">
            <ShieldCheck className="w-4 h-4 text-emerald-200" />
            <span>{t.aiConfidenceLabel}: {report.aiConfidence}%</span>
          </div>
        </div>

        {/* Score Radial Box */}
        <div className="flex items-center justify-between gap-4 py-2">
          <div>
            <span className="text-[10px] font-bold text-emerald-100 block uppercase tracking-wider">
              {t.soilHealthScore}
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-4xl font-black text-white">{report.healthScore}</span>
              <span className="text-sm font-bold text-emerald-100">/ 100</span>
            </div>
            <span className="inline-block mt-2 text-xs font-bold px-3 py-1 rounded-full bg-white text-emerald-800">
              {t.good} ({report.status})
            </span>
          </div>

          <div className="w-20 h-20 rounded-full border-4 border-white/30 bg-white/10 flex flex-col items-center justify-center p-2 text-center shrink-0 shadow-inner">
            <Award className="w-7 h-7 text-amber-300 mb-0.5" />
            <span className="text-[9px] font-bold text-emerald-100 uppercase">Quality</span>
          </div>
        </div>

        <p className="text-xs text-emerald-50 leading-relaxed bg-white/15 p-3 rounded-2xl border border-white/20 mt-3 font-medium">
          {report.summaryText[language]}
        </p>
      </div>

      {/* Mandatory Lab Disclaimer Banner */}
      <DisclaimerBadge language={language} variant="labNote" />

      {/* Breakdown Grid */}
      <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-sm space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-stone-100">
          <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
            <FlaskConical className="w-4 h-4 text-emerald-600" />
            {t.npkBreakdownTitle}
          </h3>
          <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
            {t.aiEstimateBadge}
          </span>
        </div>

        <div className="space-y-2.5">
          {/* Nitrogen */}
          <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/80 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-stone-900 block">{t.nitrogen}</span>
              <span className="text-[11px] text-stone-500 font-medium">{report.npkData.nitrogen.val}</span>
            </div>
            <div className="text-right">
              <span className="inline-block text-xs font-bold px-2.5 py-1 rounded-full bg-rose-100 text-rose-800 border border-rose-200">
                {report.npkData.nitrogen.level}
              </span>
              <span className="block text-[10px] text-amber-700 font-medium mt-0.5">Estimated</span>
            </div>
          </div>

          {/* Phosphorus */}
          <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/80 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-stone-900 block">{t.phosphorus}</span>
              <span className="text-[11px] text-stone-500 font-medium">{report.npkData.phosphorus.val}</span>
            </div>
            <div className="text-right">
              <span className="inline-block text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                {report.npkData.phosphorus.level}
              </span>
              <span className="block text-[10px] text-amber-700 font-medium mt-0.5">Estimated</span>
            </div>
          </div>

          {/* Potassium */}
          <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/80 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-stone-900 block">{t.potassium}</span>
              <span className="text-[11px] text-stone-500 font-medium">{report.npkData.potassium.val}</span>
            </div>
            <div className="text-right">
              <span className="inline-block text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                {report.npkData.potassium.level}
              </span>
              <span className="block text-[10px] text-amber-700 font-medium mt-0.5">Estimated</span>
            </div>
          </div>

          {/* Organic Matter */}
          <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/80 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-stone-900 block">{t.organicMatter}</span>
              <span className="text-[11px] text-stone-500 font-medium">{report.npkData.organicMatter.val}</span>
            </div>
            <div className="text-right">
              <span className="inline-block text-xs font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                {report.npkData.organicMatter.level}
              </span>
              <span className="block text-[10px] text-amber-700 font-medium mt-0.5">Estimated</span>
            </div>
          </div>

          {/* pH (Sensor validated) */}
          <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200/80 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-stone-900 block">{t.phValue}</span>
              <span className="text-[11px] text-stone-600 font-medium">{report.npkData.ph.val} (ESP32 Sensor)</span>
            </div>
            <div className="text-right">
              <span className="inline-block text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-600 text-white">
                Good (6.7)
              </span>
              <span className="block text-[10px] text-emerald-700 font-medium mt-0.5">Sensor Verified</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action CTA Buttons */}
      <div className="space-y-2 pt-1">
        <button
          onClick={() => onNavigate('crops')}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black text-base py-4 rounded-2xl shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-98 cursor-pointer"
        >
          <span>{t.viewCropRecsBtn}</span>
          <ArrowRight className="w-5 h-5" />
        </button>

        <button
          onClick={() => onNavigate('fertilizer')}
          className="w-full bg-white hover:bg-stone-50 text-stone-900 border border-stone-300 font-extrabold text-sm py-3.5 rounded-2xl shadow-xs flex items-center justify-center gap-2 transition-transform active:scale-98 cursor-pointer"
        >
          <FlaskConical className="w-4 h-4 text-purple-600" />
          <span>{t.viewFertilizerBtn}</span>
        </button>
      </div>
    </div>
  );
};
