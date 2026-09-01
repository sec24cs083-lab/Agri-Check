import React, { useState, useRef } from 'react';
import { 
  Camera, 
  Upload, 
  Check, 
  AlertCircle, 
  Cpu, 
  Sparkles, 
  ArrowRight, 
  RotateCcw,
  Wifi,
  Droplet,
  Thermometer,
  FlaskConical
} from 'lucide-react';
import { SensorData, SoilScanData, Language } from '../../types/agri';
import { translations } from '../../data/translations';
import { DisclaimerBadge } from '../Disclaimers';

interface SoilScannerScreenProps {
  sensor: SensorData;
  language: Language;
  onAnalyzeComplete: (scanData: SoilScanData) => void;
}

export const SoilScannerScreen: React.FC<SoilScannerScreenProps> = ({
  sensor,
  language,
  onAnalyzeComplete,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [photoCaptured, setPhotoCaptured] = useState<string | null>(
    "https://images.unsplash.com/photo-1592417817098-8f3d6eb16431?auto=format&fit=crop&w=600&q=80"
  );
  const [previousCrop, setPreviousCrop] = useState("Groundnut");
  const [currentCrop, setCurrentCrop] = useState("Paddy");
  const [perceivedMoisture, setPerceivedMoisture] = useState<'dry' | 'medium' | 'wet'>('medium');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const t = translations[language];

  const handleSimulateCamera = () => {
    // Mock high-quality soil photo
    const mockPhotos = [
      "https://images.unsplash.com/photo-1592417817098-8f3d6eb16431?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80"
    ];
    setPhotoCaptured(mockPhotos[Math.floor(Math.random() * mockPhotos.length)]);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPhotoCaptured(url);
    }
  };

  const handleRunAnalysis = () => {
    setIsAnalyzing(true);
    let prog = 0;
    const interval = setInterval(() => {
      prog += 20;
      setAnalysisProgress(prog);
      if (prog >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsAnalyzing(false);
          onAnalyzeComplete({
            photoUrl: photoCaptured,
            capturedAt: "Just now",
            perceivedMoisture,
            soilColor: "Dark Reddish Brown",
          });
        }, 500);
      }
    }, 250);
  };

  if (isAnalyzing) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 space-y-6">
        <div className="relative w-28 h-28 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-4 border-emerald-200 animate-ping opacity-75"></div>
          <div className="w-24 h-24 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-2xl z-10 animate-pulse">
            <Sparkles className="w-12 h-12" />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-extrabold text-stone-900">
            {t.scanningProgress}
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            {language === 'en'
              ? 'Evaluating RGB soil spectral data & sensor moisture...'
              : 'மண் நிறம் மற்றும் ஈரப்பத தரவுகள் ஆராயப்படுகின்றன...'}
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-full max-w-xs bg-stone-200 h-3 rounded-full overflow-hidden">
          <div 
            className="bg-emerald-600 h-full transition-all duration-300 rounded-full"
            style={{ width: `${analysisProgress}%` }}
          ></div>
        </div>
        <span className="text-xs font-bold text-emerald-800">{analysisProgress}% Complete</span>
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-20 pt-1 animate-in fade-in duration-200">
      {/* Title */}
      <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-xs flex items-center justify-between">
        <div>
          <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 uppercase">
            Step {step} of 3
          </span>
          <h2 className="text-lg font-bold text-stone-900 mt-0.5">
            {t.scannerTitle}
          </h2>
        </div>
        <div className="flex gap-1">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`w-3 h-3 rounded-full ${
                step >= s ? 'bg-emerald-600' : 'bg-stone-200'
              }`}
            ></div>
          ))}
        </div>
      </div>

      {/* STEP 1: Soil Photo */}
      {step === 1 && (
        <div className="space-y-4">
          <div className="bg-stone-900 text-white rounded-3xl p-4 shadow-md space-y-3">
            <h3 className="text-sm font-bold text-emerald-300">
              {t.step1CameraTitle}
            </h3>

            {/* Photo Viewfinder */}
            <div className="relative w-full h-56 bg-stone-950 rounded-2xl overflow-hidden border-2 border-dashed border-emerald-500/50 flex flex-col items-center justify-center">
              {photoCaptured ? (
                <>
                  <img
                    src={photoCaptured}
                    alt="Captured Soil Sample"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-stone-950/80 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5" />
                    {t.photoCaptured}
                  </div>
                </>
              ) : (
                <div className="text-center p-4">
                  <Camera className="w-12 h-12 mx-auto text-emerald-400 mb-2 opacity-80" />
                  <p className="text-xs font-medium text-stone-300">
                    {language === 'en' ? 'Camera Preview Area' : 'கேமரா திரை பகுதி'}
                  </p>
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={handleSimulateCamera}
                className="bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-extrabold text-xs py-3 px-3 rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-95 cursor-pointer"
              >
                <Camera className="w-4 h-4 stroke-[2.5]" />
                <span>{photoCaptured ? t.retakePhoto : t.openCamera}</span>
              </button>

              <button
                onClick={() => fileInputRef.current?.click()}
                className="bg-white/10 hover:bg-white/20 text-white font-extrabold text-xs py-3 px-3 rounded-xl border border-white/20 flex items-center justify-center gap-2 transition-transform active:scale-95 cursor-pointer"
              >
                <Upload className="w-4 h-4" />
                <span>{t.uploadPhoto}</span>
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          </div>

          {/* Photo Guidelines */}
          <div className="bg-emerald-50/80 rounded-2xl p-4 border border-emerald-200 text-stone-800 space-y-2 text-xs">
            <h4 className="font-bold text-emerald-900 flex items-center gap-1.5 text-xs">
              <AlertCircle className="w-4 h-4 text-emerald-700" />
              {t.cameraInstructionsTitle}
            </h4>
            <ul className="grid grid-cols-2 gap-2 pt-1 font-medium text-[11px] text-stone-700">
              <li className="bg-white p-2 rounded-xl border border-emerald-100 flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                {t.tip1}
              </li>
              <li className="bg-white p-2 rounded-xl border border-emerald-100 flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                {t.tip2}
              </li>
              <li className="bg-white p-2 rounded-xl border border-emerald-100 flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                {t.tip3}
              </li>
              <li className="bg-white p-2 rounded-xl border border-emerald-100 flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                {t.tip4}
              </li>
            </ul>
          </div>

          <button
            onClick={() => setStep(2)}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3.5 rounded-2xl shadow-md flex items-center justify-center gap-2 transition-transform active:scale-98 cursor-pointer"
          >
            <span>{t.continueBtn}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* STEP 2: Farm Context */}
      {step === 2 && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-stone-900">
              {t.step2FarmContextTitle}
            </h3>

            {/* Previous Crop */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                {t.previousCropLabel}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['Groundnut', 'Paddy', 'Sugarcane'].map((crop) => (
                  <button
                    key={crop}
                    onClick={() => setPreviousCrop(crop)}
                    className={`p-2.5 rounded-xl border text-xs font-semibold transition-all ${
                      previousCrop === crop
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                        : 'bg-stone-50 text-stone-700 border-stone-200'
                    }`}
                  >
                    {crop}
                  </button>
                ))}
              </div>
            </div>

            {/* Current Crop */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                {t.currentCropLabel}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['Paddy', 'Groundnut', 'Millet'].map((crop) => (
                  <button
                    key={crop}
                    onClick={() => setCurrentCrop(crop)}
                    className={`p-2.5 rounded-xl border text-xs font-semibold transition-all ${
                      currentCrop === crop
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                        : 'bg-stone-50 text-stone-700 border-stone-200'
                    }`}
                  >
                    {crop}
                  </button>
                ))}
              </div>
            </div>

            {/* Perceived Soil Feel */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                {t.soilFeelLabel}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'dry', label: t.soilDry, icon: '🏜' },
                  { id: 'medium', label: t.soilMedium, icon: '🌱' },
                  { id: 'wet', label: t.soilWet, icon: '💧' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setPerceivedMoisture(item.id as any)}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      perceivedMoisture === item.id
                        ? 'bg-amber-500 text-stone-950 font-bold border-amber-400 shadow-xs'
                        : 'bg-stone-50 text-stone-700 border-stone-200 font-medium'
                    }`}
                  >
                    <span className="text-xl block mb-0.5">{item.icon}</span>
                    <span className="text-xs">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setStep(1)}
              className="w-1/3 bg-stone-200 hover:bg-stone-300 text-stone-800 font-bold py-3.5 rounded-2xl transition-transform active:scale-95 cursor-pointer"
            >
              Back
            </button>
            <button
              onClick={() => setStep(3)}
              className="w-2/3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3.5 rounded-2xl shadow-md flex items-center justify-center gap-2 transition-transform active:scale-98 cursor-pointer"
            >
              <span>{t.continueBtn}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Sensor Data Overlay */}
      {step === 3 && (
        <div className="space-y-4">
          <div className="bg-stone-950 text-white rounded-3xl p-5 shadow-lg border border-stone-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Cpu className="w-6 h-6 text-emerald-400" />
                <h3 className="text-sm font-bold text-white">
                  {t.step3SensorTitle}
                </h3>
              </div>
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                ESP32 Connected ●
              </span>
            </div>

            {/* Live Sensor Telemetry Cards */}
            <div className="grid grid-cols-3 gap-2 pt-1">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-3 text-center">
                <Droplet className="w-5 h-5 text-sky-400 mx-auto mb-1" />
                <span className="text-[10px] text-stone-400 block font-semibold">Moisture</span>
                <span className="text-lg font-black text-white">{sensor.soilMoisture}%</span>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-3 text-center">
                <Thermometer className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                <span className="text-[10px] text-stone-400 block font-semibold">Temp</span>
                <span className="text-lg font-black text-white">{sensor.temperature}°C</span>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-3 text-center">
                <FlaskConical className="w-5 h-5 text-purple-400 mx-auto mb-1" />
                <span className="text-[10px] text-stone-400 block font-semibold">pH</span>
                <span className="text-lg font-black text-white">{sensor.ph}</span>
              </div>
            </div>

            <p className="text-[11px] text-stone-400 leading-relaxed bg-white/5 p-3 rounded-xl border border-white/10">
              ✓ Multi-spectral soil image captured <br />
              ✓ Farm historical context attached <br />
              ✓ ESP32 probe signals synchronized
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setStep(2)}
              className="w-1/3 bg-stone-200 hover:bg-stone-300 text-stone-800 font-bold py-4 rounded-2xl transition-transform active:scale-95 cursor-pointer"
            >
              Back
            </button>
            <button
              onClick={handleRunAnalysis}
              className="w-2/3 bg-amber-400 hover:bg-amber-300 text-stone-950 font-black text-base py-4 rounded-2xl shadow-xl flex items-center justify-center gap-2 transition-transform active:scale-98 cursor-pointer"
            >
              <Sparkles className="w-5 h-5" />
              <span>{t.analyzeSoilBtn}</span>
            </button>
          </div>

          <DisclaimerBadge language={language} variant="labNote" />
        </div>
      )}
    </div>
  );
};
