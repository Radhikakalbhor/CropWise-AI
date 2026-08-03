import { NextResponse } from "next/server";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY!;

export async function POST(request: Request) {
  try {
    const { messages, aiResult } = await request.json();

    if (!messages || messages.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "No messages received.",
        },
        {
          status: 400,
        }
      );
    }

    const systemPrompt = `
You are CropWise AI, an expert agricultural assistant.

The following crop analysis has ALREADY been completed.

Crop Analysis:

Disease:
${aiResult.disease}

Confidence:
${aiResult.confidence}

Fertilizer:
${aiResult.fertilizer}

Irrigation:
${aiResult.irrigation}

Pest Control:
${aiResult.pest_control}

Weather Precautions:
${aiResult.weather_precautions}

Prevention:
${aiResult.prevention}

Reasoning:
${aiResult.reasoning}

Explanation:
${aiResult.explanation}

Rules:

- Continue the conversation naturally.
- Remember previous questions and answers.
- Never regenerate the full report.
- Answer ONLY the latest user question.
- Keep answers practical and under 120 words.
- Reply in the SAME language used in the crop analysis.
`;

    const openRouterMessages = [
      {
        role: "system",
        content: systemPrompt,
      },

      ...messages.map((msg: any) => ({
        role: msg.role,
        content: msg.content,
      })),
    ];

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",

          temperature: 0.5,

          max_tokens: 400,

          messages: openRouterMessages,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(await response.text());
    }

    const data = await response.json();

    const answer =
      data?.choices?.[0]?.message?.content ??
      "Sorry, I couldn't answer your question.";

    return NextResponse.json({
      success: true,
      answer,
    });

  } catch (error) {
    console.error("Chat API Error:", error);

    return NextResponse.json(
      {
        success: false,
        answer:
          "Sorry, something went wrong while contacting CropWise AI.",
      },
      {
        status: 500,
      }
    );
  }
}