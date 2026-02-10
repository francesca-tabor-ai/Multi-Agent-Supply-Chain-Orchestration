import React from 'react';
import { SharedContext, Product } from '../types';
// Added Retail related icons
import { User, Target, BarChart3, ShoppingCart, AlertCircle, Fingerprint, Activity, Layers, Compass, Plane, MapPin, Briefcase, Users, ShieldCheck, TrendingUp, Car, Gauge, Banknote, Map, RotateCcw, Shirt, Gift, Calendar, Heart } from 'lucide-react';
import { MOCK_PRODUCTS } from '../constants';

interface ContextPanelProps {
  context: SharedContext;
}

const ContextPanel: React.FC<ContextPanelProps> = ({ context }) => {
  const travel = context.readiness.travelProfile;
  const saas = context.readiness.saasProfile;
  const auto = context.readiness.automotiveProfile;
  const retail = context.readiness.retailProfile;

  return (
    <div className="bg-white h-full border-l border-slate-100 p-8 overflow-y-auto custom-scrollbar">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-sm font-black text-slate-900 uppercase tracking-[0.2em] flex items-center gap-3">
          <Layers className="w-4 h-4 brand-gradient-text" />
          Context Graph
        </h2>
        <div className="px-2 py-0.5 bg-indigo-50 rounded text-[9px] font-black text-indigo-600 uppercase tracking-tighter">v1.0</div>
      </div>

      <div className="space-y-10">
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Fingerprint className="w-4 h-4 text-slate-400" />
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Identity Layer</h3>
          </div>
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
            <p className="text-sm font-bold text-slate-900">User Session</p>
            <p className="text-[11px] font-mono text-slate-400 mt-1 truncate">UID: {context.identity.id}</p>
          </div>
        </section>

        {/* Retail Layer - NEW */}
        {retail && (
          <section className="animate-in fade-in slide-in-from-top-4 duration-500">
             <div className="flex items-center gap-2 mb-4">
              <Shirt className="w-4 h-4 text-pink-600" />
              <h3 className="text-[10px] font-black text-pink-600 uppercase tracking-widest">Clienteling Layer</h3>
            </div>
            <div className="bg-pink-50/50 border border-pink-100 rounded-2xl p-4 space-y-4">
              {retail.styleEvolution && retail.styleEvolution.length > 0 && (
                <div>
                  <p className="text-[9px] font-black text-pink-400 uppercase tracking-widest mb-2">Style Evolution</p>
                  <div className="flex flex-wrap gap-1.5">
                    {retail.styleEvolution.map((tag, i) => (
                      <div key={i} className="bg-white px-2 py-1 rounded-lg border border-pink-100 text-[9px] font-bold text-pink-600 uppercase">{tag}</div>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-2">
                <div className="bg-white p-2 rounded-xl border border-pink-100">
                   <p className="text-[8px] font-black text-slate-400 uppercase mb-1">Occasion</p>
                   <div className="flex items-center gap-1.5">
                     <Calendar className="w-3 h-3 text-pink-500" />
                     <span className="text-[10px] font-black truncate">{retail.upcomingEvent || 'None'}</span>
                   </div>
                </div>
                <div className="bg-white p-2 rounded-xl border border-pink-100">
                   <p className="text-[8px] font-black text-slate-400 uppercase mb-1">Channel</p>
                   <div className="flex items-center gap-1.5">
                     <MapPin className="w-3 h-3 text-pink-500" />
                     <span className="text-[10px] font-black uppercase">{retail.channelPreference || 'Omni'}</span>
                   </div>
                </div>
              </div>

              {retail.giftNetworkGraph && retail.giftNetworkGraph.length > 0 && (
                <div>
                  <p className="text-[9px] font-black text-pink-400 uppercase tracking-widest mb-1 text-center">Gift Network graph Active</p>
                  <div className="flex justify-center">
                     <Heart className="w-4 h-4 text-pink-300 animate-pulse" />
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Automotive Layer */}
        {auto && (
          <section className="animate-in fade-in slide-in-from-top-4 duration-500">
             <div className="flex items-center gap-2 mb-4">
              <Car className="w-4 h-4 text-orange-600" />
              <h3 className="text-[10px] font-black text-orange-600 uppercase tracking-widest">Automotive Layer</h3>
            </div>
            <div className="bg-orange-50/50 border border-orange-100 rounded-2xl p-4 space-y-4">
              {auto.lifestyleScore !== undefined && (
                <div>
                  <p className="text-[9px] font-black text-orange-400 uppercase tracking-widest mb-1">Lifestyle Fit Score</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-orange-900">{auto.lifestyleScore}%</span>
                    <div className="flex-1 bg-orange-200 h-1 rounded-full overflow-hidden">
                      <div className="bg-orange-600 h-full" style={{ width: `${auto.lifestyleScore}%` }} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* SaaS Layer */}
        {saas && (
          <section className="animate-in fade-in slide-in-from-top-4 duration-500">
             <div className="flex items-center gap-2 mb-4">
              <Briefcase className="w-4 h-4 text-indigo-600" />
              <h3 className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Enterprise Layer</h3>
            </div>
            <div className="bg-indigo-50/50 border border-indigo-100 rounded-2xl p-4 space-y-4">
              {saas.stakeholders && saas.stakeholders.length > 0 && (
                <div>
                  <p className="text-[9px] font-black text-indigo-400 uppercase tracking-widest mb-2">Buying Committee</p>
                  <div className="space-y-1.5">
                    {saas.stakeholders.map((s, i) => (
                      <div key={i} className="flex items-center justify-between bg-white px-2 py-1.5 rounded-lg border border-indigo-100">
                        <span className="text-[10px] font-bold text-slate-700">{s.role}</span>
                        <span className="text-[8px] font-black uppercase text-indigo-500">{s.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        <section>
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-4 h-4 text-slate-400" />
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Intent Signals</h3>
          </div>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {context.intent.needs.length > 0 ? context.intent.needs.map((need, i) => (
                <span key={i} className="px-3 py-1 bg-white border border-slate-200 text-slate-600 text-[10px] font-bold rounded-full shadow-sm">{need}</span>
              )) : <p className="text-[11px] text-slate-400 italic">Listening for user signals...</p>}
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-4 h-4 text-slate-400" />
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Journey Readiness</h3>
          </div>
          <div className="bg-slate-900 rounded-2xl p-5 shadow-xl">
            <div className="flex justify-between items-baseline mb-3">
              <span className="text-2xl font-black text-white">{context.readiness.score}%</span>
              <span className="text-[9px] text-indigo-400 font-black uppercase tracking-widest">Calculated Readiness</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div className="brand-gradient h-full transition-all duration-1000 ease-out" style={{ width: `${context.readiness.score}%` }} />
            </div>
            {context.readiness.objections.length > 0 && (
              <div className="mt-4 pt-4 border-t border-slate-800 space-y-2">
                {context.readiness.objections.map((obj, i) => (
                  <div key={i} className="flex items-start gap-2 text-rose-400">
                    <AlertCircle className="w-3 h-3 mt-0.5" />
                    <span className="text-[10px] font-bold leading-tight uppercase tracking-tighter">{obj}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-4">
            <ShoppingCart className="w-4 h-4 text-slate-400" />
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Commerce State</h3>
          </div>
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-bold text-slate-400">Status</span>
              <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-lg ${context.commerceState.status === 'purchased' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-indigo-50 text-indigo-600 border border-indigo-100'}`}>
                {context.commerceState.status.replace('_', ' ')}
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ContextPanel;