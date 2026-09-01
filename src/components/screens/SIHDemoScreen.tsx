import React, { useState, useEffect } from 'react';
import { Language, DemoStep, SensorData, WeatherData, Prediction } from '../../types/agri';
import { demoCurrentPrediction, initialSensorData, weatherData } from '../../data/mockAgriData';

interface SIHDemoScreenProps {
  language: Language;
  onNavigate: (screen: string) => void;
  onDemoComplete: (prediction: Prediction) => void;
}

const DEMO_STEPS: Array<{
  step: DemoStep;
  title: string;
  description: string;
  icon: string;
  duration: number;
}> = [
  { step: 'select_farm', title: 'Select Tomato Farm', description: 'Loading "My Tomato Farm" — Salem, Tamil Nadu', icon: '🌾', duration: 1200 },
  { step: 'load_sensor', title: 'Load Sensor Data', description: 'ESP32 demo mode: Moisture 38%, Temp 30.2°C, Humidity 81.4%', icon: '📡', duration: 1000 },
  { step: 'load_weather', title: 'Load Weather Data', description: 'Demo weather: 30°C, 65% rain probability tomorrow', icon: '⛅', duration: 900 },
  { step: 'upload_leaf', title: 'Upload Tomato Leaf Image', description: 'Loading sample tomato leaf with Early Blight symptoms...', icon: '🍃', duration: 1100 },
  { step: 'run_ai', title: 'Running AI Disease Model', description: 'MobileNetV3 inference — classifying leaf disease...', icon: '🤖', duration: 1800 },
  { step: 'show_prediction', title: 'AI Prediction: Early Blight', description: 'Detected: Alternaria solani (Early Blight) — 91% confidence', icon: '🦠', duration: 1200 },
  { step: 'show_risk', title: 'Risk Engine Analysis', description: 'Disease Risk: 87%, Pest Risk: 64% — Level: HIGH', icon: '📊', duration: 1000 },
  { step: 'show_explanation', title: 'XAI Explanation Generated', description: '5 contributing factors identified and explained', icon: '🔍', duration: 1000 },
  { step: 'show_feedback', title: 'Farmer Feedback Interface', description: 'Showing confirmation options to farmer...', icon: '👨‍🌾', duration: 900 },
  { step: 'confirmed', title: 'Farmer Confirms: CONFIRMED', description: 'Prediction confirmed — adding to knowledge base...', icon: '✅', duration: 800 },
  { step: 'update_kg', title: 'Knowledge Graph Updated', description: '9 nodes, 9 relationships — new case linked to Early Blight + High Humidity', icon: '🕸️', duration: 1000 },
  { step: 'similar_cases', title: '12 Similar Cases Found', description: 'Historical matches: Tomato + humidity >80% + Early Blight', icon: '🔎', duration: 900 },
  { step: 'show_cl', title: 'Continual Learning Status', description: 'Replay buffer: 14 samples — Criteria met — v1.2 active', icon: '🤖', duration: 1000 },
  { step: 'show_hotspot', title: 'Disease Hotspot Map', description: '8 disease locations tracked across Tamil Nadu', icon: '📍', duration: 900 },
  { step: 'show_history', title: 'Farm History Updated', description: 'New scan added — 5 total records in history', icon: '📋', duration: 900 },
  { step: 'complete', title: '✅ Demo Complete!', description: 'Full AGRICHECK workflow demonstrated successfully', icon: '🏆', duration: 0 },
];

export const SIHDemoScreen: React.FC<SIHDemoScreenProps> = ({ language, onNavigate, onDemoComplete }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [isRunning, setIsRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | null = null;
    if (isRunning && startTime) {
      timer = setInterval(() => setElapsed(Math.floor((Date.now() - startTime) / 1000)), 100);
    }
    return () => { if (timer) clearInterval(timer); };
  }, [isRunning, startTime]);

  const runDemo = async () => {
    setIsRunning(true);
    setIsComplete(false);
    setCompletedSteps(new Set());
    setCurrentStepIndex(0);
    const t0 = Date.now();
    setStartTime(t0);

    for (let i = 0; i < DEMO_STEPS.length; i++) {
      setCurrentStepIndex(i);
      await new Promise(r => setTimeout(r, DEMO_STEPS[i].duration));
      setCompletedSteps(prev => new Set([...prev, i]));
    }

    setIsRunning(false);
    setIsComplete(true);
    onDemoComplete(demoCurrentPrediction);
  };

  const resetDemo = () => {
    setCurrentStepIndex(-1);
    setCompletedSteps(new Set());
    setIsRunning(false);
    setIsComplete(false);
    setElapsed(0);
    setStartTime(null);
  };

  const totalTime = DEMO_STEPS.reduce((sum, s) => sum + s.duration, 0) / 1000;

  return (
    <div className="pb-6 space-y-4">
      {/* Header */}
      <div className="rounded-2xl p-5 text-center"
        style={{ background: 'linear-gradient(135deg, #78350f, #b45309, #d97706)', boxShadow: '0 8px 32px rgba(120,53,15,0.4)' }}>
        <div className="w-16 h-16 rounded-2xl mx-auto mb-3 flex items-center justify-center"
          style={{ background: 'rgba(255,255,255,0.2)', border: '2px solid rgba(255,255,255,0.3)' }}>
          <span className="text-3xl">🏆</span>
        </div>
        <h2 className="text-white font-black text-2xl">SIH DEMO</h2>
        <p className="text-amber-200 text-sm mt-1">Smart India Hackathon 2026</p>
        <p className="text-amber-300 text-xs mt-1">One-click complete AGRICHECK workflow</p>
        {isRunning && (
          <div className="mt-3 flex items-center justify-center gap-2">
            <span className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
            <span className="text-white text-sm font-semibold">Running... {elapsed}s</span>
          </div>
        )}
        {isComplete && (
          <div className="mt-3 px-4 py-2 rounded-xl" style={{ background: 'rgba(34,197,94,0.3)', border: '1px solid rgba(74,222,128,0.5)' }}>
            <p className="text-green-300 text-sm font-bold">✅ Demo completed in {elapsed}s</p>
          </div>
        )}
      </div>

      {/* Progress bar */}
      {(isRunning || isComplete) && (
        <div className="rounded-2xl p-4" style={{ background: 'white', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-600">Progress</span>
            <span className="text-xs text-gray-500">{completedSteps.size}/{DEMO_STEPS.length} steps</span>
          </div>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${(completedSteps.size / DEMO_STEPS.length) * 100}%`,
                background: isComplete ? 'linear-gradient(90deg, #22c55e, #16a34a)' : 'linear-gradient(90deg, #f59e0b, #d97706)',
              }} />
          </div>
        </div>
      )}

      {/* Steps List */}
      <div className="rounded-2xl overflow-hidden" style={{ background: 'white', boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}>
        <div className="px-4 py-3 border-b border-gray-100">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Demo Workflow — {DEMO_STEPS.length} Steps (~{Math.round(totalTime)}s)</p>
        </div>
        <div className="divide-y divide-gray-50">
          {DEMO_STEPS.map((step, i) => {
            const isDone = completedSteps.has(i);
            const isCurrent = currentStepIndex === i && !isDone;
            const isPending = currentStepIndex < i && !isDone;

            return (
              <div key={step.step} className="flex items-start gap-3 px-4 py-3 transition-all"
                style={{ background: isCurrent ? '#fffbeb' : isDone ? '#f0fdf4' : 'white' }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{
                    background: isDone ? 'linear-gradient(135deg, #22c55e, #16a34a)' : isCurrent ? '#f59e0b' : '#f3f4f6',
                    border: isCurrent ? '2px solid #d97706' : 'none',
                  }}>
                  {isDone ? (
                    <span className="text-white text-xs font-bold">✓</span>
                  ) : isCurrent ? (
                    <span className="w-3 h-3 rounded-full bg-white animate-ping" />
                  ) : (
                    <span className="text-gray-400 text-xs">{i + 1}</span>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm">{step.icon}</span>
                    <p className="text-sm font-bold" style={{ color: isDone ? '#16a34a' : isCurrent ? '#d97706' : '#374151' }}>
                      {step.title}
                    </p>
                  </div>
                  {(isCurrent || isDone) && (
                    <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{step.description}</p>
                  )}
                </div>
                {isDone && <span className="text-green-500 text-xs font-bold flex-shrink-0">Done</span>}
                {isCurrent && <span className="text-amber-500 text-xs font-bold flex-shrink-0 animate-pulse">Running</span>}
              </div>
            );
          })}
        </div>
      </div>

      {/* What it demonstrates */}
      <div className="rounded-2xl p-4" style={{ background: 'linear-gradient(135deg, #0f3d0f, #1a5e1a)' }}>
        <p className="text-xs text-green-300 uppercase tracking-wider font-semibold mb-2">AGRICHECK Innovation</p>
        {[
          { icon: '🤖', text: 'AI Disease Detection (MobileNetV3 — demo mode)' },
          { icon: '📡', text: 'IoT Sensor Integration (ESP32 + DHT22)' },
          { icon: '⛅', text: 'Weather Intelligence' },
          { icon: '🕸️', text: 'Knowledge Graph (NetworkX)' },
          { icon: '🔄', text: 'Continual Learning Workflow' },
          { icon: '👨‍🌾', text: 'Farmer Feedback Loop' },
        ].map(({ icon, text }) => (
          <div key={text} className="flex items-center gap-2 py-1">
            <span>{icon}</span>
            <p className="text-green-300 text-xs">{text}</p>
          </div>
        ))}
      </div>

      {/* Action buttons */}
      {!isRunning && !isComplete && (
        <button onClick={runDemo}
          className="w-full py-5 rounded-2xl text-white font-black text-xl transition-all active:scale-95"
          style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)', boxShadow: '0 8px 32px rgba(245,158,11,0.4)' }}>
          🚀 START SIH DEMO
        </button>
      )}

      {isRunning && (
        <div className="w-full py-4 rounded-2xl text-center font-bold text-base"
          style={{ background: 'rgba(245,158,11,0.1)', border: '2px solid #f59e0b', color: '#d97706' }}>
          ⏳ Demo running... Please wait
        </div>
      )}

      {isComplete && (
        <div className="space-y-3">
          <div className="w-full py-4 rounded-2xl text-center font-bold text-base"
            style={{ background: '#f0fdf4', border: '2px solid #22c55e', color: '#16a34a' }}>
            🏆 Demo Complete! Navigate to explore results.
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'View Analysis', screen: 'analysis', icon: '🔬' },
              { label: 'Knowledge Graph', screen: 'knowledgeGraph', icon: '🕸️' },
              { label: 'Hotspot Map', screen: 'hotspot', icon: '📍' },
              { label: 'Farm History', screen: 'history', icon: '📋' },
            ].map(({ label, screen, icon }) => (
              <button key={screen} onClick={() => onNavigate(screen)}
                className="py-3 rounded-xl font-bold text-sm transition-all active:scale-95"
                style={{ background: 'white', color: '#374151', border: '1px solid #e5e7eb' }}>
                {icon} {label}
              </button>
            ))}
          </div>
          <button onClick={resetDemo}
            className="w-full py-3 rounded-2xl font-bold text-sm text-gray-500 transition-all active:scale-95">
            🔄 Reset Demo
          </button>
        </div>
      )}
    </div>
  );
};
