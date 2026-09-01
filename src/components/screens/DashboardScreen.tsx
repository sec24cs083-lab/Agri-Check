import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Language, FarmerProfile, SensorData, WeatherData, Prediction, Farm } from '../../types/agri';
import { VoiceInput } from '../VoiceInput';

interface DashboardScreenProps {
  language: Language;
  farmer: FarmerProfile;
  sensor: SensorData;
  weather: WeatherData;
  prediction: Prediction | null;
  activeFarm: Farm | null;
  onNavigate: (screen: string) => void;
}

const tx = {
  en: {
    greeting: (name: string, hour: number) =>
      hour < 12 ? `Good Morning, ${name}` : hour < 17 ? `Good Afternoon, ${name}` : `Good Evening, ${name}`,
    farm: 'Active Farm',
    scanCrop: 'Scan Crop & Analyze',
    farmHealth: 'Farm Health',
    sensorData: 'Live Sensor Data',
    weather: 'Weather Forecast',
    history: 'Scan History',
    riskMap: 'Local Risk Map',
    knowledgeGraph: 'AI Knowledge Graph',
    continualLearning: 'Model Updates',
    lastScan: 'Last AI Scan Result',
    noScan: 'No scan yet',
    demo: 'DEMO MODE',
    demoSensor: 'Demo Sensor Active',
    realSensor: 'ESP32 Connected',
    diseaseRisk: 'Current Disease Risk',
    pestRisk: 'Pest Risk',
    high: 'HIGH',
    medium: 'MEDIUM',
    low: 'LOW',
    soilMoisture: 'Soil Moisture',
    temperature: 'Temperature',
    humidity: 'Humidity',
    aiStatus: 'AI Engine',
    aiReady: 'Ready for Inference',
    startDemo: '🚀 START SIH DEMO',
    adminDash: '🔬 Research Dashboard',
    askVoice: 'Tap mic to ask AgriAI something...',
    disclaimer: '🛡️ AI predictions are decision-support tools. Always verify with local agricultural experts.',
    viewBtn: 'View Details',
    feedbackBtn: 'Give Feedback'
  },
  ta: {
    greeting: (name: string, hour: number) =>
      hour < 12 ? `காலை வணக்கம், ${name}` : hour < 17 ? `மதிய வணக்கம், ${name}` : `மாலை வணக்கம், ${name}`,
    farm: 'செயலில் உள்ள பண்ணை',
    scanCrop: 'பயிரை ஸ்கேன் செய்',
    farmHealth: 'பண்ணை ஆரோக்கியம்',
    sensorData: 'நேரலை சென்சார் தரவு',
    weather: 'வானிலை அறிக்கை',
    history: 'வரலாறு',
    riskMap: 'ஆபத்து வரைபடம்',
    knowledgeGraph: 'அறிவு வரைபடம்',
    continualLearning: 'மாதிரி புதுப்பிப்புகள்',
    lastScan: 'கடைசி ஸ்கேன் முடிவு',
    noScan: 'ஸ்கேன் இல்லை',
    demo: 'டெமோ',
    demoSensor: 'டெமோ சென்சார்',
    realSensor: 'ESP32 இணைக்கப்பட்டது',
    diseaseRisk: 'தற்போதைய நோய் ஆபத்து',
    pestRisk: 'பூச்சி ஆபத்து',
    high: 'அதிகம்',
    medium: 'மிதமான',
    low: 'குறைவு',
    soilMoisture: 'மண் ஈரம்',
    temperature: 'வெப்பநிலை',
    humidity: 'ஈரப்பதம்',
    aiStatus: 'AI இயந்திரம்',
    aiReady: 'பகுப்பாய்வுக்கு தயார்',
    startDemo: '🚀 SIH டெமோ தொடங்கு',
    adminDash: '🔬 ஆராய்ச்சி டாஷ்போர்டு',
    askVoice: 'கேள்வி கேட்க மைக் ஐகானை அழுத்தவும்...',
    disclaimer: '🛡️ AI முடிவுகள் வழிகாட்டுதல் மட்டுமே. முடிவெடுக்கும் முன் நிபுணர்களுடன் ஆலோசிக்கவும்.',
    viewBtn: 'விவரம் பார்',
    feedbackBtn: 'கருத்து கூறு'
  },
};

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  language, farmer, sensor, weather, prediction, activeFarm, onNavigate
}) => {
  const T = tx[language];
  const hour = new Date().getHours();
  
  const [voiceQuery, setVoiceQuery] = useState('');

  const riskLevel = prediction?.risk_level ?? (weather.humidity >= 80 ? 'HIGH' : weather.humidity >= 60 ? 'MEDIUM' : 'LOW');
  const diseaseRisk = prediction?.disease_risk ?? Math.round(weather.humidity * 0.7 + weather.rainProbabilityTomorrow * 0.3);

  const RISK_GRADIENT = {
    HIGH: 'linear-gradient(135deg, #991b1b, #ef4444)',
    MEDIUM: 'linear-gradient(135deg, #b45309, #f59e0b)',
    LOW: 'linear-gradient(135deg, #166534, #22c55e)',
  };

  const quickActions = [
    { id: 'risk', label: T.farmHealth, screen: 'risk', emoji: '📊', color: '#fee2e2', text: '#991b1b' },
    { id: 'sensor', label: T.sensorData, screen: 'sensor', emoji: '📡', color: '#dbeafe', text: '#1e40af' },
    { id: 'weather', label: T.weather, screen: 'weather', emoji: '⛅', color: '#cffafe', text: '#155e75' },
    { id: 'history', label: T.history, screen: 'history', emoji: '📋', color: '#f3e8ff', text: '#6b21a8' },
    { id: 'hotspot', label: T.riskMap, screen: 'hotspot', emoji: '📍', color: '#ffe4e6', text: '#be123c' },
    { id: 'kg', label: T.knowledgeGraph, screen: 'knowledgeGraph', emoji: '🕸️', color: '#dcfce7', text: '#166534' },
    { id: 'cl', label: T.continualLearning, screen: 'continualLearning', emoji: '🤖', color: '#e0e7ff', text: '#3730a3' },
  ];

  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div 
      variants={containerVariants} 
      initial="hidden" 
      animate="show" 
      exit={{ opacity: 0, y: -20 }}
      className="pb-4 space-y-5"
    >
      {/* Voice Search Bar */}
      <motion.div variants={itemVariants} className="bg-white rounded-2xl p-2 shadow-sm border border-gray-100 flex items-center gap-3 relative overflow-hidden">
        <VoiceInput 
          language={language} 
          onResult={(text) => {
            setVoiceQuery(text);
            // In a real app, this would route to AI Assistant screen with the query
            setTimeout(() => onNavigate('assistant'), 1000);
          }} 
        />
        <div className="flex-1 min-w-0 pr-2">
          <input 
            type="text" 
            value={voiceQuery}
            onChange={(e) => setVoiceQuery(e.target.value)}
            placeholder={T.askVoice}
            className="w-full text-sm outline-none text-gray-700 bg-transparent placeholder-gray-400"
          />
        </div>
      </motion.div>

      {/* Greeting + Farm */}
      <motion.div variants={itemVariants} className="rounded-3xl p-5 text-white relative overflow-hidden" 
        style={{ background: 'linear-gradient(135deg, #064e3b, #059669)', boxShadow: '0 10px 40px rgba(5,150,105,0.3)' }}>
        
        {/* Background decorative circles */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-green-900/40 rounded-full blur-xl -ml-5 -mb-5" />

        <div className="relative z-10">
          <p className="text-green-200 text-xs font-bold uppercase tracking-widest mb-1">AGRICHECK</p>
          <h1 className="font-black text-2xl tracking-tight leading-none mb-2">{T.greeting(farmer.name, hour)}</h1>
          
          {activeFarm && (
            <div className="inline-flex items-center gap-2 bg-black/20 rounded-full px-3 py-1.5 backdrop-blur-md border border-white/10">
              <span className="text-sm">🌾</span>
              <p className="text-green-50 text-xs font-medium">{activeFarm.name} • {activeFarm.crop}</p>
            </div>
          )}

          {/* Sensor row */}
          <div className="grid grid-cols-3 gap-2 mt-5 pt-4 border-t border-white/10">
            {[
              { icon: '🌡️', val: `${sensor.temperature}°C`, label: T.temperature },
              { icon: '💧', val: `${sensor.humidity}%`, label: T.humidity },
              { icon: '🌱', val: `${sensor.soilMoisture}%`, label: T.soilMoisture },
            ].map(({ icon, val, label }) => (
              <div key={label} className="text-center bg-white/5 rounded-xl py-2 backdrop-blur-sm border border-white/5">
                <p className="text-xs mb-1">{icon}</p>
                <p className="font-black text-lg">{val}</p>
                <p className="text-green-200 text-[10px] uppercase tracking-wider font-semibold">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Disease Risk Banner */}
      <motion.div variants={itemVariants} className="rounded-3xl p-5 flex items-center justify-between relative overflow-hidden"
        style={{ background: RISK_GRADIENT[riskLevel as keyof typeof RISK_GRADIENT], boxShadow: '0 8px 30px rgba(0,0,0,0.15)' }}>
        <div className="absolute inset-0 bg-black/5" />
        <div className="relative z-10">
          <p className="text-white/80 text-[10px] font-bold uppercase tracking-widest mb-1">{T.diseaseRisk}</p>
          <p className="text-white font-black text-3xl tracking-tight leading-none">{T[riskLevel.toLowerCase() as keyof typeof T]}</p>
          {prediction ? (
            <p className="text-white/90 text-sm font-medium mt-1">{prediction.disease}</p>
          ) : (
            <p className="text-white/80 text-xs mt-1">Based on weather</p>
          )}
        </div>
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-white/20 backdrop-blur-md border border-white/30 shadow-inner">
            <span className="text-2xl">{riskLevel === 'HIGH' ? '🔴' : riskLevel === 'MEDIUM' ? '🟡' : '🟢'}</span>
          </div>
          <p className="text-white/90 font-bold text-sm mt-2">{diseaseRisk}%</p>
        </div>
      </motion.div>

      {/* Primary Scan button */}
      <motion.button 
        variants={itemVariants}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onNavigate('scan')}
        className="w-full py-4 rounded-3xl text-white font-black text-lg shadow-xl flex items-center justify-center gap-3 relative overflow-hidden group"
        style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}
      >
        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        <span className="text-2xl relative z-10">📷</span>
        <span className="relative z-10 tracking-wide">{T.scanCrop}</span>
      </motion.button>

      {/* Last Scan Result (if any) */}
      <AnimatePresence>
        {prediction && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="rounded-3xl p-5 bg-white shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{T.lastScan}</p>
              {prediction.is_demo && <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-700">{T.demo}</span>}
            </div>
            
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-900 font-black text-lg leading-tight">
                  {prediction.disease === 'Healthy' ? '✅' : '🦠'} {prediction.disease}
                </p>
                <p className="text-sm font-medium text-gray-500 mt-0.5">
                  {Math.round(prediction.confidence * 100)}% confidence
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <motion.button whileTap={{ scale: 0.9 }} onClick={() => onNavigate('analysis')}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white shadow-md"
                  style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>
                  {T.viewBtn}
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick Actions Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3">
        {quickActions.map(action => (
          <motion.button 
            key={action.id} 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate(action.screen)}
            className="py-4 rounded-2xl flex flex-col items-center justify-center gap-2 border transition-colors shadow-sm"
            style={{ background: action.color, borderColor: `${action.text}20` }}
          >
            <span className="text-2xl drop-shadow-sm">{action.emoji}</span>
            <span className="text-xs font-bold tracking-tight" style={{ color: action.text }}>{action.label}</span>
          </motion.button>
        ))}
      </motion.div>

      {/* SIH Demo + Admin buttons */}
      <motion.div variants={itemVariants} className="space-y-3 pt-2">
        <motion.button whileTap={{ scale: 0.98 }} onClick={() => onNavigate('sihDemo')}
          className="w-full py-4 rounded-2xl font-black text-sm shadow-md flex items-center justify-center gap-2"
          style={{ background: 'linear-gradient(135deg, #fef3c7, #f59e0b)', color: '#78350f' }}>
          🏆 {T.startDemo}
        </motion.button>
        <motion.button whileTap={{ scale: 0.98 }} onClick={() => onNavigate('admin')}
          className="w-full py-4 rounded-2xl font-bold text-sm bg-white text-gray-700 border border-gray-200 shadow-sm">
          {T.adminDash}
        </motion.button>
      </motion.div>

      {/* Disclaimer */}
      <motion.div variants={itemVariants} className="px-4 py-3 rounded-2xl bg-gray-50 border border-gray-100 text-center">
        <p className="text-[11px] text-gray-500 font-medium leading-relaxed">
          {T.disclaimer}
        </p>
      </motion.div>
    </motion.div>
  );
};
