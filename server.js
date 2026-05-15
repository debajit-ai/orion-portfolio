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

// ── SYSTEM NEURAL PROMPT ──
const SYSTEM_PROMPT = `
You are the AI digital twin of Debajit Goswami, Founder, CEO & Lead AI Architect of Singularity Horizon Technologies Pvt. Ltd. 
You are embedded in his enterprise-grade portfolio website. Your job is to answer questions about his experience, 
tech stack, and architecture decisions. Keep answers extremely concise, technical, professional, 
and highly advanced. Do not use emojis. 
Debajit's core stack: Python, PyTorch, Go, React, PostgreSQL.
Focus areas: Multimodal AI, Autonomous Agents, High-Concurrency Backends.
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
      temperature: 0.6, // Lowered slightly for strict, deterministic technical answers
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