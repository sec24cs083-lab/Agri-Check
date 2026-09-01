import React, { useState } from 'react';
import { Language, CLStatus, ModelVersion } from '../../types/agri';
import { demoFarmHistory, demoHotspots, demoModelVersions, demoCLStatus } from '../../data/mockAgriData';

interface AdminDashboardScreenProps {
  language: Language;
  clStatus: CLStatus;
  modelVersions: ModelVersion[];
  onNavigate: (screen: string) => void;
}

export const AdminDashboardScreen: React.FC<AdminDashboardScreenProps> = ({
  language, clStatus, modelVersions, onNavigate
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'model' | 'graph'>('overview');

  const confirmedCount = demoFarmHistory.filter(h => h.feedback_type === 'confirmed').length;
  const incorrectCount = demoFarmHistory.filter(h => h.feedback_type === 'incorrect').length;
  const lowConfCount = demoFarmHistory.filter(h => h.confidence < 0.6).length;
  const highRiskCount = demoFarmHistory.filter(h => h.risk_level === 'HIGH').length;
  const activeModel = modelVersions.find(m => m.is_active) || modelVersions[modelVersions.length - 1];

  return (
    <div className="pb-6 space-y-4">
      {/* Header */}
      <div className="rounded-2xl p-4" style={{ background: 'linear-gradient(135deg, #1e1b4b, #312e81)' }}>
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2 py-0.5 rounded-full text-xs font-bold text-indigo-200"
            style={{ background: 'rgba(129,140,248,0.3)' }}>ADMIN</span>
        </div>
        <h2 className="text-white font-black text-xl">🔬 Research Dashboard</h2>
        <p className="text-indigo-300 text-xs mt-1">System-wide analytics and model management</p>
      </div>

      {/* Tab switcher */}
      <div className="flex gap-2">
        {[{ key: 'overview', label: '📊 Overview' }, { key: 'model', label: '🤖 Model' }, { key: 'graph', label: '🕸️ Graph' }].map(tab => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key as any)}
            className="flex-1 py-2 rounded-xl text-xs font-bold transition-all"
            style={{
              background: activeTab === tab.key ? 'linear-gradient(135deg, #6366f1, #4f46e5)' : 'white',
              color: activeTab === tab.key ? 'white' : '#374151',
              border: activeTab === tab.key ? 'none' : '1px solid #e5e7eb',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            }}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-4">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Total Farms', value: 2, icon: '🌾', color: '#16a34a', bg: '#f0fdf4' },
              { label: 'Total Predictions', value: demoFarmHistory.length, icon: '🤖', color: '#6366f1', bg: '#eef2ff' },
              { label: 'Confirmed Cases', value: confirmedCount, icon: '✅', color: '#16a34a', bg: '#dcfce7' },
              { label: 'Incorrect Predictions', value: incorrectCount, icon: '❌', color: '#dc2626', bg: '#fef2f2' },
              { label: 'Low Confidence', value: lowConfCount, icon: '⚠️', color: '#d97706', bg: '#fffbeb' },
              { label: 'High Risk Cases', value: highRiskCount, icon: '🔴', color: '#dc2626', bg: '#fef2f2' },
              { label: 'Hotspot Locations', value: demoHotspots.length, icon: '📍', color: '#7c3aed', bg: '#f5f3ff' },
              { label: 'Feedback Count', value: demoFarmHistory.filter(h => h.feedback_type).length, icon: '💬', color: '#0891b2', bg: '#ecfeff' },
            ].map(({ label, value, icon, color, bg }) => (
              <div key={label} className="rounded-2xl p-4" style={{ background: bg, border: `1px solid ${color}22` }}>
                <span className="text-2xl">{icon}</span>
                <p className="text-2xl font-black mt-1" style={{ color }}>{value}</p>
                <p className="text-xs text-gray-500 font-semibold mt-0.5">{label}</p>
              </div>
            ))}
          </div>

          {/* Disease Distribution */}
          <div className="rounded-2xl p-4" style={{ background: 'white', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">🦠 Disease Distribution</p>
            {['Early Blight', 'Late Blight', 'Healthy', 'Leaf Blast'].map((disease, i) => {
              const count = demoFarmHistory.filter(h => h.disease === disease).length;
              const pct = Math.round((count / demoFarmHistory.length) * 100);
              const colors = ['#dc2626', '#7c3aed', '#16a34a', '#2563eb'];
              return (
                <div key={disease} className="mb-3">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs text-gray-700 font-semibold">{disease}</span>
                    <span className="text-xs text-gray-500">{count} ({pct}%)</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${pct}%`, background: colors[i] }} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sensor Summary */}
          <div className="rounded-2xl p-4" style={{ background: 'white', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">📡 Sensor Summary (DEMO)</p>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'Soil Moisture', value: '38%', icon: '💧', color: '#2563eb' },
                { label: 'Temperature', value: '30.2°C', icon: '🌡️', color: '#dc2626' },
                { label: 'Humidity', value: '81.4%', icon: '☁️', color: '#6366f1' },
              ].map(({ label, value, icon, color }) => (
                <div key={label} className="text-center p-3 rounded-xl" style={{ background: '#f9fafb' }}>
                  <span className="text-xl">{icon}</span>
                  <p className="text-sm font-black mt-1" style={{ color }}>{value}</p>
                  <p className="text-xs text-gray-400">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Model Tab */}
      {activeTab === 'model' && (
        <div className="space-y-4">
          {/* Active Model */}
          <div className="rounded-2xl p-4" style={{ background: 'linear-gradient(135deg, #0f3d0f, #1a5e1a)' }}>
            <p className="text-xs text-green-300 uppercase tracking-wider font-semibold mb-2">Active Model</p>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-black text-2xl">{activeModel?.version_string}</p>
                <p className="text-green-300 text-xs mt-1">{activeModel?.notes}</p>
              </div>
              <div className="text-right">
                <p className="text-green-400 text-xs">Accuracy</p>
                <p className="text-white font-black text-xl">{activeModel ? (activeModel.accuracy * 100).toFixed(1) : 0}%</p>
              </div>
            </div>
          </div>

          {/* Confusion Matrix (mock) */}
          <div className="rounded-2xl p-4" style={{ background: 'white', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">📊 Evaluation Metrics (DEMO)</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Accuracy', value: `${activeModel ? (activeModel.accuracy * 100).toFixed(1) : 0}%` },
                { label: 'Precision', value: `${activeModel ? (activeModel.precision * 100).toFixed(1) : 0}%` },
                { label: 'Recall', value: `${activeModel ? (activeModel.recall * 100).toFixed(1) : 0}%` },
                { label: 'F1 Score', value: `${activeModel ? (activeModel.f1_score * 100).toFixed(1) : 0}%` },
              ].map(({ label, value }) => (
                <div key={label} className="rounded-xl p-3 text-center" style={{ background: '#f0fdf4' }}>
                  <p className="text-lg font-black text-green-700">{value}</p>
                  <p className="text-xs text-gray-500">{label}</p>
                </div>
              ))}
            </div>

            {/* Confusion Matrix Table */}
            <div className="mt-4">
              <p className="text-xs font-bold text-gray-500 mb-2">Confusion Matrix (DEMO)</p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr>
                      <th className="text-left text-gray-400 py-1 pr-3">Actual \ Predicted</th>
                      <th className="text-center text-gray-600 py-1 px-2">Early Blight</th>
                      <th className="text-center text-gray-600 py-1 px-2">Late Blight</th>
                      <th className="text-center text-gray-600 py-1 px-2">Healthy</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Early Blight', '89', '6', '5'],
                      ['Late Blight', '5', '85', '10'],
                      ['Healthy', '2', '3', '95'],
                    ].map(([label, ...vals]) => (
                      <tr key={label}>
                        <td className="text-gray-600 font-medium py-1 pr-3">{label}</td>
                        {vals.map((v, i) => (
                          <td key={i} className="text-center py-1 px-2 rounded"
                            style={{ background: i === 0 && label === 'Early Blight' || i === 1 && label === 'Late Blight' || i === 2 && label === 'Healthy' ? '#dcfce7' : '#f9fafb', color: '#374151', fontWeight: 'bold' }}>
                            {v}%
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Version comparison */}
          <div className="rounded-2xl p-4" style={{ background: 'white', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">📈 Version Comparison</p>
            <div className="space-y-2">
              {modelVersions.map(mv => (
                <div key={mv.id} className="flex items-center gap-3 p-2 rounded-xl"
                  style={{ background: mv.is_active ? '#f0fdf4' : '#f9fafb' }}>
                  <span className="font-black text-sm" style={{ color: mv.is_active ? '#16a34a' : '#6b7280', minWidth: '36px' }}>{mv.version_string}</span>
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${mv.accuracy * 100}%`, background: mv.is_active ? '#22c55e' : '#9ca3af' }} />
                  </div>
                  <span className="text-xs font-bold" style={{ color: mv.is_active ? '#16a34a' : '#6b7280', minWidth: '42px', textAlign: 'right' }}>{(mv.accuracy * 100).toFixed(1)}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* CL Status */}
          <div className="rounded-2xl p-4" style={{ background: 'linear-gradient(135deg, #1e1b4b, #312e81)' }}>
            <p className="text-xs text-indigo-300 uppercase tracking-wider font-semibold mb-3">🤖 Continual Learning Status</p>
            {[
              { label: 'Replay Buffer', value: `${clStatus.buffer_size} samples` },
              { label: 'Confirmed Cases', value: `${clStatus.confirmed_count}` },
              { label: 'Incorrect Cases', value: `${clStatus.incorrect_count}` },
              { label: 'Update Criteria', value: clStatus.criteria_met ? '✓ Met' : 'Not met' },
              { label: 'Drift Status', value: clStatus.drift_detected ? 'Detected ⚠️' : 'None detected ✓' },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between py-1">
                <p className="text-xs text-indigo-300">{label}</p>
                <p className="text-xs text-white font-semibold">{value}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Graph Tab */}
      {activeTab === 'graph' && (
        <div className="space-y-4">
          <div className="rounded-2xl p-4" style={{ background: 'white', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">🕸️ Knowledge Graph Stats</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'KG Nodes', value: 9, icon: '⭕', color: '#22c55e' },
                { label: 'KG Relationships', value: 9, icon: '↔️', color: '#6366f1' },
                { label: 'Entity Types', value: 8, icon: '📑', color: '#d97706' },
                { label: 'Farmer Feedbacks', value: 3, icon: '💬', color: '#2563eb' },
              ].map(({ label, value, icon, color }) => (
                <div key={label} className="rounded-xl p-4 text-center" style={{ background: '#f9fafb' }}>
                  <span className="text-2xl">{icon}</span>
                  <p className="text-2xl font-black mt-1" style={{ color }}>{value}</p>
                  <p className="text-xs text-gray-500">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <button onClick={() => onNavigate('knowledgeGraph')}
            className="w-full py-3.5 rounded-2xl text-white font-bold text-sm transition-all active:scale-95"
            style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)' }}>
            🕸️ View Full Knowledge Graph
          </button>
          <button onClick={() => onNavigate('continualLearning')}
            className="w-full py-3 rounded-2xl font-bold text-sm transition-all active:scale-95"
            style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)', color: 'white' }}>
            🤖 View Continual Learning
          </button>
        </div>
      )}
    </div>
  );
};
