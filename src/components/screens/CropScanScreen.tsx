import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Language, Farm, ScanResult } from '../../types/agri';
import { TextToSpeech } from '../TextToSpeech';

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
    supported: 'ஆதரவு: JPG, PNG • அதிகபட்சம் 10MB',
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

  const containerVariants = {
    hidden: { opacity: 0, x: 20 },
    show: { opacity: 1, x: 0, transition: { staggerChildren: 0.1 } },
    exit: { opacity: 0, x: -20 }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0 }
  };

  const ttsText = `${T.tips} ${T.tip1}. ${T.tip2}. ${T.tip3}. ${T.tip4}.`;

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" exit="exit" className="pb-4 space-y-4">
      {/* Demo Mode Banner */}
      <motion.div variants={itemVariants} className="px-4 py-3 rounded-2xl flex items-center gap-3 shadow-sm"
        style={{ background: 'linear-gradient(135deg, #fef3c7, #fde68a)', border: '1px solid #f59e0b' }}>
        <span className="text-xl">🤖</span>
        <p className="text-xs text-amber-900 font-bold leading-relaxed">{T.demoMode}</p>
      </motion.div>

      {/* Farm & Crop Selection */}
      <motion.div variants={itemVariants} className="rounded-3xl p-5 space-y-4 bg-white shadow-sm border border-gray-100">
        <div>
          <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block mb-2">{T.selectFarm}</label>
          <select value={selectedFarmId} onChange={e => { setSelectedFarmId(Number(e.target.value)); const f = farms.find(f => f.id === Number(e.target.value)); if (f) setSelectedCrop(f.crop); }}
            className="w-full px-4 py-3.5 rounded-2xl border-2 border-green-100 text-gray-800 text-sm font-semibold focus:outline-none focus:border-green-400 bg-gray-50 transition-colors">
            {farms.map(f => <option key={f.id} value={f.id}>🌾 {f.name}</option>)}
          </select>
        </div>
        <div>
          <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block mb-2">{T.selectCrop}</label>
          <select value={selectedCrop} onChange={e => setSelectedCrop(e.target.value)}
            className="w-full px-4 py-3.5 rounded-2xl border-2 border-green-100 text-gray-800 text-sm font-semibold focus:outline-none focus:border-green-400 bg-gray-50 transition-colors">
            {CROPS.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </motion.div>

      {/* Upload Area */}
      <motion.div variants={itemVariants}>
        <div
          onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => !imageUrl && fileInputRef.current?.click()}
          className="rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 relative group shadow-sm"
          style={{
            border: `2px dashed ${isDragging ? '#10b981' : imageUrl ? 'transparent' : '#cbd5e1'}`,
            background: isDragging ? '#ecfdf5' : 'white',
            transform: isDragging ? 'scale(1.02)' : 'scale(1)',
            minHeight: '240px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
          <AnimatePresence mode="wait">
            {imageUrl ? (
              <motion.div 
                key="image"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative w-full h-full"
              >
                <img src={imageUrl} alt="Leaf" className="w-full h-60 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-end p-4">
                  <motion.button 
                    whileTap={{ scale: 0.9 }}
                    onClick={e => { e.stopPropagation(); setImageUrl(null); setImageFile(null); }}
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-white/20 backdrop-blur-md text-white border border-white/30"
                  >
                    ✕
                  </motion.button>
                </div>
                <div className="absolute top-3 left-3 px-3 py-1.5 rounded-xl text-xs font-black text-white bg-green-500/90 backdrop-blur-sm shadow-md">
                  ✓ Ready
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-4 p-8 w-full"
              >
                <div className="w-20 h-20 rounded-full flex items-center justify-center bg-green-50 text-4xl shadow-inner group-hover:scale-110 transition-transform">
                  🍃
                </div>
                <div className="text-center">
                  <p className="text-gray-800 font-black text-base">{T.uploadImage}</p>
                  <p className="text-gray-400 font-medium text-sm mt-1">{T.orText}</p>
                </div>
                <p className="text-gray-400 text-xs font-semibold bg-gray-50 px-3 py-1 rounded-lg">{T.supported}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <input ref={fileInputRef} type="file" accept="image/jpeg,image/jpg,image/png" className="hidden"
          onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} />
      </motion.div>

      {/* Upload Buttons */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3">
        <motion.button whileTap={{ scale: 0.95 }} onClick={() => fileInputRef.current?.click()}
          className="py-4 rounded-2xl text-sm font-black text-green-700 bg-green-50 border-2 border-green-100 shadow-sm flex flex-col items-center gap-1">
          <span className="text-2xl">📁</span>
          {T.uploadImage}
        </motion.button>
        <motion.button whileTap={{ scale: 0.95 }} onClick={() => { fileInputRef.current!.capture = 'environment'; fileInputRef.current?.click(); }}
          className="py-4 rounded-2xl text-sm font-black text-blue-700 bg-blue-50 border-2 border-blue-100 shadow-sm flex flex-col items-center gap-1">
          <span className="text-2xl">📷</span>
          {T.takePhoto}
        </motion.button>
      </motion.div>

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }} 
            animate={{ opacity: 1, height: 'auto' }} 
            exit={{ opacity: 0, height: 0 }}
            className="px-4 py-3 rounded-2xl bg-red-50 border border-red-200"
          >
            <p className="text-red-600 text-sm font-bold">⚠️ {error}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tips */}
      <motion.div variants={itemVariants} className="rounded-3xl p-5 bg-white shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">💡 {T.tips}</p>
          <TextToSpeech text={ttsText} language={language} />
        </div>
        <div className="space-y-2">
          {[T.tip1, T.tip2, T.tip3, T.tip4].map((tip, i) => (
            <div key={i} className="text-sm font-medium text-gray-600 flex items-start gap-3 bg-gray-50 p-2.5 rounded-xl">
              <span className="text-green-500 font-bold bg-green-100 w-5 h-5 flex items-center justify-center rounded-full flex-shrink-0 text-xs">✓</span>
              {tip}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Analyze Button */}
      <motion.button 
        variants={itemVariants}
        whileHover={imageFile && !analyzing ? { scale: 1.02 } : {}}
        whileTap={imageFile && !analyzing ? { scale: 0.95 } : {}}
        onClick={handleAnalyze} 
        disabled={!imageFile || analyzing}
        className="w-full py-4.5 rounded-3xl text-white font-black text-lg transition-all shadow-xl relative overflow-hidden group"
        style={{ 
          background: imageFile && !analyzing ? 'linear-gradient(135deg, #10b981, #059669)' : '#9ca3af', 
          opacity: (!imageFile && !analyzing) ? 0.6 : 1 
        }}
      >
        {analyzing ? (
          <span className="flex items-center justify-center gap-3">
            <span className="inline-block w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
            {T.analyzing}
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            <span className="text-2xl">✨</span> {T.analyzeBtn}
          </span>
        )}
      </motion.button>
    </motion.div>
  );
};
