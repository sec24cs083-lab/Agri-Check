import React, { useState } from 'react';
import { 
  CloudSunRain, 
  Droplets, 
  Wind, 
  Thermometer, 
  Bug, 
  CheckCircle2, 
  AlertTriangle,
  Calendar,
  X
} from 'lucide-react';
import { weatherData } from '../../data/mockAgriData';
import { Language } from '../../types/agri';
import { translations } from '../../data/translations';

interface WeatherAdvisoryScreenProps {
  language: Language;
}

export const WeatherAdvisoryScreen: React.FC<WeatherAdvisoryScreenProps> = ({ language }) => {
  const [showPestModal, setShowPestModal] = useState(false);
  const t = translations[language];

  return (
    <div className="space-y-4 pb-20 pt-1 animate-in fade-in duration-200">
      {/* Current Weather Box */}
      <div className="bg-gradient-to-br from-sky-800 via-sky-700 to-indigo-900 text-white rounded-3xl p-5 shadow-lg relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-sky-200 uppercase tracking-wider block">
              {t.weatherTitle}
            </span>
            <h2 className="text-3xl font-black text-white mt-1">
              {weatherData.temperature}°C
            </h2>
            <p className="text-xs font-bold text-sky-100 mt-0.5">
              {weatherData.condition}
            </p>
          </div>
          <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-4xl border border-white/15 shadow-inner">
            🌧
          </div>
        </div>

        {/* Rain Alert Box */}
        <div className="bg-white/15 backdrop-blur-md p-3 rounded-2xl border border-white/20 mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Droplets className="w-5 h-5 text-sky-300 animate-bounce" />
            <span className="text-xs font-extrabold text-white">
              {t.rainProbTomorrow}
            </span>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-400 text-stone-950">
            Action Needed
          </span>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-2 mt-3 text-center text-xs pt-1 border-t border-white/10">
          <div>
            <span className="text-[10px] text-sky-200 font-semibold uppercase block">Humidity</span>
            <span className="text-sm font-extrabold text-white">{weatherData.humidity}%</span>
          </div>
          <div>
            <span className="text-[10px] text-sky-200 font-semibold uppercase block">Wind</span>
            <span className="text-sm font-extrabold text-white">{weatherData.windSpeed} km/h</span>
          </div>
          <div>
            <span className="text-[10px] text-sky-200 font-semibold uppercase block">Rain Prob</span>
            <span className="text-sm font-extrabold text-amber-300">{weatherData.rainProbabilityTomorrow}%</span>
          </div>
        </div>
      </div>

      {/* Actionable AI Advice */}
      <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-sm space-y-2.5">
        <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          {t.todaysAdvice}
        </h3>

        <div className="space-y-2">
          {weatherData.aiAdvice[language].map((advice, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-amber-50/80 border border-amber-200/80 text-xs font-semibold text-stone-900 leading-relaxed"
            >
              {advice}
            </div>
          ))}
        </div>
      </div>

      {/* Pest Risk Advisory Banner */}
      <div className="bg-rose-900 text-white rounded-2xl p-4 shadow-md flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-500 text-white flex items-center justify-center shrink-0">
            <Bug className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold text-rose-200 uppercase">
                {t.pestRiskTitle}
              </span>
              <span className="text-[10px] font-black bg-rose-500 text-white px-2 py-0.5 rounded-full">
                {t.pestRiskLevel}
              </span>
            </div>
            <p className="text-xs text-rose-100 font-medium mt-0.5 line-clamp-1">
              {weatherData.pestRiskReason[language]}
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowPestModal(true)}
          className="bg-white hover:bg-stone-100 text-rose-950 font-extrabold text-xs px-3 py-2 rounded-xl shrink-0 transition-transform active:scale-95 cursor-pointer"
        >
          View Details
        </button>
      </div>

      {/* 7-Day Forecast */}
      <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-sm space-y-3">
        <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-sky-600" />
          {t.forecast7Days}
        </h3>

        <div className="grid grid-cols-7 gap-1 text-center">
          {weatherData.forecast7Days.map((f, i) => (
            <div
              key={i}
              className={`p-2 rounded-xl border text-xs flex flex-col items-center justify-between gap-1 ${
                i === 0
                  ? 'bg-sky-50 border-sky-300 font-bold'
                  : 'bg-stone-50 border-stone-200/80'
              }`}
            >
              <span className="text-[10px] text-stone-500 font-bold">
                {language === 'ta' ? f.dayTa : f.day}
              </span>
              <span className="text-lg my-0.5">{f.icon}</span>
              <span className="text-xs font-black text-stone-900">{f.tempHigh}°</span>
              <span className="text-[9px] font-bold text-sky-600">{f.rainProb}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Pest Modal */}
      {showPestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl border border-stone-200 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-stone-100">
              <div className="flex items-center gap-2 text-rose-600">
                <Bug className="w-5 h-5" />
                <h3 className="font-extrabold text-base text-stone-900">
                  Pest Risk Analysis
                </h3>
              </div>
              <button
                onClick={() => setShowPestModal(false)}
                className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-rose-50 p-3 rounded-2xl border border-rose-200 text-xs text-rose-900 font-medium leading-relaxed">
              <strong>Cause:</strong> {weatherData.pestRiskReason[language]}
            </div>

            <div className="space-y-2 text-xs text-stone-800">
              <p className="font-bold text-stone-900">Recommended Prevention:</p>
              <ul className="space-y-1.5 list-disc pl-4 font-medium">
                <li>Spray Neem oil (3%) as an organic prophylactic solution.</li>
                <li>Ensure adequate field drainage after upcoming heavy rain.</li>
                <li>Avoid excessive nitrogenous fertilizer application.</li>
              </ul>
            </div>

            <button
              onClick={() => setShowPestModal(false)}
              className="w-full bg-stone-900 text-white font-bold py-3 rounded-xl text-xs cursor-pointer"
            >
              Close Advisory
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
