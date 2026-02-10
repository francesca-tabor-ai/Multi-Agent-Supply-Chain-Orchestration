
import React, { useRef, useEffect } from 'react';
import { Message, AgentType } from '../types';
import { Send, User, Bot, Sparkles, Loader2, Command } from 'lucide-react';

interface ChatInterfaceProps {
  messages: Message[];
  onSendMessage: (content: string) => void;
  isLoading: boolean;
  activeAgent: AgentType;
}

const FormattedContent: React.FC<{ content: string }> = ({ content }) => {
  // Simple parser for basic formatting: bold (**), bullet points (* or -), and paragraphs
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let listItems: React.ReactNode[] = [];

  const flushList = () => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={`list-${elements.length}`} className="list-disc ml-5 mb-4 space-y-1">
          {listItems}
        </ul>
      );
      listItems = [];
    }
  };

  const parseInline = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-black text-slate-900">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  lines.forEach((line, index) => {
    const trimmedLine = line.trim();
    if (trimmedLine.startsWith('* ') || trimmedLine.startsWith('- ')) {
      listItems.push(
        <li key={`li-${index}`} className="pl-1">
          {parseInline(trimmedLine.slice(2))}
        </li>
      );
    } else {
      flushList();
      if (trimmedLine === '') {
        elements.push(<div key={`br-${index}`} className="h-2" />);
      } else {
        elements.push(
          <p key={`p-${index}`} className="mb-3 last:mb-0">
            {parseInline(line)}
          </p>
        );
      }
    }
  });
  flushList();

  return <div className="formatted-text">{elements}</div>;
};

const ChatInterface: React.FC<ChatInterfaceProps> = ({ messages, onSendMessage, isLoading, activeAgent }) => {
  const [input, setInput] = React.useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input);
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-full bg-white relative">
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-8 py-10 space-y-8 custom-scrollbar"
      >
        {messages.map((m) => (
          <div key={m.id} className={`flex items-start gap-6 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 transition-transform hover:scale-105 ${
              m.role === 'user' ? 'bg-slate-900 text-white shadow-lg' : 'bg-slate-50 text-slate-400 border border-slate-100'
            }`}>
              {m.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
            </div>
            
            <div className={`flex flex-col max-w-[80%] ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
              <div className={`px-6 py-5 rounded-[2rem] text-[14px] leading-relaxed soft-shadow ${
                m.role === 'user' 
                  ? 'bg-slate-900 text-white rounded-tr-none' 
                  : 'bg-white border border-slate-100 text-slate-700 rounded-tl-none shadow-sm shadow-slate-200/50'
              }`}>
                <FormattedContent content={m.content} />
              </div>
              
              <div className="flex items-center gap-3 mt-3 px-2">
                <span className="text-[10px] text-slate-400 font-bold tracking-tight">
                  {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
                {m.role === 'assistant' && (
                  <>
                    <div className="w-1 h-1 bg-slate-200 rounded-full" />
                    <span className="text-[10px] font-black brand-gradient-text uppercase tracking-widest">{m.agentType} Agent</span>
                    {m.metadata?.confidence !== undefined && (
                      <span className="text-[9px] px-1.5 py-0.5 bg-slate-50 border border-slate-100 rounded text-slate-400 font-bold">
                        {(m.metadata.confidence * 100).toFixed(0)}% Match
                      </span>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex items-center gap-4 animate-in fade-in duration-500">
            <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100">
              <Loader2 className="w-5 h-5 text-indigo-500 animate-spin" />
            </div>
            <div className="bg-slate-50/50 rounded-2xl px-6 py-4 border border-slate-100/50 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest animate-pulse">
                  {activeAgent} Orchestrating
                </span>
                <div className="flex gap-1">
                  <span className="w-1 h-1 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1 h-1 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1 h-1 bg-indigo-400 rounded-full animate-bounce" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="px-8 pb-8 pt-4 bg-white/80 backdrop-blur-md border-t border-slate-100/50">
        <form onSubmit={handleSubmit} className="relative group">
          <div className="absolute inset-0 brand-gradient rounded-[22px] blur opacity-10 group-focus-within:opacity-20 transition-opacity" />
          <div className="relative flex items-center bg-white border border-slate-200 rounded-[20px] transition-all duration-300 focus-within:border-slate-900 focus-within:ring-4 focus-within:ring-slate-50 p-2">
            <div className="pl-4 pr-2 text-slate-400">
              <Command className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Send instruction to ${activeAgent} node...`}
              disabled={isLoading}
              className="flex-1 bg-transparent py-3 text-sm focus:outline-none placeholder:text-slate-300 placeholder:font-medium disabled:opacity-50"
            />
            <div className="flex items-center gap-2 px-2">
               {input.trim() && (
                 <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-slate-900 hover:bg-black text-white p-2.5 rounded-xl transition-all duration-300 disabled:opacity-50 shadow-sm"
                >
                  <Send className="w-4 h-4" />
                </button>
               )}
            </div>
          </div>
        </form>
        <div className="mt-4 flex justify-between items-center px-2">
          <div className="flex gap-4">
            <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">Context Synchronized</span>
            <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">Multi-Agent Protocol v1.0</span>
          </div>
          <p className="text-[9px] text-slate-300 font-bold uppercase tracking-widest">MACOP Lab Runtime</p>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
