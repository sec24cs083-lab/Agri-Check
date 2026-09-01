import React, { useState } from 'react';
import { Language, HotspotPoint } from '../../types/agri';

interface HotspotMapScreenProps {
  language: Language;
  hotspots: HotspotPoint[];
  onNavigate: (screen: string) => void;
}

const SEVERITY_STYLE: Record<string, { color: string; bg: string; size: number }> = {
  HIGH: { color: '#dc2626', bg: '#fef2f2', size: 18 },
  MEDIUM: { color: '#d97706', bg: '#fffbeb', size: 14 },
  LOW: { color: '#16a34a', bg: '#f0fdf4', size: 10 },
};

const DISEASE_COLOR: Record<string, string> = {
  'Early Blight': '#dc2626',
  'Late Blight': '#7c3aed',
  'Leaf Blast': '#2563eb',
  'Leaf Spot': '#d97706',
  'Brown Spot': '#92400e',
};

// Tamil Nadu approximate bounding box for simplified SVG map
// lat: 8.0 - 13.5, lon: 76.7 - 80.5
const MAP_BOUNDS = { latMin: 8.0, latMax: 13.5, lonMin: 76.7, lonMax: 80.5 };
const MAP_W = 320;
const MAP_H = 380;

const latToY = (lat: number) => MAP_H - ((lat - MAP_BOUNDS.latMin) / (MAP_BOUNDS.latMax - MAP_BOUNDS.latMin)) * MAP_H;
const lonToX = (lon: number) => ((lon - MAP_BOUNDS.lonMin) / (MAP_BOUNDS.lonMax - MAP_BOUNDS.lonMin)) * MAP_W;

export const HotspotMapScreen: React.FC<HotspotMapScreenProps> = ({ language, hotspots, onNavigate }) => {
  const [selectedHotspot, setSelectedHotspot] = useState<HotspotPoint | null>(null);
  const [filter, setFilter] = useState<string>('ALL');

  const diseases: string[] = ['ALL', ...Array.from(new Set<string>(hotspots.map(h => h.disease)))];
  const filteredHotspots = filter === 'ALL' ? hotspots : hotspots.filter(h => h.disease === filter);

  return (
    <div className="pb-6 space-y-4">
      {/* Header */}
      <div className="rounded-2xl p-4" style={{ background: 'linear-gradient(135deg, #0f3d0f, #1a5e1a)' }}>
        <p className="text-xs text-green-300 uppercase tracking-wider font-semibold">Disease Hotspot Map</p>
        <h2 className="text-white font-black text-lg mt-0.5">📍 Tamil Nadu Disease Alerts</h2>
        <p className="text-green-300 text-xs mt-1">{hotspots.length} confirmed cases tracked</p>
      </div>

      {/* DEMO Banner */}
      <div className="px-3 py-2 rounded-xl flex items-center gap-2"
        style={{ background: '#fffbeb', border: '1px solid #fcd34d' }}>
        <span>📊</span>
        <p className="text-xs text-amber-800">DEMO DATA — Hotspot locations are synthetic data for demonstration. Not real outbreak data.</p>
      </div>

      {/* Disease Filter */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {diseases.map(d => (
          <button key={d} onClick={() => setFilter(d)}
            className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-bold transition-all"
            style={{
              background: filter === d ? (DISEASE_COLOR[d] || '#16a34a') : 'white',
              color: filter === d ? 'white' : '#374151',
              border: `1.5px solid ${filter === d ? (DISEASE_COLOR[d] || '#16a34a') : '#e5e7eb'}`,
            }}>
            {d}
          </button>
        ))}
      </div>

      {/* SVG Map */}
      <div className="rounded-2xl overflow-hidden" style={{ background: '#1a3a2a', border: '1px solid #2d5a3d', position: 'relative' }}>
        <div className="absolute top-2 right-2 px-2 py-1 rounded-lg z-10"
          style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}>
          <p className="text-green-400 text-xs font-bold">Tamil Nadu</p>
        </div>
        <svg width="100%" viewBox={`0 0 ${MAP_W} ${MAP_H}`} style={{ display: 'block' }}>
          {/* Background */}
          <rect width={MAP_W} height={MAP_H} fill="#0a2818" />
          
          {/* Grid lines */}
          {Array.from({ length: 8 }).map((_, i) => (
            <line key={`v${i}`} x1={i * 46} y1="0" x2={i * 46} y2={MAP_H} stroke="#1a4a2a" strokeWidth="0.5" />
          ))}
          {Array.from({ length: 10 }).map((_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 38} x2={MAP_W} y2={i * 38} stroke="#1a4a2a" strokeWidth="0.5" />
          ))}

          {/* Tamil Nadu outline (simplified polygon) */}
          <polygon
            points="120,10 200,5 280,30 300,80 310,150 290,220 270,290 230,350 180,375 140,370 100,320 60,260 40,190 50,120 80,60 120,10"
            fill="#0f3d1f" stroke="#2d6e3f" strokeWidth="1.5" opacity="0.8"
          />

          {/* District labels */}
          {[
            { name: 'Chennai', x: 270, y: 40 },
            { name: 'Salem', x: 175, y: 130 },
            { name: 'Trichy', x: 195, y: 210 },
            { name: 'Madurai', x: 165, y: 290 },
            { name: 'Coimbatore', x: 85, y: 210 },
          ].map(({ name, x, y }) => (
            <text key={name} x={x} y={y} textAnchor="middle" fill="#4a9e6a" fontSize="9" fontFamily="sans-serif" opacity="0.7">
              {name}
            </text>
          ))}

          {/* Hotspot markers */}
          {filteredHotspots.map(hotspot => {
            const x = lonToX(hotspot.longitude);
            const y = latToY(hotspot.latitude);
            const style = SEVERITY_STYLE[hotspot.severity] || SEVERITY_STYLE.MEDIUM;
            const color = DISEASE_COLOR[hotspot.disease] || '#dc2626';
            const isSelected = selectedHotspot?.id === hotspot.id;

            return (
              <g key={hotspot.id} onClick={() => setSelectedHotspot(isSelected ? null : hotspot)} style={{ cursor: 'pointer' }}>
                {/* Pulse ring */}
                <circle cx={x} cy={y} r={style.size + 8} fill={color} opacity="0.15"
                  style={{ animation: 'ping 1.5s cubic-bezier(0,0,0.2,1) infinite' }} />
                {/* Main dot */}
                <circle cx={x} cy={y} r={style.size / 2 + 4} fill={color} opacity="0.85"
                  stroke={isSelected ? 'white' : 'transparent'} strokeWidth="2" />
                {/* Inner dot */}
                <circle cx={x} cy={y} r={3} fill="white" opacity="0.9" />
              </g>
            );
          })}
        </svg>
      </div>

      {/* Selected Hotspot Info */}
      {selectedHotspot && (
        <div className="rounded-2xl p-4" style={{ background: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.12)', border: `2px solid ${DISEASE_COLOR[selectedHotspot.disease] || '#dc2626'}` }}>
          <div className="flex items-start justify-between mb-2">
            <div>
              <p className="text-sm font-black text-gray-800">{selectedHotspot.farm_name || 'Unknown Farm'}</p>
              <p className="text-xs text-gray-500">{selectedHotspot.date}</p>
            </div>
            <button onClick={() => setSelectedHotspot(null)} className="text-gray-400 text-sm">✕</button>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {[
              { label: 'Crop', value: selectedHotspot.crop },
              { label: 'Disease', value: selectedHotspot.disease },
              { label: 'Severity', value: selectedHotspot.severity },
              { label: 'Confirmed', value: selectedHotspot.confirmed ? '✅ Yes' : '❓ Unconfirmed' },
            ].map(({ label, value }) => (
              <div key={label} className="rounded-lg p-2" style={{ background: '#f9fafb' }}>
                <p className="text-xs text-gray-400">{label}</p>
                <p className="text-sm font-bold text-gray-700">{value}</p>
              </div>
            ))}
          </div>
          {selectedHotspot.is_demo && (
            <p className="text-xs text-amber-600 mt-2">⚠️ DEMO DATA — Synthetic location</p>
          )}
        </div>
      )}

      {/* Hotspot List */}
      <div className="rounded-2xl p-4" style={{ background: 'white', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">📋 Disease Cases</p>
        <div className="space-y-2">
          {filteredHotspots.map(hotspot => {
            const color = DISEASE_COLOR[hotspot.disease] || '#dc2626';
            const sev = SEVERITY_STYLE[hotspot.severity] || SEVERITY_STYLE.MEDIUM;
            return (
              <div key={hotspot.id}
                onClick={() => setSelectedHotspot(hotspot)}
                className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all active:scale-98"
                style={{ background: selectedHotspot?.id === hotspot.id ? sev.bg : '#f9fafb', border: `1px solid ${selectedHotspot?.id === hotspot.id ? color : '#f3f4f6'}` }}>
                <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: color }} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-gray-800 truncate">{hotspot.disease}</p>
                  <p className="text-xs text-gray-500">{hotspot.crop} • {hotspot.farm_name}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs font-bold" style={{ color: sev.color }}>{hotspot.severity}</p>
                  <p className="text-xs text-gray-400">{hotspot.date.slice(5)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="rounded-2xl p-4" style={{ background: 'white', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Severity Legend</p>
        <div className="flex gap-4">
          {Object.entries(SEVERITY_STYLE).map(([sev, style]) => (
            <div key={sev} className="flex items-center gap-1.5">
              <div className="rounded-full" style={{ width: style.size / 1.5, height: style.size / 1.5, background: style.color }} />
              <span className="text-xs text-gray-600">{sev}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
