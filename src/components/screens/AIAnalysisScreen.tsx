import React, { useEffect, useState } from 'react';
import { Language, Prediction } from '../../types/agri';

interface AIAnalysisScreenProps {
  language: Language;
  prediction: Prediction | null;
  onNavigate: (screen: string) => void;
}

const tx = {
  en: {
    title: 'AI Analysis Result',
    demo: 'DEMO — Prediction simulated. Install real model for live inference.',
    crop: 'Crop',
    disease: 'Detected Disease',
    confidence: 'Confidence',
    riskLevel: 'Risk Level',
    diseaseRisk: 'Disease Risk',
    pestRisk: 'Pest Risk',
    viewExplanation: 'Why this result?',
    submitFeedback: 'Was AI correct?',
    guidance: 'Management Guidance',
    highConf: 'HIGH CONFIDENCE',
    modConf: 'MODERATE CONFIDENCE',
    lowConf: 'LOW CONFIDENCE — Please verify with an agriculture expert',
    scanAgain: 'Scan Again',
    history: 'View History',
    analyzing: 'Analyzing image...',
  },
  ta: {
    title: 'AI பகுப்பாய்வு முடிவு',
    demo: 'டெமோ — முன்னறிவிப்பு உருவகப்படுத்தப்பட்டது.',
    crop: 'பயிர்',
    disease: 'கண்டறிந்த நோய்',
    confidence: 'நம்பகத்தன்மை',
    riskLevel: 'ஆபத்து நிலை',
    diseaseRisk: 'நோய் ஆபத்து',
    pestRisk: 'பூச்சி ஆபத்து',
    viewExplanation: 'ஏன் இந்த முடிவு?',
    submitFeedback: 'AI சரியாக உள்ளதா?',
    guidance: 'மேலாண்மை வழிகாட்டல்',
    highConf: 'அதிக நம்பகத்தன்மை',
    modConf: 'மிதமான நம்பகத்தன்மை',
    lowConf: 'குறைந்த நம்பகத்தன்மை — வல்லுநரை அணுகவும்',
    scanAgain: 'மீண்டும் ஸ்கேன்',
    history: 'வரலாறு',
    analyzing: 'படம் பகுப்பாய்வு...',
  },
};

const RISK_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  HIGH: { bg: '#fef2f2', text: '#dc2626', border: '#fca5a5' },
  MEDIUM: { bg: '#fffbeb', text: '#d97706', border: '#fcd34d' },
  LOW: { bg: '#f0fdf4', text: '#16a34a', border: '#86efac' },
};

const CONF_COLORS: Record<string, string> = {
  HIGH: '#22c55e',
  MODERATE: '#f59e0b',
  LOW: '#ef4444',
};

export const AIAnalysisScreen: React.FC<AIAnalysisScreenProps> = ({ language, prediction, onNavigate }) => {
  const T = tx[language];
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  if (!prediction) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-500 text-sm">{T.analyzing}</p>
      </div>
    );
  }

  const risk = RISK_COLORS[prediction.risk_level] || RISK_COLORS.MEDIUM;
  const confColor = CONF_COLORS[prediction.confidence_level] || '#f59e0b';
  const confPct = Math.round(prediction.confidence * 100);

  return (
    <div className="pb-6 space-y-4"
      style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.5s ease-out' }}>

      {/* Demo Banner */}
      {prediction.is_demo && (
        <div className="px-3 py-2 rounded-xl flex items-center gap-2"
          style={{ background: '#fffbeb', border: '1px solid #fcd34d' }}>
          <span>⚠️</span>
          <p className="text-xs text-amber-800">{T.demo}</p>
        </div>
      )}

      {/* Main Result Card */}
      <div className="rounded-2xl overflow-hidden shadow-lg"
        style={{ border: `2px solid ${risk.border}`, background: risk.bg }}>
        <div className="px-4 pt-4 pb-2">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">{T.crop}</p>
              <p className="text-xl font-black text-gray-800 mt-0.5">{prediction.crop}</p>
            </div>
            <div className="px-3 py-1.5 rounded-xl text-xs font-black"
              style={{ background: risk.text, color: 'white' }}>
              {prediction.risk_level}
            </div>
          </div>
          
          <div className="mt-3 pt-3" style={{ borderTop: `1px solid ${risk.border}` }}>
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">{T.disease}</p>
            <div className="flex items-center gap-3 mt-1">
              <p className="text-2xl font-black" style={{ color: risk.text }}>{prediction.disease}</p>
              {prediction.disease !== 'Healthy' && <span className="text-2xl">🦠</span>}
              {prediction.disease === 'Healthy' && <span className="text-2xl">✅</span>}
            </div>
          </div>
        </div>

        {/* Confidence Bar */}
        <div className="px-4 py-3" style={{ background: 'rgba(255,255,255,0.6)', borderTop: `1px solid ${risk.border}` }}>
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-bold text-gray-600">{T.confidence}</p>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold" style={{ color: confColor }}>{prediction.confidence_level}</span>
              <span className="text-lg font-black" style={{ color: confColor }}>{confPct}%</span>
            </div>
          </div>
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all duration-1000"
              style={{ width: visible ? `${confPct}%` : '0%', background: `linear-gradient(90deg, ${confColor}, ${confColor}cc)` }} />
          </div>
          {prediction.confidence_level === 'LOW' && (
            <p className="text-xs text-red-600 mt-1 font-medium">⚠️ {T.lowConf}</p>
          )}
        </div>
      </div>

      {/* Risk Scores */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: T.diseaseRisk, value: prediction.disease_risk, icon: '🦠', color: '#dc2626' },
          { label: T.pestRisk, value: prediction.pest_risk, icon: '🐛', color: '#d97706' },
        ].map(({ label, value, icon, color }) => (
          <div key={label} className="rounded-2xl p-4 text-center"
            style={{ background: 'white', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
            <span className="text-2xl">{icon}</span>
            <p className="text-3xl font-black mt-1" style={{ color }}>{value}%</p>
            <p className="text-xs text-gray-500 font-semibold mt-1">{label}</p>
            <div className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${value}%`, background: color, transition: 'width 1s ease' }} />
            </div>
          </div>
        ))}
      </div>

      {/* Management Guidance */}
      {prediction.management_guidance && prediction.management_guidance.length > 0 && (
        <div className="rounded-2xl p-4" style={{ background: 'white', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">📋 {T.guidance}</p>
          <div className="space-y-2">
            {prediction.management_guidance.slice(0, 3).map((g, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5"
                  style={{ background: '#d1fae5', color: '#16a34a' }}>{i + 1}</span>
                <p className="text-xs text-gray-700">{g}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <button onClick={() => onNavigate('explanation')}
        className="w-full py-3.5 rounded-2xl text-white font-bold text-sm transition-all active:scale-95"
        style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)', boxShadow: '0 6px 20px rgba(34,197,94,0.3)' }}>
        🔍 {T.viewExplanation}
      </button>

      <button onClick={() => onNavigate('feedback')}
        className="w-full py-3.5 rounded-2xl font-bold text-sm transition-all active:scale-95"
        style={{ background: 'white', color: '#16a34a', border: '2px solid #22c55e', boxShadow: '0 4px 12px rgba(34,197,94,0.15)' }}>
        👤 {T.submitFeedback}
      </button>

      <div className="grid grid-cols-2 gap-3">
        <button onClick={() => onNavigate('scan')}
          className="py-3 rounded-xl font-semibold text-sm transition-all active:scale-95"
          style={{ background: '#f9fafb', color: '#374151', border: '1px solid #e5e7eb' }}>
          🔄 {T.scanAgain}
        </button>
        <button onClick={() => onNavigate('history')}
          className="py-3 rounded-xl font-semibold text-sm transition-all active:scale-95"
          style={{ background: '#f9fafb', color: '#374151', border: '1px solid #e5e7eb' }}>
          📋 {T.history}
        </button>
      </div>
    </div>
  );
};
