
import React from 'react';
import { IndustryPattern } from '../types';
import { INDUSTRY_PATTERNS } from '../constants';

interface SidebarProps {
  selectedPattern: IndustryPattern;
  onSelectPattern: (pattern: IndustryPattern) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ selectedPattern, onSelectPattern }) => {
  return (
    <div className="w-[280px] h-full bg-slate-900 border-r border-slate-800 flex flex-col shrink-0">
      <div className="p-6 border-b border-slate-800">
        <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Orchestration Patterns</h2>
        <div className="space-y-1.5">
          {INDUSTRY_PATTERNS.map((pattern) => {
            const Icon = pattern.icon;
            const isActive = selectedPattern === pattern.id;
            return (
              <button
                key={pattern.id}
                onClick={() => onSelectPattern(pattern.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
                  isActive 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/40' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-indigo-400'}`} />
                <div className="text-left">
                  <p className="text-[11px] font-black uppercase tracking-tight">{pattern.name}</p>
                  <p className={`text-[9px] font-medium leading-none mt-1 ${isActive ? 'text-indigo-200' : 'text-slate-600'}`}>
                    {pattern.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
      
      <div className="p-6 mt-auto">
        <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-800">
          <p className="text-[9px] font-black text-indigo-400 uppercase tracking-widest mb-2">Pattern Insight</p>
          <p className="text-[10px] text-slate-400 leading-relaxed italic">
            "Industry-specific agent weights are dynamically adjusted based on selected pattern."
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
