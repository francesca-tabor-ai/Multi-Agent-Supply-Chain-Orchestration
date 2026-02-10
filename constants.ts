import { Product, AgentType, SuggestedProbe, IndustryPattern } from './types';
import { 
  Shield, HeartPulse, Plane, Briefcase, Car, ShoppingBag, Layout, 
  Search, ShieldCheck, CreditCard, HeartHandshake, FileText, 
  BarChart, Wallet, Scale, Map, Compass, PackageCheck, 
  Lock, Activity, AlertOctagon, Umbrella, Users, ClipboardCheck, 
  Gavel, TrendingUp, UserMinus, RotateCcw, Truck, Settings, Banknote, MapPin,
  Sparkles, Shirt, Warehouse, Gift, Calendar, Stethoscope, Microscope, ClipboardList,
  Coffee, ShoppingCart, UserCheck, Zap
} from 'lucide-react';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'r1',
    name: 'Atelier Midnight Suit',
    description: 'Custom-tailored midnight blue wool suit from the 2025 Heritage Collection.',
    price: 3200,
    category: 'Retail',
    image: 'https://images.unsplash.com/photo-1594932224036-9c20427770bc?w=400&h=300&fit=crop',
    features: ['Bespoke fit', 'Italian wool', 'Hand-stitched', 'Limited edition']
  },
  {
    id: 'r2',
    name: 'Elysian Silk Gown',
    description: 'Floor-length emerald silk gown with hand-applied crystals.',
    price: 4500,
    category: 'Retail',
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=400&h=300&fit=crop',
    features: ['Pure silk', 'Crystal embroidery', 'Custom sizing', 'Red carpet ready']
  },
  {
    id: 'a1',
    name: 'VoltX SUV 2025',
    description: 'All-electric premium SUV with 400mi range and advanced autopilot.',
    price: 65000,
    category: 'Automotive',
    image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=400&h=300&fit=crop',
    features: ['Long range', 'Dual motor', 'Family-size', 'AI Navigation']
  },
  {
    id: 's1',
    name: 'CloudOps Enterprise Suite',
    description: 'Complete infrastructure automation and observability for scale-ups.',
    price: 50000,
    category: 'Software',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop',
    features: ['Multi-region support', 'SOC2 Compliant', '24/7 TAM', 'Custom integrations']
  },
  {
    id: 't2',
    name: 'Amalfi Coast Bundle',
    description: 'Premium flight + boutique hotel + private villa car service in Positano.',
    price: 5200,
    category: 'Travel',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=400&h=300&fit=crop',
    features: ['Flexible dates', 'Ocean views', 'Carbon offset included', 'Airport lounge access']
  }
];

export const INDUSTRY_AGENT_CHAINS: Record<IndustryPattern, {type: AgentType, icon: any, label: string}[]> = {
  [IndustryPattern.SIMPLE]: [
    { type: AgentType.DISCOVERY, icon: Search, label: 'Discovery' },
    { type: AgentType.VALIDATION, icon: ShieldCheck, label: 'Validation' },
    { type: AgentType.TRANSACTION, icon: CreditCard, label: 'Transaction' },
    { type: AgentType.SUPPORT, icon: HeartHandshake, label: 'Support' },
  ],
  [IndustryPattern.FINANCE]: [
    { type: AgentType.FIN_INTENT, icon: Search, label: 'Intent' },
    { type: AgentType.FIN_PROFILING, icon: FileText, label: 'Profiling' },
    { type: AgentType.FIN_RISK_COMPLIANCE, icon: Shield, label: 'Risk/KYC' },
    { type: AgentType.FIN_OFFER, icon: Wallet, label: 'Offering' },
    { type: AgentType.FIN_EXECUTION, icon: CreditCard, label: 'Execution' },
    { type: AgentType.FIN_ADVISORY, icon: Scale, label: 'Advisory' },
  ],
  [IndustryPattern.TRAVEL]: [
    { type: AgentType.TRAV_INSPIRATION, icon: Compass, label: 'Inspiration' },
    { type: AgentType.TRAV_DESIGN, icon: Map, label: 'Design' },
    { type: AgentType.TRAV_OPTIMIZER, icon: PackageCheck, label: 'Optimize' },
    { type: AgentType.TRAV_AVAILABILITY, icon: Lock, label: 'Lock' },
    { type: AgentType.TRAV_TRANSACTION, icon: CreditCard, label: 'Transaction' },
    { type: AgentType.TRAV_MONITORING, icon: Activity, label: 'Monitoring' },
    { type: AgentType.TRAV_DISRUPTION, icon: AlertOctagon, label: 'Disruption' },
  ],
  [IndustryPattern.SAAS]: [
    { type: AgentType.SAAS_DEMAND, icon: Search, label: 'Demand' },
    { type: AgentType.SAAS_STAKEHOLDERS, icon: Users, label: 'Committee' },
    { type: AgentType.SAAS_VALIDATION, icon: TrendingUp, label: 'ROI' },
    { type: AgentType.SAAS_SECURITY, icon: Shield, label: 'Compliance' },
    { type: AgentType.SAAS_NEGOTIATION, icon: Gavel, label: 'Commercial' },
    { type: AgentType.SAAS_EXECUTION, icon: ClipboardCheck, label: 'Contract' },
    { type: AgentType.SAAS_EXPANSION, icon: HeartHandshake, label: 'Success' },
  ],
  [IndustryPattern.AUTOMOTIVE]: [
    { type: AgentType.AUTO_VEHICLE_DISCOVERY, icon: Search, label: 'Discovery' },
    { type: AgentType.AUTO_LIFESTYLE_FIT, icon: UserMinus, label: 'Lifestyle' },
    { type: AgentType.AUTO_TRADE_IN, icon: RotateCcw, label: 'Trade-in' },
    { type: AgentType.AUTO_FINANCE, icon: Banknote, label: 'Finance' },
    { type: AgentType.AUTO_INVENTORY, icon: Truck, label: 'Inventory' },
    { type: AgentType.AUTO_TRANSACTION, icon: CreditCard, label: 'Purchase' },
    { type: AgentType.AUTO_OWNERSHIP, icon: Settings, label: 'Lifecycle' },
  ],
  [IndustryPattern.RETAIL]: [
    { type: AgentType.RETAIL_INSPIRATION, icon: Search, label: 'Discovery' },
    { type: AgentType.RETAIL_STYLIST, icon: Shirt, label: 'Stylist' },
    { type: AgentType.RETAIL_INVENTORY, icon: Warehouse, label: 'Allocation' },
    { type: AgentType.RETAIL_OFFER, icon: Gift, label: 'Personalized' },
    { type: AgentType.RETAIL_TRANSACTION, icon: CreditCard, label: 'Purchase' },
    { type: AgentType.RETAIL_CLIENTELING, icon: Calendar, label: 'Lifecycle' },
  ],
  [IndustryPattern.HEALTHCARE]: [
    { type: AgentType.DISCOVERY, icon: Stethoscope, label: 'Triage' },
    { type: AgentType.VALIDATION, icon: Microscope, label: 'Consult' },
    { type: AgentType.TRANSACTION, icon: ClipboardList, label: 'Booking' },
    { type: AgentType.SUPPORT, icon: HeartPulse, label: 'Care' },
  ],
};

export const INDUSTRY_PATTERNS = [
  { id: IndustryPattern.SIMPLE, name: 'Simple (Default)', icon: Layout, description: 'Standard commerce flow.' },
  { id: IndustryPattern.FINANCE, name: 'Financial Services', icon: Shield, description: 'Banking, Lending & Wealth Advisory.' },
  { id: IndustryPattern.RETAIL, name: 'High-End Retail', icon: ShoppingBag, description: 'Omnichannel Clienteling.' },
  { id: IndustryPattern.SAAS, name: 'B2B SaaS Enterprise', icon: Briefcase, description: 'SaaS Sales & Procurement.' },
  { id: IndustryPattern.TRAVEL, name: 'Travel & Hospitality', icon: Plane, description: 'Leisure and booking journeys.' },
  { id: IndustryPattern.AUTOMOTIVE, name: 'Automotive Lifecycle', icon: Car, description: 'Purchase, Finance & Ownership.' },
  { id: IndustryPattern.HEALTHCARE, name: 'Healthcare', icon: HeartPulse, description: 'Clinical services & prescriptions.' },
];

export const SUGGESTED_PROBES: SuggestedProbe[] = [
  // SIMPLE PROBES
  { agent: AgentType.DISCOVERY, label: "Tech Gift", prompt: "I need a high-end tech gift for a colleague, budget around $500." },
  { agent: AgentType.DISCOVERY, label: "Ergonomic Setup", prompt: "Suggest an ergonomic desk setup for a full-time remote developer." },
  { agent: AgentType.VALIDATION, label: "Warranty Policy", prompt: "What does the 2-year accidental damage warranty actually cover for this laptop?" },
  { agent: AgentType.VALIDATION, label: "Price Match", prompt: "Do you offer a price match guarantee if I find this item cheaper on a major retailer's site?" },
  { agent: AgentType.TRANSACTION, label: "Express Shipping", prompt: "Is same-day delivery available for my zip code if I order within the next hour?" },
  { agent: AgentType.TRANSACTION, label: "Installment Plan", prompt: "Can I split this purchase into 4 interest-free payments using Klarna or Affirm?" },
  { agent: AgentType.SUPPORT, label: "Change Address", prompt: "I just placed an order but need to change the shipping address. Can you update it before it ships?" },
  { agent: AgentType.SUPPORT, label: "Return Item", prompt: "How do I generate a return label for my recent purchase? It didn't fit as expected." },

  // FINANCE PROBES
  { agent: AgentType.FIN_INTENT, label: "First Home", prompt: "I'm looking to buy my first home and need to explore mortgage options for a $450k property." },
  { agent: AgentType.FIN_PROFILING, label: "Income Disclosure", prompt: "My combined annual household income is $185,000 with a 780 credit score." },
  { agent: AgentType.FIN_RISK_COMPLIANCE, label: "KYC Document", prompt: "I've uploaded my driver's license and most recent tax return. What's the next step?" },
  { agent: AgentType.FIN_OFFER, label: "Custom Rate", prompt: "Can we look at a 7/1 ARM instead of a fixed 30-year to lower the initial payments?" },
  { agent: AgentType.FIN_ADVISORY, label: "Tax Optimization", prompt: "Should I maximize my 401k contribution or put that extra $500/mo toward my mortgage principal?" },

  // RETAIL HIGH-END PROBES
  { agent: AgentType.RETAIL_INSPIRATION, label: "Paris Gala", prompt: "I'm attending a high-profile charity gala in Paris this October. I need something elegant yet modern." },
  { agent: AgentType.RETAIL_STYLIST, label: "Style Shift", prompt: "The silk gown is nice, but I'm leaning toward a more avant-garde silhouette. What fits my recent interest in 90s minimalism?" },
  { agent: AgentType.RETAIL_INVENTORY, label: "Global Search", prompt: "I need that Atelier suit in a size 48. Is there one available in the Milan or London boutique?" },
  { agent: AgentType.RETAIL_OFFER, label: "VIP Access", prompt: "Are there any private viewing events for the upcoming winter collection I can attend?" },
  { agent: AgentType.RETAIL_CLIENTELING, label: "Anniversary Gift", prompt: "My partner's 10th anniversary is coming up in 2 months. Based on her style graph, what would be the perfect jewelry piece?" },

  // SAAS ENTERPRISE PROBES
  { agent: AgentType.SAAS_DEMAND, label: "DevOps Scaling", prompt: "We're moving to a multi-cloud strategy and our current CI/CD pipeline is hitting its limits." },
  { agent: AgentType.SAAS_STAKEHOLDERS, label: "CISO Review", prompt: "I need to share our architectural diagrams with the CISO for the security sign-off phase." },
  { agent: AgentType.SAAS_VALIDATION, label: "ROI Analysis", prompt: "Generate a report showing the projected cost savings over 36 months if we migrate from legacy systems." },
  { agent: AgentType.SAAS_SECURITY, label: "GDPR Proof", prompt: "Does the CloudOps suite provide data residency controls for our German entity?" },
  { agent: AgentType.SAAS_NEGOTIATION, label: "Master Agreement", prompt: "Our legal team has some redlines on the indemnity clause in the Master Service Agreement." },

  // TRAVEL PROBES
  { agent: AgentType.TRAV_INSPIRATION, label: "Japan Tour", prompt: "I want a 14-day trip to Japan focusing on hidden culinary gems and traditional ryokans." },
  { agent: AgentType.TRAV_DESIGN, label: "Capri Stop", prompt: "Let's add a 3-day stop in Capri at the end of the Amalfi trip. I want a villa with a sea view." },
  { agent: AgentType.TRAV_OPTIMIZER, label: "Business Travel", prompt: "Optimize this London trip for maximum productivity. Minimize airport wait times and book hotels near the financial district." },
  { agent: AgentType.TRAV_AVAILABILITY, label: "Last Room", prompt: "Is there still availability for the private villa car service in Positano for the last week of August?" },
  { agent: AgentType.TRAV_DISRUPTION, label: "Typhoon Reroute", prompt: "My flight to Tokyo was grounded due to weather. Find me a rail alternative or a flight via Osaka." },

  // AUTOMOTIVE PROBES
  { agent: AgentType.AUTO_VEHICLE_DISCOVERY, label: "Electric SUV", prompt: "I'm looking for a premium electric SUV that can tow a 3,000lb boat for family weekends." },
  { agent: AgentType.AUTO_LIFESTYLE_FIT, label: "Commuter TCO", prompt: "I drive 60 miles a day in stop-and-go traffic. Show me the fuel savings vs a hybrid over 4 years." },
  { agent: AgentType.AUTO_TRADE_IN, label: "Appraise Tesla", prompt: "I want to trade in my 2022 Model 3 with 25k miles. It has FSD and is in excellent condition." },
  { agent: AgentType.AUTO_FINANCE, label: "Balloon Payment", prompt: "What are the monthly payments if I opt for a balloon payment at the end of the 48-month term?" },
  { agent: AgentType.AUTO_OWNERSHIP, label: "OTA Update", prompt: "My VoltX just received a new firmware update. What performance improvements were included for the dual motor?" },

  // HEALTHCARE PROBES
  { agent: AgentType.DISCOVERY, label: "Symptom Check", prompt: "I've had a recurring headache and sensitivity to light for the past 48 hours. What are the recommended next steps?" },
  { agent: AgentType.VALIDATION, label: "Specialist Search", prompt: "I need a board-certified neurologist who specializes in migraines and accepts my current insurance." },
  { agent: AgentType.TRANSACTION, label: "Co-pay Estimate", prompt: "What is the estimated out-of-pocket cost for a specialized MRI scan at the downtown facility?" },
  { agent: AgentType.SUPPORT, label: "Medication Sync", prompt: "I need to coordinate my three monthly prescriptions to be ready for pickup on the same day." },
];