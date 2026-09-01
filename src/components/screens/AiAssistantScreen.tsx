import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, Globe, Sparkles, User, Check, Radio } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ChatMessage, Language } from '../../types/agri';
import { initialChatMessages, samplePrompts, predefinedAiResponses } from '../../data/mockAgriData';
import { translations } from '../../data/translations';
import { VoiceInput } from '../VoiceInput';
import { TextToSpeech } from '../TextToSpeech';

interface AiAssistantScreenProps {
  language: Language;
  onNavigate: (screen: string) => void;
}

export const AiAssistantScreen: React.FC<AiAssistantScreenProps> = ({
  language,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(initialChatMessages);
  const [inputText, setInputText] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const t = translations[language];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');

    // Predefined logic response
    setTimeout(() => {
      let replyObj = predefinedAiResponses.default;
      const lower = query.toLowerCase();

      if (lower.includes('rain') || lower.includes('மழை')) {
        replyObj = predefinedAiResponses.rain;
      } else if (lower.includes('crop') || lower.includes('பயிர்')) {
        replyObj = predefinedAiResponses.crop;
      } else if (lower.includes('fertilizer') || lower.includes('உரம்')) {
        replyObj = predefinedAiResponses.fertilizer;
      } else if (lower.includes('kisan') || lower.includes('திட்டம்')) {
        replyObj = predefinedAiResponses.pmkisan;
      }

      const assistantMsg: ChatMessage = {
        id: `asst-${Date.now()}`,
        sender: 'assistant',
        text: replyObj[language],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        audioAvailable: true,
      };

      setMessages((prev) => [...prev, assistantMsg]);
    }, 600);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" exit={{ opacity: 0 }} className="flex flex-col h-[calc(100vh-140px)]">
      {/* Bento Header Banner */}
      <motion.div variants={itemVariants} className="bg-emerald-700 text-white p-5 rounded-3xl shadow-lg flex items-center justify-between shrink-0 mb-4 border border-emerald-600 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10" />
        
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm text-white flex items-center justify-center font-bold shrink-0 border border-white/20 shadow-inner">
            <Bot className="w-7 h-7" />
          </div>
          <div>
            <p className="text-[10px] text-emerald-200 uppercase tracking-widest font-bold">Ask AgriAI Assistant</p>
            <h2 className="text-lg font-black text-white leading-tight">
              {t.assistantTitle}
            </h2>
          </div>
        </div>
      </motion.div>

      {/* Messages Scroll View */}
      <div className="flex-1 overflow-y-auto space-y-4 px-1 pb-4">
        <AnimatePresence initial={false}>
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, scale: 0.9, x: isUser ? 20 : -20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                className={`flex items-start gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md">
                    <Bot className="w-5 h-5" />
                  </div>
                )}

                <div
                  className={`max-w-[80%] rounded-3xl p-4 text-sm font-semibold leading-relaxed shadow-sm ${
                    isUser
                      ? 'bg-emerald-600 text-white rounded-tr-sm'
                      : 'bg-white text-gray-800 border border-gray-100 rounded-tl-sm'
                  }`}
                >
                  <p>{msg.text}</p>

                  <div className="flex items-center justify-between gap-3 mt-3 pt-2 border-t border-black/5 opacity-80">
                    <span className="text-[10px] font-bold uppercase tracking-wider">{msg.timestamp}</span>

                    {!isUser && msg.audioAvailable && (
                      <TextToSpeech text={msg.text} language={language} />
                    )}
                  </div>
                </div>

                {isUser && (
                  <div className="w-10 h-10 rounded-2xl bg-gray-800 text-white flex items-center justify-center shrink-0 shadow-md font-bold text-sm">
                    👤
                  </div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts Chips */}
      <motion.div variants={itemVariants} className="mb-3 shrink-0">
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2 mb-2 block">
          💡 {t.quickPromptsLabel}
        </span>
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar px-1">
          {samplePrompts.map((prompt, idx) => (
            <motion.button
              whileTap={{ scale: 0.95 }}
              key={idx}
              onClick={() => handleSendMessage(prompt[language])}
              className="bg-white text-emerald-800 border border-emerald-100 text-xs font-bold px-4 py-2.5 rounded-full shrink-0 shadow-sm whitespace-nowrap"
            >
              {prompt[language]}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Input Field Bar */}
      <motion.div variants={itemVariants} className="bg-white p-2.5 rounded-3xl border border-gray-100 shadow-lg flex items-center gap-3 shrink-0">
        
        {/* Real Voice Input using Web Speech API */}
        <VoiceInput language={language} onResult={handleSendMessage} />

        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder={t.typeQuestionPlaceholder}
          className="flex-1 bg-gray-50 border-none rounded-2xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold placeholder-gray-400"
        />

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => handleSendMessage()}
          className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md"
        >
          <Send className="w-5 h-5 ml-1" />
        </motion.button>
      </motion.div>
    </motion.div>
  );
};
