
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { AgentType, SharedContext, Message, ProbeEvent, IndustryPattern } from './types';
import { processMessage } from './services/geminiService';
import ContextPanel from './components/ContextPanel';
import AgentOrchestrator from './components/AgentOrchestrator';
import ChatInterface from './components/ChatInterface';
import AboutModal from './components/AboutModal';
import ProbeConsole from './components/ProbeConsole';
import AgentStateViewer from './components/AgentStateViewer';
import PlatformHelpBot from './components/PlatformHelpBot';
import Sidebar from './components/Sidebar';
import ProbeList from './components/ProbeList';
import { INDUSTRY_AGENT_CHAINS } from './constants';
import { Info, Github, Cpu, Activity, Search, FlaskConical, History, ChevronLeft, ChevronRight } from 'lucide-react';

const INITIAL_CONTEXT: SharedContext = {
  identity: { id: `user_${Math.random().toString(36).substr(2, 9)}` },
  intent: { needs: [], preferences: [], shortlist: [] },
  readiness: { score: 0, objections: [] },
  commerceState: { status: 'browsing' }
};

type LabTab = 'context' | 'state' | 'logs';

const App: React.FC = () => {
  const [context, setContext] = useState<SharedContext>(INITIAL_CONTEXT);
  const [selectedPattern, setSelectedPattern] = useState<IndustryPattern>(IndustryPattern.SIMPLE);
  const [isProbeListCollapsed, setIsProbeListCollapsed] = useState(false);
  
  const currentChain = useMemo(() => INDUSTRY_AGENT_CHAINS[selectedPattern], [selectedPattern]);
  const [activeAgent, setActiveAgent] = useState<AgentType>(currentChain[0].type);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: "Welcome to the MACOP Orchestration Lab. I am the Discovery Agent, connected to your real-time Context Graph. I can assist with personalized commerce journeys across Retail, SaaS, Finance, and Travel. Select a pattern in the sidebar or run a prompt probe to see how my fellow agents and I collaborate seamlessly.",
      agentType: AgentType.DISCOVERY,
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [handoffHistory, setHandoffHistory] = useState<{ from: AgentType; to: AgentType; reason: string; timestamp: Date }[]>([]);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [activeLabTab, setActiveLabTab] = useState<LabTab>('context');
  const [probes, setProbes] = useState<ProbeEvent[]>([]);

  const handleOrchestration = useCallback((newContext: SharedContext, prevAgent: AgentType) => {
    let nextAgent = prevAgent;
    let reason = '';

    if (selectedPattern === IndustryPattern.FINANCE) {
      if (prevAgent === AgentType.FIN_INTENT && newContext.intent.needs.length > 0) {
        nextAgent = AgentType.FIN_PROFILING;
        reason = "Intent detected.";
      } else if (prevAgent === AgentType.FIN_PROFILING && newContext.readiness.financeProfile?.debtCapacity) {
        nextAgent = AgentType.FIN_RISK_COMPLIANCE;
        reason = "Profiling complete.";
      } else if (prevAgent === AgentType.FIN_RISK_COMPLIANCE && newContext.readiness.financeProfile?.kycStatus === 'verified') {
        nextAgent = AgentType.FIN_OFFER;
        reason = "Compliance cleared.";
      } else if (prevAgent === AgentType.FIN_OFFER && newContext.readiness.score >= 90) {
        nextAgent = AgentType.FIN_EXECUTION;
        reason = "Offer accepted.";
      } else if (prevAgent === AgentType.FIN_EXECUTION && newContext.commerceState.status === 'purchased') {
        nextAgent = AgentType.FIN_ADVISORY;
        reason = "Deal closed.";
      }
    } else if (selectedPattern === IndustryPattern.TRAVEL) {
      const hasTheme = !!newContext.readiness.travelProfile?.theme;
      const hasRoute = (newContext.readiness.travelProfile?.routing?.length || 0) > 0;
      const isLocked = !!newContext.readiness.travelProfile?.availabilityLocked;
      const isPurchased = newContext.commerceState.status === 'purchased';
      const isDisrupted = newContext.commerceState.status === 'disrupted';

      if (prevAgent === AgentType.TRAV_INSPIRATION && hasTheme) {
        nextAgent = AgentType.TRAV_DESIGN;
        reason = "Theme identified.";
      } else if (prevAgent === AgentType.TRAV_DESIGN && hasRoute) {
        nextAgent = AgentType.TRAV_OPTIMIZER;
        reason = "Route designed.";
      } else if (prevAgent === AgentType.TRAV_OPTIMIZER && isLocked) {
        nextAgent = AgentType.TRAV_AVAILABILITY;
        reason = "Locking availability.";
      } else if (prevAgent === AgentType.TRAV_AVAILABILITY && isLocked) {
        nextAgent = AgentType.TRAV_TRANSACTION;
        reason = "Ready to book.";
      } else if (prevAgent === AgentType.TRAV_TRANSACTION && isPurchased) {
        nextAgent = AgentType.TRAV_MONITORING;
        reason = "Trip confirmed.";
      } else if (prevAgent === AgentType.TRAV_MONITORING && isDisrupted) {
        nextAgent = AgentType.TRAV_DISRUPTION;
        reason = "Disruption detected.";
      } else if (prevAgent === AgentType.TRAV_DISRUPTION) {
        nextAgent = AgentType.TRAV_DESIGN;
        reason = "Disruption triage complete.";
      }
    } else if (selectedPattern === IndustryPattern.SAAS) {
      const saas = newContext.readiness.saasProfile;
      const hasNeeds = newContext.intent.needs.length > 0;
      const committeeMapped = (saas?.stakeholders?.length || 0) >= 3;
      const complianceApproved = saas?.complianceStatus === 'approved';
      const internalsAgreed = saas?.negotiationStatus === 'commercials_agreed';
      const isPurchased = newContext.commerceState.status === 'purchased';
      const championLost = saas?.championStatus === 'lost';

      if (prevAgent === AgentType.SAAS_DEMAND && hasNeeds) {
        nextAgent = AgentType.SAAS_STAKEHOLDERS;
        reason = "Enterprise demand identified.";
      } else if (prevAgent === AgentType.SAAS_STAKEHOLDERS && committeeMapped) {
        nextAgent = AgentType.SAAS_VALIDATION;
        reason = "Committee mapped.";
      } else if (prevAgent === AgentType.SAAS_VALIDATION && newContext.readiness.score >= 40) {
        nextAgent = AgentType.SAAS_SECURITY;
        reason = "ROI established.";
      } else if (prevAgent === AgentType.SAAS_SECURITY && complianceApproved) {
        nextAgent = AgentType.SAAS_NEGOTIATION;
        reason = "Compliance cleared.";
      } else if (prevAgent === AgentType.SAAS_NEGOTIATION) {
        if (newContext.readiness.objections.some(o => o.toLowerCase().includes('procurement'))) {
           nextAgent = AgentType.SAAS_SECURITY;
           reason = "Procurement loop triggered.";
        } else if (internalsAgreed) {
           nextAgent = AgentType.SAAS_EXECUTION;
           reason = "Terms agreed.";
        }
      } else if (prevAgent === AgentType.SAAS_EXECUTION && isPurchased) {
        nextAgent = AgentType.SAAS_EXPANSION;
        reason = "Contract signed.";
      } else if (prevAgent === AgentType.SAAS_EXPANSION && championLost) {
        nextAgent = AgentType.SAAS_STAKEHOLDERS;
        reason = "Champion loss detected.";
      }
    } else if (selectedPattern === IndustryPattern.AUTOMOTIVE) {
      const auto = newContext.readiness.automotiveProfile;
      const hasNeeds = newContext.intent.needs.length > 0;
      const lifestyleScored = (auto?.lifestyleScore || 0) > 0;
      const tradeInValued = (auto?.tradeInEstimate || 0) > 0;
      const financeApproved = auto?.financeStatus === 'approved';
      const financeRejected = auto?.financeStatus === 'rejected';
      const inventoryMatched = !!auto?.inventoryMatch;
      const isPurchased = newContext.commerceState.status === 'purchased';

      if (prevAgent === AgentType.AUTO_VEHICLE_DISCOVERY && hasNeeds) {
        nextAgent = AgentType.AUTO_LIFESTYLE_FIT;
        reason = "Vehicle needs identified.";
      } else if (prevAgent === AgentType.AUTO_LIFESTYLE_FIT && lifestyleScored) {
        nextAgent = AgentType.AUTO_TRADE_IN;
        reason = "Lifestyle fit scored.";
      } else if (prevAgent === AgentType.AUTO_TRADE_IN && tradeInValued) {
        nextAgent = AgentType.AUTO_FINANCE;
        reason = "Trade-in valued.";
      } else if (prevAgent === AgentType.AUTO_FINANCE) {
        if (financeRejected) {
          nextAgent = AgentType.AUTO_LIFESTYLE_FIT;
          reason = "Financing rejected.";
        } else if (financeApproved) {
          nextAgent = AgentType.AUTO_INVENTORY;
          reason = "Financing approved.";
        }
      } else if (prevAgent === AgentType.AUTO_INVENTORY && inventoryMatched) {
        nextAgent = AgentType.AUTO_TRANSACTION;
        reason = "Inventory matched.";
      } else if (prevAgent === AgentType.AUTO_TRANSACTION && isPurchased) {
        nextAgent = AgentType.AUTO_OWNERSHIP;
        reason = "Vehicle delivered.";
      }
    } else if (selectedPattern === IndustryPattern.RETAIL) {
      const retail = newContext.readiness.retailProfile;
      const hasNeeds = newContext.intent.needs.length > 0;
      const hasStylingVibe = (retail?.styleEvolution?.length || 0) > 0;
      const inventoryChecked = !!retail?.channelPreference;
      const isOfferAccepted = newContext.readiness.score >= 90;
      const isPurchased = newContext.commerceState.status === 'purchased';
      const eventPredicted = !!retail?.upcomingEvent;

      if (prevAgent === AgentType.RETAIL_INSPIRATION && hasNeeds) {
        nextAgent = AgentType.RETAIL_STYLIST;
        reason = "Initial inspiration identified.";
      } else if (prevAgent === AgentType.RETAIL_STYLIST && hasStylingVibe) {
        nextAgent = AgentType.RETAIL_INVENTORY;
        reason = "Style direction finalized.";
      } else if (prevAgent === AgentType.RETAIL_INVENTORY && inventoryChecked) {
        nextAgent = AgentType.RETAIL_OFFER;
        reason = "Allocation verified.";
      } else if (prevAgent === AgentType.RETAIL_OFFER && isOfferAccepted) {
        nextAgent = AgentType.RETAIL_TRANSACTION;
        reason = "Bespoke offer accepted.";
      } else if (prevAgent === AgentType.RETAIL_TRANSACTION && isPurchased) {
        nextAgent = AgentType.RETAIL_CLIENTELING;
        reason = "Purchase verified.";
      } else if (prevAgent === AgentType.RETAIL_CLIENTELING && eventPredicted) {
        nextAgent = AgentType.RETAIL_INSPIRATION;
        reason = "Upcoming occasion detected.";
      }
    } else {
      const hasShortlist = newContext.intent.shortlist.length > 0;
      const isReady = newContext.readiness.score >= 80;
      const isPurchased = newContext.commerceState.status === 'purchased';

      if (prevAgent === AgentType.DISCOVERY && hasShortlist) {
        nextAgent = AgentType.VALIDATION;
        reason = 'Candidate products found.';
      } else if (prevAgent === AgentType.VALIDATION && isReady) {
        nextAgent = AgentType.TRANSACTION;
        reason = 'Readiness high.';
      } else if (prevAgent === AgentType.TRANSACTION && isPurchased) {
        nextAgent = AgentType.SUPPORT;
        reason = 'Transaction verified.';
      }
    }

    if (nextAgent !== prevAgent) {
      setActiveAgent(nextAgent);
      setHandoffHistory(prev => [...prev, { from: prevAgent, to: nextAgent, reason, timestamp: new Date() }]);
    }
  }, [selectedPattern]);

  const handleManualAgentSwitch = (targetAgent: AgentType) => {
    if (targetAgent === activeAgent) return;
    setHandoffHistory(prev => [...prev, { from: activeAgent, to: targetAgent, reason: 'Manual Probe Override', timestamp: new Date() }]);
    setActiveAgent(targetAgent);
    setProbes(prev => [{ id: Date.now().toString(), type: 'agent_force', description: `Manual override: ${activeAgent} -> ${targetAgent}`, timestamp: new Date() }, ...prev]);
  };

  const handleSendMessage = async (content: string) => {
    if (isLoading) return;
    setIsLoading(true);
    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', content, agentType: activeAgent, timestamp: new Date() }]);

    try {
      const result = await processMessage(content, activeAgent, context);
      const updatedContext = {
        ...context,
        intent: { ...context.intent, ...(result.updatedContextPatch.intent || {}) },
        readiness: { ...context.readiness, ...(result.updatedContextPatch.readiness || {}) },
        commerceState: { ...context.commerceState, ...(result.updatedContextPatch.commerceState || {}) }
      };
      setContext(updatedContext);
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'assistant', content: result.message, agentType: activeAgent, timestamp: new Date(), metadata: { confidence: result.confidence, reasoning: result.reasoning } }]);
      handleOrchestration(updatedContext, activeAgent);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePatternChange = (pattern: IndustryPattern) => {
    setSelectedPattern(pattern);
    const newChain = INDUSTRY_AGENT_CHAINS[pattern];
    setActiveAgent(newChain[0].type);
    setContext(INITIAL_CONTEXT);
    setMessages([{ id: 'welcome-' + pattern, role: 'assistant', content: `Orchestration pattern switched to ${pattern.replace('_', ' ')}. Initializing specialized ${newChain[0].label} agent.`, agentType: newChain[0].type, timestamp: new Date() }]);
  };

  const handleInjectProbe = (event: ProbeEvent) => {
    setProbes(prev => [event, ...prev]);
  };

  const lastAssistantMessage = useMemo(() => {
    return [...messages].reverse().find(m => m.role === 'assistant');
  }, [messages]);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-white selection:bg-indigo-100 selection:text-indigo-900">
      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
      <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-8 shrink-0 z-50">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 brand-gradient rounded-lg flex items-center justify-center shadow-lg">
            <FlaskConical className="w-4 h-4 text-white" />
          </div>
          <h1 className="text-base font-black tracking-tight text-slate-900">Multi-Agent <span className="text-slate-300 font-medium">Commerce Orchestration</span></h1>
        </div>
        <div className="flex items-center gap-6">
          <div className="px-3 py-1 bg-slate-900 rounded-md shadow-sm"><span className="text-[10px] font-black text-white uppercase tracking-wider flex items-center gap-2"><Activity className="w-3 h-3 text-indigo-400" /> Orchestration Runtime</span></div>
          <button onClick={() => setIsAboutOpen(true)} className="p-2 text-slate-400 hover:text-indigo-600 transition-all"><Info className="w-5 h-5" /></button>
        </div>
      </header>
      <main className="flex-1 flex overflow-hidden">
        <Sidebar selectedPattern={selectedPattern} onSelectPattern={handlePatternChange} />
        
        <div className={`relative h-full transition-all duration-300 ease-in-out border-r border-slate-100 ${isProbeListCollapsed ? 'w-12' : 'w-[320px]'}`}>
          <div className="h-full overflow-hidden">
             <ProbeList 
               onRunPrompt={handleSendMessage} 
               selectedPattern={selectedPattern} 
               isCollapsed={isProbeListCollapsed}
             />
          </div>
          <button 
            onClick={() => setIsProbeListCollapsed(!isProbeListCollapsed)}
            className="absolute top-1/2 -right-3 -translate-y-1/2 w-6 h-6 bg-white border border-slate-200 rounded-full flex items-center justify-center shadow-sm z-10 hover:bg-slate-50 transition-colors"
          >
            {isProbeListCollapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
          </button>
        </div>

        <div className="flex-1 flex flex-col min-w-0 bg-white border-r border-slate-100 relative">
          <AgentOrchestrator currentAgent={activeAgent} agents={currentChain} history={handoffHistory} onAgentClick={handleManualAgentSwitch} />
          <div className="flex-1 overflow-hidden">
            <ChatInterface messages={messages} onSendMessage={handleSendMessage} isLoading={isLoading} activeAgent={activeAgent} />
          </div>
        </div>
        <aside className="w-[420px] hidden xl:flex flex-col bg-slate-50">
          <div className="flex border-b border-slate-200 bg-white">
            {['context', 'state', 'logs'].map((tab) => (
              <button key={tab} onClick={() => setActiveLabTab(tab as LabTab)} className={`flex-1 py-3 text-[9px] font-black uppercase tracking-widest transition-all border-b-2 ${activeLabTab === tab ? 'border-indigo-600 text-indigo-600 bg-indigo-50/30' : 'border-transparent text-slate-400'}`}>
                {tab}
              </button>
            ))}
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar bg-white">
            {activeLabTab === 'context' && <ContextPanel context={context} />}
            {activeLabTab === 'state' && <AgentStateViewer activeAgent={activeAgent} lastMessage={lastAssistantMessage} />}
            {activeLabTab === 'logs' && <div className="p-8 space-y-6"><ProbeConsole activeAgent={activeAgent} onInjectProbe={handleInjectProbe} onForceAgent={handleManualAgentSwitch} availableAgents={currentChain.map(c => c.type)} /></div>}
          </div>
        </aside>
      </main>
      <PlatformHelpBot onRunPrompt={handleSendMessage} />
    </div>
  );
};

export default App;
