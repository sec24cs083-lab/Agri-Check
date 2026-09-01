import React, { useState } from 'react';
import { 
  Cpu, 
  Wifi, 
  WifiOff, 
  Droplet, 
  Thermometer, 
  FlaskConical, 
  Battery, 
  RotateCw, 
  Check, 
  Bluetooth,
  Clock,
  Zap,
  X
} from 'lucide-react';
import { SensorData, Language } from '../../types/agri';
import { translations } from '../../data/translations';

interface SensorDashboardScreenProps {
  sensor: SensorData;
  onToggleSensor: () => void;
  language: Language;
}

export const SensorDashboardScreen: React.FC<SensorDashboardScreenProps> = ({
  sensor,
  onToggleSensor,
  language,
}) => {
  const [showBluetoothModal, setShowBluetoothModal] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  const t = translations[language];

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
    }, 1200);
  };

  return (
    <div className="space-y-4 pb-20 pt-1 animate-in fade-in duration-200">
      {/* Demo Mode Banner */}
      {sensor.isDemoMode && (
        <div className="px-3 py-2 rounded-xl flex items-center gap-2"
          style={{ background: 'linear-gradient(135deg, #fef3c7, #fde68a)', border: '1px solid #f59e0b' }}>
          <span>📊</span>
          <div>
            <p className="text-xs font-bold text-amber-800">DEMO SENSOR MODE</p>
            <p className="text-xs text-amber-700">Values are simulated. Connect ESP32 for real measurements.</p>
          </div>
          <button onClick={onToggleSensor} className="ml-auto text-xs font-bold text-amber-700 underline">Simulate Connect</button>
        </div>
      )}
      {/* Bento Header Banner */}
      <div className={`rounded-[24px] p-5 shadow-lg text-white transition-all ${
        sensor.isConnected 
          ? 'bg-emerald-900 border border-emerald-800' 
          : 'bg-slate-900 border border-slate-800'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Cpu className="w-6 h-6 text-emerald-400" />
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 block">Sensor Kit Node</span>
              <h2 className="text-xl font-bold text-white leading-tight">
                {t.sensorDashTitle}
              </h2>
            </div>
          </div>

          <button
            onClick={onToggleSensor}
            className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all flex items-center gap-1.5 cursor-pointer ${
              sensor.isConnected
                ? 'bg-emerald-800/80 text-emerald-300 border-emerald-700 hover:bg-emerald-800'
                : 'bg-rose-900/80 text-rose-300 border-rose-800 hover:bg-rose-900'
            }`}
          >
            {sensor.isConnected ? (
              <>
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                <span>Connected</span>
              </>
            ) : (
              <>
                <span className="w-2 h-2 bg-rose-500 rounded-full"></span>
                <span>Disconnected</span>
              </>
            )}
          </button>
        </div>

        {/* Telemetry Status Bar */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-emerald-800/80 text-xs text-emerald-200 font-medium">
          <div className="flex items-center gap-1.5">
            <Battery className="w-4 h-4 text-emerald-400" />
            <span>Battery: {sensor.batteryLevel}%</span>
          </div>

          <button
            onClick={handleSync}
            disabled={!sensor.isConnected || isSyncing}
            className="flex items-center gap-1.5 text-emerald-300 font-bold hover:text-white transition-colors cursor-pointer"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'Syncing...' : sensor.lastUpdated}</span>
          </button>
        </div>
      </div>

      {/* Disconnected Notice */}
      {!sensor.isConnected && (
        <div className="bg-rose-50 rounded-2xl p-4 border border-rose-200 text-rose-900 space-y-3">
          <div className="flex items-center gap-2 font-bold text-sm">
            <WifiOff className="w-5 h-5 text-rose-600" />
            <span>Sensor Not Connected</span>
          </div>
          <p className="text-xs text-rose-800 font-medium leading-relaxed">
            Please turn on your ESP32 Bluetooth agricultural probe and hold it near your farm soil sample.
          </p>
          <button
            onClick={() => setShowBluetoothModal(true)}
            className="w-full bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs py-3 rounded-xl shadow-xs flex items-center justify-center gap-2 cursor-pointer"
          >
            <Bluetooth className="w-4 h-4" />
            <span>{t.connectBluetoothBtn}</span>
          </button>
        </div>
      )}

      {/* Primary Telemetry Grid */}
      <div className="grid grid-cols-2 gap-2.5">
        <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-sm text-center">
          <Droplet className="w-6 h-6 text-sky-600 mx-auto mb-1" />
          <span className="text-[10px] font-bold text-stone-400 uppercase block">{t.soilMoisture}</span>
          <span className="text-2xl font-black text-stone-900">{sensor.soilMoisture}%</span>
          <span className="text-[10px] font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-full inline-block mt-1">
            {sensor.soilMoisture >= 60 ? 'High' : sensor.soilMoisture >= 30 ? t.optimal : 'Low'}
          </span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-sm text-center">
          <Thermometer className="w-6 h-6 text-amber-600 mx-auto mb-1" />
          <span className="text-[10px] font-bold text-stone-400 uppercase block">{t.temperature}</span>
          <span className="text-2xl font-black text-stone-900">{sensor.temperature}°C</span>
          <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full inline-block mt-1">
            {sensor.temperature >= 35 ? 'Hot' : sensor.temperature >= 25 ? 'Normal' : 'Cool'}
          </span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-sm text-center">
          <span className="text-2xl mx-auto block mb-1">💧</span>
          <span className="text-[10px] font-bold text-stone-400 uppercase block">Humidity</span>
          <span className={`text-2xl font-black ${sensor.humidity >= 80 ? 'text-red-600' : sensor.humidity >= 60 ? 'text-amber-600' : 'text-stone-900'}`}>{sensor.humidity}%</span>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block mt-1 ${sensor.humidity >= 80 ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
            {sensor.humidity >= 80 ? '⚠️ High Risk' : 'Normal'}
          </span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-sm text-center">
          <FlaskConical className="w-6 h-6 text-purple-600 mx-auto mb-1" />
          <span className="text-[10px] font-bold text-stone-400 uppercase block">pH Level</span>
          <span className="text-2xl font-black text-stone-900">{sensor.ph}</span>
          <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full inline-block mt-1">
            Neutral
          </span>
        </div>
      </div>

      {/* 7-Day Moisture Interactive Bar Chart */}
      <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-stone-900">
            {t.moistureTrendTitle}
          </h3>
          <span className="text-[11px] font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-200">
            ESP32 Logs
          </span>
        </div>

        {/* Bar Chart Visual */}
        <div className="h-32 flex items-end justify-between gap-2 pt-4 px-2 bg-stone-50 rounded-xl border border-stone-100">
          {sensor.moistureHistory.map((item, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
              <span className="text-[10px] font-extrabold text-stone-800">{item.value}%</span>
              <div
                className={`w-full max-w-[28px] rounded-t-lg transition-all duration-300 ${
                  item.day === 'Today' ? 'bg-emerald-600' : 'bg-sky-400/80'
                }`}
                style={{ height: `${(item.value / 50) * 100}%` }}
              ></div>
              <span className="text-[10px] font-semibold text-stone-500">{item.day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Irrigation Recommendation */}
      <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200 text-stone-900 space-y-2">
        <div className="flex items-center gap-2 text-emerald-800 font-extrabold text-sm">
          <Clock className="w-5 h-5 text-emerald-600" />
          <span>{t.irrigationAdviceTitle}</span>
        </div>
        <p className="text-xs font-semibold text-stone-800 leading-relaxed">
          ✓ {t.irrigationSufficient}
        </p>
        <p className="text-xs font-bold text-emerald-800 bg-white/80 p-2.5 rounded-xl border border-emerald-200">
          ⏱ {t.nextIrrigationEst}
        </p>
      </div>

      {/* Bluetooth Connect Modal */}
      {showBluetoothModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl border border-stone-200 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-stone-100">
              <div className="flex items-center gap-2 text-indigo-600">
                <Bluetooth className="w-5 h-5" />
                <h3 className="font-extrabold text-base text-stone-900">
                  Connect ESP32 Sensor
                </h3>
              </div>
              <button
                onClick={() => setShowBluetoothModal(false)}
                className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 text-xs font-medium text-stone-800">
              <p>Scanning for nearby Bluetooth low energy devices...</p>
              <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-emerald-600" />
                  <span className="font-bold">AgriAI-ESP32-Pro-04</span>
                </div>
                <button
                  onClick={() => {
                    if (!sensor.isConnected) onToggleSensor();
                    setShowBluetoothModal(false);
                  }}
                  className="bg-emerald-600 text-white font-bold px-3 py-1.5 rounded-lg text-xs cursor-pointer"
                >
                  Pair & Connect
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
