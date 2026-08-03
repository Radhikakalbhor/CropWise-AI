"use client";

import { useState } from "react";

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

interface Props {
  language: string;
  onTranscript: (text: string) => void;
}

export default function VoiceInput({
  language,
  onTranscript,
}: Props) {
  const [listening, setListening] = useState(false);

  function getLanguageCode() {
    switch (language) {
      case "Hindi":
        return "hi-IN";

      case "Marathi":
        return "mr-IN";

      case "Gujarati":
        return "gu-IN";

      default:
        return "en-IN";
    }
  }

  function startRecognition() {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = getLanguageCode();

    recognition.interimResults = false;

    recognition.maxAlternatives = 1;

    recognition.start();

    setListening(true);

    recognition.onresult = (event: any) => {
      const transcript =
        event.results[0][0].transcript;

      onTranscript(transcript);

      setListening(false);
    };

    recognition.onerror = () => {
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };
  }

  return (
    <button
      type="button"
      onClick={startRecognition}
      disabled={listening}
      className={`mt-4 rounded-xl px-5 py-3 font-semibold text-white transition ${
        listening
          ? "bg-red-600"
          : "bg-green-600 hover:bg-green-700"
      }`}
    >
      {listening
        ? "🔴 Listening..."
        : "🎤 Speak Question"}
    </button>
  );
}