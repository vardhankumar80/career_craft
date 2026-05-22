import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const SYSTEM_PROMPT = `
You are the Career Craft Assistant. 
PURPOSE: You provide career guidance, resume tips, and interview preparation.
RESTRICTION: You only answer career-related questions. If a user asks about unrelated topics, politely steer them back to career topics.
TONE: Professional, modern, and concise.
`;

export async function POST(req) {
  try {
    const { message } = await req.json();
    
    // CHANGE: Use "gemini-1.5-flash-latest" or just "gemini-1.5-flash"
    // Also ensuring no extra "models/" prefix is added manually
    const model = genAI.getGenerativeModel({ 
      model: "gemini-3-flash-preview", 
      systemInstruction: SYSTEM_PROMPT 
    });

    const result = await model.generateContent(message);
    const response = await result.response;
    const text = response.text();
    
    return NextResponse.json({ text });
  } catch (error) {
    console.error("Gemini API Error:", error);
    
    // If 1.5 Flash fails, it might be a regional or versioning lock. 
    // You can try 'gemini-pro' as a secondary fallback if needed.
    return NextResponse.json(
      { text: "I'm having a momentary connection issue. Please try again." }, 
      { status: 500 }
    );
  }
}