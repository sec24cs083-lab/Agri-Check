import React, { useState, useEffect } from 'react';
import { Volume2, Square } from 'lucide-react';
import { motion } from 'motion/react';
import { Language } from '../../types/agri';

interface TextToSpeechProps {
  text: string;
  language: Language;
}

export const TextToSpeech: React.FC<TextToSpeechProps> = ({ text, language }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    if (!('speechSynthesis' in window)) {
      setSupported(false);
    }
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const toggleSpeech = () => {
    if (!supported) return;

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'ta' ? 'ta-IN' : 'en-IN';
      utterance.rate = 0.9; // Slightly slower for better comprehension
      
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);

      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
    }
  };

  if (!supported) return null;

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={toggleSpeech}
      className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
        isPlaying 
          ? 'bg-amber-100 text-amber-800 border border-amber-300' 
          : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
      }`}
    >
      {isPlaying ? (
        <>
          <Square className="w-4 h-4 fill-current" />
          <span>Stop Audio</span>
        </>
      ) : (
        <>
          <Volume2 className="w-4 h-4 text-green-600" />
          <span>Read Aloud</span>
        </>
      )}
    </motion.button>
  );
};
