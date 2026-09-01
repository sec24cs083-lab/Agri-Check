import React from 'react';
import { Language } from '../types/agri';

interface NavigationProps {
  language: Language;
  activeScreen: string;
  onNavigate: (screen: string) => void;
  onOpenMoreMenu: () => void;
}

const NAV_ITEMS = [
  { id: 'dashboard', icon: '🏠', labelEn: 'Home', labelTa: 'முகப்பு' },
  { id: 'scan', icon: '🔬', labelEn: 'Scan', labelTa: 'ஸ்கேன்' },
  { id: 'risk', icon: '📊', labelEn: 'Risk', labelTa: 'ஆபத்து' },
  { id: 'hotspot', icon: '📍', labelEn: 'Map', labelTa: 'வரைபடம்' },
  { id: 'more', icon: '⋯', labelEn: 'More', labelTa: 'மேலும்' },
];

export const Navigation: React.FC<NavigationProps> = ({ language, activeScreen, onNavigate, onOpenMoreMenu }) => {
  return (
    <nav className="border-t flex items-stretch"
      style={{ background: 'white', borderColor: '#e5e7eb', boxShadow: '0 -4px 16px rgba(0,0,0,0.08)', minHeight: '64px' }}>
      {NAV_ITEMS.map(item => {
        const isActive = item.id !== 'more' && activeScreen === item.id;
        const label = language === 'ta' ? item.labelTa : item.labelEn;
        return (
          <button
            key={item.id}
            onClick={item.id === 'more' ? onOpenMoreMenu : () => onNavigate(item.id)}
            className="flex-1 flex flex-col items-center justify-center gap-0.5 transition-all active:scale-90"
            style={{ minWidth: 0 }}>
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${isActive ? 'scale-110' : ''}`}
              style={{ background: isActive ? 'linear-gradient(135deg, #22c55e, #16a34a)' : 'transparent' }}>
              <span className="text-lg leading-none">{item.icon}</span>
            </div>
            <span className="text-xs font-semibold leading-none"
              style={{ color: isActive ? '#16a34a' : '#6b7280', fontSize: '0.65rem' }}>
              {label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
