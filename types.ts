export enum AgentType {
  // Standard
  DISCOVERY = 'DISCOVERY',
  VALIDATION = 'VALIDATION',
  TRANSACTION = 'TRANSACTION',
  SUPPORT = 'SUPPORT',
  
  // Finance Pipeline
  FIN_INTENT = 'FIN_INTENT',
  FIN_PROFILING = 'FIN_PROFILING',
  FIN_RISK_COMPLIANCE = 'FIN_RISK_COMPLIANCE',
  FIN_OFFER = 'FIN_OFFER',
  FIN_EXECUTION = 'FIN_EXECUTION',
  FIN_ADVISORY = 'FIN_ADVISORY',

  // Travel & Hospitality Pipeline
  TRAV_INSPIRATION = 'TRAV_INSPIRATION',
  TRAV_DESIGN = 'TRAV_DESIGN',
  TRAV_OPTIMIZER = 'TRAV_OPTIMIZER',
  TRAV_AVAILABILITY = 'TRAV_AVAILABILITY',
  TRAV_TRANSACTION = 'TRAV_TRANSACTION',
  TRAV_MONITORING = 'TRAV_MONITORING',
  TRAV_DISRUPTION = 'TRAV_DISRUPTION',

  // B2B SaaS Enterprise Pipeline
  SAAS_DEMAND = 'SAAS_DEMAND',
  SAAS_STAKEHOLDERS = 'SAAS_STAKEHOLDERS',
  SAAS_VALIDATION = 'SAAS_VALIDATION',
  SAAS_SECURITY = 'SAAS_SECURITY',
  SAAS_NEGOTIATION = 'SAAS_NEGOTIATION',
  SAAS_EXECUTION = 'SAAS_EXECUTION',
  SAAS_EXPANSION = 'SAAS_EXPANSION',

  // Automotive Pipeline
  AUTO_VEHICLE_DISCOVERY = 'AUTO_VEHICLE_DISCOVERY',
  AUTO_LIFESTYLE_FIT = 'AUTO_LIFESTYLE_FIT',
  AUTO_TRADE_IN = 'AUTO_TRADE_IN',
  AUTO_FINANCE = 'AUTO_FINANCE',
  AUTO_INVENTORY = 'AUTO_INVENTORY',
  AUTO_TRANSACTION = 'AUTO_TRANSACTION',
  AUTO_OWNERSHIP = 'AUTO_OWNERSHIP',

  // Retail High-End Pipeline
  RETAIL_INSPIRATION = 'RETAIL_INSPIRATION',
  RETAIL_STYLIST = 'RETAIL_STYLIST',
  RETAIL_INVENTORY = 'RETAIL_INVENTORY',
  RETAIL_OFFER = 'RETAIL_OFFER',
  RETAIL_TRANSACTION = 'RETAIL_TRANSACTION',
  RETAIL_CLIENTELING = 'RETAIL_CLIENTELING'
}

export enum IndustryPattern {
  SIMPLE = 'SIMPLE',
  FINANCE = 'FINANCE',
  HEALTHCARE = 'HEALTHCARE',
  TRAVEL = 'TRAVEL',
  SAAS = 'SAAS',
  AUTOMOTIVE = 'AUTOMOTIVE',
  RETAIL = 'RETAIL'
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  features: string[];
}

export interface SharedContext {
  identity: {
    id: string;
    name?: string;
    email?: string;
  };
  intent: {
    needs: string[];
    preferences: string[];
    shortlist: string[];
  };
  readiness: {
    score: number;
    objections: string[];
    selectedProductId?: string;
    // Expanded for Finance
    financeProfile?: {
      incomeModel?: string;
      debtCapacity?: number;
      riskScore?: number;
      kycStatus?: 'pending' | 'verified' | 'failed';
    };
    // Expanded for Travel
    travelProfile?: {
      theme?: string;
      budgetEnvelope?: string;
      flexibilityTolerance?: string;
      routing?: string[];
      availabilityLocked?: boolean;
      monitoringActive?: boolean;
    };
    // Expanded for B2B SaaS
    saasProfile?: {
      stakeholders?: { role: string; status: string }[];
      complianceStatus?: 'pending' | 'approved' | 'rejected';
      roiModeling?: { paybackMonths: number; businessCaseApproved: boolean };
      negotiationStatus?: 'in_progress' | 'commercials_agreed' | 'legal_redlines';
      championStatus?: 'active' | 'lost';
    };
    // Expanded for Automotive
    automotiveProfile?: {
      lifestyleScore?: number;
      familyNeeds?: string;
      usagePattern?: string;
      tradeInEstimate?: number;
      financeStatus?: 'pending' | 'approved' | 'rejected';
      inventoryMatch?: string;
      serviceScheduled?: boolean;
    };
    // Expanded for Retail
    retailProfile?: {
      styleEvolution?: string[];
      occasionTriggers?: string[];
      giftNetworkGraph?: string[];
      channelPreference?: 'in-store' | 'digital' | 'concierge';
      upcomingEvent?: string;
    };
  };
  commerceState: {
    status: 'browsing' | 'validating' | 'checking_out' | 'purchased' | 'active_agreement' | 'monitoring' | 'disrupted' | 'negotiating' | 'onboarding' | 'owning' | 'styling';
    orderId?: string;
    transactionTimestamp?: string;
  };
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  agentType: AgentType;
  timestamp: Date;
  metadata?: {
    confidence: number;
    reasoning?: string;
    suggestedProducts?: string[];
  };
}

export interface SuggestedProbe {
  label: string;
  prompt: string;
  agent: AgentType;
}

export interface AgentStatus {
  active: boolean;
  handoffReady: boolean;
  handoffReason?: string;
}

export interface ProbeEvent {
  id: string;
  type: 'prompt_injection' | 'context_mutation' | 'agent_force' | 'failure_simulation' | 'platform_help';
  description: string;
  timestamp: Date;
}