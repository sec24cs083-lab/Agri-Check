import React, { useState } from 'react';
import { Language, Farm } from '../../types/agri';

interface AddFarmScreenProps {
  language: Language;
  onFarmAdded: (farm: Omit<Farm, 'id' | 'user_id' | 'created_at'>) => void;
  onNavigate: (screen: string) => void;
}

const CROPS = ['Tomato', 'Rice (Paddy)', 'Groundnut', 'Millet', 'Wheat', 'Maize', 'Cotton', 'Sugarcane', 'Turmeric', 'Banana'];
const AREAS = ['< 1 acre', '1–2 acres', '2–5 acres', '5–10 acres', '> 10 acres'];
const LOCATIONS = [
  'Salem, Tamil Nadu', 'Namakkal, Tamil Nadu', 'Coimbatore, Tamil Nadu', 'Trichy, Tamil Nadu',
  'Madurai, Tamil Nadu', 'Erode, Tamil Nadu', 'Tirunelveli, Tamil Nadu', 'Vellore, Tamil Nadu',
  'Thanjavur, Tamil Nadu', 'Other',
];

const CROP_EMOJIS: Record<string, string> = {
  'Tomato': '🍅', 'Rice (Paddy)': '🌾', 'Groundnut': '🥜', 'Millet': '🌾',
  'Wheat': '🌾', 'Maize': '🌽', 'Cotton': '☁️', 'Sugarcane': '🎋',
  'Turmeric': '🟡', 'Banana': '🍌',
};

export const AddFarmScreen: React.FC<AddFarmScreenProps> = ({ language, onFarmAdded, onNavigate }) => {
  const [farmName, setFarmName] = useState('');
  const [location, setLocation] = useState('Salem, Tamil Nadu');
  const [crop, setCrop] = useState('Tomato');
  const [area, setArea] = useState('2–5 acres');
  const [customLocation, setCustomLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!farmName.trim()) { setError('Please enter a farm name.'); return; }
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setLoading(false);

    const areaMap: Record<string, number> = {
      '< 1 acre': 0.5, '1–2 acres': 1.5, '2–5 acres': 2.5, '5–10 acres': 7.5, '> 10 acres': 12,
    };

    // Default TN center coords for demo
    onFarmAdded({
      name: farmName,
      location: location === 'Other' ? customLocation : location,
      crop,
      area_acres: areaMap[area] || 2.5,
      latitude: 11.1271,
      longitude: 78.6569,
    });
  };

  return (
    <div className="pb-6 space-y-4">
      {/* Header */}
      <div className="rounded-2xl p-4" style={{ background: 'linear-gradient(135deg, #0f3d0f, #1a5e1a)' }}>
        <p className="text-xs text-green-300 uppercase tracking-wider font-semibold">Add New Farm</p>
        <h2 className="text-white font-black text-xl mt-0.5">🌾 Register Your Farm</h2>
        <p className="text-green-300 text-xs mt-1">Your farm will be monitored for disease and pest risks</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Farm Name */}
        <div className="rounded-2xl p-4" style={{ background: 'white', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">Farm Name *</label>
          <input value={farmName} onChange={e => setFarmName(e.target.value)}
            placeholder="e.g. My Tomato Farm"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-800 text-sm focus:outline-none"
            style={{ borderColor: farmName ? '#86efac' : '#e5e7eb' }} />
        </div>

        {/* Location */}
        <div className="rounded-2xl p-4" style={{ background: 'white', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">📍 Location</label>
          <select value={location} onChange={e => setLocation(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-800 text-sm focus:outline-none mb-2"
            style={{ borderColor: '#d1fae5' }}>
            {LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
          {location === 'Other' && (
            <input value={customLocation} onChange={e => setCustomLocation(e.target.value)}
              placeholder="Enter your location..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-800 text-sm focus:outline-none" />
          )}
        </div>

        {/* Crop Selection */}
        <div className="rounded-2xl p-4" style={{ background: 'white', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">🌱 Primary Crop</label>
          <div className="grid grid-cols-2 gap-2">
            {CROPS.map(c => (
              <button key={c} type="button" onClick={() => setCrop(c)}
                className="py-2.5 px-3 rounded-xl text-sm font-semibold transition-all text-left flex items-center gap-2"
                style={{
                  background: crop === c ? '#f0fdf4' : '#f9fafb',
                  border: `1.5px solid ${crop === c ? '#22c55e' : '#e5e7eb'}`,
                  color: crop === c ? '#16a34a' : '#374151',
                }}>
                <span>{CROP_EMOJIS[c] || '🌿'}</span>
                <span>{c}</span>
                {crop === c && <span className="ml-auto text-green-500">✓</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Area */}
        <div className="rounded-2xl p-4" style={{ background: 'white', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">📐 Farm Area</label>
          <div className="grid grid-cols-2 gap-2">
            {AREAS.map(a => (
              <button key={a} type="button" onClick={() => setArea(a)}
                className="py-2.5 px-3 rounded-xl text-sm font-semibold transition-all"
                style={{
                  background: area === a ? '#f0fdf4' : '#f9fafb',
                  border: `1.5px solid ${area === a ? '#22c55e' : '#e5e7eb'}`,
                  color: area === a ? '#16a34a' : '#374151',
                }}>
                {a} {area === a && '✓'}
              </button>
            ))}
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="px-4 py-3 rounded-xl" style={{ background: '#fef2f2', border: '1px solid #fca5a5' }}>
            <p className="text-red-600 text-sm">⚠️ {error}</p>
          </div>
        )}

        {/* Submit */}
        <button type="submit" disabled={loading}
          className="w-full py-4 rounded-2xl text-white font-black text-base transition-all active:scale-95 disabled:opacity-60"
          style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)', boxShadow: '0 8px 24px rgba(34,197,94,0.35)' }}>
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Adding Farm...
            </span>
          ) : '🌾 Add Farm'}
        </button>

        <button type="button" onClick={() => onNavigate('dashboard')}
          className="w-full py-3 rounded-2xl font-bold text-sm text-gray-500 transition-all active:scale-95">
          Cancel
        </button>
      </form>
    </div>
  );
};
