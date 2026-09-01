import React from 'react';
import { Language, Prediction } from '../../types/agri';

interface ExplanationScreenProps {
  language: Language;
  prediction: Prediction | null;
  onNavigate: (screen: string) => void;
}

const tx = {
  en: {
    title: 'Why this result?',
    subtitle: 'AI reasoning factors',
    disclaimer: 'These explanations are based on pattern matching and contextual data. They are not medically or agronomically certified diagnoses.',
    factors: 'Contributing Factors',
    guidance: 'Full Management Guidance',
    backToResult: 'Back to Result',
    giveFeedback: 'Was AI correct?',
    noData: 'No prediction available.',
    similarCases: 'Similar Historical Cases',
    expertNote: 'Expert Consultation Recommended',
    expertText: 'For low confidence predictions or novel symptoms, always consult a qualified agricultural extension officer.',
  },
  ta: {
    title: 'ஏன் இந்த முடிவு?',
    subtitle: 'AI காரண காரியங்கள்',
    disclaimer: 'இந்த விளக்கங்கள் வடிவமான பொருத்தம் மற்றும் சூழல் தரவை அடிப்படையாகக் கொண்டவை. இவை அதிகாரப்பூர்வ விவசாய நோய் கண்டறிதல் அல்ல.',
    factors: 'காரண காரியங்கள்',
    guidance: 'முழு மேலாண்மை வழிகாட்டல்',
    backToResult: 'முடிவுக்கு திரும்பு',
    giveFeedback: 'AI சரியா?',
    noData: 'எந்த முன்னறிவிப்பும் இல்லை.',
    similarCases: 'ஒத்த வரலாற்று வழக்குகள்',
    expertNote: 'நிபுணர் ஆலோசனை',
    expertText: 'குறைந்த நம்பகத்தன்மை அல்லது புதிய அறிகுறிகளுக்கு வேளாண்மை நிபுணரை அணுகவும்.',
  },
};

const FACTOR_COLORS = ['#dcfce7', '#dbeafe', '#fef3c7', '#f3e8ff', '#ffe4e6'];
const FACTOR_TEXT_COLORS = ['#15803d', '#1d4ed8', '#92400e', '#7c3aed', '#be123c'];

export const ExplanationScreen: React.FC<ExplanationScreenProps> = ({ language, prediction, onNavigate }) => {
  const T = tx[language];

  if (!prediction) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-gray-500 text-sm">{T.noData}</p>
        <button onClick={() => onNavigate('scan')} className="mt-4 px-6 py-2 rounded-xl text-sm font-bold text-white"
          style={{ background: '#22c55e' }}>Scan Crop</button>
      </div>
    );
  }

  return (
    <div className="pb-6 space-y-4">
      {/* Header card */}
      <div className="rounded-2xl p-4" style={{ background: 'linear-gradient(135deg, #0f3d0f, #1a5e1a)', color: 'white' }}>
        <p className="text-xs text-green-300 font-semibold uppercase tracking-wider mb-1">{T.subtitle}</p>
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-black">{prediction.disease}</h2>
            <p className="text-green-300 text-sm mt-1">{prediction.crop} • {Math.round(prediction.confidence * 100)}% confidence</p>
          </div>
          <div className="px-3 py-1.5 rounded-xl text-xs font-black"
            style={{ background: prediction.risk_level === 'HIGH' ? '#dc2626' : prediction.risk_level === 'MEDIUM' ? '#d97706' : '#16a34a' }}>
            {prediction.risk_level}
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="px-4 py-3 rounded-xl" style={{ background: '#f0f9ff', border: '1px solid #bae6fd' }}>
        <p className="text-xs text-blue-700 leading-relaxed">ℹ️ {T.disclaimer}</p>
      </div>

      {/* Contributing Factors */}
      <div className="rounded-2xl p-4" style={{ background: 'white', boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}>
        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">🔍 {T.factors}</p>
        <div className="space-y-3">
          {prediction.explanation.map((factor, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-xl"
              style={{ background: FACTOR_COLORS[i % FACTOR_COLORS.length] }}>
              <span className="text-xl flex-shrink-0">{factor.icon}</span>
              <div>
                <p className="text-sm font-bold" style={{ color: FACTOR_TEXT_COLORS[i % FACTOR_TEXT_COLORS.length] }}>
                  {factor.factor}
                </p>
                <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">{factor.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full Guidance */}
      <div className="rounded-2xl p-4" style={{ background: 'white', boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}>
        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">📋 {T.guidance}</p>
        <div className="space-y-3">
          {prediction.management_guidance.map((g, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5"
                style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)', color: 'white' }}>
                {i + 1}
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">{g}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Expert Note */}
      <div className="rounded-2xl p-4" style={{ background: '#fffbeb', border: '1.5px solid #fcd34d' }}>
        <p className="text-sm font-bold text-amber-800 mb-1">👨‍🌾 {T.expertNote}</p>
        <p className="text-xs text-amber-700 leading-relaxed">{T.expertText}</p>
      </div>

      {/* Action Buttons */}
      <button onClick={() => onNavigate('feedback')}
        className="w-full py-4 rounded-2xl text-white font-black text-base transition-all active:scale-95"
        style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)', boxShadow: '0 8px 24px rgba(34,197,94,0.3)' }}>
        👤 {T.giveFeedback}
      </button>
      <button onClick={() => onNavigate('analysis')}
        className="w-full py-3 rounded-2xl font-bold text-sm transition-all active:scale-95"
        style={{ background: 'white', color: '#374151', border: '1px solid #e5e7eb' }}>
        ← {T.backToResult}
      </button>
    </div>
  );
};
