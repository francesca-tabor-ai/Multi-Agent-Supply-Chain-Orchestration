import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, Info } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

interface PlatformHelpBotProps {
  onRunPrompt: (prompt: string) => void;
}

const PlatformHelpBot: React.FC<PlatformHelpBotProps> = ({ onRunPrompt }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', content: string}[]>([
    { role: 'assistant', content: "Hi! I'm the MACOP Platform Specialist. I can answer questions about our multi-agent orchestration for Finance, Travel, SaaS, Automotive, or High-End Retail." }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;
    const userText = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userText }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userText,
        config: {
          systemInstruction: "You are a specialist for the MACOP (Multi-Agent Commerce Orchestration Platform). Explain how specialized agents (Retail, SaaS, Finance, Travel, Automotive) collaborate using a shared context graph. Detail orchestration patterns like the Retail 'Event Trigger' path. Keep answers concise and professional.",
        }
      });
      setMessages(prev => [...prev, { role: 'assistant', content: response.text || "I'm not sure about that." }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Error communicating with Platform AI." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-10 z-[60]">
      {isOpen ? (
        <div className="w-[400px] h-[550px] bg-white rounded-[32px] shadow-2xl border border-slate-100 flex flex-col overflow-hidden animate-in slide-in-from-bottom-8 duration-300">
          <div className="p-5 brand-gradient flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md">
                <Info className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest">Platform Help</p>
                <p className="text-[10px] opacity-80 font-bold">MACOP Specialist</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar bg-slate-50/50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-xs leading-relaxed ${
                  m.role === 'user' 
                    ? 'bg-slate-900 text-white rounded-tr-none' 
                    : 'bg-white border border-slate-100 text-slate-700 rounded-tl-none shadow-sm'
                }`}>
                  {m.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-center gap-2 px-1">
                <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" />
              </div>
            )}
          </div>
          <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-slate-100">
            <div className="relative flex items-center">
              <input 
                type="text" 
                value={input} 
                onChange={(e) => setInput(e.target.value)} 
                placeholder="Ask about MACOP or orchestration..." 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-4 pr-12 text-xs focus:outline-none focus:border-slate-400" 
              />
              <button 
                type="submit" 
                className="absolute right-2 p-2 text-indigo-600 hover:text-indigo-800 disabled:opacity-50"
                disabled={!input.trim() || isLoading}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)} 
          className="w-16 h-16 brand-gradient rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-110 transition-transform group relative"
        >
          <div className="absolute inset-0 brand-gradient rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-opacity" />
          <MessageCircle className="w-7 h-7 relative z-10" />
        </button>
      )}
    </div>
  );
};

export default PlatformHelpBot;