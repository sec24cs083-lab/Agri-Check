import React, { useRef, useState } from 'react';
import { Language, Farm, ScanResult } from '../../types/agri';

interface CropScanScreenProps {
  language: Language;
  farms: Farm[];
  onScanComplete: (result: ScanResult) => void;
  onNavigate: (screen: string) => void;
}

const tx = {
  en: {
    title: 'Crop Scan',
    subtitle: 'Upload or capture a crop leaf image for AI disease analysis',
    selectFarm: 'Select Farm',
    selectCrop: 'Select Crop',
    uploadImage: 'Upload Leaf Photo',
    takePhoto: 'Take Photo',
    orText: 'or drag & drop here',
    analyzeBtn: 'Analyze with AI',
    supported: 'Supported: JPG, JPEG, PNG • Max 10MB',
    noImage: 'Please select an image first',
    tips: 'Tips for best results:',
    tip1: 'Capture a single leaf clearly',
    tip2: 'Good lighting — avoid shadows',
    tip3: 'Focus on affected area',
    tip4: 'Avoid blurry images',
    analyzing: 'Analyzing with AI...',
    demoMode: 'DEMO MODE — AI prediction is simulated',
  },
  ta: {
    title: 'பயிர் ஸ்கேன்',
    subtitle: 'AI நோய் பகுப்பாய்வுக்கு பயிர் இலை படத்தை பதிவேற்றவும்',
    selectFarm: 'பண்ணை தேர்ந்தெடுக்கவும்',
    selectCrop: 'பயிர் தேர்ந்தெடுக்கவும்',
    uploadImage: 'இலை படம் பதிவேற்று',
    takePhoto: 'புகைப்படம் எடு',
    orText: 'அல்லது இங்கே இழுக்கவும்',
    analyzeBtn: 'AI மூலம் பகுப்பாய்வு',
    supported: 'ஆதரவு: JPG, JPEG, PNG • அதிகபட்சம் 10MB',
    noImage: 'முதலில் படத்தை தேர்ந்தெடுக்கவும்',
    tips: 'சிறந்த முடிவுக்கு:',
    tip1: 'ஒரு இலையை தெளிவாக படம் எடுக்கவும்',
    tip2: 'நல்ல வெளிச்சம் — நிழல் தவிர்க்கவும்',
    tip3: 'பாதிக்கப்பட்ட பகுதியில் கவனம் செலுத்தவும்',
    tip4: 'மங்கலான படங்களை தவிர்க்கவும்',
    analyzing: 'AI-இல் பகுப்பாய்வு நடக்கிறது...',
    demoMode: 'டெமோ பயன்முறை — AI முன்னறிவிப்பு உருவகப்படுத்தப்படுகிறது',
  },
};

const CROPS = ['Tomato', 'Rice (Paddy)', 'Groundnut', 'Millet', 'Wheat', 'Maize'];

export const CropScanScreen: React.FC<CropScanScreenProps> = ({ language, farms, onScanComplete, onNavigate }) => {
  const T = tx[language];
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFarmId, setSelectedFarmId] = useState(farms[0]?.id || 1);
  const [selectedCrop, setSelectedCrop] = useState(farms[0]?.crop || 'Tomato');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState('');
  const [analyzing, setAnalyzing] = useState(false);

  const handleFile = (file: File) => {
    setError('');
    const allowed = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!allowed.includes(file.type)) { setError('Only JPG, JPEG, PNG files are supported.'); return; }
    if (file.size > 10 * 1024 * 1024) { setError('File too large. Maximum size is 10MB.'); return; }
    setImageFile(file);
    setImageUrl(URL.createObjectURL(file));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleAnalyze = async () => {
    if (!imageFile) { setError(T.noImage); return; }
    setAnalyzing(true);
    await new Promise(r => setTimeout(r, 1800));
    setAnalyzing(false);
    onScanComplete({ imageFile, imageUrl, crop: selectedCrop, farmId: selectedFarmId });
  };

  return (
    <div className="pb-4 space-y-4">
      {/* Demo Mode Banner */}
      <div className="px-3 py-2 rounded-xl flex items-center gap-2"
        style={{ background: 'linear-gradient(135deg, #fef3c7, #fde68a)', border: '1px solid #f59e0b' }}>
        <span>🤖</span>
        <p className="text-xs text-amber-800 font-medium">{T.demoMode}</p>
      </div>

      {/* Farm & Crop Selection */}
      <div className="rounded-2xl p-4 space-y-3"
        style={{ background: 'white', boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}>
        <div>
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">{T.selectFarm}</label>
          <select value={selectedFarmId} onChange={e => { setSelectedFarmId(Number(e.target.value)); const f = farms.find(f => f.id === Number(e.target.value)); if (f) setSelectedCrop(f.crop); }}
            className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-gray-800 text-sm focus:outline-none"
            style={{ borderColor: '#d1fae5' }}>
            {farms.map(f => <option key={f.id} value={f.id}>🌾 {f.name}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">{T.selectCrop}</label>
          <select value={selectedCrop} onChange={e => setSelectedCrop(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-gray-800 text-sm focus:outline-none"
            style={{ borderColor: '#d1fae5' }}>
            {CROPS.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {/* Upload Area */}
      <div
        onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => !imageUrl && fileInputRef.current?.click()}
        className="rounded-2xl overflow-hidden cursor-pointer transition-all duration-200"
        style={{
          border: `2px dashed ${isDragging ? '#22c55e' : imageUrl ? '#22c55e' : '#d1d5db'}`,
          background: isDragging ? '#f0fdf4' : 'white',
          transform: isDragging ? 'scale(1.01)' : 'scale(1)',
          minHeight: '220px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
        {imageUrl ? (
          <div className="relative w-full">
            <img src={imageUrl} alt="Leaf" className="w-full h-52 object-cover" />
            <div className="absolute inset-0 flex items-end justify-end p-3">
              <button onClick={e => { e.stopPropagation(); setImageUrl(null); setImageFile(null); }}
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm"
                style={{ background: 'rgba(0,0,0,0.7)' }}>✕</button>
            </div>
            <div className="absolute top-2 left-2 px-2 py-1 rounded-lg text-xs font-bold text-white"
              style={{ background: 'rgba(34,197,94,0.9)' }}>✓ Ready to analyze</div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 p-8">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ background: '#f0fdf4' }}>
              <span className="text-3xl">🍃</span>
            </div>
            <div className="text-center">
              <p className="text-gray-700 font-semibold text-sm">{T.uploadImage}</p>
              <p className="text-gray-400 text-xs mt-1">{T.orText}</p>
            </div>
            <p className="text-gray-400 text-xs text-center">{T.supported}</p>
          </div>
        )}
      </div>
      <input ref={fileInputRef} type="file" accept="image/jpeg,image/jpg,image/png" className="hidden"
        onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} />

      {/* Upload Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button onClick={() => fileInputRef.current?.click()}
          className="py-3 rounded-xl text-sm font-bold transition-all active:scale-95"
          style={{ background: '#f0fdf4', color: '#16a34a', border: '1.5px solid #86efac' }}>
          📁 {T.uploadImage}
        </button>
        <button onClick={() => { fileInputRef.current!.capture = 'environment'; fileInputRef.current?.click(); }}
          className="py-3 rounded-xl text-sm font-bold transition-all active:scale-95"
          style={{ background: '#f0fdf4', color: '#16a34a', border: '1.5px solid #86efac' }}>
          📷 {T.takePhoto}
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="px-4 py-3 rounded-xl" style={{ background: '#fef2f2', border: '1px solid #fca5a5' }}>
          <p className="text-red-600 text-sm">⚠️ {error}</p>
        </div>
      )}

      {/* Tips */}
      <div className="rounded-2xl p-4" style={{ background: 'white', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">💡 {T.tips}</p>
        <div className="space-y-1">
          {[T.tip1, T.tip2, T.tip3, T.tip4].map((tip, i) => (
            <p key={i} className="text-xs text-gray-600 flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✓</span>{tip}
            </p>
          ))}
        </div>
      </div>

      {/* Analyze Button */}
      <button onClick={handleAnalyze} disabled={!imageFile || analyzing}
        className="w-full py-4 rounded-2xl text-white font-black text-base transition-all active:scale-95 disabled:opacity-50"
        style={{ background: imageFile && !analyzing ? 'linear-gradient(135deg, #22c55e, #16a34a)' : '#9ca3af', boxShadow: imageFile ? '0 8px 24px rgba(34,197,94,0.35)' : 'none' }}>
        {analyzing ? (
          <span className="flex items-center justify-center gap-2">
            <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            {T.analyzing}
          </span>
        ) : (
          `🔬 ${T.analyzeBtn}`
        )}
      </button>
    </div>
  );
};
