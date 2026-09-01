import React from 'react';
import { 
  BookOpenCheck, 
  TrendingUp, 
  Calendar, 
  Award, 
  Sparkles, 
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { soilPassportRecords } from '../../data/mockAgriData';
import { Language } from '../../types/agri';
import { translations } from '../../data/translations';

interface SoilPassportScreenProps {
  language: Language;
}

export const SoilPassportScreen: React.FC<SoilPassportScreenProps> = ({ language }) => {
  const t = translations[language];

  return (
    <div className="space-y-4 pb-20 pt-1 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-blue-900 via-indigo-900 to-stone-900 text-white rounded-3xl p-5 shadow-lg space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-sky-300 uppercase tracking-wider block">
              {language === 'en' ? 'Long-term Digital Farm Audit' : 'டிஜிட்டல் மண் பாஸ்போர்ட்'}
            </span>
            <h2 className="text-xl font-extrabold text-white mt-0.5">
              {t.passportTitle}
            </h2>
            <p className="text-xs text-sky-100 font-medium mt-1">
              {t.passportSubtitle}
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-3xl shrink-0 border border-white/15">
            📘
          </div>
        </div>

        {/* Score Progression Badge */}
        <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/20 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-sky-200 uppercase block">
              {t.healthTrend}
            </span>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xl font-extrabold text-stone-300 line-through">78</span>
              <span className="text-stone-300 text-xs font-bold">→</span>
              <span className="text-xl font-extrabold text-sky-300">82</span>
              <span className="text-sky-300 text-xs font-bold">→</span>
              <span className="text-3xl font-black text-amber-300">84</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/20 px-2.5 py-1 rounded-full border border-emerald-500/30 inline-block">
              +6 Pts Improved 🎉
            </span>
          </div>
        </div>
      </div>

      {/* Historical Logs List */}
      <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-sm space-y-3">
        <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2 pb-2 border-b border-stone-100">
          <Calendar className="w-4 h-4 text-sky-600" />
          {t.historyLogs}
        </h3>

        <div className="space-y-3">
          {soilPassportRecords.map((record, idx) => (
            <div
              key={record.id}
              className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-2 relative"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-stone-900 bg-white px-2.5 py-1 rounded-lg border border-stone-200 shadow-2xs">
                  {record.monthYear} ({record.crop})
                </span>
                <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Score: {record.healthScore}/100
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-[11px] font-semibold text-stone-700 pt-1 border-t border-stone-200/60">
                <div>
                  <span className="text-[9px] text-stone-400 uppercase block">pH Level</span>
                  <span className="font-extrabold text-stone-900">{record.ph}</span>
                </div>
                <div>
                  <span className="text-[9px] text-stone-400 uppercase block">Moisture</span>
                  <span className="font-extrabold text-stone-900">{record.moisture}%</span>
                </div>
                <div>
                  <span className="text-[9px] text-stone-400 uppercase block">Organic Carbon</span>
                  <span className="font-extrabold text-stone-900">{record.organicMatter}</span>
                </div>
              </div>

              <p className="text-xs text-stone-600 font-medium leading-relaxed bg-white p-2 rounded-xl border border-stone-200/60">
                📝 {record.notes[language]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
