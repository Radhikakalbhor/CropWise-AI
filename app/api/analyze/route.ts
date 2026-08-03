import { NextResponse } from "next/server";
import { buildPrompt } from "@/lib/promptBuilder";
import { generateAIResponse } from "@/lib/ai";

export async function POST(request: Request) {
  console.log("✅ API route reached");

  try {
    const formData = await request.formData();

    const body = {
      crop: formData.get("crop") as string,
      growthStage: formData.get("growthStage") as string,

      state: formData.get("state") as string,
      district: formData.get("district") as string,

      latitude: formData.get("latitude")
        ? Number(formData.get("latitude"))
        : null,

      longitude: formData.get("longitude")
        ? Number(formData.get("longitude"))
        : null,

      soilType: formData.get("soilType") as string,
      soilCondition: formData.get("soilCondition") as string,

      weather: formData.get("weather") as string,
      temperature: formData.get("temperature") as string,
      humidity: formData.get("humidity") as string,

      // 🌐 NEW
      language: (formData.get("language") as string) || "English",

      question: formData.get("question") as string,

      image: formData.get("image") as File | null,
    };

    if (!body.crop || !body.question) {
      return NextResponse.json(
        {
          success: false,
          message: "Crop and Farmer Question are required.",
        },
        {
          status: 400,
        }
      );
    }

    const prompt = buildPrompt(body);

    const result = await generateAIResponse(
      prompt,
      body.image
    );

    return NextResponse.json({
      success: true,
      result,
    });

  } catch (error) {
    console.error("AI Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to generate AI recommendation.",
      },
      {
        status: 500,
      }
    );
  }
}