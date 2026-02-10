
import React from 'react';
import { X, Boxes, Zap, Target, ShieldCheck, Cpu, Database, Network, Workflow } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-[32px] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
        <div className="brand-gradient h-2 shrink-0" />
        <div className="p-8 md:p-12 overflow-y-auto custom-scrollbar">
          <div className="flex justify-between items-start mb-10">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center shadow-xl">
                <Boxes className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-black tracking-tight text-slate-900">MACOP</h2>
                <p className="text-sm font-bold brand-gradient-text uppercase tracking-[0.2em]">Multi-Agent Commerce Orchestration Platform</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-xl transition-colors">
              <X className="w-7 h-7 text-slate-400" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
            <div className="col-span-2 space-y-6">
              <section>
                <h3 className="text-xs font-black uppercase tracking-widest text-indigo-500 mb-3 flex items-center gap-2">
                  <Target className="w-4 h-4" /> The Vision
                </h3>
                <p className="text-base text-slate-600 leading-relaxed">
                  MACOP solves the fragmentation of modern commerce journeys. Instead of siloed experiences, we utilize a coordinated <strong>multi-agent system</strong> where specialized AI agents collaborate in real-time. By sharing a unified <strong>Customer Context Graph</strong>, agents maintain continuity across discovery, qualification, purchase, and support.
                </p>
              </section>

              <section>
                <h3 className="text-xs font-black uppercase tracking-widest text-indigo-500 mb-3 flex items-center gap-2">
                  <Database className="w-4 h-4" /> Shared Context Architecture
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  The backbone of MACOP is the <strong>Unified Context Layer</strong>. Every interaction—behavioral signals, intent vectors, risk profiles, and purchase history—is written to a high-concurrency graph. This allows agents to hand off the user session with zero context loss, enabling a "warm" experience at every touchpoint.
                </p>
              </section>

              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Continuity</h4>
                  <p className="text-xs text-slate-600">Context updates in &lt;200ms across all active agent nodes.</p>
                </div>
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Intelligence</h4>
                  <p className="text-xs text-slate-600">Specialized logic for Finance, Travel, SaaS, and High-End Retail.</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 rounded-[24px] p-8 text-white flex flex-col h-full shadow-2xl">
              <h3 className="text-xs font-black uppercase tracking-widest text-indigo-400 mb-6 flex items-center gap-2">
                <Workflow className="w-4 h-4" /> Core Framework
              </h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="shrink-0 w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                    <Network className="w-4 h-4 text-indigo-300" />
                  </div>
                  <div>
                    <h5 className="text-[11px] font-black uppercase tracking-wider mb-1">Agent Orchestrator</h5>
                    <p className="text-[10px] text-slate-400 leading-snug">Dynamic handoff protocol based on intent confidence scores.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="shrink-0 w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                    <Zap className="w-4 h-4 text-amber-300" />
                  </div>
                  <div>
                    <h5 className="text-[11px] font-black uppercase tracking-wider mb-1">Decision Engine</h5>
                    <p className="text-[10px] text-slate-400 leading-snug">Real-time valuation and offer personalization logic.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="shrink-0 w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4 text-emerald-300" />
                  </div>
                  <div>
                    <h5 className="text-[11px] font-black uppercase tracking-wider mb-1">Trust Layer</h5>
                    <p className="text-[10px] text-slate-400 leading-snug">Embedded KYC, fraud detection, and compliance monitoring.</p>
                  </div>
                </div>
              </div>

              <div className="mt-auto pt-10">
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <p className="text-[10px] font-mono text-indigo-300">SYSTEM_STATUS: ACTIVE</p>
                  <p className="text-[10px] font-mono text-slate-500">NODES: 24_SPECIALIZED</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-indigo-50/50 rounded-3xl p-8 border border-indigo-100 mb-8">
            <h4 className="text-sm font-black text-slate-900 mb-6 flex items-center gap-3">
              <Cpu className="w-5 h-5 text-indigo-600" />
              Industry Orchestration Patterns
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'High-End Retail', desc: 'Omnichannel & Stylist Memory' },
                { label: 'Enterprise SaaS', desc: 'Buying Committee & ROI' },
                { label: 'Finance', desc: 'KYC, Risk & Wealth Advisory' },
                { label: 'Travel', desc: 'Itinerary Design & Disruption' }
              ].map((item, i) => (
                <div key={i} className="bg-white p-4 rounded-2xl border border-indigo-100 shadow-sm">
                  <p className="text-[11px] font-black text-slate-900 uppercase tracking-tight mb-1">{item.label}</p>
                  <p className="text-[9px] text-slate-500 font-medium leading-tight">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center pt-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <p className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em]">Platform v1.0.4 • Runtime Ready</p>
            </div>
            <button 
              onClick={onClose}
              className="brand-gradient text-white px-10 py-4 rounded-2xl font-black text-xs hover:scale-105 active:scale-95 transition-all shadow-xl shadow-indigo-200 uppercase tracking-widest"
            >
              Enter Orchestration Lab
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutModal;
