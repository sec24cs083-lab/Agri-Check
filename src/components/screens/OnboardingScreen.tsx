import React, { useState } from 'react';
import { Sprout, Check, MapPin, Layers, Droplets, Globe, ArrowRight } from 'lucide-react';
import { FarmerProfile, Language } from '../../types/agri';
import { translations } from '../../data/translations';

interface OnboardingScreenProps {
  farmer: FarmerProfile;
  onSaveProfile: (profile: FarmerProfile) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({
  farmer,
  onSaveProfile,
  language,
  onLanguageChange,
}) => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState(farmer.name || "Ramesh");
  const [district, setDistrict] = useState(farmer.district || "Salem");
  const [farmSize, setFarmSize] = useState(farmer.farmSize || "2–5 acres");
  const [mainCrop, setMainCrop] = useState(farmer.mainCrop || "Paddy");
  const [waterSource, setWaterSource] = useState(farmer.waterSource || "Borewell & Canal");

  const t = translations[language];

  const handleFinish = () => {
    let acres = 2.5;
    if (farmSize === "<1 acre") acres = 0.8;
    else if (farmSize === "1–2 acres") acres = 1.5;
    else if (farmSize === "2–5 acres") acres = 2.5;
    else acres = 6.0;

    onSaveProfile({
      ...farmer,
      name,
      district,
      farmSize,
      farmSizeAcres: acres,
      mainCrop,
      waterSource,
      preferredLanguage: language,
      isOnboarded: true,
    });
  };

  const farmSizes = [
    { label: "<1 acre", labelTa: "<1 ஏக்கர்", acres: 0.8 },
    { label: "1–2 acres", labelTa: "1–2 ஏக்கர்", acres: 1.5 },
    { label: "2–5 acres", labelTa: "2–5 ஏக்கர்", acres: 2.5 },
    { label: ">5 acres", labelTa: ">5 ஏக்கர்", acres: 6.0 },
  ];

  const districtsList = [
    "Salem", "Coimbatore", "Erode", "Tiruchirappalli", "Thanjavur", "Madurai", "Dharmapuri"
  ];

  const cropsList = [
    { name: "Paddy", icon: "🍚" },
    { name: "Groundnut", icon: "🥜" },
    { name: "Sugarcane", icon: "🎋" },
    { name: "Cotton", icon: "☁️" },
    { name: "Vegetables", icon: "🍅" },
    { name: "Millet", icon: "🌾" },
  ];

  const waterSourcesList = [
    "Borewell & Canal", "Open Well", "Rainfed Only", "Drip System"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-950 via-emerald-900 to-stone-900 text-white px-4 py-8 flex flex-col justify-between">
      <div className="max-w-md mx-auto w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-stone-950 flex items-center justify-center font-bold shadow-lg">
              <Sprout className="w-7 h-7 stroke-[2.2]" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold tracking-tight text-white">AgriAI</h1>
              <p className="text-xs text-emerald-300 font-medium">{t.tagline}</p>
            </div>
          </div>

          <button
            onClick={() => onLanguageChange(language === 'en' ? 'ta' : 'en')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-emerald-200 text-xs font-bold border border-white/15"
          >
            <Globe className="w-3.5 h-3.5" />
            {t.switchLanguage}
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-white/10 h-2 rounded-full mb-8 overflow-hidden">
          <div
            className="bg-emerald-400 h-full transition-all duration-300 rounded-full"
            style={{ width: `${(step / 3) * 100}%` }}
          ></div>
        </div>

        {/* Step 1: Name & Location */}
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
                Step 1 of 3
              </span>
              <h2 className="text-2xl font-bold text-white mt-1">
                {t.welcomeFarmer} 👋
              </h2>
              <p className="text-xs text-stone-300 mt-1">{t.onboardingSubtitle}</p>
            </div>

            {/* Name Input */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
              <label className="block text-xs font-semibold text-emerald-300 mb-2">
                {t.step1Title}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-stone-900/80 border border-white/20 rounded-xl px-4 py-3 text-white font-medium focus:outline-none focus:ring-2 focus:ring-emerald-400"
                placeholder="e.g. Ramesh"
              />
            </div>

            {/* District Cards */}
            <div>
              <label className="block text-xs font-semibold text-emerald-300 mb-2 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {t.step2Title}
              </label>
              <div className="grid grid-cols-2 gap-2">
                {districtsList.map((dist) => (
                  <button
                    key={dist}
                    onClick={() => setDistrict(dist)}
                    className={`p-3 rounded-xl text-xs font-semibold border text-left flex items-center justify-between transition-all ${
                      district === dist
                        ? 'bg-emerald-500 text-stone-950 border-emerald-400 font-bold shadow-md'
                        : 'bg-white/5 text-stone-200 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <span>{dist}, TN</span>
                    {district === dist && <Check className="w-4 h-4 stroke-[3]" />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Land Size & Crops */}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
                Step 2 of 3
              </span>
              <h2 className="text-2xl font-bold text-white mt-1">
                {t.step3Title}
              </h2>
              <p className="text-xs text-stone-300 mt-1">
                {language === 'en' ? 'Select land size card' : 'நில அளவை தேர்வு செய்யவும்'}
              </p>
            </div>

            {/* Farm Size Cards */}
            <div className="grid grid-cols-2 gap-3">
              {farmSizes.map((item) => {
                const isSelected = farmSize === item.label;
                return (
                  <button
                    key={item.label}
                    onClick={() => setFarmSize(item.label)}
                    className={`p-4 rounded-2xl border text-center flex flex-col items-center justify-center gap-1 transition-all active:scale-95 ${
                      isSelected
                        ? 'bg-emerald-500 text-stone-950 border-emerald-400 font-bold shadow-lg scale-[1.02]'
                        : 'bg-white/5 text-stone-200 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <Layers className="w-6 h-6 mb-1" />
                    <span className="text-sm font-extrabold">{item.label}</span>
                    <span className="text-[10px] opacity-80">{item.labelTa}</span>
                  </button>
                );
              })}
            </div>

            {/* Main Crop Select */}
            <div>
              <label className="block text-xs font-semibold text-emerald-300 mb-2">
                {t.step4Title}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {cropsList.map((crop) => (
                  <button
                    key={crop.name}
                    onClick={() => setMainCrop(crop.name)}
                    className={`p-3 rounded-xl border text-center flex flex-col items-center gap-1 transition-all ${
                      mainCrop === crop.name
                        ? 'bg-emerald-500 text-stone-950 border-emerald-400 font-bold'
                        : 'bg-white/5 text-stone-200 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <span className="text-xl">{crop.icon}</span>
                    <span className="text-xs font-semibold">{crop.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Water Source */}
        {step === 3 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
                Step 3 of 3
              </span>
              <h2 className="text-2xl font-bold text-white mt-1">
                {t.step5Title}
              </h2>
              <p className="text-xs text-stone-300 mt-1">
                {language === 'en' ? 'Select primary irrigation source' : 'பாசன நீர் ஆதாரத்தை தேர்வு செய்யவும்'}
              </p>
            </div>

            <div className="space-y-2.5">
              {waterSourcesList.map((ws) => (
                <button
                  key={ws}
                  onClick={() => setWaterSource(ws)}
                  className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${
                    waterSource === ws
                      ? 'bg-emerald-500 text-stone-950 border-emerald-400 font-bold shadow-md'
                      : 'bg-white/5 text-stone-200 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Droplets className="w-5 h-5" />
                    <span className="text-sm font-semibold">{ws}</span>
                  </div>
                  {waterSource === ws && <Check className="w-5 h-5 stroke-[3]" />}
                </button>
              ))}
            </div>

            {/* Profile Summary Card */}
            <div className="bg-emerald-950/80 border border-emerald-500/30 p-4 rounded-2xl text-xs space-y-1.5 text-emerald-200">
              <p className="font-bold text-emerald-400 uppercase text-[10px]">
                {language === 'en' ? 'Profile Summary' : 'பதிவு சுருக்கம்'}
              </p>
              <p>👤 <strong>Farmer:</strong> {name}</p>
              <p>📍 <strong>Location:</strong> {district}, Tamil Nadu</p>
              <p>🌾 <strong>Land & Crop:</strong> {farmSize} ({mainCrop})</p>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Footer */}
      <div className="max-w-md mx-auto w-full pt-6">
        {step < 3 ? (
          <button
            onClick={() => setStep(step + 1)}
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-extrabold text-base py-4 rounded-2xl shadow-xl flex items-center justify-center gap-2 transition-transform active:scale-98"
          >
            <span>{t.continueBtn}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        ) : (
          <button
            onClick={handleFinish}
            className="w-full bg-amber-400 hover:bg-amber-300 text-stone-950 font-extrabold text-base py-4 rounded-2xl shadow-xl flex items-center justify-center gap-2 transition-transform active:scale-98"
          >
            <Check className="w-5 h-5 stroke-[3]" />
            <span>{t.startFarmingBtn}</span>
          </button>
        )}
      </div>
    </div>
  );
};
