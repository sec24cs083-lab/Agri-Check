import React from 'react';
import { Language, Prediction, SensorData, WeatherData } from '../../types/agri';

interface DiseaseRiskScreenProps {
  language: Language;
  prediction: Prediction | null;
  sensor: SensorData;
  weather: WeatherData;
  onNavigate: (screen: string) => void;
}

const tx = {
  en: {
    title: 'Disease & Pest Risk',
    formula: 'Risk Formula (transparent)',
    diseaseFormula: 'Disease Risk = AI confidence (50%) + Humidity factor (25%) + Temperature factor (15%) + Rain factor (10%)',
    pestFormula: 'Pest Risk = Humidity factor (40%) + Temperature factor (30%) + Rain factor (30%)',
    disclaimer: 'This risk score is a prototype heuristic formula and has NOT been agronomically validated. Use it as a decision-support tool, not a definitive diagnosis.',
    riskFactors: 'Risk Contributing Factors',
    viewExplanation: 'View Detailed Explanation',
    scanCrop: 'Scan Crop for AI Prediction',
    diseaseRisk: 'Disease Risk',
    pestRisk: 'Pest Risk',
    overallRisk: 'Overall Risk Level',
    factorAI: 'AI Disease Detection',
    factorHumidity: 'Humidity Level',
    factorTemp: 'Temperature',
    factorRain: 'Rain Probability',
    factorHistory: 'Historical Cases',
    noPrediction: 'No active prediction. Scan a crop leaf for full risk analysis.',
  },
  ta: {
    title: 'நோய் & பூச்சி ஆபத்து',
    formula: 'ஆபத்து சூத்திரம் (வெளிப்படையான)',
    diseaseFormula: 'நோய் ஆபத்து = AI நம்பகத்தன்மை (50%) + ஈரப்பதம் காரணி (25%) + வெப்பநிலை காரணி (15%) + மழை காரணி (10%)',
    pestFormula: 'பூச்சி ஆபத்து = ஈரப்பதம் காரணி (40%) + வெப்பநிலை காரணி (30%) + மழை காரணி (30%)',
    disclaimer: 'இந்த ஆபத்து மதிப்பெண் ஒரு முன்மாதிரி சூத்திரம் மட்டுமே. விவசாய வல்லுநரின் சரிபார்ப்பு இல்லாமல் இதை ஒரே ஆதாரமாக எடுக்காதீர்கள்.',
    riskFactors: 'ஆபத்து காரண காரியங்கள்',
    viewExplanation: 'விரிவான விளக்கம்',
    scanCrop: 'AI முன்னறிவிப்புக்கு ஸ்கேன்',
    diseaseRisk: 'நோய் ஆபத்து',
    pestRisk: 'பூச்சி ஆபத்து',
    overallRisk: 'ஒட்டுமொத்த ஆபத்து நிலை',
    factorAI: 'AI நோய் கண்டறிதல்',
    factorHumidity: 'ஈரப்பதம் நிலை',
    factorTemp: 'வெப்பநிலை',
    factorRain: 'மழை வாய்ப்பு',
    factorHistory: 'வரலாற்று வழக்குகள்',
    noPrediction: 'முன்னறிவிப்பு இல்லை. முழு ஆபத்து பகுப்பாய்வுக்கு ஸ்கேன் செய்யவும்.',
  },
};

export const DiseaseRiskScreen: React.FC<DiseaseRiskScreenProps> = ({
  language, prediction, sensor, weather, onNavigate
}) => {
  const T = tx[language];

  const diseaseRisk = prediction?.disease_risk ?? Math.round(
    (weather.humidity > 75 ? 60 : 40) + (weather.rainProbabilityTomorrow * 0.2)
  );
  const pestRisk = prediction?.pest_risk ?? Math.round(
    (weather.humidity * 0.4) + (weather.rainProbabilityTomorrow * 0.3) + 10
  );
  const riskLevel = diseaseRisk >= 75 ? 'HIGH' : diseaseRisk >= 50 ? 'MEDIUM' : 'LOW';

  const RISK_COLOR = { HIGH: '#dc2626', MEDIUM: '#d97706', LOW: '#16a34a' };
  const RISK_BG = { HIGH: '#fef2f2', MEDIUM: '#fffbeb', LOW: '#f0fdf4' };
  const RISK_BORDER = { HIGH: '#fca5a5', MEDIUM: '#fcd34d', LOW: '#86efac' };

  const factors = [
    {
      label: T.factorAI,
      value: prediction ? `${Math.round(prediction.confidence * 100)}%` : 'No scan',
      icon: '🤖',
      weight: '50%',
      status: prediction ? (prediction.confidence >= 0.8 ? 'HIGH' : prediction.confidence >= 0.6 ? 'MEDIUM' : 'LOW') : 'LOW',
    },
    {
      label: T.factorHumidity,
      value: `${sensor.humidity}%`,
      icon: '💧',
      weight: '25%',
      status: sensor.humidity >= 80 ? 'HIGH' : sensor.humidity >= 60 ? 'MEDIUM' : 'LOW',
    },
    {
      label: T.factorTemp,
      value: `${sensor.temperature}°C`,
      icon: '🌡️',
      weight: '15%',
      status: sensor.temperature >= 28 && sensor.temperature <= 32 ? 'HIGH' : 'MEDIUM',
    },
    {
      label: T.factorRain,
      value: `${weather.rainProbabilityTomorrow}%`,
      icon: '🌧️',
      weight: '10%',
      status: weather.rainProbabilityTomorrow >= 60 ? 'HIGH' : weather.rainProbabilityTomorrow >= 30 ? 'MEDIUM' : 'LOW',
    },
  ];

  const factorStatusColor = { HIGH: '#dc2626', MEDIUM: '#d97706', LOW: '#16a34a' };
  const factorStatusBg = { HIGH: '#fef2f2', MEDIUM: '#fffbeb', LOW: '#f0fdf4' };

  return (
    <div className="pb-6 space-y-4">
      {/* Main Risk Display */}
      <div className="rounded-2xl p-5 text-center"
        style={{ background: `linear-gradient(135deg, ${RISK_BG[riskLevel]}, white)`, border: `2px solid ${RISK_BORDER[riskLevel]}` }}>
        <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-2">{T.overallRisk}</p>
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-3"
          style={{ background: RISK_COLOR[riskLevel], boxShadow: `0 8px 32px ${RISK_COLOR[riskLevel]}44` }}>
          <p className="text-white font-black text-lg">{riskLevel}</p>
        </div>
        <p className="text-sm text-gray-600">
          {riskLevel === 'HIGH' ? '⚠️ High risk — inspect plants immediately' :
           riskLevel === 'MEDIUM' ? '👀 Moderate risk — monitor closely' :
           '✅ Low risk — conditions favorable'}
        </p>
        {!prediction && (
          <p className="text-xs text-gray-400 mt-2">⚠️ No AI scan — risk based on environmental factors only</p>
        )}
      </div>

      {/* Disease & Pest Risk Gauges */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: T.diseaseRisk, value: diseaseRisk, icon: '🦠', color: '#dc2626' },
          { label: T.pestRisk, value: pestRisk, icon: '🐛', color: '#d97706' },
        ].map(({ label, value, icon, color }) => (
          <div key={label} className="rounded-2xl p-4 text-center"
            style={{ background: 'white', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
            <span className="text-3xl">{icon}</span>
            <div className="relative w-16 h-16 mx-auto my-2">
              <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="#f3f4f6" strokeWidth="3" />
                <circle cx="18" cy="18" r="15.9" fill="none" stroke={color} strokeWidth="3"
                  strokeDasharray={`${value} ${100 - value}`} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-black" style={{ color }}>{value}%</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 font-semibold">{label}</p>
          </div>
        ))}
      </div>

      {/* Risk Factors */}
      <div className="rounded-2xl p-4" style={{ background: 'white', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">📊 {T.riskFactors}</p>
        <div className="space-y-3">
          {factors.map(({ label, value, icon, weight, status }) => (
            <div key={label} className="flex items-center gap-3">
              <span className="text-lg flex-shrink-0">{icon}</span>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-xs font-semibold text-gray-700">{label}</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-gray-400">({weight})</span>
                    <span className="text-xs px-1.5 py-0.5 rounded-full font-bold"
                      style={{ background: factorStatusBg[status], color: factorStatusColor[status] }}>
                      {status}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full"
                      style={{ width: status === 'HIGH' ? '85%' : status === 'MEDIUM' ? '55%' : '25%', background: factorStatusColor[status] }} />
                  </div>
                  <span className="text-xs font-bold text-gray-600 w-12 text-right">{value}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Formula Disclosure */}
      <div className="rounded-2xl p-4" style={{ background: '#f0f9ff', border: '1px solid #bae6fd' }}>
        <p className="text-xs font-bold text-blue-800 mb-2">📐 {T.formula}</p>
        <p className="text-xs text-blue-700 mb-1">{T.diseaseFormula}</p>
        <p className="text-xs text-blue-700">{T.pestFormula}</p>
        <p className="text-xs text-blue-600 mt-2 italic">⚠️ {T.disclaimer}</p>
      </div>

      {/* Actions */}
      {prediction ? (
        <button onClick={() => onNavigate('explanation')}
          className="w-full py-3.5 rounded-2xl text-white font-bold text-sm transition-all active:scale-95"
          style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)' }}>
          🔍 {T.viewExplanation}
        </button>
      ) : (
        <button onClick={() => onNavigate('scan')}
          className="w-full py-3.5 rounded-2xl text-white font-bold text-sm transition-all active:scale-95"
          style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)' }}>
          🔬 {T.scanCrop}
        </button>
      )}
    </div>
  );
};
