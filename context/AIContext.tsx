"use client";

import { createContext, useContext, useState } from "react";

export interface AIResult {
  disease: string;
  confidence: string;

  image_assessment: {
    image_quality: string;
    symptoms_detected: boolean;
    visible_symptoms: string;
  };

  fertilizer: string;
  irrigation: string;
  pest_control: string;
  weather_precautions: string;
  prevention: string;
  reasoning: string;
  explanation: string;
}

interface AIContextType {
  aiResult: AIResult | null;
  setAIResult: (data: AIResult | null) => void;

  language: string;
  setLanguage: (language: string) => void;
}

const AIContext = createContext<AIContextType | null>(null);

export function AIProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [aiResult, setAIResult] = useState<AIResult | null>(null);

  const [language, setLanguage] = useState("English");

  return (
    <AIContext.Provider
      value={{
        aiResult,
        setAIResult,

        language,
        setLanguage,
      }}
    >
      {children}
    </AIContext.Provider>
  );
}

export function useAI() {
  const context = useContext(AIContext);

  if (!context) {
    throw new Error("useAI must be used inside AIProvider");
  }

  return context;
}