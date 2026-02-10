import React from 'react';
import { AgentType } from '../types';
import { Zap, ArrowRight } from 'lucide-react';

interface AgentOrchestratorProps {
  currentAgent: AgentType;
  agents: { type: AgentType, icon: any, label: string }[];
  history: { from: AgentType; to: AgentType; reason: string; timestamp: Date }[];
  onAgentClick?: (agent: AgentType) => void;
}

const AGENT_COLORS: Record<string, any> = {
  // Standard
  [AgentType.DISCOVERY]: { bg: 'bg-indigo-600', text: 'text-indigo-600', glow: 'shadow-indigo-200' },
  [AgentType.VALIDATION]: { bg: 'bg-amber-500', text: 'text-amber-500', glow: 'shadow-amber-200' },
  [AgentType.TRANSACTION]: { bg: 'bg-emerald-600', text: 'text-emerald-600', glow: 'shadow-emerald-200' },
  [AgentType.SUPPORT]: { bg: 'bg-rose-500', text: 'text-rose-500', glow: 'shadow-rose-200' },
  // Finance
  [AgentType.FIN_INTENT]: { bg: 'bg-indigo-600', text: 'text-indigo-600', glow: 'shadow-indigo-200' },
  [AgentType.FIN_PROFILING]: { bg: 'bg-blue-600', text: 'text-blue-600', glow: 'shadow-blue-200' },
  [AgentType.FIN_RISK_COMPLIANCE]: { bg: 'bg-purple-600', text: 'text-purple-600', glow: 'shadow-purple-200' },
  [AgentType.FIN_OFFER]: { bg: 'bg-amber-500', text: 'text-amber-500', glow: 'shadow-amber-200' },
  [AgentType.FIN_EXECUTION]: { bg: 'bg-emerald-600', text: 'text-emerald-600', glow: 'shadow-emerald-200' },
  [AgentType.FIN_ADVISORY]: { bg: 'bg-rose-500', text: 'text-rose-500', glow: 'shadow-rose-200' },
  // Travel
  [AgentType.TRAV_INSPIRATION]: { bg: 'bg-indigo-600', text: 'text-indigo-600', glow: 'shadow-indigo-200' },
  [AgentType.TRAV_DESIGN]: { bg: 'bg-blue-600', text: 'text-blue-600', glow: 'shadow-blue-200' },
  [AgentType.TRAV_OPTIMIZER]: { bg: 'bg-cyan-600', text: 'text-cyan-600', glow: 'shadow-cyan-200' },
  [AgentType.TRAV_AVAILABILITY]: { bg: 'bg-purple-600', text: 'text-purple-600', glow: 'shadow-purple-200' },
  [AgentType.TRAV_TRANSACTION]: { bg: 'bg-emerald-600', text: 'text-emerald-600', glow: 'shadow-emerald-200' },
  [AgentType.TRAV_MONITORING]: { bg: 'bg-sky-500', text: 'text-sky-500', glow: 'shadow-sky-200' },
  [AgentType.TRAV_DISRUPTION]: { bg: 'bg-rose-600', text: 'text-rose-600', glow: 'shadow-rose-200' },
  // SaaS
  [AgentType.SAAS_DEMAND]: { bg: 'bg-indigo-600', text: 'text-indigo-600', glow: 'shadow-indigo-200' },
  [AgentType.SAAS_STAKEHOLDERS]: { bg: 'bg-blue-500', text: 'text-blue-500', glow: 'shadow-blue-200' },
  [AgentType.SAAS_VALIDATION]: { bg: 'bg-emerald-500', text: 'text-emerald-500', glow: 'shadow-emerald-200' },
  [AgentType.SAAS_SECURITY]: { bg: 'bg-purple-600', text: 'text-purple-600', glow: 'shadow-purple-200' },
  [AgentType.SAAS_NEGOTIATION]: { bg: 'bg-amber-500', text: 'text-amber-500', glow: 'shadow-amber-200' },
  [AgentType.SAAS_EXECUTION]: { bg: 'bg-slate-900', text: 'text-slate-900', glow: 'shadow-slate-200' },
  [AgentType.SAAS_EXPANSION]: { bg: 'bg-rose-500', text: 'text-rose-500', glow: 'shadow-rose-200' },
  // Automotive
  [AgentType.AUTO_VEHICLE_DISCOVERY]: { bg: 'bg-slate-900', text: 'text-slate-900', glow: 'shadow-slate-200' },
  [AgentType.AUTO_LIFESTYLE_FIT]: { bg: 'bg-orange-600', text: 'text-orange-600', glow: 'shadow-orange-200' },
  [AgentType.AUTO_TRADE_IN]: { bg: 'bg-amber-600', text: 'text-amber-600', glow: 'shadow-amber-200' },
  [AgentType.AUTO_FINANCE]: { bg: 'bg-emerald-600', text: 'text-emerald-600', glow: 'shadow-emerald-200' },
  [AgentType.AUTO_INVENTORY]: { bg: 'bg-blue-600', text: 'text-blue-600', glow: 'shadow-blue-200' },
  [AgentType.AUTO_TRANSACTION]: { bg: 'bg-indigo-600', text: 'text-indigo-600', glow: 'shadow-indigo-200' },
  [AgentType.AUTO_OWNERSHIP]: { bg: 'bg-rose-500', text: 'text-rose-500', glow: 'shadow-rose-200' },
  // Retail
  [AgentType.RETAIL_INSPIRATION]: { bg: 'bg-indigo-600', text: 'text-indigo-600', glow: 'shadow-indigo-200' },
  [AgentType.RETAIL_STYLIST]: { bg: 'bg-pink-600', text: 'text-pink-600', glow: 'shadow-pink-200' },
  [AgentType.RETAIL_INVENTORY]: { bg: 'bg-amber-500', text: 'text-amber-500', glow: 'shadow-amber-200' },
  [AgentType.RETAIL_OFFER]: { bg: 'bg-violet-600', text: 'text-violet-600', glow: 'shadow-violet-200' },
  [AgentType.RETAIL_TRANSACTION]: { bg: 'bg-emerald-600', text: 'text-emerald-600', glow: 'shadow-emerald-200' },
  [AgentType.RETAIL_CLIENTELING]: { bg: 'bg-rose-500', text: 'text-rose-500', glow: 'shadow-rose-200' },
};

const getAgentColor = (type: AgentType) => AGENT_COLORS[type] || AGENT_COLORS[AgentType.DISCOVERY];

const AgentOrchestrator: React.FC<AgentOrchestratorProps> = ({ currentAgent, agents, history, onAgentClick }) => {
  return (
    <div className="bg-white border-b border-slate-100 px-8 py-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-2">Multi-Agent Pipeline</h2>
          <p className="text-[11px] text-slate-400 mt-0.5">Custom agent chain for selected industry pattern</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-full border border-slate-100">
          <Zap className="w-3 h-3 text-amber-500 fill-amber-500" />
          <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Active Sequence</span>
        </div>
      </div>
      <div className="flex items-center justify-between relative max-w-4xl mx-auto px-4">
        {agents.map((agent, index) => {
          const Icon = agent.icon;
          const isActive = currentAgent === agent.type;
          const currentIndex = agents.findIndex(a => a.type === currentAgent);
          const isPassed = currentIndex > index;
          const colors = getAgentColor(agent.type);
          return (
            <React.Fragment key={agent.type}>
              <button onClick={() => onAgentClick?.(agent.type)} className="flex flex-col items-center z-10 group focus:outline-none">
                <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-2xl flex items-center justify-center transition-all duration-500 transform group-hover:scale-110 ${isActive ? `${colors.bg} text-white shadow-xl ${colors.glow} scale-110 ring-4 ring-white` : isPassed ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-300 border border-slate-100'}`}>
                  <Icon className="w-4 h-4 lg:w-5 lg:h-5" />
                </div>
                <span className={`mt-3 text-[9px] lg:text-[10px] font-bold uppercase tracking-widest transition-colors duration-300 ${isActive ? colors.text : isPassed ? 'text-slate-900' : 'text-slate-300'}`}>{agent.label}</span>
              </button>
              {index < agents.length - 1 && (
                <div className="flex-1 h-px mx-2 lg:mx-4 bg-slate-100 relative overflow-hidden">
                  <div className={`absolute inset-0 transition-all duration-1000 ease-in-out brand-gradient ${isPassed ? 'translate-x-0' : '-translate-x-full'}`} />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
      {history.length > 0 && (
        <div className="mt-8 pt-4 border-t border-slate-50">
          <div className="space-y-2">
            {history.slice(-1).reverse().map((log, i) => (
              <div key={i} className="flex items-center gap-3 text-[10px] group">
                <span className="text-slate-300 tabular-nums font-medium">{log.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
                <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                  <span className={`font-bold ${getAgentColor(log.from).text}`}>{log.from.replace('RETAIL_', '').replace('AUTO_', '').replace('SAAS_', '').replace('TRAV_', '').replace('FIN_', '')}</span>
                  <ArrowRight className="w-2.5 h-2.5 text-slate-300" />
                  <span className={`font-bold ${getAgentColor(log.to).text}`}>{log.to.replace('RETAIL_', '').replace('AUTO_', '').replace('SAAS_', '').replace('TRAV_', '').replace('FIN_', '')}</span>
                </div>
                <span className="text-slate-500 font-medium truncate">{log.reason}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentOrchestrator;