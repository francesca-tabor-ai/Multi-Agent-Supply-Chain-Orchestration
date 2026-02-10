
import React from 'react';
import { AgentType, Message } from '../types';
import { Eye, Brain, Gauge, FileJson, Clock } from 'lucide-react';

interface AgentStateViewerProps {
  activeAgent: AgentType;
  lastMessage?: Message;
}

const AgentStateViewer: React.FC<AgentStateViewerProps> = ({ activeAgent, lastMessage }) => {
  const confidence = lastMessage?.metadata?.confidence || 0;
  const reasoning = lastMessage?.metadata?.reasoning || "Awaiting input for decision analysis...";

  return (
    <div className="space-y-10 animate-in slide-in-from-right-4 duration-500">
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Gauge className="w-4 h-4 text-slate-400" />
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Performance Metrics</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
            <p className="text-[9px] font-black text-slate-400 uppercase mb-2">Confidence</p>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-black text-slate-900">{(confidence * 100).toFixed(0)}%</span>
              <div className={`w-2 h-2 rounded-full ${confidence > 0.8 ? 'bg-emerald-500' : 'bg-amber-500'}`} />
            </div>
          </div>
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
            <p className="text-[9px] font-black text-slate-400 uppercase mb-2">Token Usage</p>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-black text-slate-900">824</span>
              <span className="text-[10px] font-bold text-slate-400">avg</span>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-center gap-2 mb-4">
          <Brain className="w-4 h-4 text-slate-400" />
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Internal Rationale</h3>
        </div>
        <div className="bg-white border border-slate-100 rounded-2xl p-5 soft-shadow leading-relaxed">
          <p className="text-xs font-medium text-slate-600 italic">
            "{reasoning}"
          </p>
        </div>
      </section>

      <section>
        <div className="flex items-center gap-2 mb-4">
          <FileJson className="w-4 h-4 text-slate-400" />
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Schema</h3>
        </div>
        <div className="bg-slate-900 rounded-2xl p-4 font-mono text-[10px] text-indigo-300 overflow-x-auto shadow-inner">
          <pre>{JSON.stringify({
            agent: activeAgent,
            version: "gemini-3-pro",
            capabilities: ["context_read", "context_write", "tool_call"],
            safety_filters: "strict"
          }, null, 2)}</pre>
        </div>
      </section>

      <section>
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-4 h-4 text-slate-400" />
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Session TTL</h3>
        </div>
        <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl">
          <div className="flex-1 bg-slate-200 h-1 rounded-full overflow-hidden">
            <div className="w-[60%] h-full brand-gradient" />
          </div>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">18m remaining</span>
        </div>
      </section>
    </div>
  );
};

export default AgentStateViewer;
