import React, { useState } from 'react';
import { Language } from '../../types/agri';

interface LoginScreenProps {
  onLogin: (username: string, name: string) => void;
  language: Language;
}

const t = {
  en: {
    welcome: 'Welcome to AGRICHECK',
    subtitle: 'AI-Powered Crop Disease Intelligence',
    login: 'Login',
    register: 'Register',
    username: 'Username',
    password: 'Password',
    fullName: 'Full Name',
    email: 'Email',
    loginBtn: 'Login to Farm',
    registerBtn: 'Create Account',
    switchToRegister: "Don't have an account? Register",
    switchToLogin: "Already have an account? Login",
    demo: 'Quick Demo Login',
    demoHint: 'farmer1 / agricheck123',
    tagline: 'AI • IoT • Knowledge Graph • Continual Learning',
  },
  ta: {
    welcome: 'AGRICHECK வரவேற்கிறோம்',
    subtitle: 'AI-இயங்கும் பயிர் நோய் கண்டறிதல்',
    login: 'உள்நுழைவு',
    register: 'பதிவு',
    username: 'பயனர் பெயர்',
    password: 'கடவுச்சொல்',
    fullName: 'முழு பெயர்',
    email: 'மின்னஞ்சல்',
    loginBtn: 'பண்ணைக்கு உள்நுழைக',
    registerBtn: 'கணக்கு உருவாக்கு',
    switchToRegister: 'கணக்கு இல்லையா? பதிவு செய்க',
    switchToLogin: 'கணக்கு உள்ளதா? உள்நுழைக',
    demo: 'டெமோ உள்நுழைவு',
    demoHint: 'farmer1 / agricheck123',
    tagline: 'AI • IoT • அறிவு வரைபடம் • தொடர் கற்றல்',
  },
};

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, language }) => {
  const tx = t[language];
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!username || !password) { setError('Please fill all required fields.'); return; }
    setLoading(true);
    // Simulate API call delay
    await new Promise(r => setTimeout(r, 800));
    setLoading(false);
    onLogin(username, fullName || username);
  };

  const handleDemo = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    setLoading(false);
    onLogin('farmer1', 'Ramesh Kumar');
  };

  return (
    <div className="min-h-screen flex flex-col"
      style={{ background: 'linear-gradient(160deg, #0f3d0f 0%, #1a5e1a 50%, #14532d 100%)' }}>
      
      {/* Header area */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-12 pb-4">
        <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-4 shadow-2xl"
          style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)', boxShadow: '0 0 40px rgba(34,197,94,0.4)' }}>
          <span className="text-4xl">🌿</span>
        </div>
        <h1 className="text-3xl font-black text-white tracking-wider">AGRICHECK</h1>
        <p className="text-green-300 text-sm mt-1 text-center">{tx.subtitle}</p>
        <p className="text-green-500 text-xs mt-1 tracking-widest">{tx.tagline}</p>
      </div>

      {/* Card */}
      <div className="mx-4 mb-6 rounded-3xl overflow-hidden shadow-2xl"
        style={{ background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(20px)' }}>
        
        {/* Tab switcher */}
        <div className="flex bg-gray-100 m-4 rounded-2xl p-1">
          {[{ key: false, label: tx.login }, { key: true, label: tx.register }].map(tab => (
            <button key={String(tab.key)}
              onClick={() => { setIsRegister(tab.key); setError(''); }}
              className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${isRegister === tab.key ? 'text-white shadow-md' : 'text-gray-500'}`}
              style={isRegister === tab.key ? { background: 'linear-gradient(135deg, #22c55e, #16a34a)' } : {}}>
              {tab.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="px-4 pb-4 space-y-3">
          {isRegister && (
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">{tx.fullName}</label>
              <input value={fullName} onChange={e => setFullName(e.target.value)}
                placeholder="Ramesh Kumar"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-800 text-sm focus:outline-none focus:ring-2"
                style={{ focusRingColor: '#22c55e' }} />
            </div>
          )}
          {isRegister && (
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">{tx.email}</label>
              <input value={email} onChange={e => setEmail(e.target.value)} type="email"
                placeholder="ramesh@example.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-800 text-sm focus:outline-none" />
            </div>
          )}
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">{tx.username}</label>
            <input value={username} onChange={e => setUsername(e.target.value)}
              placeholder="farmer1"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-800 text-sm focus:outline-none" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">{tx.password}</label>
            <input value={password} onChange={e => setPassword(e.target.value)} type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-800 text-sm focus:outline-none" />
          </div>

          {error && (
            <div className="px-3 py-2 rounded-xl bg-red-50 border border-red-200">
              <p className="text-red-600 text-xs">{error}</p>
            </div>
          )}

          <button type="submit" disabled={loading}
            className="w-full py-3.5 rounded-xl text-white font-bold text-sm transition-all active:scale-95 disabled:opacity-70"
            style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)' }}>
            {loading ? '⏳ Please wait...' : isRegister ? tx.registerBtn : tx.loginBtn}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-2">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-gray-400 text-xs">or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Demo login */}
          <button type="button" onClick={handleDemo} disabled={loading}
            className="w-full py-3 rounded-xl text-sm font-semibold transition-all active:scale-95"
            style={{ background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)', color: '#16a34a', border: '1.5px solid #86efac' }}>
            🚀 {tx.demo}
            <span className="block text-xs font-normal text-green-500 mt-0.5">{tx.demoHint}</span>
          </button>
        </form>

        {/* Footer */}
        <div className="px-4 pb-4">
          <p className="text-center text-xs text-gray-400">
            🔒 Prototype — passwords are hashed. Do not use real credentials.
          </p>
        </div>
      </div>
    </div>
  );
};
