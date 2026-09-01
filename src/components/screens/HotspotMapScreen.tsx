import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Language, HotspotPoint } from '../../types/agri';

interface HotspotMapScreenProps {
  language: Language;
  hotspots: HotspotPoint[];
  onNavigate: (screen: string) => void;
}

const tx = {
  en: {
    title: 'Disease Hotspot Map',
    subtitle: 'Crop Disease Alerts',
    trackedCases: 'confirmed cases tracked',
    demoWarning: 'DEMO DATA — Hotspot locations are synthetic data for demonstration.',
    all: 'ALL',
    tamilNadu: 'Tamil Nadu',
    unknownFarm: 'Unknown Farm',
    crop: 'Crop',
    disease: 'Disease',
    severity: 'Severity',
    confirmed: 'Confirmed',
    yes: '✅ Yes',
    unconfirmed: '❓ Unconfirmed',
    synthetic: '⚠️ DEMO DATA — Synthetic location',
    diseaseCases: 'Disease Cases',
    legend: 'Severity Legend',
    high: 'HIGH',
    medium: 'MEDIUM',
    low: 'LOW'
  },
  ta: {
    title: 'நோய் பரவல் வரைபடம்',
    subtitle: 'பயிர் நோய் எச்சரிக்கைகள்',
    trackedCases: 'உறுதிப்படுத்தப்பட்ட வழக்குகள்',
    demoWarning: 'டெமோ தரவு — இடங்கள் உருவகப்படுத்தப்பட்டவை.',
    all: 'அனைத்தும்',
    tamilNadu: 'தமிழ்நாடு',
    unknownFarm: 'பண்ணை விவரம் இல்லை',
    crop: 'பயிர்',
    disease: 'நோய்',
    severity: 'தீவிரம்',
    confirmed: 'உறுதிப்படுத்தப்பட்டதா',
    yes: '✅ ஆம்',
    unconfirmed: '❓ உறுதிப்படுத்தப்படவில்லை',
    synthetic: '⚠️ டெமோ தரவு — உருவகப்படுத்தப்பட்ட இடம்',
    diseaseCases: 'நோய் வழக்குகள்',
    legend: 'தீவிரத்தின் குறியீடுகள்',
    high: 'அதிகம்',
    medium: 'மிதமான',
    low: 'குறைவு',
    // Disease Translations
    'Early Blight': 'முன் கருகல் நோய்',
    'Late Blight': 'பின் கருகல் நோய்',
    'Leaf Blast': 'இலை வெடிப்பு நோய்',
    'Leaf Spot': 'இலைப் புள்ளி நோய்',
    'Brown Spot': 'பழுப்பு புள்ளி நோய்',
    'Healthy': 'ஆரோக்கியமானது',
    // Crop Translations
    'Tomato': 'தக்காளி',
    'Rice (Paddy)': 'நெல்',
    'Rice': 'நெல்',
    'Groundnut': 'நிலக்கடலை',
    'Millet': 'சிறுதானியம்',
    'Wheat': 'கோதுமை',
    'Maize': 'மக்காச்சோளம்'
  }
};

const getTranslatedName = (name: string, lang: Language) => {
  if (lang === 'en') return name;
  return (tx.ta as any)[name] || name;
};

const SEVERITY_STYLE: Record<string, { color: string; bg: string; size: number }> = {
  HIGH: { color: '#dc2626', bg: '#fef2f2', size: 20 },
  MEDIUM: { color: '#d97706', bg: '#fffbeb', size: 16 },
  LOW: { color: '#16a34a', bg: '#f0fdf4', size: 12 },
};

const DISEASE_COLOR: Record<string, string> = {
  'Early Blight': '#dc2626',
  'Late Blight': '#7c3aed',
  'Leaf Blast': '#2563eb',
  'Leaf Spot': '#d97706',
  'Brown Spot': '#92400e',
};

// Tamil Nadu approximate bounding box for simplified SVG map
const MAP_BOUNDS = { latMin: 8.0, latMax: 13.5, lonMin: 76.7, lonMax: 80.5 };
const MAP_W = 320;
const MAP_H = 380;

const latToY = (lat: number) => MAP_H - ((lat - MAP_BOUNDS.latMin) / (MAP_BOUNDS.latMax - MAP_BOUNDS.latMin)) * MAP_H;
const lonToX = (lon: number) => ((lon - MAP_BOUNDS.lonMin) / (MAP_BOUNDS.lonMax - MAP_BOUNDS.lonMin)) * MAP_W;

export const HotspotMapScreen: React.FC<HotspotMapScreenProps> = ({ language, hotspots, onNavigate }) => {
  const [selectedHotspot, setSelectedHotspot] = useState<HotspotPoint | null>(null);
  const [filter, setFilter] = useState<string>('ALL');

  const T = tx[language];

  const diseases: string[] = ['ALL', ...Array.from(new Set<string>(hotspots.map(h => h.disease)))];
  const filteredHotspots = filter === 'ALL' ? hotspots : hotspots.filter(h => h.disease === filter);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
    exit: { opacity: 0, y: -20 }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" exit="exit" className="pb-6 space-y-4">
      
      {/* Header */}
      <motion.div variants={itemVariants} className="rounded-3xl p-5 relative overflow-hidden shadow-lg border border-green-800" style={{ background: 'linear-gradient(135deg, #064e3b, #059669)' }}>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10" />
        <div className="relative z-10">
          <p className="text-[10px] text-green-200 uppercase tracking-widest font-bold mb-1">{T.title}</p>
          <h2 className="text-white font-black text-xl leading-tight">📍 {T.subtitle}</h2>
          <p className="text-green-50 text-xs mt-2 font-medium">{hotspots.length} {T.trackedCases}</p>
        </div>
      </motion.div>

      {/* DEMO Banner */}
      <motion.div variants={itemVariants} className="px-4 py-3 rounded-2xl flex items-center gap-3 shadow-sm"
        style={{ background: '#fffbeb', border: '1px solid #fcd34d' }}>
        <span className="text-xl">📊</span>
        <p className="text-xs text-amber-900 font-bold leading-relaxed">{T.demoWarning}</p>
      </motion.div>

      {/* Disease Filter */}
      <motion.div variants={itemVariants} className="flex gap-2 overflow-x-auto pb-2 no-scrollbar px-1">
        {diseases.map(d => (
          <motion.button 
            whileTap={{ scale: 0.95 }}
            key={d} 
            onClick={() => { setFilter(d); setSelectedHotspot(null); }}
            className="flex-shrink-0 px-4 py-2.5 rounded-full text-xs font-black transition-all shadow-sm"
            style={{
              background: filter === d ? (DISEASE_COLOR[d] || '#059669') : 'white',
              color: filter === d ? 'white' : '#374151',
              border: `2px solid ${filter === d ? (DISEASE_COLOR[d] || '#059669') : '#e5e7eb'}`,
            }}>
            {d === 'ALL' ? T.all : getTranslatedName(d, language)}
          </motion.button>
        ))}
      </motion.div>

      {/* SVG Map */}
      <motion.div variants={itemVariants} className="rounded-3xl overflow-hidden shadow-lg" style={{ background: '#0a2818', border: '2px solid #064e3b', position: 'relative' }}>
        <div className="absolute top-3 right-3 px-3 py-1.5 rounded-xl z-10"
          style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <p className="text-green-300 text-[11px] font-black uppercase tracking-wider">{T.tamilNadu}</p>
        </div>
        
        <svg width="100%" viewBox={`0 0 ${MAP_W} ${MAP_H}`} style={{ display: 'block' }}>
          {/* Background Grid */}
          {Array.from({ length: 8 }).map((_, i) => (
            <line key={`v${i}`} x1={i * 46} y1="0" x2={i * 46} y2={MAP_H} stroke="#133d26" strokeWidth="0.5" />
          ))}
          {Array.from({ length: 10 }).map((_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 38} x2={MAP_W} y2={i * 38} stroke="#133d26" strokeWidth="0.5" />
          ))}

          {/* Tamil Nadu outline (simplified polygon) */}
          <polygon
            points="120,10 200,5 280,30 300,80 310,150 290,220 270,290 230,350 180,375 140,370 100,320 60,260 40,190 50,120 80,60 120,10"
            fill="#064e3b" stroke="#10b981" strokeWidth="1.5" opacity="0.6"
          />

          {/* District labels */}
          {[
            { name: 'Chennai', x: 270, y: 40 },
            { name: 'Salem', x: 175, y: 130 },
            { name: 'Trichy', x: 195, y: 210 },
            { name: 'Madurai', x: 165, y: 290 },
            { name: 'Coimbatore', x: 85, y: 210 },
          ].map(({ name, x, y }) => (
            <text key={name} x={x} y={y} textAnchor="middle" fill="#6ee7b7" fontSize="10" fontWeight="bold" fontFamily="sans-serif" opacity="0.5">
              {name}
            </text>
          ))}

          {/* Hotspot markers */}
          <AnimatePresence>
            {filteredHotspots.map(hotspot => {
              const x = lonToX(hotspot.longitude);
              const y = latToY(hotspot.latitude);
              const style = SEVERITY_STYLE[hotspot.severity] || SEVERITY_STYLE.MEDIUM;
              const color = DISEASE_COLOR[hotspot.disease] || '#dc2626';
              const isSelected = selectedHotspot?.id === hotspot.id;

              return (
                <motion.g 
                  key={hotspot.id} 
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  onClick={() => setSelectedHotspot(isSelected ? null : hotspot)} 
                  style={{ cursor: 'pointer' }}
                >
                  {/* Pulse ring */}
                  <circle cx={x} cy={y} r={style.size + 10} fill={color} opacity="0.2"
                    style={{ animation: 'ping 2s cubic-bezier(0,0,0.2,1) infinite' }} />
                  {/* Main dot */}
                  <circle cx={x} cy={y} r={style.size / 2 + 5} fill={color} opacity="0.9"
                    stroke={isSelected ? 'white' : 'transparent'} strokeWidth="2.5" />
                  {/* Inner dot */}
                  <circle cx={x} cy={y} r={3} fill="white" opacity="1" />
                </motion.g>
              );
            })}
          </AnimatePresence>
        </svg>
      </motion.div>

      {/* Selected Hotspot Info */}
      <AnimatePresence>
        {selectedHotspot && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="rounded-3xl p-5 bg-white shadow-xl relative overflow-hidden" 
            style={{ border: `2px solid ${DISEASE_COLOR[selectedHotspot.disease] || '#dc2626'}` }}
          >
            <div className="absolute top-0 left-0 w-full h-1" style={{ background: DISEASE_COLOR[selectedHotspot.disease] || '#dc2626' }} />
            
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-base font-black text-gray-900 leading-tight">{selectedHotspot.farm_name || T.unknownFarm}</p>
                <p className="text-xs font-bold text-gray-400 mt-1">{selectedHotspot.date}</p>
              </div>
              <motion.button whileTap={{ scale: 0.9 }} onClick={() => setSelectedHotspot(null)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold">
                ✕
              </motion.button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { label: T.crop, value: getTranslatedName(selectedHotspot.crop, language) },
                { label: T.disease, value: getTranslatedName(selectedHotspot.disease, language) },
                { label: T.severity, value: T[selectedHotspot.severity.toLowerCase() as keyof typeof T] || selectedHotspot.severity },
                { label: T.confirmed, value: selectedHotspot.confirmed ? T.yes : T.unconfirmed },
              ].map(({ label, value }) => (
                <div key={label} className="rounded-2xl p-3 bg-gray-50 border border-gray-100">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{label}</p>
                  <p className="text-sm font-black text-gray-800 mt-0.5">{value}</p>
                </div>
              ))}
            </div>

            {selectedHotspot.is_demo && (
              <div className="mt-4 px-3 py-2 bg-amber-50 rounded-xl border border-amber-200">
                <p className="text-[11px] font-bold text-amber-700">{T.synthetic}</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hotspot List */}
      <motion.div variants={itemVariants} className="rounded-3xl p-5 bg-white shadow-sm border border-gray-100">
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4">📋 {T.diseaseCases}</p>
        <div className="space-y-3">
          {filteredHotspots.map(hotspot => {
            const color = DISEASE_COLOR[hotspot.disease] || '#dc2626';
            const sev = SEVERITY_STYLE[hotspot.severity] || SEVERITY_STYLE.MEDIUM;
            const isSelected = selectedHotspot?.id === hotspot.id;
            
            return (
              <motion.div 
                key={hotspot.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedHotspot(isSelected ? null : hotspot)}
                className="flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all border-2"
                style={{ 
                  background: isSelected ? sev.bg : '#f9fafb', 
                  borderColor: isSelected ? color : '#f3f4f6' 
                }}>
                <div className="w-4 h-4 rounded-full flex-shrink-0 shadow-sm" style={{ background: color }} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-black text-gray-900 truncate">{getTranslatedName(hotspot.disease, language)}</p>
                  <p className="text-xs font-semibold text-gray-500 mt-0.5">{getTranslatedName(hotspot.crop, language)} • {hotspot.farm_name}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-[11px] font-black uppercase tracking-widest px-2 py-1 rounded-md mb-1" 
                     style={{ color: sev.color, background: `${sev.color}15` }}>
                    {T[hotspot.severity.toLowerCase() as keyof typeof T] || hotspot.severity}
                  </p>
                  <p className="text-[10px] font-bold text-gray-400">{hotspot.date.slice(5)}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Legend */}
      <motion.div variants={itemVariants} className="rounded-3xl p-5 bg-white shadow-sm border border-gray-100">
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4">{T.legend}</p>
        <div className="flex gap-5">
          {Object.entries(SEVERITY_STYLE).map(([sev, style]) => (
            <div key={sev} className="flex items-center gap-2">
              <div className="rounded-full shadow-sm" style={{ width: style.size, height: style.size, background: style.color }} />
              <span className="text-[11px] font-black text-gray-700">{T[sev.toLowerCase() as keyof typeof T] || sev}</span>
            </div>
          ))}
        </div>
      </motion.div>

    </motion.div>
  );
};
