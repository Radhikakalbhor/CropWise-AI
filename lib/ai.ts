const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY!;

if (!OPENROUTER_API_KEY) {
  throw new Error("OPENROUTER_API_KEY is missing in .env.local");
}

async function fileToDataUrl(file: File) {
  const buffer = Buffer.from(await file.arrayBuffer());

  return `data:${file.type};base64,${buffer.toString("base64")}`;
}

export async function generateAIResponse(
  prompt: string,
  image?: File | null
) {
  const content: any[] = [
    {
      type: "text",
      text: prompt,
    },
  ];

  if (image) {
    const imageData = await fileToDataUrl(image);

    content.push({
      type: "image_url",
      image_url: {
        url: imageData,
      },
    });
  }

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

        temperature: 0.2,

        max_tokens: 900,

        messages: [
          {
            role: "system",
            content:
              "You are CropWise AI. Always return ONLY valid JSON. Never use markdown. Never explain outside the JSON object.",
          },
          {
            role: "user",
            content,
          },
        ],
      }),
    }
  );

  if (!response.ok) {
    throw new Error(await response.text());
  }

  const data = await response.json();

  console.log("========== FULL OPENROUTER RESPONSE ==========");
  console.dir(data, { depth: null });

  const raw = data?.choices?.[0]?.message?.content;

  console.log("========== RAW AI RESPONSE ==========");
  console.log(raw);

  if (!raw) {
    throw new Error("AI returned an empty response.");
  }

  try {
    return JSON.parse(raw);
  } catch (error) {
    console.error("Invalid JSON received:");
    console.error(raw);

    throw new Error(
      "The AI returned an incomplete response. Please try again."
    );
  }
}