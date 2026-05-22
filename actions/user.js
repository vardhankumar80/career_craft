"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { generateAIInsights } from "./dashboard";

// -----------------
// Update user safely
// -----------------
export async function updateUser(data) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({ where: { clerkUserId: userId } });
  if (!user) throw new Error("User not found");

  try {
    const result = await db.$transaction(
      async (tx) => {
        // Check if industry exists
        let industryInsight = await tx.industryInsight.findUnique({
          where: { industry: data.industry },
        });

        // Default insights if AI fails
        let insights = {
          salaryRanges: [],
          growthRate: 0,
          demandLevel: "Medium",
          topSkills: [],
          marketOutlook: "Neutral",
          keyTrends: [],
          recommendedSkills: [],
        };

        if (!industryInsight) {
          try {
            const aiInsights = await generateAIInsights(data.industry);
            if (aiInsights && typeof aiInsights === "object") {
              insights = { ...insights, ...aiInsights };
            }
          } catch (e) {
            console.error("AI failed, skipping insights:", e.message);
          }

          industryInsight = await tx.industryInsight.create({
            data: {
              industry: data.industry,
              ...insights,
              nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            },
          });
        }

        const updatedUser = await tx.user.update({
          where: { id: user.id },
          data: {
            industry: data.industry,
            experience: data.experience,
            bio: data.bio,
            skills: data.skills,
          },
        });

        return { updatedUser, industryInsight };
      },
      { timeout: 10000 }
    );

    revalidatePath("/");

    return result.updatedUser;
  } catch (error) {
    console.error("Error updating user and industry:", error.message);
    throw new Error("Failed to update profile");
  }
}

// -----------------
// Get onboarding status
// -----------------
export async function getUserOnboardingStatus() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  try {
    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
      select: { industry: true },
    });

    if (!user) throw new Error("User not found");

    return { isOnboarded: !!user.industry };
  } catch (error) {
    console.error("Error checking onboarding status:", error.message);
    throw new Error("Failed to check onboarding status");
  }
}
