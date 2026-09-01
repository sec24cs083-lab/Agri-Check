import React from 'react';
import { motion } from 'motion/react';
import { Language, Prediction } from '../../types/agri';
import { TextToSpeech } from '../TextToSpeech';

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
  HIGH: { bg: 'linear-gradient(135deg, #fef2f2, #fee2e2)', text: '#dc2626', border: '#fca5a5' },
  MEDIUM: { bg: 'linear-gradient(135deg, #fffbeb, #fef3c7)', text: '#d97706', border: '#fcd34d' },
  LOW: { bg: 'linear-gradient(135deg, #f0fdf4, #dcfce7)', text: '#16a34a', border: '#86efac' },
};

const CONF_COLORS: Record<string, string> = {
  HIGH: '#22c55e',
  MODERATE: '#f59e0b',
  LOW: '#ef4444',
};

export const AIAnalysisScreen: React.FC<AIAnalysisScreenProps> = ({ language, prediction, onNavigate }) => {
  const T = tx[language];

  if (!prediction) {
    return (
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="flex flex-col items-center justify-center py-20 space-y-4"
      >
        <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-500 text-sm font-bold animate-pulse">{T.analyzing}</p>
      </motion.div>
    );
  }

  const risk = RISK_COLORS[prediction.risk_level] || RISK_COLORS.MEDIUM;
  const confColor = CONF_COLORS[prediction.confidence_level] || '#f59e0b';
  const confPct = Math.round(prediction.confidence * 100);

  const containerVariants = {
    hidden: { opacity: 0, x: 20 },
    show: { opacity: 1, x: 0, transition: { staggerChildren: 0.1 } },
    exit: { opacity: 0, x: -20 }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0 }
  };

  const ttsText = `${T.disease}: ${prediction.disease}. ${T.confidence}: ${confPct}%. ${T.diseaseRisk}: ${prediction.disease_risk}%.`;

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" exit="exit" className="pb-6 space-y-4">

      {/* Demo Banner */}
      {prediction.is_demo && (
        <motion.div variants={itemVariants} className="px-4 py-3 rounded-2xl flex items-center gap-3 shadow-sm"
          style={{ background: '#fffbeb', border: '1px solid #fcd34d' }}>
          <span className="text-xl">⚠️</span>
          <p className="text-xs text-amber-900 font-bold leading-relaxed">{T.demo}</p>
        </motion.div>
      )}

      {/* TTS Button Row */}
      <motion.div variants={itemVariants} className="flex justify-end">
        <TextToSpeech text={ttsText} language={language} />
      </motion.div>

      {/* Main Result Card */}
      <motion.div variants={itemVariants} className="rounded-3xl overflow-hidden shadow-lg border-2"
        style={{ borderColor: risk.border, background: risk.bg }}>
        <div className="px-5 pt-5 pb-3">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] text-gray-500 font-bold uppercase tracking-widest">{T.crop}</p>
              <p className="text-2xl font-black text-gray-900 mt-0.5">{prediction.crop}</p>
            </div>
            <div className="px-4 py-2 rounded-xl text-xs font-black shadow-sm"
              style={{ background: risk.text, color: 'white' }}>
              {prediction.risk_level}
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-black/5">
            <p className="text-[11px] text-gray-500 font-bold uppercase tracking-widest">{T.disease}</p>
            <div className="flex items-center gap-3 mt-1">
              <p className="text-3xl font-black tracking-tight" style={{ color: risk.text }}>{prediction.disease}</p>
              <span className="text-3xl drop-shadow-sm">{prediction.disease === 'Healthy' ? '✅' : '🦠'}</span>
            </div>
          </div>
        </div>

        {/* Confidence Bar */}
        <div className="px-5 py-4 bg-white/60 backdrop-blur-sm border-t border-black/5">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-black text-gray-700">{T.confidence}</p>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-md" style={{ background: `${confColor}20`, color: confColor }}>{prediction.confidence_level}</span>
              <span className="text-xl font-black" style={{ color: confColor }}>{confPct}%</span>
            </div>
          </div>
          <div className="h-4 bg-gray-200 rounded-full overflow-hidden shadow-inner">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${confPct}%` }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
              className="h-full rounded-full"
              style={{ background: `linear-gradient(90deg, ${confColor}, ${confColor}cc)` }} 
            />
          </div>
          {prediction.confidence_level === 'LOW' && (
            <p className="text-xs text-red-600 mt-2 font-bold flex items-center gap-1">⚠️ {T.lowConf}</p>
          )}
        </div>
      </motion.div>

      {/* Risk Scores */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3">
        {[
          { label: T.diseaseRisk, value: prediction.disease_risk, icon: '🦠', color: '#dc2626', bg: '#fef2f2' },
          { label: T.pestRisk, value: prediction.pest_risk, icon: '🐛', color: '#d97706', bg: '#fffbeb' },
        ].map(({ label, value, icon, color, bg }) => (
          <div key={label} className="rounded-3xl p-5 text-center shadow-sm border border-gray-100 bg-white">
            <div className="w-12 h-12 mx-auto rounded-full flex items-center justify-center text-2xl mb-2" style={{ background: bg }}>
              {icon}
            </div>
            <p className="text-3xl font-black tracking-tight" style={{ color }}>{value}%</p>
            <p className="text-[11px] text-gray-500 font-bold uppercase tracking-widest mt-1">{label}</p>
            <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${value}%` }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.4 }}
                className="h-full rounded-full" 
                style={{ background: color }} 
              />
            </div>
          </div>
        ))}
      </motion.div>

      {/* Management Guidance */}
      {prediction.management_guidance && prediction.management_guidance.length > 0 && (
        <motion.div variants={itemVariants} className="rounded-3xl p-5 bg-white shadow-sm border border-gray-100">
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
            <span className="text-base">📋</span> {T.guidance}
          </p>
          <div className="space-y-3">
            {prediction.management_guidance.slice(0, 3).map((g, i) => (
              <div key={i} className="flex items-start gap-3 bg-gray-50 p-3 rounded-2xl">
                <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 text-green-700 bg-green-100 border border-green-200">
                  {i + 1}
                </span>
                <p className="text-sm font-medium text-gray-700 leading-snug">{g}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Action Buttons */}
      <motion.div variants={itemVariants} className="space-y-3 pt-2">
        <motion.button 
          whileTap={{ scale: 0.95 }}
          onClick={() => onNavigate('explanation')}
          className="w-full py-4 rounded-2xl text-white font-black text-base shadow-lg flex items-center justify-center gap-2"
          style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}
        >
          <span className="text-xl">🔍</span> {T.viewExplanation}
        </motion.button>

        <motion.button 
          whileTap={{ scale: 0.95 }}
          onClick={() => onNavigate('feedback')}
          className="w-full py-4 rounded-2xl font-black text-base bg-white text-green-700 border-2 border-green-500 shadow-sm flex items-center justify-center gap-2"
        >
          <span className="text-xl">👤</span> {T.submitFeedback}
        </motion.button>

        <div className="grid grid-cols-2 gap-3">
          <motion.button 
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('scan')}
            className="py-4 rounded-2xl font-bold text-sm bg-gray-50 text-gray-700 border border-gray-200 shadow-sm"
          >
            🔄 {T.scanAgain}
          </motion.button>
          <motion.button 
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('history')}
            className="py-4 rounded-2xl font-bold text-sm bg-gray-50 text-gray-700 border border-gray-200 shadow-sm"
          >
            📋 {T.history}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};
