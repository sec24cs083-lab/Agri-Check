import React, { useState } from 'react';
import { Language, Prediction, FeedbackType } from '../../types/agri';

interface FarmerFeedbackScreenProps {
  language: Language;
  prediction: Prediction | null;
  onFeedbackSubmit: (feedback: FeedbackType, notes?: string) => void;
  onNavigate: (screen: string) => void;
}

const tx = {
  en: {
    title: 'Farmer Feedback',
    subtitle: 'Help improve AI accuracy',
    question: 'Was the AI prediction correct?',
    confirmed: '✅ YES — CONFIRMED',
    incorrect: '❌ NO — INCORRECT',
    unsure: '🤔 NOT SURE',
    notesLabel: 'Additional Notes (optional)',
    notesPlaceholder: 'What did you actually observe? (e.g., different disease, different symptom...)',
    submitBtn: 'Submit Feedback',
    submitted: '✓ Feedback Submitted!',
    submittedMsg: 'Your feedback has been stored and the Knowledge Graph has been updated.',
    viewKG: 'View Knowledge Graph',
    viewCL: 'View Continual Learning',
    backToDashboard: 'Back to Dashboard',
    impact: 'Your feedback impact:',
    impact1: 'Added to verified knowledge base',
    impact2: 'Knowledge Graph updated',
    impact3: 'Added to training replay buffer',
    impact4: 'Helps improve future predictions',
    disclaimer: 'Predictions below 60% confidence: Please verify with an agriculture expert before taking action.',
    noPrediction: 'No prediction to give feedback on. Please scan a crop first.',
  },
  ta: {
    title: 'விவசாயி கருத்து',
    subtitle: 'AI துல்லியத்தை மேம்படுத்த உதவுங்கள்',
    question: 'AI முன்னறிவிப்பு சரியாக உள்ளதா?',
    confirmed: '✅ ஆம் — உறுதிப்படுத்தப்பட்டது',
    incorrect: '❌ இல்லை — தவறானது',
    unsure: '🤔 நிச்சயமில்லை',
    notesLabel: 'கூடுதல் குறிப்புகள் (விரும்பினால்)',
    notesPlaceholder: 'நீங்கள் உண்மையில் என்ன கண்டீர்கள்?',
    submitBtn: 'கருத்தை சமர்ப்பிக்கவும்',
    submitted: '✓ கருத்து சமர்ப்பிக்கப்பட்டது!',
    submittedMsg: 'உங்கள் கருத்து சேமிக்கப்பட்டது. அறிவு வரைபடம் புதுப்பிக்கப்பட்டது.',
    viewKG: 'அறிவு வரைபடம் காண்க',
    viewCL: 'தொடர் கற்றல் காண்க',
    backToDashboard: 'டாஷ்போர்டுக்கு திரும்பு',
    impact: 'உங்கள் கருத்தின் தாக்கம்:',
    impact1: 'சரிபார்க்கப்பட்ட தளத்தில் சேர்க்கப்பட்டது',
    impact2: 'அறிவு வரைபடம் புதுப்பிக்கப்பட்டது',
    impact3: 'பயிற்சி இடையக வரிசையில் சேர்க்கப்பட்டது',
    impact4: 'எதிர்கால முன்னறிவிப்புகளை மேம்படுத்த உதவுகிறது',
    disclaimer: '60% க்கும் குறைந்த நம்பகத்தன்மை: நடவடிக்கை எடுப்பதற்கு முன் வேளாண்மை நிபுணரை அணுகவும்.',
    noPrediction: 'கருத்து தர முன்னறிவிப்பு இல்லை. முதல் ஸ்கேன் செய்யவும்.',
  },
};

const FEEDBACK_OPTIONS: Array<{ type: FeedbackType; label: string; labelTa: string; color: string; bg: string; border: string; icon: string }> = [
  { type: 'confirmed', label: '✅ YES — CONFIRMED', labelTa: '✅ ஆம் — உறுதிப்படுத்தப்பட்டது', color: '#15803d', bg: '#f0fdf4', border: '#86efac', icon: '✅' },
  { type: 'incorrect', label: '❌ NO — INCORRECT', labelTa: '❌ இல்லை — தவறானது', color: '#dc2626', bg: '#fef2f2', border: '#fca5a5', icon: '❌' },
  { type: 'unsure', label: '🤔 NOT SURE', labelTa: '🤔 நிச்சயமில்லை', color: '#d97706', bg: '#fffbeb', border: '#fcd34d', icon: '🤔' },
];

export const FarmerFeedbackScreen: React.FC<FarmerFeedbackScreenProps> = ({ language, prediction, onFeedbackSubmit, onNavigate }) => {
  const T = tx[language];
  const [selected, setSelected] = useState<FeedbackType | null>(null);
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!prediction) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-3">
        <span className="text-4xl">🔍</span>
        <p className="text-gray-500 text-sm text-center px-4">{T.noPrediction}</p>
        <button onClick={() => onNavigate('scan')} className="px-6 py-2 rounded-xl text-white text-sm font-bold"
          style={{ background: '#22c55e' }}>Scan Crop</button>
      </div>
    );
  }

  const handleSubmit = async () => {
    if (!selected) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);
    setSubmitted(true);
    onFeedbackSubmit(selected, notes);
  };

  if (submitted) {
    return (
      <div className="pb-6 space-y-4">
        {/* Success Animation */}
        <div className="rounded-2xl p-8 flex flex-col items-center text-center"
          style={{ background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)', border: '2px solid #86efac' }}>
          <div className="w-20 h-20 rounded-full flex items-center justify-center mb-4"
            style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)', boxShadow: '0 8px 24px rgba(34,197,94,0.4)' }}>
            <span className="text-4xl">✓</span>
          </div>
          <h2 className="text-xl font-black text-green-800">{T.submitted}</h2>
          <p className="text-sm text-green-700 mt-2">{T.submittedMsg}</p>
        </div>

        {/* Impact */}
        <div className="rounded-2xl p-4" style={{ background: 'white', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">🚀 {T.impact}</p>
          <div className="space-y-2">
            {[T.impact1, T.impact2, T.impact3, T.impact4].map((item, i) => (
              <div key={i} className="flex items-center gap-2 p-2 rounded-lg" style={{ background: '#f0fdf4' }}>
                <span className="text-green-500 font-bold text-sm">✓</span>
                <p className="text-xs text-gray-700">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Continual Learning Status */}
        <div className="rounded-2xl p-4" style={{ background: 'linear-gradient(135deg, #0f3d0f, #1a5e1a)' }}>
          <p className="text-xs text-green-300 uppercase tracking-wider font-semibold mb-2">🤖 Continual Learning Update</p>
          <div className="space-y-1.5">
            {[
              { label: 'Latest Feedback', value: `${selected === 'confirmed' ? '✓ Confirmed' : selected === 'incorrect' ? '✗ Incorrect' : '? Unsure'} ${prediction.disease}`, ok: true },
              { label: 'Knowledge Graph', value: '✓ Updated with new case', ok: true },
              { label: 'Similar Cases', value: '12 found in knowledge base', ok: true },
              { label: 'Replay Buffer', value: '✓ New case added (buffer: 14)', ok: true },
              { label: 'Model Status', value: 'v1.2 Active — Ready for evaluation', ok: true },
            ].map(({ label, value, ok }) => (
              <div key={label} className="flex items-start justify-between">
                <p className="text-xs text-green-300">{label}</p>
                <p className="text-xs font-semibold" style={{ color: ok ? '#4ade80' : '#fca5a5' }}>{value}</p>
              </div>
            ))}
          </div>
        </div>

        <button onClick={() => onNavigate('knowledgeGraph')}
          className="w-full py-3.5 rounded-2xl text-white font-bold text-sm transition-all active:scale-95"
          style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)', boxShadow: '0 6px 20px rgba(34,197,94,0.3)' }}>
          🕸️ {T.viewKG}
        </button>
        <button onClick={() => onNavigate('continualLearning')}
          className="w-full py-3 rounded-2xl font-bold text-sm transition-all active:scale-95"
          style={{ background: 'white', color: '#374151', border: '1px solid #e5e7eb' }}>
          🤖 {T.viewCL}
        </button>
        <button onClick={() => onNavigate('dashboard')}
          className="w-full py-3 rounded-2xl font-bold text-sm text-gray-500 transition-all active:scale-95">
          {T.backToDashboard}
        </button>
      </div>
    );
  }

  return (
    <div className="pb-6 space-y-4">
      {/* Prediction recap */}
      <div className="rounded-2xl p-4" style={{ background: 'linear-gradient(135deg, #0f3d0f, #1a5e1a)' }}>
        <p className="text-xs text-green-300 uppercase tracking-wider font-semibold mb-1">AI Predicted</p>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white font-black text-lg">{prediction.disease}</p>
            <p className="text-green-300 text-sm">{prediction.crop} • {Math.round(prediction.confidence * 100)}% confidence</p>
          </div>
          <div className="px-3 py-1.5 rounded-xl text-xs font-black"
            style={{ background: prediction.risk_level === 'HIGH' ? '#dc2626' : prediction.risk_level === 'MEDIUM' ? '#d97706' : '#16a34a', color: 'white' }}>
            {prediction.risk_level}
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="rounded-2xl p-4 text-center" style={{ background: 'white', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
        <p className="text-base font-bold text-gray-800">{T.question}</p>
      </div>

      {/* Feedback buttons */}
      <div className="space-y-3">
        {FEEDBACK_OPTIONS.map(opt => (
          <button key={opt.type} onClick={() => setSelected(opt.type)}
            className="w-full py-4 rounded-2xl text-left px-5 transition-all active:scale-98 font-bold text-base"
            style={{
              background: selected === opt.type ? opt.bg : 'white',
              border: `2px solid ${selected === opt.type ? opt.color : '#e5e7eb'}`,
              color: selected === opt.type ? opt.color : '#374151',
              boxShadow: selected === opt.type ? `0 4px 16px ${opt.border}88` : '0 2px 8px rgba(0,0,0,0.04)',
              transform: selected === opt.type ? 'scale(1.01)' : 'scale(1)',
            }}>
            {language === 'ta' ? opt.labelTa : opt.label}
            {selected === opt.type && <span className="float-right">●</span>}
          </button>
        ))}
      </div>

      {/* Notes */}
      <div className="rounded-2xl p-4" style={{ background: 'white', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">{T.notesLabel}</label>
        <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={3}
          placeholder={T.notesPlaceholder}
          className="w-full px-3 py-2 rounded-xl border border-gray-200 text-gray-700 text-sm focus:outline-none resize-none"
          style={{ borderColor: notes ? '#86efac' : '#e5e7eb' }} />
      </div>

      {/* Disclaimer */}
      {prediction.confidence_level === 'LOW' && (
        <div className="px-4 py-3 rounded-xl" style={{ background: '#fef2f2', border: '1px solid #fca5a5' }}>
          <p className="text-xs text-red-700">⚠️ {T.disclaimer}</p>
        </div>
      )}

      {/* Submit */}
      <button onClick={handleSubmit} disabled={!selected || loading}
        className="w-full py-4 rounded-2xl text-white font-black text-base transition-all active:scale-95 disabled:opacity-50"
        style={{ background: selected && !loading ? 'linear-gradient(135deg, #22c55e, #16a34a)' : '#9ca3af', boxShadow: selected ? '0 8px 24px rgba(34,197,94,0.3)' : 'none' }}>
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Updating Knowledge Graph...
          </span>
        ) : `📤 ${T.submitBtn}`}
      </button>
    </div>
  );
};
