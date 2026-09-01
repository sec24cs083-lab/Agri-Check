import React from 'react';
import { 
  User, 
  MapPin, 
  Layers, 
  Sprout, 
  Droplets, 
  Globe, 
  Cpu, 
  Bell, 
  RotateCcw, 
  Check, 
  ShieldCheck,
  Smartphone
} from 'lucide-react';
import { FarmerProfile, SensorData, Language } from '../../types/agri';
import { translations } from '../../data/translations';

interface ProfileScreenProps {
  farmer: FarmerProfile;
  sensor: SensorData;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onResetOnboarding: () => void;
  onToggleSensor: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  farmer,
  sensor,
  language,
  onLanguageChange,
  onResetOnboarding,
  onToggleSensor,
}) => {
  const t = translations[language];

  return (
    <div className="space-y-4 pb-20 pt-1 animate-in fade-in duration-200">
      {/* Profile Card Header */}
      <div className="bg-gradient-to-br from-stone-900 via-stone-800 to-emerald-950 text-white rounded-3xl p-5 shadow-lg flex items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-emerald-500 text-stone-950 flex items-center justify-center font-black text-2xl shadow-md border-2 border-emerald-300 shrink-0">
          {farmer.name.charAt(0)}
        </div>
        <div>
          <h2 className="text-xl font-extrabold text-white">
            {farmer.name}
          </h2>
          <p className="text-xs text-emerald-300 font-semibold mt-0.5">
            📍 {farmer.district}, {farmer.state}
          </p>
          <span className="inline-block text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 mt-1">
            Verified Small Farmer ID
          </span>
        </div>
      </div>

      {/* Farm Details Grid */}
      <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-sm space-y-3">
        <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2 pb-2 border-b border-stone-100">
          <Sprout className="w-4 h-4 text-emerald-600" />
          {language === 'en' ? 'Registered Farm Overview' : 'பதிவு செய்யப்பட்ட நில விவரம்'}
        </h3>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-3 bg-stone-50 rounded-xl border border-stone-100">
            <span className="text-[10px] text-stone-400 font-bold uppercase block">Land Size</span>
            <span className="font-extrabold text-stone-900">{farmer.farmSize} ({farmer.farmSizeAcres} Acres)</span>
          </div>

          <div className="p-3 bg-stone-50 rounded-xl border border-stone-100">
            <span className="text-[10px] text-stone-400 font-bold uppercase block">Main Crop</span>
            <span className="font-extrabold text-stone-900">{farmer.mainCrop}</span>
          </div>

          <div className="p-3 bg-stone-50 rounded-xl border border-stone-100">
            <span className="text-[10px] text-stone-400 font-bold uppercase block">Previous Crop</span>
            <span className="font-extrabold text-stone-900">{farmer.previousCrop}</span>
          </div>

          <div className="p-3 bg-stone-50 rounded-xl border border-stone-100">
            <span className="text-[10px] text-stone-400 font-bold uppercase block">Irrigation</span>
            <span className="font-extrabold text-stone-900">{farmer.waterSource}</span>
          </div>
        </div>
      </div>

      {/* App Settings & Hardware */}
      <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-sm space-y-3">
        <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2 pb-2 border-b border-stone-100">
          <Smartphone className="w-4 h-4 text-stone-600" />
          {language === 'en' ? 'App Settings & Hardware' : 'செயலி அமைப்புகள்'}
        </h3>

        {/* Language Switch */}
        <div className="flex items-center justify-between p-3 bg-stone-50 rounded-xl border border-stone-200/80">
          <div className="flex items-center gap-2.5 text-xs font-bold text-stone-800">
            <Globe className="w-4 h-4 text-stone-600" />
            <span>Preferred App Language</span>
          </div>
          <button
            onClick={() => onLanguageChange(language === 'en' ? 'ta' : 'en')}
            className="bg-emerald-600 text-white font-extrabold text-xs px-3 py-1.5 rounded-lg shadow-xs cursor-pointer"
          >
            {t.switchLanguage}
          </button>
        </div>

        {/* Sensor Hardware Toggle */}
        <div className="flex items-center justify-between p-3 bg-stone-50 rounded-xl border border-stone-200/80">
          <div className="flex items-center gap-2.5 text-xs font-bold text-stone-800">
            <Cpu className="w-4 h-4 text-indigo-600" />
            <div>
              <span>{t.sensorDeviceLabel}</span>
              <span className="block text-[10px] font-semibold text-stone-500">{sensor.deviceName}</span>
            </div>
          </div>
          <button
            onClick={onToggleSensor}
            className={`font-extrabold text-xs px-3 py-1.5 rounded-lg shadow-xs cursor-pointer ${
              sensor.isConnected ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'bg-rose-100 text-rose-800 border border-rose-200'
            }`}
          >
            {sensor.isConnected ? 'Connected' : 'Connect'}
          </button>
        </div>

        {/* Reset Demo Onboarding */}
        <button
          onClick={onResetOnboarding}
          className="w-full bg-stone-100 hover:bg-stone-200 text-stone-900 font-bold text-xs py-3 rounded-xl border border-stone-300 flex items-center justify-center gap-2 transition-all active:scale-98 cursor-pointer mt-2"
        >
          <RotateCcw className="w-4 h-4 text-stone-600" />
          <span>{t.resetOnboarding}</span>
        </button>
      </div>
    </div>
  );
};
