
import React from 'react';
import { AgentType, ProbeEvent } from '../types';
import { Terminal, Bug, Play, RefreshCw, AlertTriangle, Zap, ArrowRightCircle } from 'lucide-react';

interface ProbeConsoleProps {
  onInjectProbe: (event: ProbeEvent) => void;
  onForceAgent: (type: AgentType) => void;
  activeAgent: AgentType;
  availableAgents?: AgentType[];
}

const ProbeConsole: React.FC<ProbeConsoleProps> = ({ onInjectProbe, onForceAgent, activeAgent, availableAgents }) => {
  const agentsToDisplay = availableAgents || Object.values(AgentType).slice(0, 4);

  const simulateFailure = () => {
    onInjectProbe({
      id: Date.now().toString(),
      type: 'failure_simulation',
      description: `Simulated timeout for ${activeAgent} Agent`,
      timestamp: new Date()
    });
  };

  const mutateContext = () => {
    onInjectProbe({
      id: Date.now().toString(),
      type: 'context_mutation',
      description: 'Injected high-risk flag into session',
      timestamp: new Date()
    });
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Terminal className="w-4 h-4 text-slate-400" />
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Journey Override</h3>
        </div>
        <div className="bg-slate-900 rounded-2xl p-5 shadow-xl border border-slate-800">
          <p className="text-[10px] font-bold text-slate-500 uppercase mb-3">Force Agent State</p>
          <div className="grid grid-cols-2 gap-2">
            {agentsToDisplay.map((type) => (
              <button
                key={type}
                onClick={() => onForceAgent(type)}
                className={`px-3 py-2 rounded-xl text-[10px] font-black uppercase tracking-tighter transition-all border ${
                  activeAgent === type 
                  ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-900/40' 
                  : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600 hover:text-white'
                }`}
              >
                {type.replace('FIN_', '').replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-center gap-2 mb-4">
          <Bug className="w-4 h-4 text-slate-400" />
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Perturbation Lab</h3>
        </div>
        <div className="space-y-3">
          <button 
            onClick={simulateFailure}
            className="w-full flex items-center justify-between p-4 bg-white border border-slate-200 rounded-2xl hover:border-rose-200 hover:bg-rose-50 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-rose-100 flex items-center justify-center text-rose-600 group-hover:scale-110 transition-transform">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-slate-900">Simulate Tool Failure</p>
                <p className="text-[10px] text-slate-400 font-medium">Force a 503 error on agent runtime</p>
              </div>
            </div>
            <Play className="w-3 h-3 text-slate-300 group-hover:text-rose-400" />
          </button>

          <button 
            onClick={mutateContext}
            className="w-full flex items-center justify-between p-4 bg-white border border-slate-200 rounded-2xl hover:border-indigo-200 hover:bg-indigo-50 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
                <RefreshCw className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-slate-900">Context Mutation</p>
                <p className="text-[10px] text-slate-400 font-medium">Inject "High Intent" signal</p>
              </div>
            </div>
            <Zap className="w-3 h-3 text-slate-300 group-hover:text-indigo-400" />
          </button>

          <button 
            className="w-full flex items-center justify-between p-4 bg-white border border-slate-200 rounded-2xl hover:border-slate-900 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                <ArrowRightCircle className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-slate-900">Branch Jump</p>
                <p className="text-[10px] text-slate-400 font-medium">Auto-route to Advisory phase</p>
              </div>
            </div>
            <Play className="w-3 h-3 text-slate-300" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default ProbeConsole;
