"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// 1. Helper function to talk to Gemini
export const generateAIInsights = async (industry) => {
  const prompt = `Analyze the ${industry} industry. Return ONLY JSON:
  {
    "salaryRanges": [{"role": "string", "min": number, "max": number, "median": number}],
    "growthRate": number,
    "demandLevel": "High" | "Medium" | "Low",
    "topSkills": ["string"],
    "marketOutlook": "Positive" | "Neutral" | "Negative",
    "keyTrends": ["string"],
    "recommendedSkills": ["string"]
  }`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("Invalid AI Response");
  return JSON.parse(jsonMatch[0]);
};

// 2. The function your Onboarding Form should call
export async function updateUserOnboarding(data) {
  const { userId: clerkUserId } = await auth();
  if (!clerkUserId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId },
  });

  if (!user) throw new Error("User not found");

  // Update User Profile
  await db.user.update({
    where: { clerkUserId },
    data: {
      industry: data.industry,
      experience: data.experience,
      bio: data.bio,
      skills: data.skills,
    },
  });

  // Immediately generate insights for this new industry
  const insights = await generateAIInsights(data.industry);

  // Store insights in the IndustryInsight table
  await db.industryInsight.upsert({
    where: { industry: data.industry },
    update: {
      ...insights,
      lastUpdated: new Date(),
      nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
    create: {
      industry: data.industry,
      ...insights,
      nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });

  return { success: true };
}

// 3. The function your Dashboard Page calls to display data
export async function getIndustryInsights() {
  const { userId: clerkUserId } = await auth();
  if (!clerkUserId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId },
    include: { industryInsight: true },
  });

  return user?.industryInsight || null;
}