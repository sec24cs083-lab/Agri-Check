import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  FarmerProfile, SensorData, SoilAnalysisReport, WeatherData, Language,
  SoilScanData, Prediction, FeedbackType, Farm, ScanResult
} from './types/agri';
import {
  initialFarmerProfile, initialSensorData, initialSoilReport, weatherData,
  demoCurrentPrediction, demoFarms, demoFarmHistory, demoKnowledgeGraph,
  demoCLStatus, demoModelVersions, demoHotspots,
} from './data/mockAgriData';

// Layout
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { MoreMenuModal } from './components/MoreMenuModal';

// New AGRICHECK Screens
import { SplashScreen } from './components/screens/SplashScreen';
import { LoginScreen } from './components/screens/LoginScreen';
import { DashboardScreen } from './components/screens/DashboardScreen';
import { CropScanScreen } from './components/screens/CropScanScreen';
import { AIAnalysisScreen } from './components/screens/AIAnalysisScreen';
import { ExplanationScreen } from './components/screens/ExplanationScreen';
import { DiseaseRiskScreen } from './components/screens/DiseaseRiskScreen';
import { FarmerFeedbackScreen } from './components/screens/FarmerFeedbackScreen';
import { KnowledgeGraphScreen } from './components/screens/KnowledgeGraphScreen';
import { ContinualLearningScreen } from './components/screens/ContinualLearningScreen';
import { FarmHistoryScreen } from './components/screens/FarmHistoryScreen';
import { HotspotMapScreen } from './components/screens/HotspotMapScreen';
import { AddFarmScreen } from './components/screens/AddFarmScreen';
import { AdminDashboardScreen } from './components/screens/AdminDashboardScreen';
import { SIHDemoScreen } from './components/screens/SIHDemoScreen';

// Existing screens (kept)
import { SensorDashboardScreen } from './components/screens/SensorDashboardScreen';
import { WeatherAdvisoryScreen } from './components/screens/WeatherAdvisoryScreen';
import { ProfileScreen } from './components/screens/ProfileScreen';

type AppState = 'splash' | 'login' | 'app';

export default function App() {
  // ── App lifecycle ──────────────────────────────
  const [appState, setAppState] = useState<AppState>('splash');
  const [activeScreen, setActiveScreen] = useState<string>('dashboard');
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  // ── Language ───────────────────────────────────
  const [language, setLanguage] = useState<Language>('en');

  // ── Farmer profile ─────────────────────────────
  const [farmer, setFarmer] = useState<FarmerProfile>(initialFarmerProfile);

  // ── Sensor ─────────────────────────────────────
  const [sensor, setSensor] = useState<SensorData>(initialSensorData);

  // ── Farms ──────────────────────────────────────
  const [farms, setFarms] = useState<Farm[]>(demoFarms);
  const [activeFarmId, setActiveFarmId] = useState<number>(1);
  const activeFarm = farms.find(f => f.id === activeFarmId) ?? farms[0] ?? null;

  // ── Predictions ────────────────────────────────
  const [currentPrediction, setCurrentPrediction] = useState<Prediction | null>(null);

  // ── Scan result ────────────────────────────────
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);

  // ── Feedback ───────────────────────────────────
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  // ── CL State ───────────────────────────────────
  const [clStatus, setCLStatus] = useState(demoCLStatus);
  const [modelVersions, setModelVersions] = useState(demoModelVersions);

  // ── Farm history ───────────────────────────────
  const [farmHistory, setFarmHistory] = useState(demoFarmHistory);

  // ── Kept for compatibility ─────────────────────
  const [report] = useState<SoilAnalysisReport>(initialSoilReport);

  // ─────────────────────────────────────────────
  // Handlers
  // ─────────────────────────────────────────────

  const handleLanguageChange = useCallback((lang: Language) => {
    setLanguage(lang);
    setFarmer(prev => ({ ...prev, preferredLanguage: lang }));
  }, []);

  const handleLogin = useCallback((username: string, fullName: string) => {
    setFarmer(prev => ({ ...prev, name: fullName || username, isOnboarded: true }));
    setAppState('app');
    setActiveScreen('dashboard');
  }, []);

  const handleToggleSensor = useCallback(() => {
    setSensor(prev => ({
      ...prev,
      isDemoMode: !prev.isDemoMode,
      isConnected: !prev.isDemoMode ? false : !prev.isConnected,
      lastUpdated: !prev.isDemoMode ? 'DEMO MODE' : 'Just now (Live)',
    }));
  }, []);

  const handleScanComplete = useCallback((result: ScanResult) => {
    setScanResult(result);
    // Simulate AI inference — use demo prediction
    const prediction: Prediction = {
      ...demoCurrentPrediction,
      id: Date.now(),
      farm_id: result.farmId,
      crop: result.crop,
    };
    setCurrentPrediction(prediction);
    setActiveScreen('analysis');
  }, []);

  const handleFeedbackSubmit = useCallback((feedbackType: FeedbackType, notes?: string) => {
    setFeedbackSubmitted(true);
    // Update CL status
    if (feedbackType === 'confirmed') {
      setCLStatus(prev => ({
        ...prev,
        buffer_size: prev.buffer_size + 1,
        confirmed_count: prev.confirmed_count + 1,
        criteria_met: prev.buffer_size + 1 >= 10,
      }));
    } else if (feedbackType === 'incorrect') {
      setCLStatus(prev => ({ ...prev, incorrect_count: prev.incorrect_count + 1 }));
    }
    // Add to farm history
    if (currentPrediction) {
      const newEntry = {
        id: currentPrediction.id,
        date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
        crop: currentPrediction.crop,
        disease: currentPrediction.disease,
        confidence: currentPrediction.confidence,
        risk_level: currentPrediction.risk_level,
        feedback_type: feedbackType,
        soil_moisture: sensor.soilMoisture,
        temperature: sensor.temperature,
        humidity: sensor.humidity,
        is_demo: currentPrediction.is_demo,
      };
      setFarmHistory(prev => [newEntry, ...prev]);
    }
  }, [currentPrediction, sensor]);

  const handleFarmAdded = useCallback((farmData: Omit<Farm, 'id' | 'user_id' | 'created_at'>) => {
    const newFarm: Farm = {
      ...farmData,
      id: farms.length + 1,
      user_id: 1,
      created_at: new Date().toISOString(),
    };
    setFarms(prev => [...prev, newFarm]);
    setActiveFarmId(newFarm.id);
    setFarmer(prev => ({ ...prev, mainCrop: farmData.crop }));
    setActiveScreen('dashboard');
  }, [farms]);

  const handleCLUpdate = useCallback(() => {
    const newVersion = {
      id: modelVersions.length + 1,
      version_string: `v${(modelVersions.length + 1)}.0`,
      accuracy: 0.893 + Math.random() * 0.02,
      precision: 0.887 + Math.random() * 0.02,
      recall: 0.881 + Math.random() * 0.02,
      f1_score: 0.884 + Math.random() * 0.02,
      training_samples: 1240 + clStatus.buffer_size * 10,
      notes: `Retrained with ${clStatus.confirmed_count} confirmed field cases`,
      created_at: new Date().toISOString(),
      is_active: true,
    };
    setModelVersions(prev => [...prev.map(v => ({ ...v, is_active: false })), newVersion]);
    setCLStatus(prev => ({ ...prev, latest_version: newVersion.version_string, criteria_met: false, buffer_size: 0 }));
  }, [modelVersions, clStatus]);

  const handleDemoComplete = useCallback((prediction: Prediction) => {
    setCurrentPrediction(prediction);
  }, []);

  const handleSaveProfile = useCallback((newProfile: FarmerProfile) => {
    setFarmer(newProfile);
    setLanguage(newProfile.preferredLanguage);
    setActiveScreen('dashboard');
  }, []);

  // ─────────────────────────────────────────────
  // State: Splash → Login → App
  // ─────────────────────────────────────────────

  if (appState === 'splash') {
    return <SplashScreen onComplete={() => setAppState('login')} />;
  }

  if (appState === 'login') {
    return <LoginScreen language={language} onLogin={handleLogin} />;
  }

  // ─────────────────────────────────────────────
  // Main App
  // ─────────────────────────────────────────────

  const renderScreen = () => {
    switch (activeScreen) {
      case 'dashboard':
        return (
          <DashboardScreen
            language={language}
            farmer={farmer}
            sensor={sensor}
            weather={weatherData}
            prediction={currentPrediction}
            activeFarm={activeFarm}
            onNavigate={setActiveScreen}
          />
        );

      case 'scan':
        return (
          <CropScanScreen
            language={language}
            farms={farms}
            onScanComplete={handleScanComplete}
            onNavigate={setActiveScreen}
          />
        );

      case 'analysis':
        return (
          <AIAnalysisScreen
            language={language}
            prediction={currentPrediction}
            onNavigate={setActiveScreen}
          />
        );

      case 'explanation':
        return (
          <ExplanationScreen
            language={language}
            prediction={currentPrediction}
            onNavigate={setActiveScreen}
          />
        );

      case 'risk':
        return (
          <DiseaseRiskScreen
            language={language}
            prediction={currentPrediction}
            sensor={sensor}
            weather={weatherData}
            onNavigate={setActiveScreen}
          />
        );

      case 'feedback':
        return (
          <FarmerFeedbackScreen
            language={language}
            prediction={currentPrediction}
            onFeedbackSubmit={handleFeedbackSubmit}
            onNavigate={setActiveScreen}
          />
        );

      case 'knowledgeGraph':
        return (
          <KnowledgeGraphScreen
            language={language}
            graph={demoKnowledgeGraph}
            onNavigate={setActiveScreen}
          />
        );

      case 'continualLearning':
        return (
          <ContinualLearningScreen
            language={language}
            clStatus={clStatus}
            modelVersions={modelVersions}
            onNavigate={setActiveScreen}
            onTriggerUpdate={handleCLUpdate}
          />
        );

      case 'history':
        return (
          <FarmHistoryScreen
            language={language}
            history={farmHistory}
            onNavigate={setActiveScreen}
          />
        );

      case 'hotspot':
        return (
          <HotspotMapScreen
            language={language}
            hotspots={demoHotspots}
            onNavigate={setActiveScreen}
          />
        );

      case 'addFarm':
        return (
          <AddFarmScreen
            language={language}
            onFarmAdded={handleFarmAdded}
            onNavigate={setActiveScreen}
          />
        );

      case 'admin':
        return (
          <AdminDashboardScreen
            language={language}
            clStatus={clStatus}
            modelVersions={modelVersions}
            onNavigate={setActiveScreen}
          />
        );

      case 'sihDemo':
        return (
          <SIHDemoScreen
            language={language}
            onNavigate={setActiveScreen}
            onDemoComplete={handleDemoComplete}
          />
        );

      case 'sensor':
        return (
          <SensorDashboardScreen
            sensor={sensor}
            onToggleSensor={handleToggleSensor}
            language={language}
          />
        );

      case 'weather':
        return <WeatherAdvisoryScreen language={language} />;

      case 'profile':
        return (
          <ProfileScreen
            farmer={farmer}
            sensor={sensor}
            language={language}
            onLanguageChange={handleLanguageChange}
            onResetOnboarding={() => setAppState('login')}
            onToggleSensor={handleToggleSensor}
          />
        );

      default:
        return (
          <DashboardScreen
            language={language}
            farmer={farmer}
            sensor={sensor}
            weather={weatherData}
            prediction={currentPrediction}
            activeFarm={activeFarm}
            onNavigate={setActiveScreen}
          />
        );
    }
  };

  const screenTitle: Record<string, string> = {
    dashboard: 'Dashboard',
    scan: 'Crop Scan',
    analysis: 'AI Analysis',
    explanation: 'Explanation',
    risk: 'Disease Risk',
    feedback: 'Feedback',
    knowledgeGraph: 'Knowledge Graph',
    continualLearning: 'Continual Learning',
    history: 'Farm History',
    hotspot: 'Hotspot Map',
    addFarm: 'Add Farm',
    admin: 'Research Dashboard',
    sihDemo: 'SIH Demo',
    sensor: 'Sensor Data',
    weather: 'Weather',
    profile: 'Profile',
  };

  return (
    <div className="min-h-screen bg-gray-100 selection:bg-emerald-200 selection:text-emerald-900">
      <div className="max-w-md mx-auto min-h-screen bg-[#F8FAF7] shadow-2xl relative flex flex-col border-x border-slate-200/80">
        
        {/* Header */}
        <Header
          language={language}
          onLanguageChange={handleLanguageChange}
          farmer={farmer}
          sensor={sensor}
          onToggleSensor={handleToggleSensor}
          onOpenProfile={() => setActiveScreen('profile')}
        />

        {/* Screen Title Bar */}
        {activeScreen !== 'dashboard' && (
          <div className="px-4 py-2 flex items-center gap-3"
            style={{ background: 'linear-gradient(135deg, #0f3d0f, #1a5e1a)', borderBottom: '1px solid rgba(74,222,128,0.2)' }}>
            <button onClick={() => setActiveScreen('dashboard')}
              className="w-7 h-7 rounded-full flex items-center justify-center text-green-300 text-lg transition-all active:scale-90"
              style={{ background: 'rgba(255,255,255,0.1)' }}>
              ←
            </button>
            <p className="text-white font-bold text-sm">{screenTitle[activeScreen] || activeScreen}</p>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 px-4 py-4 overflow-x-hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeScreen}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="w-full h-full overflow-y-auto"
            >
              {renderScreen()}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Bottom Navigation */}
        <Navigation
          language={language}
          activeScreen={activeScreen}
          onNavigate={setActiveScreen}
          onOpenMoreMenu={() => setIsMoreMenuOpen(true)}
        />

        {/* More Menu Drawer */}
        <MoreMenuModal
          isOpen={isMoreMenuOpen}
          onClose={() => setIsMoreMenuOpen(false)}
          language={language}
          activeScreen={activeScreen}
          onNavigate={(s) => { setActiveScreen(s); setIsMoreMenuOpen(false); }}
        />
      </div>
    </div>
  );
}
