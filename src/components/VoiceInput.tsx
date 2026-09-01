import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Language } from '../../types/agri';

interface VoiceInputProps {
  language: Language;
  onResult: (text: string) => void;
  isProcessing?: boolean;
}

export const VoiceInput: React.FC<VoiceInputProps> = ({ language, onResult, isProcessing = false }) => {
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Initialize Web Speech API
    const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      
      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        onResult(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        if (event.error !== 'no-speech') {
          setError(event.error);
        }
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [onResult]);

  const toggleListening = () => {
    if (isProcessing) return;
    
    setError(null);
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.lang = language === 'ta' ? 'ta-IN' : 'en-IN';
          recognitionRef.current.start();
          setIsListening(true);
        } catch (err) {
          console.error(err);
        }
      } else {
        setError('Voice input not supported in this browser.');
      }
    }
  };

  return (
    <div className="relative">
      <motion.button
        type="button"
        onClick={toggleListening}
        disabled={isProcessing}
        whileTap={{ scale: 0.9 }}
        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
          isListening
            ? 'bg-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.5)]'
            : isProcessing
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-green-100 text-green-700 hover:bg-green-200'
        }`}
      >
        {isListening ? <Mic className="w-6 h-6 animate-pulse" /> : <MicOff className="w-6 h-6" />}
      </motion.button>

      {/* Ripple Animation when listening */}
      <AnimatePresence>
        {isListening && (
          <motion.div
            initial={{ scale: 1, opacity: 0.5 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute inset-0 rounded-full bg-red-400 pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Error Tooltip */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-full mb-2 right-0 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap shadow-xl"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
