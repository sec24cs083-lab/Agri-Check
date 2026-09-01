import React, { useState } from 'react';
import { 
  SlidersHorizontal, 
  TrendingUp, 
  Droplets, 
  ShieldAlert, 
  Check, 
  Info,
  Sparkles
} from 'lucide-react';
import { Language } from '../../types/agri';
import { translations } from '../../data/translations';
import { DisclaimerBadge } from '../Disclaimers';

interface CropSimulatorScreenProps {
  language: Language;
  onSelectCrop: (cropName: string) => void;
}

export const CropSimulatorScreen: React.FC<CropSimulatorScreenProps> = ({
  language,
  onSelectCrop,
}) => {
  const [selectedCropId, setSelectedCropId] = useState('groundnut');

  const t = translations[language];

  const crops = [
    {
      id: 'groundnut',
      name: 'Groundnut (மணிலா)',
      icon: '🥜',
      cost: 22000,
      revenue: 70000,
      profit: 48000,
      waterLevel: 25, // % bar
      waterText: 'Low',
      riskLevel: 25,
      riskText: 'Low Risk',
      roi: '218%',
    },
    {
      id: 'millet',
      name: 'Millet (கம்பு)',
      icon: '🌾',
      cost: 16000,
      revenue: 52000,
      profit: 36000,
      waterLevel: 15,
      waterText: 'Very Low',
      riskLevel: 20,
      riskText: 'Low Risk',
      roi: '225%',
    },
    {
      id: 'paddy',
      name: 'Rice / Paddy (நெல்)',
      icon: '🍚',
      cost: 32000,
      revenue: 65000,
      profit: 33000,
      waterLevel: 85,
      waterText: 'High',
      riskLevel: 55,
      riskText: 'Medium Risk',
      roi: '103%',
    },
    {
      id: 'tomato',
      name: 'Tomato (தக்காளி)',
      icon: '🍅',
      cost: 35000,
      revenue: 85000,
      profit: 50000,
      waterLevel: 50,
      waterText: 'Medium',
      riskLevel: 65,
      riskText: 'Medium-High',
      roi: '142%',
    },
    {
      id: 'cotton',
      name: 'Cotton (பருத்தி)',
      icon: '☁️',
      cost: 28000,
      revenue: 68000,
      profit: 40000,
      waterLevel: 45,
      waterText: 'Medium',
      riskLevel: 40,
      riskText: 'Medium',
      roi: '142%',
    },
  ];

  const currentCrop = crops.find((c) => c.id === selectedCropId) || crops[0];

  return (
    <div className="space-y-4 pb-20 pt-1 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-900 via-teal-800 to-emerald-900 text-white rounded-3xl p-5 shadow-lg">
        <div className="flex items-center gap-2 text-teal-300 text-xs font-bold uppercase tracking-wider mb-1">
          <SlidersHorizontal className="w-4 h-4" />
          <span>{language === 'en' ? 'Innovation Feature' : 'புதுமை தொழில்நுட்பம்'}</span>
        </div>
        <h2 className="text-xl font-extrabold text-white">
          {t.simulatorTitle}
        </h2>
        <p className="text-xs text-teal-100 mt-1 font-medium leading-relaxed">
          {t.simulatorSubtitle}
        </p>
      </div>

      {/* Select Crop Pills */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {crops.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedCropId(c.id)}
            className={`px-3.5 py-2.5 rounded-2xl border text-xs font-extrabold flex items-center gap-1.5 shrink-0 transition-all active:scale-95 cursor-pointer ${
              selectedCropId === c.id
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-md ring-2 ring-emerald-200'
                : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
            }`}
          >
            <span className="text-base">{c.icon}</span>
            <span>{c.name.split(' ')[0]}</span>
          </button>
        ))}
      </div>

      {/* Detailed Simulator Card */}
      <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-md space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{currentCrop.icon}</span>
            <div>
              <h3 className="text-base font-black text-stone-900">
                {currentCrop.name}
              </h3>
              <p className="text-xs text-emerald-700 font-bold">
                ROI: {currentCrop.roi} • Net Profit: ₹{currentCrop.profit.toLocaleString()}/Acre
              </p>
            </div>
          </div>
        </div>

        {/* Financial Numbers Bar */}
        <div className="grid grid-cols-3 gap-2 bg-stone-50 p-3 rounded-2xl border border-stone-200/80 text-center">
          <div>
            <span className="text-[10px] font-bold text-stone-500 uppercase block">{t.estCost}</span>
            <span className="text-sm font-extrabold text-stone-900">₹{currentCrop.cost.toLocaleString()}</span>
          </div>
          <div>
            <span className="text-[10px] font-bold text-stone-500 uppercase block">{t.estRevenue}</span>
            <span className="text-sm font-extrabold text-stone-900">₹{currentCrop.revenue.toLocaleString()}</span>
          </div>
          <div className="bg-emerald-100/80 rounded-xl p-1 border border-emerald-200">
            <span className="text-[10px] font-bold text-emerald-800 uppercase block">{t.estProfit}</span>
            <span className="text-sm font-black text-emerald-900">₹{currentCrop.profit.toLocaleString()}</span>
          </div>
        </div>

        {/* Visual Bar Comparison Charts */}
        <div className="space-y-3 pt-1">
          {/* Water Bar */}
          <div>
            <div className="flex justify-between text-xs font-bold mb-1">
              <span className="text-stone-700 flex items-center gap-1">
                <Droplets className="w-3.5 h-3.5 text-sky-600" />
                {t.waterReq}
              </span>
              <span className="text-sky-700">{currentCrop.waterText}</span>
            </div>
            <div className="w-full bg-stone-100 h-3 rounded-full overflow-hidden">
              <div
                className="bg-sky-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${currentCrop.waterLevel}%` }}
              ></div>
            </div>
          </div>

          {/* Risk Bar */}
          <div>
            <div className="flex justify-between text-xs font-bold mb-1">
              <span className="text-stone-700 flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
                {t.risk}
              </span>
              <span className="text-amber-700">{currentCrop.riskText}</span>
            </div>
            <div className="w-full bg-stone-100 h-3 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  currentCrop.riskLevel > 50 ? 'bg-amber-500' : 'bg-emerald-500'
                }`}
                style={{ width: `${currentCrop.riskLevel}%` }}
              ></div>
            </div>
          </div>
        </div>

        <button
          onClick={() => onSelectCrop(currentCrop.name)}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm py-3.5 rounded-2xl shadow-md flex items-center justify-center gap-2 transition-transform active:scale-98 cursor-pointer"
        >
          <Check className="w-5 h-5 stroke-[3]" />
          <span>Select {currentCrop.name.split(' ')[0]} for Season</span>
        </button>
      </div>

      <DisclaimerBadge language={language} variant="financialNote" />
    </div>
  );
};
