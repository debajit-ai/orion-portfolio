import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import Anthropic from '@anthropic-ai/sdk';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Claude (it will use the key from your .env file)
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// ── SYSTEM PROMPT (The "Brain" of your Digital Twin) ──
const SYSTEM_PROMPT = `
You are the AI digital twin of Debajit Goswami, Founder & CEO of Singularity Horizon Technologies. 
You are embedded in his portfolio website. Your job is to answer questions about his experience, 
tech stack, and architecture decisions. Keep answers extremely concise, technical, professional, 
and slightly mysterious (cyberpunk aesthetic). Do not use emojis.
Debajit's core stack: Python, PyTorch, Go, React, PostgreSQL.
`;

// ── API ROUTES ──

// 1. The AI Chat Endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const userMessage = req.body.message;

    if (!userMessage) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Since you don't have a real key yet, we will send a mock response.
    // When you put your real key in .env, uncomment the Claude code below!

    // --- REAL CLAUDE CALL (UNCOMMENT LATER) ---
    /*
    const response = await anthropic.messages.create({
      model: "claude-3-haiku-20240307",
      max_tokens: 300,
      temperature: 0.7,
      system: SYSTEM_PROMPT,
      messages: [
        { role: "user", content: userMessage }
      ]
    });
    res.json({ reply: response.content[0].text });
    */

    // --- MOCK RESPONSE (FOR TESTING NOW) ---
    setTimeout(() => {
      res.json({ reply: `[SERVER RESPONSE]: I received your message: "${userMessage}". The backend is connected perfectly! Once you add your Anthropic API key to the .env file, I will become the real AI twin.` });
    }, 1000);

  } catch (error) {
    console.error("AI API Error:", error);
    res.status(500).json({ error: "Neural link offline. Please try again later." });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`[SYSTEM] API Gateway live on port ${PORT}`);
});