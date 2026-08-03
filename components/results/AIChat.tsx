"use client";

import { useState } from "react";

interface Props {
  aiResult: any;
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function AIChat({ aiResult }: Props) {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "👋 Hello! I'm CropWise AI. Ask me anything about your crop analysis.",
    },
  ]);

  async function askAI() {
    if (!question.trim()) return;

    const userMessage: Message = {
      role: "user",
      content: question,
    };

    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);

    setQuestion("");

    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          messages: updatedMessages,
          aiResult,
        }),
      });

      const data = await response.json();

      const aiMessage: Message = {
        role: "assistant",
        content: data.answer,
      };

      setMessages((prev) => [...prev, aiMessage]);

    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "❌ Sorry, something went wrong while contacting CropWise AI.",
        },
      ]);
    }

    setLoading(false);
  }

  return (
    <div className="mt-12 rounded-3xl bg-white p-8 shadow-2xl">

      <h2 className="text-3xl font-bold text-green-700">
        🤖 Ask CropWise AI
      </h2>

      <p className="mt-2 text-gray-600">
        Continue chatting about your previous analysis.
      </p>

      <div className="mt-8 h-[430px] overflow-y-auto rounded-2xl border bg-gray-50 p-5">

        <div className="space-y-5">

          {messages.map((msg, index) => (

            <div
              key={index}
              className={`flex ${
                msg.role === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >

              <div
                className={`max-w-[80%] rounded-2xl px-5 py-4 shadow-md ${
                  msg.role === "user"
                    ? "bg-green-600 text-white"
                    : "bg-white text-gray-800"
                }`}
              >
                {msg.content}
              </div>

            </div>

          ))}

          {loading && (

            <div className="flex justify-start">

              <div className="rounded-2xl bg-white px-5 py-4 shadow-md">

                🤖 <strong>CropWise AI</strong> is thinking...

              </div>

            </div>

          )}

        </div>

      </div>

      <div className="mt-6 flex gap-3">

        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              askAI();
            }
          }}
          placeholder="Ask another question..."
          className="flex-1 rounded-xl border p-4 outline-none focus:border-green-600"
        />

        <button
          onClick={askAI}
          disabled={loading}
          className="rounded-xl bg-green-600 px-8 font-semibold text-white transition hover:bg-green-700 disabled:opacity-60"
        >
          Send
        </button>

      </div>

    </div>
  );
}