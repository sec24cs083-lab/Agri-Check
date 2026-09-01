import React, { useEffect, useState } from 'react';
import { Language, FarmerProfile, SensorData, WeatherData, Prediction, Farm } from '../../types/agri';

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
    scanCrop: '🔬 Scan Crop',
    farmHealth: '📊 Farm Health',
    sensorData: '📡 Sensor Data',
    weather: '⛅ Weather',
    history: '📋 History',
    riskMap: '📍 Risk Map',
    knowledgeGraph: '🕸️ Knowledge Graph',
    continualLearning: '🤖 Continual Learning',
    lastScan: 'Last Scan',
    noScan: 'No scan yet',
    demo: 'DEMO MODE',
    demoSensor: 'Demo Sensor',
    realSensor: 'ESP32 Connected',
    diseaseRisk: 'Disease Risk',
    pestRisk: 'Pest Risk',
    high: 'HIGH',
    medium: 'MEDIUM',
    low: 'LOW',
    soilMoisture: 'Soil Moisture',
    temperature: 'Temperature',
    humidity: 'Humidity',
    aiStatus: 'AI Engine',
    aiReady: 'Ready (Demo Mode)',
    startDemo: '🚀 START SIH DEMO',
    adminDash: '🔬 Research Dashboard',
  },
  ta: {
    greeting: (name: string, hour: number) =>
      hour < 12 ? `காலை வணக்கம், ${name}` : hour < 17 ? `மதிய வணக்கம், ${name}` : `மாலை வணக்கம், ${name}`,
    farm: 'செயலில் உள்ள பண்ணை',
    scanCrop: '🔬 பயிர் ஸ்கேன்',
    farmHealth: '📊 பண்ணை ஆரோக்கியம்',
    sensorData: '📡 சென்சார் தரவு',
    weather: '⛅ வானிலை',
    history: '📋 வரலாறு',
    riskMap: '📍 ஆபத்து வரைபடம்',
    knowledgeGraph: '🕸️ அறிவு வரைபடம்',
    continualLearning: '🤖 தொடர் கற்றல்',
    lastScan: 'கடைசி ஸ்கேன்',
    noScan: 'ஸ்கேன் இல்லை',
    demo: 'டெமோ பயன்முறை',
    demoSensor: 'டெமோ சென்சார்',
    realSensor: 'ESP32 இணைக்கப்பட்டது',
    diseaseRisk: 'நோய் ஆபத்து',
    pestRisk: 'பூச்சி ஆபத்து',
    high: 'அதிகம்',
    medium: 'மிதமான',
    low: 'குறைவு',
    soilMoisture: 'மண் ஈரம்',
    temperature: 'வெப்பநிலை',
    humidity: 'ஈரப்பதம்',
    aiStatus: 'AI இயந்திரம்',
    aiReady: 'தயார் (டெமோ)',
    startDemo: '🚀 SIH டெமோ தொடங்கு',
    adminDash: '🔬 ஆராய்ச்சி டாஷ்போர்டு',
  },
};

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  language, farmer, sensor, weather, prediction, activeFarm, onNavigate
}) => {
  const T = tx[language];
  const hour = new Date().getHours();
  const [visible, setVisible] = useState(false);

  useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);

  const riskLevel = prediction?.risk_level ?? (weather.humidity >= 80 ? 'HIGH' : weather.humidity >= 60 ? 'MEDIUM' : 'LOW');
  const diseaseRisk = prediction?.disease_risk ?? Math.round(weather.humidity * 0.7 + weather.rainProbabilityTomorrow * 0.3);
  const pestRisk = prediction?.pest_risk ?? Math.round(weather.humidity * 0.5 + 15);

  const RISK_GRADIENT = {
    HIGH: 'linear-gradient(135deg, #7f1d1d, #dc2626)',
    MEDIUM: 'linear-gradient(135deg, #78350f, #d97706)',
    LOW: 'linear-gradient(135deg, #14532d, #16a34a)',
  };

  const quickActions = [
    { id: 'scan', label: T.scanCrop, screen: 'scan', emoji: '🔬', gradient: 'linear-gradient(135deg, #22c55e, #16a34a)', primary: true },
    { id: 'risk', label: T.farmHealth, screen: 'risk', emoji: '📊', gradient: 'linear-gradient(135deg, #dc2626, #b91c1c)', primary: false },
    { id: 'sensor', label: T.sensorData, screen: 'sensor', emoji: '📡', gradient: 'linear-gradient(135deg, #2563eb, #1d4ed8)', primary: false },
    { id: 'weather', label: T.weather, screen: 'weather', emoji: '⛅', gradient: 'linear-gradient(135deg, #0891b2, #0e7490)', primary: false },
    { id: 'history', label: T.history, screen: 'history', emoji: '📋', gradient: 'linear-gradient(135deg, #7c3aed, #6d28d9)', primary: false },
    { id: 'hotspot', label: T.riskMap, screen: 'hotspot', emoji: '📍', gradient: 'linear-gradient(135deg, #dc2626, #9f1239)', primary: false },
    { id: 'kg', label: T.knowledgeGraph, screen: 'knowledgeGraph', emoji: '🕸️', gradient: 'linear-gradient(135deg, #0f3d0f, #1a5e1a)', primary: false },
    { id: 'cl', label: T.continualLearning, screen: 'continualLearning', emoji: '🤖', gradient: 'linear-gradient(135deg, #1e1b4b, #4f46e5)', primary: false },
  ];

  return (
    <div className="pb-4 space-y-4"
      style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(16px)', transition: 'all 0.4s ease-out' }}>

      {/* Greeting + Farm */}
      <div className="rounded-2xl p-4" style={{ background: 'linear-gradient(135deg, #0f3d0f, #1a5e1a)', boxShadow: '0 8px 32px rgba(15,61,15,0.4)' }}>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-green-300 text-xs font-semibold uppercase tracking-wider">AGRICHECK</p>
            <h1 className="text-white font-black text-xl mt-0.5">{T.greeting(farmer.name, hour)}</h1>
            {activeFarm && (
              <div className="flex items-center gap-1.5 mt-1">
                <span className="text-green-400 text-xs">🌾</span>
                <p className="text-green-300 text-xs">{activeFarm.name} • {activeFarm.crop}</p>
              </div>
            )}
          </div>
          <div className="flex flex-col items-end gap-1">
            <div className="px-2 py-1 rounded-lg text-xs font-bold"
              style={{ background: sensor.isDemoMode ? 'rgba(245,158,11,0.3)' : 'rgba(34,197,94,0.3)', color: sensor.isDemoMode ? '#fcd34d' : '#4ade80' }}>
              {sensor.isDemoMode ? T.demoSensor : T.realSensor}
            </div>
            <div className="px-2 py-1 rounded-lg text-xs font-bold" style={{ background: 'rgba(99,102,241,0.3)', color: '#a5b4fc' }}>
              {T.aiReady}
            </div>
          </div>
        </div>

        {/* Sensor row */}
        <div className="flex gap-3 mt-3 pt-3" style={{ borderTop: '1px solid rgba(74,222,128,0.2)' }}>
          {[
            { icon: '🌡️', val: `${sensor.temperature}°C`, label: T.temperature },
            { icon: '💧', val: `${sensor.humidity}%`, label: T.humidity },
            { icon: '🌱', val: `${sensor.soilMoisture}%`, label: T.soilMoisture },
          ].map(({ icon, val, label }) => (
            <div key={label} className="flex-1 text-center">
              <p className="text-sm">{icon}</p>
              <p className="text-white font-black text-base">{val}</p>
              <p className="text-green-400 text-xs leading-tight">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Disease Risk Banner */}
      <div className="rounded-2xl p-4 flex items-center justify-between"
        style={{ background: RISK_GRADIENT[riskLevel], boxShadow: '0 8px 24px rgba(0,0,0,0.2)' }}>
        <div>
          <p className="text-white opacity-75 text-xs font-semibold uppercase tracking-wider">{T.diseaseRisk}</p>
          <p className="text-white font-black text-3xl">{riskLevel}</p>
          {prediction && <p className="text-white opacity-80 text-xs mt-0.5">{prediction.disease} — {Math.round(prediction.confidence * 100)}% confidence</p>}
          {!prediction && <p className="text-white opacity-70 text-xs mt-0.5">Based on environmental conditions</p>}
        </div>
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.15)', border: '2px solid rgba(255,255,255,0.3)' }}>
            <span className="text-3xl">{riskLevel === 'HIGH' ? '🔴' : riskLevel === 'MEDIUM' ? '🟡' : '🟢'}</span>
          </div>
          <p className="text-white opacity-80 text-xs mt-1">{diseaseRisk}% risk</p>
        </div>
      </div>

      {/* Last Scan Result (if any) */}
      {prediction && (
        <div className="rounded-2xl p-4" style={{ background: 'white', boxShadow: '0 2px 16px rgba(0,0,0,0.06)', border: '1px solid #e5e7eb' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">{T.lastScan}</p>
              <p className="text-gray-800 font-black text-base mt-0.5">
                {prediction.disease === 'Healthy' ? '✅' : '🦠'} {prediction.disease}
              </p>
              <p className="text-xs text-gray-500">
                {prediction.crop} • {Math.round(prediction.confidence * 100)}% confidence
                {prediction.is_demo && <span className="ml-1 text-amber-500">[DEMO]</span>}
              </p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <button onClick={() => onNavigate('analysis')}
                className="px-3 py-1.5 rounded-xl text-xs font-bold text-white"
                style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)' }}>
                View
              </button>
              <button onClick={() => onNavigate('feedback')}
                className="px-3 py-1.5 rounded-xl text-xs font-bold text-green-700"
                style={{ background: '#f0fdf4', border: '1px solid #86efac' }}>
                Feedback
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-2 gap-3">
        {/* Primary Scan button — full width */}
        <button onClick={() => onNavigate('scan')}
          className="col-span-2 py-4 rounded-2xl text-white font-black text-lg transition-all active:scale-98 flex items-center justify-center gap-2"
          style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)', boxShadow: '0 8px 32px rgba(34,197,94,0.4)' }}>
          🔬 {T.scanCrop}
        </button>

        {/* Other actions */}
        {quickActions.slice(1).map(action => (
          <button key={action.id} onClick={() => onNavigate(action.screen)}
            className="py-3.5 rounded-2xl text-white font-bold text-sm transition-all active:scale-95 flex items-center justify-center gap-1.5"
            style={{ background: action.gradient, boxShadow: '0 4px 16px rgba(0,0,0,0.15)' }}>
            <span className="text-base">{action.emoji}</span>
            <span className="text-xs">{action.label}</span>
          </button>
        ))}
      </div>

      {/* SIH Demo + Admin buttons */}
      <div className="space-y-2">
        <button onClick={() => onNavigate('sihDemo')}
          className="w-full py-3.5 rounded-2xl font-bold text-sm transition-all active:scale-95 flex items-center justify-center gap-2"
          style={{ background: 'linear-gradient(135deg, #fef3c7, #fde68a)', color: '#92400e', border: '1.5px solid #f59e0b', boxShadow: '0 4px 16px rgba(245,158,11,0.25)' }}>
          🏆 {T.startDemo}
          <span className="text-xs opacity-70">Smart India Hackathon 2026</span>
        </button>
        <button onClick={() => onNavigate('admin')}
          className="w-full py-3 rounded-2xl font-bold text-sm transition-all active:scale-95"
          style={{ background: 'white', color: '#374151', border: '1px solid #e5e7eb' }}>
          {T.adminDash}
        </button>
      </div>

      {/* Disclaimer */}
      <div className="px-3 py-2 rounded-xl" style={{ background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
        <p className="text-xs text-green-700 text-center">
          🛡️ AI predictions are decision-support tools. Always verify with local agricultural experts for critical decisions.
        </p>
      </div>
    </div>
  );
};
