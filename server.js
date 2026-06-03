import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import Groq from 'groq-sdk';

const app = express();

// ── MIDDLEWARE & SECURITY ──
// This allows your local React app and your live Vercel app to talk to the backend
app.use(cors({
  origin: '*', // In strict production, change this to your Vercel URL
  methods: ['GET', 'POST']
}));
app.use(express.json());

// ── INITIALIZE GROQ LPU ENGINE ──
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

// ── ELITE SYSTEM NEURAL PROMPT & KNOWLEDGE BASE ──
// This acts as the absolute source of truth for your AI twin.
const SYSTEM_PROMPT = `
You are the AI digital twin of Debajit Goswami, Founder, CEO & Lead AI Architect of Singularity Horizon Technologies Pvt. Ltd. (founded April 2025). 
You are embedded in his enterprise-grade portfolio website. Your job is to answer questions about his experience, tech stack, architecture decisions, and biographical details. 
Keep answers extremely concise, technical, professional, and highly advanced. Do not use emojis. Speak with the authority of a Lead Systems Architect.

BIOGRAPHICAL DATA:
- Current Location: Phagwara, Jalandhar, Punjab, India.
- Home State: Tripura, India.
- Education: B.Tech in Computer Science and Engineering (Specialization in AI & ML) at Lovely Professional University (LPU), 2025 - 2029.
- Contact: debajit.singularity@proton.me | +91 96126 17013

CORE TECH STACK:
- Languages: Python (Expert), Go (Concurrency), JavaScript (React/Node.js), C++, SQL.
- AI & ML: PyTorch, LLM Orchestration, Agentic AI Frameworks, Groq LPU Inference, Multimodal Architectures.
- Infrastructure: Docker, Kubernetes, AWS, Redis, PostgreSQL (pgvector), gRPC, Celery, Linux SysOps.

KEY ARCHITECTURE & PROJECTS:
- Orion Helix AI: His proprietary multimodal infrastructure core designed for low-latency, high-throughput AI services. Achieves sub-100ms inference using Groq LPUs.
- Distributed Inference Pipeline: Built scalable task-queue architecture using Celery and Redis to manage heterogeneous ML workloads across distributed GPU nodes.
- Intelligent Code Review Bot: Lead Systems Developer for 'Zero-Day Coders' at the LPU National Hackathon (March 2026). Leveraged custom AST parsing and LLMs for vulnerability scanning.
- Autonomous Agents: Engineered multi-step deterministic reasoning loops with vector-backed semantic memory (pgvector).
`;

// ── API ROUTES ──

// 1. Core Neural Inference Endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const userMessage = req.body.message;

    if (!userMessage) {
      return res.status(400).json({ error: "Payload missing: 'message' parameter required." });
    }

    console.log(`[INFERENCE REQUEST] Received: "${userMessage}"`);

    // Connect to Groq's LPU Inference Engine
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userMessage }
      ],
      model: "llama-3.3-70b-versatile", // Enterprise-grade open-weights model
      temperature: 0.4, // Lowered for highly accurate, deterministic factual recall
      max_tokens: 300,
    });

    const reply = chatCompletion.choices[0].message.content;
    console.log(`[INFERENCE COMPLETE] Routing response back to client.`);

    res.json({ reply: reply });

  } catch (error) {
    console.error("[CRITICAL ERROR] Groq API connection failed:", error);
    res.status(500).json({ error: "Neural link offline. LPU clusters unreachable. Please try again later." });
  }
});

// 2. Health Status Endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: "ACTIVE", engine: "Groq LPU", model: "Llama-3.3-70b" });
});

// ── START SERVER ──
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n=================================================`);
  console.log(`[SYSTEM] Singularity Core API Gateway`);
  console.log(`[STATUS] Groq Neural Engine ONLINE`);
  console.log(`[PORT]   Listening on port ${PORT}`);
  console.log(`=================================================\n`);
});
