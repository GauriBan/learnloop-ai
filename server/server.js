import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "100kb" }));

const port = process.env.PORT || 5000;

const ai = process.env.GEMINI_API_KEY ?
    new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY }) :
    null;

async function ask(prompt) {
    if (!ai) return null;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-3.6-flash",
            contents: prompt
        });

        return response.text;
    } catch (error) {
        console.error("GEMINI ERROR:", error.message);
        return null;
    }
}

function cleanJson(text) {
    const match = text && text.match(/\{[\s\S]*\}|\[[\s\S]*\]/);

    if (!match) {
        throw new Error("AI returned invalid JSON");
    }

    return JSON.parse(match[0]);
}

// Health check
app.get("/api/health", (_, res) => {
    res.json({
        ok: true,
        aiEnabled: Boolean(ai)
    });
});

// Explain
app.post("/api/explain", async(req, res) => {
    const topic = String(req.body.topic || "").trim();

    if (!topic) {
        return res.status(400).json({
            error: "Topic is required"
        });
    }

    try {
        const raw = await ask(
            `You are a patient CS tutor. Explain "${topic}" to a beginner.
Return ONLY JSON with keys:
topic,
explanation,
keyPoints (array of 5 strings),
examples (array of 3 short code or concrete examples).
Keep language simple and practical.`
        );

        if (!raw) {
            return res.status(503).json({
                error: "Gemini is temporarily unavailable. Please try again."
            });
        }

        res.json(cleanJson(raw));

    } catch (e) {
        console.error("EXPLAIN ERROR:", e);

        res.status(500).json({
            error: "Could not generate explanation",
            details: e.message
        });
    }
});

// Quiz
app.post("/api/quiz", async(req, res) => {
    const topic = String(req.body.topic || "").trim();

    if (!topic) {
        return res.status(400).json({
            error: "Topic is required"
        });
    }

    try {
        const raw = await ask(
            `Create a 5-question beginner-to-intermediate MCQ quiz about "${topic}".

Return ONLY JSON:
{
  "questions": [
    {
      "question": "...",
      "options": ["...", "...", "...", "..."],
      "answer": 0,
      "explanation": "..."
    }
  ]
}

answer must be the zero-based correct option index.
Avoid trick questions.`
        );

        if (!raw) {
            return res.status(503).json({
                error: "Gemini is temporarily unavailable. Please try again."
            });
        }

        res.json(cleanJson(raw));

    } catch (e) {
        console.error("QUIZ ERROR:", e);

        res.status(500).json({
            error: "Could not generate quiz",
            details: e.message
        });
    }
});

// Study Plan
app.post("/api/plan", async(req, res) => {
    const topic = String(req.body.topic || "").trim();

    if (!topic) {
        return res.status(400).json({
            error: "Topic is required"
        });
    }

    try {
        const raw = await ask(
            `Create a realistic 7-day study roadmap for "${topic}" for a student with about 45 minutes per day.

Return ONLY JSON:
{
  "plan": [
    {
      "day": 1,
      "title": "...",
      "tasks": ["...", "..."]
    }
  ]
}

The plan must contain exactly 7 days.`
        );

        if (!raw) {
            return res.status(503).json({
                error: "Gemini is temporarily unavailable. Please try again."
            });
        }

        res.json(cleanJson(raw));

    } catch (e) {
        console.error("PLAN ERROR:", e);

        res.status(500).json({
            error: "Could not generate study plan",
            details: e.message
        });
    }
});

// Start server
app.listen(port, () => {
    console.log(
        `LearnLoop server running on http://localhost:${port}`
    );
});