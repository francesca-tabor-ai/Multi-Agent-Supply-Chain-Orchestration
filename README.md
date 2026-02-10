<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# MACOP: Multi-Agent Commerce Orchestration Platform

MACOP is an advanced architectural framework designed to transform fragmented digital commerce journeys into seamless, context-aware experiences. By utilizing a coordinated swarm of specialized AI agents, MACOP ensures that customer intent, preferences, and risk profiles are preserved and evolved across the entire lifecycle—from initial discovery to complex transaction execution and post-purchase support.

## Key Pillars of the Platform

### Shared Context Graph (The "Source of Truth")
Unlike siloed systems where data is lost between sessions, MACOP maintains a unified, real-time context layer. This graph tracks behavioral signals, identity vectors, and "Readiness Scores," allowing agents to perform "warm handoffs" with zero context loss.

### Dynamic Orchestration Engine
A sophisticated routing layer that evaluates intent confidence. It determines when to transition a user from a Discovery Agent (optimizing for engagement) to a Validation Agent (optimizing for trust and objection handling) or a Transaction Agent (optimizing for friction-less conversion).

### Specialized Industry Runtimes
MACOP provides pre-engineered agent chains for high-complexity verticals:

- **Enterprise SaaS**: Manages multi-stakeholder buying committees, ROI modeling, and security compliance (SOC2/GDPR).
- **Financial Services**: Embedded KYC/AML logic, debt capacity modeling, and proactive wealth advisory.
- **High-End Retail**: Focuses on "Style Evolution," occasion triggers, and concierge delivery preferences.
- **Travel & Hospitality**: Handles multi-stop itinerary design, real-time availability locking, and proactive disruption management.

### Explainable AI & Perturbation Testing
The platform includes a Probe Console and State Viewer, providing developers and business users with full visibility into the "Rationale" behind agent decisions, confidence levels, and the underlying schema mutations.

## Strategic Value

MACOP is engineered to increase Customer Lifetime Value (CLV) by reducing the "time-to-purchase" and eliminating the friction points that lead to cart abandonment. It replaces static forms and generic chatbots with a proactive, intelligent commerce partner.

---

## Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1nsr0kKD_I2qXUUE05oeUfos11TOLIBRm

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
