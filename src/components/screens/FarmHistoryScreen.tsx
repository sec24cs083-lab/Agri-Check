import React from 'react';
import { Language, FarmHistoryEntry } from '../../types/agri';

interface FarmHistoryScreenProps {
  language: Language;
  history: FarmHistoryEntry[];
  onNavigate: (screen: string) => void;
}

const RISK_STYLE: Record<string, { bg: string; text: string; border: string }> = {
  HIGH: { bg: '#fef2f2', text: '#dc2626', border: '#fca5a5' },
  MEDIUM: { bg: '#fffbeb', text: '#d97706', border: '#fcd34d' },
  LOW: { bg: '#f0fdf4', text: '#16a34a', border: '#86efac' },
};

const FEEDBACK_STYLE: Record<string, { icon: string; color: string }> = {
  confirmed: { icon: '✅', color: '#16a34a' },
  incorrect: { icon: '❌', color: '#dc2626' },
  unsure: { icon: '🤔', color: '#d97706' },
};

const DISEASE_ICONS: Record<string, string> = {
  'Early Blight': '🦠',
  'Late Blight': '🍄',
  'Healthy': '✅',
  'Leaf Blast': '💨',
  'Leaf Spot': '🔴',
  'Brown Spot': '🟤',
};

export const FarmHistoryScreen: React.FC<FarmHistoryScreenProps> = ({ language, history, onNavigate }) => {
  const confirmedCount = history.filter(h => h.feedback_type === 'confirmed').length;
  const highRiskCount = history.filter(h => h.risk_level === 'HIGH').length;
  const diseaseTypes: string[] = Array.from(new Set(history.filter(h => h.disease !== 'Healthy').map(h => h.disease)));

  return (
    <div className="pb-6 space-y-4">
      {/* Stats Header */}
      <div className="rounded-2xl p-4" style={{ background: 'linear-gradient(135deg, #0f3d0f, #1a5e1a)' }}>
        <p className="text-xs text-green-300 uppercase tracking-wider font-semibold mb-2">Farm Disease History</p>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Total Scans', value: history.length, icon: '🔍' },
            { label: 'Confirmed', value: confirmedCount, icon: '✅' },
            { label: 'High Risk', value: highRiskCount, icon: '🔴' },
          ].map(({ label, value, icon }) => (
            <div key={label} className="text-center">
              <span className="text-xl">{icon}</span>
              <p className="text-white text-xl font-black mt-0.5">{value}</p>
              <p className="text-green-300 text-xs">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Disease Trend */}
      {diseaseTypes.length > 0 && (
        <div className="rounded-2xl p-4" style={{ background: 'white', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">📊 Disease Trend (Last 60 Days)</p>
          <div className="space-y-2">
            {diseaseTypes.map(disease => {
              const count = history.filter(h => h.disease === disease).length;
              const pct = Math.round((count / history.length) * 100);
              return (
                <div key={disease}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-700 font-semibold">{DISEASE_ICONS[disease] || '🦠'} {disease}</span>
                    <span className="text-xs text-gray-500">{count} scans ({pct}%)</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #dc2626, #f87171)' }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* DEMO banner */}
      <div className="px-3 py-2 rounded-xl flex items-center gap-2"
        style={{ background: '#fffbeb', border: '1px solid #fcd34d' }}>
        <span>📊</span>
        <p className="text-xs text-amber-800">DEMO DATA — These are simulated historical records for demonstration purposes.</p>
      </div>

      {/* History List */}
      <div className="space-y-3">
        {history.map(entry => {
          const risk = RISK_STYLE[entry.risk_level] || RISK_STYLE.MEDIUM;
          const feedback = entry.feedback_type ? FEEDBACK_STYLE[entry.feedback_type] : null;
          return (
            <div key={entry.id} className="rounded-2xl overflow-hidden"
              style={{ background: 'white', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: `1px solid ${risk.border}` }}>
              <div className="px-4 py-3">
                {/* Top row */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{DISEASE_ICONS[entry.disease] || '🦠'}</span>
                    <div>
                      <p className="text-sm font-black text-gray-800">{entry.disease}</p>
                      <p className="text-xs text-gray-500">{entry.crop}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-xs px-2 py-0.5 rounded-full font-bold"
                      style={{ background: risk.bg, color: risk.text, border: `1px solid ${risk.border}` }}>
                      {entry.risk_level}
                    </span>
                    {feedback && <span className="text-xs font-medium" style={{ color: feedback.color }}>{feedback.icon} {entry.feedback_type}</span>}
                  </div>
                </div>

                {/* Confidence bar */}
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-400">AI Confidence</span>
                    <span className="text-xs font-bold text-gray-700">{Math.round(entry.confidence * 100)}%</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${Math.round(entry.confidence * 100)}%`, background: entry.confidence >= 0.8 ? '#22c55e' : entry.confidence >= 0.6 ? '#f59e0b' : '#ef4444' }} />
                  </div>
                </div>

                {/* Sensor row */}
                {(entry.soil_moisture || entry.temperature || entry.humidity) && (
                  <div className="flex gap-4 mt-2 pt-2" style={{ borderTop: '1px solid #f3f4f6' }}>
                    {entry.soil_moisture && <span className="text-xs text-gray-500">💧 {entry.soil_moisture}%</span>}
                    {entry.temperature && <span className="text-xs text-gray-500">🌡️ {entry.temperature}°C</span>}
                    {entry.humidity && <span className="text-xs text-gray-500">☁️ {entry.humidity}%</span>}
                    <span className="text-xs text-gray-400 ml-auto">{entry.date}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <button onClick={() => onNavigate('scan')}
        className="w-full py-3.5 rounded-2xl text-white font-bold text-sm transition-all active:scale-95"
        style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)' }}>
        🔬 New Crop Scan
      </button>
    </div>
  );
};
