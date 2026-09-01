import React, { useEffect, useState } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 400);
    const t2 = setTimeout(() => setPhase(2), 1000);
    const t3 = setTimeout(() => setPhase(3), 1700);
    const t4 = setTimeout(() => onComplete(), 2800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center z-50"
      style={{ background: 'linear-gradient(135deg, #0f3d0f 0%, #1a5e1a 40%, #22863a 100%)' }}>
      
      {/* Animated background circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 rounded-full opacity-10 top-[-80px] right-[-80px]"
          style={{ background: 'radial-gradient(circle, #4ade80, transparent)', transform: phase >= 1 ? 'scale(1.3)' : 'scale(1)', transition: 'transform 2s ease-out' }} />
        <div className="absolute w-64 h-64 rounded-full opacity-10 bottom-[-40px] left-[-40px]"
          style={{ background: 'radial-gradient(circle, #86efac, transparent)', transform: phase >= 1 ? 'scale(1.5)' : 'scale(1)', transition: 'transform 2.5s ease-out' }} />
      </div>

      {/* Logo Container */}
      <div className="relative flex flex-col items-center">
        {/* Leaf icon */}
        <div className="relative mb-4"
          style={{ opacity: phase >= 1 ? 1 : 0, transform: phase >= 1 ? 'scale(1) rotate(0deg)' : 'scale(0.5) rotate(-30deg)', transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
          <div className="w-24 h-24 rounded-3xl flex items-center justify-center shadow-2xl"
            style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)', boxShadow: '0 0 60px rgba(34, 197, 94, 0.5)' }}>
            <span className="text-5xl">🌿</span>
          </div>
          {/* Pulse ring */}
          <div className="absolute inset-0 rounded-3xl animate-ping"
            style={{ border: '2px solid rgba(74, 222, 128, 0.4)', animationDuration: '1.5s' }} />
        </div>

        {/* App Name */}
        <div style={{ opacity: phase >= 2 ? 1 : 0, transform: phase >= 2 ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.6s ease-out' }}>
          <h1 className="text-5xl font-black tracking-widest text-white text-center"
            style={{ textShadow: '0 0 40px rgba(74, 222, 128, 0.6)', letterSpacing: '0.15em' }}>
            AGRICHECK
          </h1>
          <p className="text-green-300 text-center text-sm font-medium mt-1 tracking-widest uppercase">
            Smart Crop Health Intelligence
          </p>
        </div>

        {/* Tagline */}
        <div className="mt-6 px-8"
          style={{ opacity: phase >= 3 ? 1 : 0, transform: phase >= 3 ? 'translateY(0)' : 'translateY(15px)', transition: 'all 0.5s ease-out' }}>
          <div className="flex items-center gap-2 justify-center">
            {['AI Prediction', 'IoT Sensors', 'Knowledge Graph'].map((t, i) => (
              <span key={t} className="text-xs text-green-400 font-medium"
                style={{ opacity: phase >= 3 ? 1 : 0, transition: `opacity 0.4s ease ${i * 0.15}s` }}>
                {t}{i < 2 && <span className="text-green-600 ml-2">•</span>}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Loading bar */}
      <div className="absolute bottom-16 w-48">
        <div className="h-0.5 bg-green-900 rounded-full overflow-hidden">
          <div className="h-full bg-green-400 rounded-full"
            style={{ width: phase >= 3 ? '100%' : phase >= 2 ? '65%' : phase >= 1 ? '35%' : '5%', transition: 'width 0.8s ease-out' }} />
        </div>
        <p className="text-green-500 text-xs text-center mt-2">
          {phase >= 3 ? 'Ready' : phase >= 2 ? 'Loading AI Engine...' : phase >= 1 ? 'Initializing...' : ''}
        </p>
      </div>

      {/* SIH Badge */}
      <div className="absolute bottom-6 flex items-center gap-2 opacity-60">
        <span className="text-green-400 text-xs">🏆</span>
        <span className="text-green-400 text-xs font-medium">Smart India Hackathon 2026</span>
      </div>
    </div>
  );
};
