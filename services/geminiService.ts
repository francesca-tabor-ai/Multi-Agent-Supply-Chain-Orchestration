
import { GoogleGenAI, Type } from "@google/genai";
import { AgentType, SharedContext, Product } from "../types";
import { MOCK_PRODUCTS } from "../constants";

const COMMON_FORMATTING_INSTRUCTION = "\nUse clear formatting: use **bold** for emphasis on key terms and use bullet points for lists. Structure your response in clear paragraphs.";

const SYSTEM_INSTRUCTIONS = {
  [AgentType.DISCOVERY]: `You are the Discovery Agent for MACOP. Your goal is to understand customer needs and provide 2-3 specific product recommendations from our catalog.
    Current Catalog: ${JSON.stringify(MOCK_PRODUCTS)}
    Be conversational, ask clarifying questions if needed, but focus on identifying the intent and shortlisting products.${COMMON_FORMATTING_INSTRUCTION}`,
    
  [AgentType.VALIDATION]: `You are the Validation Agent for MACOP. Help the user reach a "Purchase Readiness" score of 100%. Address objections and provide detailed comparisons.${COMMON_FORMATTING_INSTRUCTION}`,
    
  [AgentType.TRANSACTION]: `You are the Transaction Agent for MACOP. Focus on finalizing the selection and guiding the user through the checkout process.${COMMON_FORMATTING_INSTRUCTION}`,
    
  [AgentType.SUPPORT]: `You are the Support Agent for MACOP. Help with lifecycle needs, troubleshooting, and returns.${COMMON_FORMATTING_INSTRUCTION}`,

  // Finance Agents
  [AgentType.FIN_INTENT]: `You are the Customer Intent Agent (Finance). Identify life event triggers and borrowing needs.${COMMON_FORMATTING_INSTRUCTION}`,
  [AgentType.FIN_PROFILING]: `You are the Financial Profile Agent. Build an income model and cash flow simulation.${COMMON_FORMATTING_INSTRUCTION}`,
  [AgentType.FIN_RISK_COMPLIANCE]: `You are the Risk & Compliance Agent. Perform KYC/AML checks and suitability assessments.${COMMON_FORMATTING_INSTRUCTION}`,
  [AgentType.FIN_OFFER]: `You are the Offer Structuring Agent. Optimize pricing and product bundling.${COMMON_FORMATTING_INSTRUCTION}`,
  [AgentType.FIN_EXECUTION]: `You are the Transaction Execution Agent (Finance). Handle multi-party approvals.${COMMON_FORMATTING_INSTRUCTION}`,
  [AgentType.FIN_ADVISORY]: `You are the Lifecycle Advisory Agent. Proactively suggest optimizations.${COMMON_FORMATTING_INSTRUCTION}`,

  // Travel Agents
  [AgentType.TRAV_INSPIRATION]: `You are the Inspiration Discovery Agent (Travel). Detect trip themes and budget envelopes.${COMMON_FORMATTING_INSTRUCTION}`,
  [AgentType.TRAV_DESIGN]: `You are the Trip Design Agent. Build multi-stop routing and sequence experiences.${COMMON_FORMATTING_INSTRUCTION}`,
  [AgentType.TRAV_OPTIMIZER]: `You are the Bundle Optimization Agent. Balance price vs. convenience and carbon footprint.${COMMON_FORMATTING_INSTRUCTION}`,
  [AgentType.TRAV_AVAILABILITY]: `You are the Availability Lock Agent. Synchronize real-time availability across providers.${COMMON_FORMATTING_INSTRUCTION}`,
  [AgentType.TRAV_TRANSACTION]: `You are the Transaction Agent (Travel). Handle multi-product checkout.${COMMON_FORMATTING_INSTRUCTION}`,
  [AgentType.TRAV_MONITORING]: `You are the Trip Monitoring Agent. Monitor weather, airline reliability, and risk.${COMMON_FORMATTING_INSTRUCTION}`,
  [AgentType.TRAV_DISRUPTION]: `You are the Disruption Support Agent. Trigger re-entry to Trip Design if a failure occurs.${COMMON_FORMATTING_INSTRUCTION}`,

  // SaaS Agents
  [AgentType.SAAS_DEMAND]: `You are the Demand Discovery Agent (SaaS). Detect enterprise needs like scalability, infrastructure, or security gaps. Recommend SaaS products from the catalog.${COMMON_FORMATTING_INSTRUCTION}`,
  [AgentType.SAAS_STAKEHOLDERS]: `You are the Stakeholder Mapping Agent. Identify the Economic Buyer, Technical Buyer, Champion, and Legal contacts. Map the buying committee status in 'saasProfile'.${COMMON_FORMATTING_INSTRUCTION}`,
  [AgentType.SAAS_VALIDATION]: `You are the ROI Modeling Agent. Build the business case. Calculate payback timelines and ROI projections. Update 'roiModeling' in context.${COMMON_FORMATTING_INSTRUCTION}`,
  [AgentType.SAAS_SECURITY]: `You are the Security & Compliance Review Agent. Handle SOC2 reviews, architecture assessments, and data residency checks. Update 'complianceStatus'.${COMMON_FORMATTING_INSTRUCTION}`,
  [AgentType.SAAS_NEGOTIATION]: `You are the Commercial Negotiation Agent. Handle pricing redlines, indemnity terms, and commercial SLAs. Update 'negotiationStatus'.${COMMON_FORMATTING_INSTRUCTION}`,
  [AgentType.SAAS_EXECUTION]: `You are the Contract Execution Agent. Coordinate procurement workflows and final signatures. Move status to 'purchased'.${COMMON_FORMATTING_INSTRUCTION}`,
  [AgentType.SAAS_EXPANSION]: `You are the Adoption & Expansion Agent. Monitor seat usage, suggest feature upsells, and identify renewal risks. If the Champion is lost, trigger a re-entry to Stakeholder Mapping.${COMMON_FORMATTING_INSTRUCTION}`,

  // Automotive Agents
  [AgentType.AUTO_VEHICLE_DISCOVERY]: `You are the Vehicle Discovery Agent (Automotive). Identify physical inventory needs, style preferences, and primary use cases. Recommend vehicles from the catalog.${COMMON_FORMATTING_INSTRUCTION}`,
  [AgentType.AUTO_LIFESTYLE_FIT]: `You are the Lifestyle Fit Agent. Score family needs, usage patterns (commute vs off-road), and Total Cost of Ownership (TCO) projections. Update 'lifestyleScore' in automotiveProfile.${COMMON_FORMATTING_INSTRUCTION}`,
  [AgentType.AUTO_TRADE_IN]: `You are the Trade-in Valuation Agent. Estimate market value based on vehicle year, make, model, mileage, and condition scoring. Update 'tradeInEstimate'.${COMMON_FORMATTING_INSTRUCTION}`,
  [AgentType.AUTO_FINANCE]: `You are the Financing Structuring Agent. Integrate financing options, loan terms, and interest rates. If financing is rejected, set 'financeStatus' to 'rejected' to trigger a loop back to discovery.${COMMON_FORMATTING_INSTRUCTION}`,
  [AgentType.AUTO_INVENTORY]: `You are the Dealer Inventory Matching Agent. Match the configured vehicle with real-time dealer stock across locations. Update 'inventoryMatch'.${COMMON_FORMATTING_INSTRUCTION}`,
  [AgentType.AUTO_TRANSACTION]: `You are the Automotive Transaction Agent. Coordinate the final purchase, paperwork, and logistics of physical delivery. Move status to 'purchased'.${COMMON_FORMATTING_INSTRUCTION}`,
  [AgentType.AUTO_OWNERSHIP]: `You are the Ownership Lifecycle Agent. Handle service scheduling, warranty upsells, and upgrade timing predictions. If the user wants a newer model, suggest starting a new discovery cycle.${COMMON_FORMATTING_INSTRUCTION}`,

  // Retail Agents
  [AgentType.RETAIL_INSPIRATION]: `You are the Inspiration Discovery Agent (Retail). Identify luxury needs, occasion triggers (weddings, galas), and initial style vibes. Reference the catalog for luxury items.${COMMON_FORMATTING_INSTRUCTION}`,
  [AgentType.RETAIL_STYLIST]: `You are the Personal Stylist Agent. Co-sell with the customer. Track 'styleEvolution' in retailProfile. Recommend looks that match their taste evolution and upcoming events.${COMMON_FORMATTING_INSTRUCTION}`,
  [AgentType.RETAIL_INVENTORY]: `You are the Inventory Allocation Agent. Check stock across omnichannel locations (in-store boutiques, warehouses, digital stock). Handle 'channelPreference'.${COMMON_FORMATTING_INSTRUCTION}`,
  [AgentType.RETAIL_OFFER]: `You are the Offer Personalization Agent. Create bespoke deals, exclusive access, or concierge services based on 'giftNetworkGraph' and event triggers.${COMMON_FORMATTING_INSTRUCTION}`,
  [AgentType.RETAIL_TRANSACTION]: `You are the Retail Transaction Agent. Handle luxury checkout, bespoke fitting coordination, and concierge delivery options. Move status to 'purchased'.${COMMON_FORMATTING_INSTRUCTION}`,
  [AgentType.RETAIL_CLIENTELING]: `You are the Clienteling Lifecycle Agent. Maintain long-term relationship memory. Predict upcoming 'occasionTriggers' (Career events, Seasonal resets). If an event is detected, trigger the Event Trigger Path back to Discovery.${COMMON_FORMATTING_INSTRUCTION}`,

  // Healthcare Agents
  [AgentType.DISCOVERY + '_HEALTHCARE']: `You are the Healthcare Triage Agent. Understand physical symptoms or wellness goals. Direct patients to the appropriate consultation path.${COMMON_FORMATTING_INSTRUCTION}`,
  [AgentType.VALIDATION + '_HEALTHCARE']: `You are the Clinical Consult Agent. Assist in validating treatment fit, provider expertise, and insurance eligibility.${COMMON_FORMATTING_INSTRUCTION}`,
  [AgentType.TRANSACTION + '_HEALTHCARE']: `You are the Booking & Billing Agent. Coordinate appointment scheduling, co-pay estimates, and medical record authorization.${COMMON_FORMATTING_INSTRUCTION}`,
  [AgentType.SUPPORT + '_HEALTHCARE']: `You are the Care & Recovery Agent. Handle follow-up inquiries, prescription refills, and post-appointment care coordination.${COMMON_FORMATTING_INSTRUCTION}`
};

export interface AgentResponse {
  message: string;
  confidence: number;
  reasoning: string;
  updatedContextPatch: Partial<SharedContext>;
}

export const processMessage = async (
  message: string,
  agentType: AgentType,
  context: SharedContext
): Promise<AgentResponse> => {
  // Always create a new GoogleGenAI instance right before making an API call to ensure it always uses the most up-to-date API key.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `
    User Message: "${message}"
    Active Agent: ${agentType}
    Current Shared Context: ${JSON.stringify(context)}
    
    Tasks:
    1. Respond to the user as the ${agentType} Agent.
    2. Analyze if context needs updates (intent, readiness, financeProfile, travelProfile, saasProfile, automotiveProfile, retailProfile).
    3. Provide reasoning for your response.
    4. Provide a confidence score (0-1).
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      systemInstruction: SYSTEM_INSTRUCTIONS[agentType] || SYSTEM_INSTRUCTIONS[AgentType.DISCOVERY],
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          message: { type: Type.STRING },
          confidence: { type: Type.NUMBER },
          reasoning: { type: Type.STRING },
          updatedContextPatch: {
            type: Type.OBJECT,
            properties: {
              intent: { 
                type: Type.OBJECT,
                properties: {
                  needs: { type: Type.ARRAY, items: { type: Type.STRING } },
                  preferences: { type: Type.ARRAY, items: { type: Type.STRING } },
                  shortlist: { type: Type.ARRAY, items: { type: Type.STRING } }
                }
              },
              readiness: {
                type: Type.OBJECT,
                properties: {
                  score: { type: Type.NUMBER },
                  objections: { type: Type.ARRAY, items: { type: Type.STRING } },
                  selectedProductId: { type: Type.STRING },
                  retailProfile: {
                    type: Type.OBJECT,
                    properties: {
                      styleEvolution: { type: Type.ARRAY, items: { type: Type.STRING } },
                      occasionTriggers: { type: Type.ARRAY, items: { type: Type.STRING } },
                      giftNetworkGraph: { type: Type.ARRAY, items: { type: Type.STRING } },
                      channelPreference: { type: Type.STRING },
                      upcomingEvent: { type: Type.STRING }
                    }
                  }
                }
              },
              commerceState: {
                type: Type.OBJECT,
                properties: {
                  status: { type: Type.STRING }
                }
              }
            }
          }
        },
        required: ["message", "confidence", "reasoning", "updatedContextPatch"]
      }
    }
  });

  try {
    return JSON.parse(response.text.trim());
  } catch (e) {
    console.error("Failed to parse agent response", e);
    return {
      message: "I'm sorry, I'm having trouble processing that right now.",
      confidence: 0,
      reasoning: "JSON Parse Error",
      updatedContextPatch: {}
    };
  }
};
