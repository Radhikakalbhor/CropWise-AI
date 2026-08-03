"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { FarmerFormData } from "@/types/farmer";
import { useAI } from "@/context/AIContext";
import LoadingOverlay from "./LoadingOverlay";
import { saveHistory } from "@/lib/history";

interface SubmitButtonProps {
  formData: FarmerFormData;
}

export default function SubmitButton({
  formData,
}: SubmitButtonProps) {
  const router = useRouter();

  const {
    setAIResult,
    setLanguage,
  } = useAI();

  const [loading, setLoading] = useState(false);

  async function fileToBase64(file: File) {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;

      reader.readAsDataURL(file);
    });
  }

  async function handleSubmit() {
    try {
      setLoading(true);

      // ✅ Save selected language globally
      setLanguage(formData.language);

      const form = new FormData();

      form.append("crop", formData.crop);
      form.append("growthStage", formData.growthStage);

      form.append("state", formData.state);
      form.append("district", formData.district);

      form.append("soilType", formData.soilType);
      form.append("soilCondition", formData.soilCondition);

      form.append("weather", formData.weather);
      form.append("temperature", formData.temperature);
      form.append("humidity", formData.humidity);

      form.append("language", formData.language);

      form.append("question", formData.question);

      if (formData.image) {
        form.append("image", formData.image);
      }

      const response = await fetch("/api/analyze", {
        method: "POST",
        body: form,
      });

      const data = await response.json();

      if (!data.success) {
        setLoading(false);
        toast.error(data.message);
        return;
      }

      setAIResult(data.result);

      let image = "";

      if (formData.image) {
        image = await fileToBase64(formData.image);
      }

      saveHistory({
        id: crypto.randomUUID(),
        date: new Date().toLocaleString(),

        crop: formData.crop,
        state: formData.state,
        district: formData.district,

        disease: data.result.disease,
        confidence: data.result.confidence,

        image,

        formData: {
          crop: formData.crop,
          growthStage: formData.growthStage,

          state: formData.state,
          district: formData.district,

          latitude: formData.latitude,
          longitude: formData.longitude,

          soilType: formData.soilType,
          soilCondition: formData.soilCondition,

          weather: formData.weather,
          temperature: formData.temperature,
          humidity: formData.humidity,

          language: formData.language,

          question: formData.question,
        },

        result: data.result,
      });

      toast.success("AI analysis completed successfully!");

      setTimeout(() => {
        router.push("/results");
      }, 1200);

    } catch (error) {
      console.error(error);
      setLoading(false);
      toast.error("Something went wrong. Please try again.");
    }
  }

  return (
    <>
      <LoadingOverlay open={loading} />

      <div className="mt-12 flex justify-center">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="rounded-xl bg-green-600 px-10 py-4 text-lg font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Analyzing..." : "🌾 Start AI Analysis"}
        </button>
      </div>
    </>
  );
}