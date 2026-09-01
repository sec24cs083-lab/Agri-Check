import React, { useState } from 'react';
import { Language, CLStatus, ModelVersion } from '../../types/agri';

interface ContinualLearningScreenProps {
  language: Language;
  clStatus: CLStatus;
  modelVersions: ModelVersion[];
  onNavigate: (screen: string) => void;
  onTriggerUpdate: () => void;
}

const tx = {
  en: {
    title: 'Continual Learning',
    subtitle: 'AI Model Evolution Workflow',
    disclaimer: 'Model updates are NOT automatic. Updates are triggered only after quality checks and minimum sample thresholds are met.',
    latestFeedback: 'Latest Feedback',
    bufferSize: 'Replay Buffer',
    criteriaStatus: 'Update Criteria',
    modelVersion: 'Active Model',
    driftStatus: 'Drift Status',
    triggerUpdate: 'Trigger Model Evaluation',
    versions: 'Model Version History',
    workflowTitle: 'CL Workflow',
    confirmed: 'Confirmed cases',
    incorrect: 'Incorrect labels',
    criteriaMet: 'CRITERIA MET ✓',
    criteriaNotMet: 'Not yet (min. 10 confirmed needed)',
    noDrift: 'No drift detected',
    driftDetected: 'Drift detected — evaluation recommended',
    accuracy: 'Accuracy',
    f1: 'F1 Score',
    samples: 'Training Samples',
    active: 'ACTIVE',
    inactive: 'Previous',
    evaluating: 'Running evaluation...',
    evalDone: 'Evaluation complete — new version created',
  },
  ta: {
    title: 'தொடர் கற்றல்',
    subtitle: 'AI மாதிரி பரிணாம பணிச்சரிவு',
    disclaimer: 'மாதிரி புதுப்பிப்புகள் தானியங்கி அல்ல. தர சரிபார்ப்பு மற்றும் குறைந்தபட்ச மாதிரி எண்ணிக்கை பூர்த்தியான பின்னரே புதுப்பிக்கப்படும்.',
    latestFeedback: 'சமீபத்திய கருத்து',
    bufferSize: 'பயிற்சி இடையக வரிசை',
    criteriaStatus: 'புதுப்பிப்பு அளவுகோல்',
    modelVersion: 'செயலில் உள்ள மாதிரி',
    driftStatus: 'சறிவு நிலை',
    triggerUpdate: 'மாதிரி மதிப்பீட்டை தூண்டு',
    versions: 'மாதிரி பதிப்பு வரலாறு',
    workflowTitle: 'CL பணிச்சரிவு',
    confirmed: 'உறுதிப்படுத்தப்பட்ட வழக்குகள்',
    incorrect: 'தவறான லேபிள்கள்',
    criteriaMet: 'அளவுகோல் பூர்த்தி ✓',
    criteriaNotMet: 'இன்னும் இல்லை (குறைந்தது 10 வேண்டும்)',
    noDrift: 'சறிவு கண்டறியப்படவில்லை',
    driftDetected: 'சறிவு கண்டறியப்பட்டது — மதிப்பீடு பரிந்துரைக்கப்படுகிறது',
    accuracy: 'துல்லியம்',
    f1: 'F1 மதிப்பெண்',
    samples: 'பயிற்சி மாதிரிகள்',
    active: 'செயலில்',
    inactive: 'முந்தைய',
    evaluating: 'மதிப்பீடு நடக்கிறது...',
    evalDone: 'மதிப்பீடு முடிந்தது — புதிய பதிப்பு உருவாக்கப்பட்டது',
  },
};

const WORKFLOW_STEPS = [
  { icon: '🤖', label: 'AI Prediction', done: true },
  { icon: '👨‍🌾', label: 'Farmer Feedback', done: true },
  { icon: '✅', label: 'Validate Label', done: true },
  { icon: '🕸️', label: 'Knowledge Graph Update', done: true },
  { icon: '🔍', label: 'Find Similar Cases', done: true },
  { icon: '📦', label: 'Replay Buffer', done: true },
  { icon: '📊', label: 'Model Evaluation', done: false },
  { icon: '🆕', label: 'New Model Version', done: false },
];

export const ContinualLearningScreen: React.FC<ContinualLearningScreenProps> = ({
  language, clStatus, modelVersions, onNavigate, onTriggerUpdate
}) => {
  const T = tx[language];
  const [evaluating, setEvaluating] = useState(false);
  const [evalDone, setEvalDone] = useState(false);

  const handleTrigger = async () => {
    setEvaluating(true);
    await new Promise(r => setTimeout(r, 2000));
    setEvaluating(false);
    setEvalDone(true);
    onTriggerUpdate();
  };

  return (
    <div className="pb-6 space-y-4">
      {/* Header */}
      <div className="rounded-2xl p-4" style={{ background: 'linear-gradient(135deg, #1e1b4b, #312e81)' }}>
        <p className="text-xs text-indigo-300 uppercase tracking-wider font-semibold mb-1">{T.subtitle}</p>
        <h2 className="text-white font-black text-xl">🤖 {T.title}</h2>
        <p className="text-indigo-300 text-xs mt-2 leading-relaxed">{T.disclaimer}</p>
      </div>

      {/* Status Grid */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: T.bufferSize, value: `${clStatus.buffer_size} samples`, icon: '📦', color: '#6366f1', bg: '#eef2ff' },
          { label: T.modelVersion, value: clStatus.latest_version, icon: '🤖', color: '#22c55e', bg: '#f0fdf4' },
          { label: T.confirmed, value: `${clStatus.confirmed_count} cases`, icon: '✅', color: '#16a34a', bg: '#dcfce7' },
          { label: T.incorrect, value: `${clStatus.incorrect_count} cases`, icon: '❌', color: '#dc2626', bg: '#fef2f2' },
        ].map(({ label, value, icon, color, bg }) => (
          <div key={label} className="rounded-2xl p-4" style={{ background: bg, border: `1px solid ${color}33` }}>
            <span className="text-2xl">{icon}</span>
            <p className="text-lg font-black mt-1" style={{ color }}>{value}</p>
            <p className="text-xs text-gray-500 font-semibold mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Criteria & Drift */}
      <div className="space-y-2">
        {[
          {
            label: T.criteriaStatus,
            value: clStatus.criteria_met ? T.criteriaMet : T.criteriaNotMet,
            ok: clStatus.criteria_met,
          },
          {
            label: T.driftStatus,
            value: clStatus.drift_detected ? T.driftDetected : T.noDrift,
            ok: !clStatus.drift_detected,
          },
        ].map(({ label, value, ok }) => (
          <div key={label} className="rounded-xl px-4 py-3 flex items-center justify-between"
            style={{ background: ok ? '#f0fdf4' : '#fffbeb', border: `1px solid ${ok ? '#86efac' : '#fcd34d'}` }}>
            <p className="text-xs font-semibold text-gray-600">{label}</p>
            <p className="text-xs font-bold" style={{ color: ok ? '#16a34a' : '#d97706' }}>{value}</p>
          </div>
        ))}
      </div>

      {/* CL Workflow Visual */}
      <div className="rounded-2xl p-4" style={{ background: 'white', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">⚡ {T.workflowTitle}</p>
        <div className="space-y-2">
          {WORKFLOW_STEPS.map((step, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0`}
                style={{ background: step.done ? 'linear-gradient(135deg, #22c55e, #16a34a)' : '#f3f4f6', border: step.done ? 'none' : '2px dashed #d1d5db' }}>
                {step.done ? <span className="text-white text-xs">✓</span> : <span className="text-gray-400 text-xs">{i + 1}</span>}
              </div>
              <p className="text-sm font-medium" style={{ color: step.done ? '#15803d' : '#9ca3af' }}>{step.icon} {step.label}</p>
              {step.done && <span className="ml-auto text-green-500 text-xs">Done</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Model Version History */}
      <div className="rounded-2xl p-4" style={{ background: 'white', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">📋 {T.versions}</p>
        <div className="space-y-3">
          {modelVersions.map(mv => (
            <div key={mv.id} className="rounded-xl p-3"
              style={{ background: mv.is_active ? '#f0fdf4' : '#f9fafb', border: mv.is_active ? '1.5px solid #86efac' : '1px solid #e5e7eb' }}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-black" style={{ color: mv.is_active ? '#16a34a' : '#374151' }}>{mv.version_string}</span>
                <span className="text-xs px-2 py-0.5 rounded-full font-bold"
                  style={{ background: mv.is_active ? '#22c55e' : '#e5e7eb', color: mv.is_active ? 'white' : '#6b7280' }}>
                  {mv.is_active ? T.active : T.inactive}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: T.accuracy, value: `${(mv.accuracy * 100).toFixed(1)}%` },
                  { label: T.f1, value: `${(mv.f1_score * 100).toFixed(1)}%` },
                  { label: T.samples, value: mv.training_samples.toLocaleString() },
                ].map(({ label, value }) => (
                  <div key={label} className="text-center">
                    <p className="text-sm font-black text-gray-800">{value}</p>
                    <p className="text-xs text-gray-400">{label}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2 italic">{mv.notes}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Eval done alert */}
      {evalDone && (
        <div className="rounded-xl px-4 py-3 flex items-center gap-2"
          style={{ background: '#f0fdf4', border: '1.5px solid #22c55e' }}>
          <span className="text-green-500">✓</span>
          <p className="text-sm text-green-700 font-semibold">{T.evalDone}</p>
        </div>
      )}

      {/* Trigger button */}
      <button onClick={handleTrigger} disabled={evaluating || !clStatus.criteria_met}
        className="w-full py-4 rounded-2xl text-white font-bold text-sm transition-all active:scale-95 disabled:opacity-50"
        style={{ background: clStatus.criteria_met ? 'linear-gradient(135deg, #6366f1, #4f46e5)' : '#9ca3af' }}>
        {evaluating ? (
          <span className="flex items-center justify-center gap-2">
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            {T.evaluating}
          </span>
        ) : `📊 ${T.triggerUpdate}`}
      </button>

      <button onClick={() => onNavigate('knowledgeGraph')}
        className="w-full py-3 rounded-2xl font-bold text-sm transition-all active:scale-95"
        style={{ background: 'white', color: '#374151', border: '1px solid #e5e7eb' }}>
        🕸️ View Knowledge Graph
      </button>
    </div>
  );
};
