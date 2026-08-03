"use client";

import { useRef, useState } from "react";
import { useAI } from "@/context/AIContext";

interface Props {
  aiResult: any;
}

export default function VoiceOutput({ aiResult }: Props) {
  const { language } = useAI();

  const [speaking, setSpeaking] = useState(false);

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  function getVoiceLanguage() {
    switch (language) {
      case "Hindi":
        return "hi-IN";

      case "Marathi":
        // Best available fallback
        return "hi-IN";

      case "Gujarati":
        // Browser has no Gujarati voice on your system
        return "en-IN";

      default:
        return "en-IN";
    }
  }

  function speakReport() {
    if (!("speechSynthesis" in window)) {
      alert("Speech synthesis is not supported.");
      return;
    }

    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }

    const report = `
Disease: ${aiResult.disease}.

Confidence: ${aiResult.confidence}.

Fertilizer:
${aiResult.fertilizer}.

Irrigation:
${aiResult.irrigation}.

Pest Control:
${aiResult.pest_control}.

Weather Precautions:
${aiResult.weather_precautions}.

Prevention:
${aiResult.prevention}.
`;

    const utterance = new SpeechSynthesisUtterance(report);

    const voices = window.speechSynthesis.getVoices();

    const languageCode = getVoiceLanguage();

    let selectedVoice =
      voices.find((v) => v.lang === languageCode) ||
      voices.find((v) => v.lang.startsWith(languageCode.split("-")[0])) ||
      voices.find((v) => v.lang.startsWith("en"));

    if (selectedVoice) {
      utterance.voice = selectedVoice;
      utterance.lang = selectedVoice.lang;
    } else {
      utterance.lang = languageCode;
    }

    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onstart = () => {
      setSpeaking(true);
    };

    utterance.onend = () => {
      setSpeaking(false);
    };

    utterance.onerror = () => {
      setSpeaking(false);

      alert(
        `Speech voice for "${language}" is not available on this device.`
      );
    };

    utteranceRef.current = utterance;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }

  return (
    <button
      onClick={speakReport}
      className={`rounded-xl px-6 py-3 font-semibold text-white transition ${
        speaking
          ? "bg-red-600 hover:bg-red-700"
          : "bg-purple-600 hover:bg-purple-700"
      }`}
    >
      {speaking ? "⏹ Stop Reading" : "🔊 Read Report"}
    </button>
  );
}