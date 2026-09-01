import React from 'react';
import { Language } from '../types/agri';

interface MoreMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  activeScreen: string;
  onNavigate: (screen: string) => void;
}

const MORE_ITEMS = [
  { section: 'AI & Intelligence' },
  { id: 'analysis', icon: '🔬', labelEn: 'AI Analysis', labelTa: 'AI பகுப்பாய்வு' },
  { id: 'explanation', icon: '🔍', labelEn: 'Explanation (XAI)', labelTa: 'விளக்கம் (XAI)' },
  { id: 'risk', icon: '📊', labelEn: 'Disease Risk', labelTa: 'நோய் ஆபத்து' },
  { section: 'Farm Management' },
  { id: 'addFarm', icon: '🌾', labelEn: 'Add Farm', labelTa: 'பண்ணை சேர்க்க' },
  { id: 'history', icon: '📋', labelEn: 'Farm History', labelTa: 'வரலாறு' },
  { id: 'feedback', icon: '👨‍🌾', labelEn: 'Farmer Feedback', labelTa: 'விவசாயி கருத்து' },
  { section: 'Knowledge & Learning' },
  { id: 'knowledgeGraph', icon: '🕸️', labelEn: 'Knowledge Graph', labelTa: 'அறிவு வரைபடம்' },
  { id: 'continualLearning', icon: '🤖', labelEn: 'Continual Learning', labelTa: 'தொடர் கற்றல்' },
  { section: 'Other' },
  { id: 'sensor', icon: '📡', labelEn: 'Sensor Dashboard', labelTa: 'சென்சார் தரவு' },
  { id: 'weather', icon: '⛅', labelEn: 'Weather', labelTa: 'வானிலை' },
  { id: 'hotspot', icon: '📍', labelEn: 'Hotspot Map', labelTa: 'தீவிர வரைபடம்' },
  { id: 'admin', icon: '🔬', labelEn: 'Research Dashboard', labelTa: 'ஆராய்ச்சி' },
  { id: 'sihDemo', icon: '🏆', labelEn: 'SIH Demo', labelTa: 'SIH டெமோ' },
  { id: 'profile', icon: '👤', labelEn: 'Profile', labelTa: 'சுயவிவரம்' },
];

export const MoreMenuModal: React.FC<MoreMenuModalProps> = ({ isOpen, onClose, language, activeScreen, onNavigate }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end" onClick={onClose}>
      <div className="w-full max-w-md mx-auto" onClick={e => e.stopPropagation()}>
        {/* Backdrop */}
        <div className="fixed inset-0 bg-black opacity-50" onClick={onClose} />
        
        {/* Drawer */}
        <div className="relative rounded-t-3xl overflow-hidden max-h-[80vh] flex flex-col"
          style={{ background: 'white', boxShadow: '0 -8px 40px rgba(0,0,0,0.2)' }}>
          {/* Handle */}
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-10 h-1.5 rounded-full bg-gray-300" />
          </div>
          <div className="px-4 pb-2 flex items-center justify-between">
            <p className="text-base font-black text-gray-800">More</p>
            <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: '#f3f4f6', color: '#6b7280' }}>✕</button>
          </div>
          
          {/* Items */}
          <div className="overflow-y-auto flex-1 px-4 pb-6">
            {MORE_ITEMS.map((item, i) => {
              if ('section' in item) {
                return (
                  <p key={i} className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-4 mb-2">
                    {item.section}
                  </p>
                );
              }
              const label = language === 'ta' ? item.labelTa : item.labelEn;
              const isActive = activeScreen === item.id;
              return (
                <button key={item.id} onClick={() => { onNavigate(item.id); onClose(); }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-1 transition-all active:scale-98"
                  style={{ background: isActive ? '#f0fdf4' : '#f9fafb', border: isActive ? '1px solid #86efac' : '1px solid transparent' }}>
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-sm font-semibold" style={{ color: isActive ? '#16a34a' : '#374151' }}>{label}</span>
                  {isActive && <span className="ml-auto text-green-500 text-xs">●</span>}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
