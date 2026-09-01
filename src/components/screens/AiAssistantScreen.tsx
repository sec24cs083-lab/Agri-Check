import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Mic, 
  Send, 
  Volume2, 
  Globe, 
  Sparkles, 
  User, 
  Check, 
  Radio
} from 'lucide-react';
import { ChatMessage, Language } from '../../types/agri';
import { initialChatMessages, samplePrompts, predefinedAiResponses } from '../../data/mockAgriData';
import { translations } from '../../data/translations';

interface AiAssistantScreenProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

export const AiAssistantScreen: React.FC<AiAssistantScreenProps> = ({
  language,
  onLanguageChange,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(initialChatMessages);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeakingId, setIsSpeakingId] = useState<string | null>(null);

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

  const handleSimulateVoice = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      handleSendMessage("Tomorrow rain varuma?");
    }, 2000);
  };

  const handleSpeakText = (msgId: string) => {
    setIsSpeakingId(msgId);
    setTimeout(() => {
      setIsSpeakingId(null);
    }, 2500);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] animate-in fade-in duration-200">
      {/* Bento Header Banner */}
      <div className="bg-emerald-600 text-white p-4 rounded-[22px] shadow-md flex items-center justify-between shrink-0 mb-3 border border-emerald-500">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 text-white flex items-center justify-center font-bold shrink-0">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] text-emerald-100 uppercase tracking-widest font-bold">Ask AgriAI Assistant</p>
            <h2 className="text-base font-bold text-white leading-tight">
              {t.assistantTitle}
            </h2>
          </div>
        </div>

        <button
          onClick={() => onLanguageChange(language === 'en' ? 'ta' : 'en')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 text-xs font-bold border border-white/20 hover:bg-white/20 cursor-pointer"
        >
          <Globe className="w-3.5 h-3.5" />
          {t.switchLanguage}
        </button>
      </div>

      {/* Messages Scroll View */}
      <div className="flex-1 overflow-y-auto space-y-3 px-1 pb-4">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';

          return (
            <div
              key={msg.id}
              className={`flex items-start gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              {!isUser && (
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-1 shadow-xs">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl p-3.5 text-xs font-medium leading-relaxed shadow-2xs ${
                  isUser
                    ? 'bg-emerald-600 text-white rounded-tr-none'
                    : 'bg-white text-slate-900 border border-slate-200 rounded-tl-none'
                }`}
              >
                <p>{msg.text}</p>

                <div className="flex items-center justify-between gap-2 mt-2 pt-1 border-t border-slate-100 text-[10px] opacity-80">
                  <span>{msg.timestamp}</span>

                  {!isUser && msg.audioAvailable && (
                    <button
                      onClick={() => handleSpeakText(msg.id)}
                      className="flex items-center gap-1 text-emerald-700 font-bold hover:underline cursor-pointer"
                    >
                      <Volume2 className={`w-3.5 h-3.5 ${isSpeakingId === msg.id ? 'animate-pulse text-emerald-600' : ''}`} />
                      <span>{isSpeakingId === msg.id ? 'Playing Voice...' : 'Listen Audio'}</span>
                    </button>
                  )}
                </div>
              </div>

              {isUser && (
                <div className="w-8 h-8 rounded-full bg-stone-800 text-white flex items-center justify-center shrink-0 mt-1 shadow-xs font-bold text-xs">
                  R
                </div>
              )}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Listening Indicator Overlay */}
      {isListening && (
        <div className="bg-pink-100 border border-pink-300 p-2.5 rounded-2xl text-center text-xs text-pink-900 font-bold flex items-center justify-center gap-2 animate-pulse mb-2">
          <Radio className="w-4 h-4 text-pink-600 animate-spin" />
          <span>{t.listening}</span>
        </div>
      )}

      {/* Quick Prompts Chips */}
      <div className="mb-2 shrink-0 space-y-1">
        <span className="text-[10px] font-bold text-stone-500 uppercase px-1">
          {t.quickPromptsLabel}
        </span>
        <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {samplePrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt[language])}
              className="bg-white hover:bg-stone-50 text-stone-800 border border-stone-200 text-xs font-semibold px-3 py-1.5 rounded-full shrink-0 transition-all active:scale-95 cursor-pointer shadow-2xs"
            >
              💬 {prompt[language]}
            </button>
          ))}
        </div>
      </div>

      {/* Input Field Bar */}
      <div className="bg-white p-2 rounded-2xl border border-stone-200 shadow-md flex items-center gap-2 shrink-0">
        <button
          onClick={handleSimulateVoice}
          className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
            isListening ? 'bg-rose-600 text-white ring-4 ring-rose-200' : 'bg-pink-100 text-pink-700 hover:bg-pink-200'
          }`}
          title="Mic Voice Input"
        >
          <Mic className="w-5 h-5 stroke-[2.2]" />
        </button>

        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder={t.typeQuestionPlaceholder}
          className="flex-1 bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-pink-500 font-medium"
        />

        <button
          onClick={() => handleSendMessage()}
          className="w-11 h-11 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center transition-transform active:scale-95 cursor-pointer"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
