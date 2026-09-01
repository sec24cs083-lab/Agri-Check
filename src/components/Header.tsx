import React from 'react';
import { Language, FarmerProfile, SensorData } from '../types/agri';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  farmer: FarmerProfile;
  sensor: SensorData;
  onToggleSensor: () => void;
  onOpenProfile: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  language, onLanguageChange, farmer, sensor, onToggleSensor, onOpenProfile
}) => {
  return (
    <header className="px-4 pt-4 pb-3 flex items-center justify-between"
      style={{ background: 'linear-gradient(135deg, #0f3d0f, #1a5e1a)' }}>
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-xl flex items-center justify-center"
          style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)' }}>
          <span className="text-lg">🌿</span>
        </div>
        <div>
          <p className="text-white font-black text-base leading-none tracking-wider">AGRICHECK</p>
          <p className="text-green-300 text-xs leading-none">AI Crop Intelligence</p>
        </div>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-2">
        {/* Demo badge */}
        {sensor.isDemoMode && (
          <div className="px-2 py-1 rounded-lg" style={{ background: 'rgba(245,158,11,0.25)', border: '1px solid rgba(245,158,11,0.4)' }}>
            <p className="text-amber-300 text-xs font-bold">DEMO</p>
          </div>
        )}

        {/* Language toggle */}
        <button onClick={() => onLanguageChange(language === 'en' ? 'ta' : 'en')}
          className="px-2.5 py-1 rounded-lg text-xs font-bold transition-all"
          style={{ background: 'rgba(255,255,255,0.15)', color: '#86efac', border: '1px solid rgba(255,255,255,0.2)' }}>
          {language === 'en' ? 'தமிழ்' : 'EN'}
        </button>

        {/* Avatar */}
        <button onClick={onOpenProfile}
          className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all"
          style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)', color: 'white' }}>
          {farmer.name.charAt(0).toUpperCase()}
        </button>
      </div>
    </header>
  );
};
