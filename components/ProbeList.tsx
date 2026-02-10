import React, { useMemo } from 'react';
import { AgentType, IndustryPattern } from '../types';
import { SUGGESTED_PROBES, INDUSTRY_AGENT_CHAINS } from '../constants';
import { Sparkles, Terminal, Filter } from 'lucide-react';

interface ProbeListProps {
  onRunPrompt: (prompt: string) => void;
  selectedPattern: IndustryPattern;
  isCollapsed: boolean;
}

const AGENT_COLORS: Record<string, string> = {
  // Standard
  [AgentType.DISCOVERY]: 'border-indigo-200 text-indigo-700 bg-indigo-50 hover:bg-indigo-100 hover:border-indigo-300',
  [AgentType.VALIDATION]: 'border-amber-200 text-amber-700 bg-amber-50 hover:bg-amber-100 hover:border-amber-300',
  [AgentType.TRANSACTION]: 'border-emerald-200 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 hover:border-emerald-300',
  [AgentType.SUPPORT]: 'border-rose-200 text-rose-700 bg-rose-50 hover:bg-rose-100 hover:border-rose-300',
  
  // Finance
  [AgentType.FIN_INTENT]: 'border-indigo-200 text-indigo-700 bg-indigo-50 hover:bg-indigo-100 hover:border-indigo-300',
  [AgentType.FIN_PROFILING]: 'border-blue-200 text-blue-700 bg-blue-50 hover:bg-blue-100 hover:border-blue-300',
  [AgentType.FIN_RISK_COMPLIANCE]: 'border-purple-200 text-purple-700 bg-purple-50 hover:bg-purple-100 hover:border-purple-300',
  [AgentType.FIN_OFFER]: 'border-amber-200 text-amber-700 bg-amber-50 hover:bg-amber-100 hover:border-amber-300',
  [AgentType.FIN_EXECUTION]: 'border-emerald-200 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 hover:border-emerald-300',
  [AgentType.FIN_ADVISORY]: 'border-rose-200 text-rose-700 bg-rose-50 hover:bg-rose-100 hover:border-rose-300',

  // Travel
  [AgentType.TRAV_INSPIRATION]: 'border-indigo-200 text-indigo-700 bg-indigo-50 hover:bg-indigo-100 hover:border-indigo-300',
  [AgentType.TRAV_DESIGN]: 'border-blue-200 text-blue-700 bg-blue-50 hover:bg-blue-100 hover:border-blue-300',
  [AgentType.TRAV_OPTIMIZER]: 'border-cyan-200 text-cyan-700 bg-cyan-50 hover:bg-cyan-100 hover:border-cyan-300',
  [AgentType.TRAV_AVAILABILITY]: 'border-purple-200 text-purple-700 bg-purple-50 hover:bg-purple-100 hover:border-purple-300',
  [AgentType.TRAV_TRANSACTION]: 'border-emerald-200 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 hover:border-emerald-300',
  [AgentType.TRAV_MONITORING]: 'border-sky-200 text-sky-700 bg-sky-50 hover:bg-sky-100 hover:border-sky-300',
  [AgentType.TRAV_DISRUPTION]: 'border-rose-200 text-rose-700 bg-rose-50 hover:bg-rose-100 hover:border-rose-300',

  // SaaS
  [AgentType.SAAS_DEMAND]: 'border-indigo-200 text-indigo-700 bg-indigo-50 hover:bg-indigo-100 hover:border-indigo-300',
  [AgentType.SAAS_STAKEHOLDERS]: 'border-blue-200 text-blue-700 bg-blue-50 hover:bg-blue-100 hover:border-blue-300',
  [AgentType.SAAS_VALIDATION]: 'border-emerald-200 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 hover:border-emerald-300',
  [AgentType.SAAS_SECURITY]: 'border-purple-200 text-purple-700 bg-purple-50 hover:bg-purple-100 hover:border-purple-300',
  [AgentType.SAAS_NEGOTIATION]: 'border-amber-200 text-amber-700 bg-amber-50 hover:bg-amber-100 hover:border-amber-300',
  [AgentType.SAAS_EXECUTION]: 'border-slate-400 text-slate-900 bg-slate-50 hover:bg-slate-100 hover:border-slate-600',
  [AgentType.SAAS_EXPANSION]: 'border-rose-200 text-rose-700 bg-rose-50 hover:bg-rose-100 hover:border-rose-300',

  // Automotive
  [AgentType.AUTO_VEHICLE_DISCOVERY]: 'border-slate-300 text-slate-700 bg-slate-50 hover:bg-slate-100 hover:border-slate-400',
  [AgentType.AUTO_LIFESTYLE_FIT]: 'border-orange-200 text-orange-700 bg-orange-50 hover:bg-orange-100 hover:border-orange-300',
  [AgentType.AUTO_TRADE_IN]: 'border-amber-200 text-amber-700 bg-amber-50 hover:bg-orange-100 hover:border-amber-300',
  [AgentType.AUTO_FINANCE]: 'border-emerald-200 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 hover:border-emerald-300',
  [AgentType.AUTO_INVENTORY]: 'border-blue-200 text-blue-700 bg-blue-50 hover:bg-blue-100 hover:border-blue-300',
  [AgentType.AUTO_TRANSACTION]: 'border-indigo-200 text-indigo-700 bg-indigo-50 hover:bg-indigo-100 hover:border-indigo-300',
  [AgentType.AUTO_OWNERSHIP]: 'border-rose-200 text-rose-700 bg-rose-50 hover:bg-rose-100 hover:border-rose-300',

  // Retail
  [AgentType.RETAIL_INSPIRATION]: 'border-indigo-200 text-indigo-700 bg-indigo-50 hover:bg-indigo-100 hover:border-indigo-300',
  [AgentType.RETAIL_STYLIST]: 'border-pink-200 text-pink-700 bg-pink-50 hover:bg-pink-100 hover:border-pink-300',
  [AgentType.RETAIL_INVENTORY]: 'border-amber-200 text-amber-700 bg-amber-50 hover:bg-amber-100 hover:border-amber-300',
  [AgentType.RETAIL_OFFER]: 'border-violet-200 text-violet-700 bg-violet-50 hover:bg-violet-100 hover:border-violet-300',
  [AgentType.RETAIL_TRANSACTION]: 'border-emerald-200 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 hover:border-emerald-300',
  [AgentType.RETAIL_CLIENTELING]: 'border-rose-200 text-rose-700 bg-rose-50 hover:bg-rose-100 hover:border-rose-300',
};

const ProbeList: React.FC<ProbeListProps> = ({ onRunPrompt, selectedPattern, isCollapsed }) => {
  const filteredProbes = useMemo(() => {
    const activeAgentTypesInChain = new Set(INDUSTRY_AGENT_CHAINS[selectedPattern].map(a => a.type));
    return SUGGESTED_PROBES.filter(probe => activeAgentTypesInChain.has(probe.agent));
  }, [selectedPattern]);

  if (isCollapsed) {
    return (
      <div className="w-12 h-full bg-white flex flex-col items-center py-6 border-r border-slate-100 shrink-0">
        <Terminal className="w-4 h-4 text-slate-300 mb-8" />
        <div className="flex flex-col gap-4">
          {filteredProbes.slice(0, 6).map((probe, i) => (
            <div 
              key={i}
              className={`w-6 h-6 rounded-lg border flex items-center justify-center opacity-40 hover:opacity-100 cursor-help transition-all ${AGENT_COLORS[probe.agent]?.split(' ')[0]}`}
              title={probe.label}
            >
              <Sparkles className="w-3 h-3" />
            </div>
          ))}
        </div>
        <div className="mt-auto rotate-180">
          <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] [writing-mode:vertical-lr]">Probes</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[320px] h-full bg-white flex flex-col shrink-0 animate-in fade-in slide-in-from-left-4 duration-300">
      <div className="p-6 border-b border-slate-50">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-slate-400" />
            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Prompt Probes</h2>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-0.5 bg-slate-50 rounded border border-slate-100">
             <Filter className="w-2.5 h-2.5 text-slate-400" />
             <span className="text-[8px] font-black text-slate-500 uppercase tracking-tighter">Pattern Filter</span>
          </div>
        </div>
        <p className="text-[11px] text-slate-500 leading-tight">Contextual probes for the <span className="font-bold text-slate-900">{selectedPattern}</span> orchestration pattern.</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6 space-y-3 custom-scrollbar">
        {filteredProbes.length > 0 ? (
          filteredProbes.map((probe, i) => (
            <button
              key={i}
              onClick={() => onRunPrompt(probe.prompt)}
              className={`w-full p-4 rounded-2xl border text-left transition-all group flex flex-col gap-2 ${AGENT_COLORS[probe.agent] || AGENT_COLORS[AgentType.DISCOVERY]}`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-black uppercase tracking-widest opacity-60 flex items-center gap-1.5">
                  <Sparkles className="w-2.5 h-2.5" />
                  {probe.agent.replace('RETAIL_', '').replace('AUTO_', '').replace('SAAS_', '').replace('TRAV_', '').replace('FIN_', '')}
                </span>
                <div className="w-1.5 h-1.5 rounded-full bg-current opacity-20" />
              </div>
              <p className="text-[11px] font-black leading-tight uppercase group-hover:underline">{probe.label}</p>
              <p className="text-[10px] font-medium opacity-80 line-clamp-2">"{probe.prompt}"</p>
            </button>
          ))
        ) : (
          <div className="py-12 px-4 text-center">
            <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">No matching probes</p>
          </div>
        )}
      </div>
      <div className="p-6 bg-slate-50 border-t border-slate-100 text-[9px] font-black text-slate-400 uppercase tracking-widest text-center">Probes mimic canonical path events</div>
    </div>
  );
};

export default ProbeList;
