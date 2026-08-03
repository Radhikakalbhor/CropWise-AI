"use client";

import { useAI } from "@/context/AIContext";
import { generatePDF } from "@/lib/pdf";
import Link from "next/link";

import VoiceOutput from "@/components/results/VoiceOutput";
import CropHealthScore from "@/components/results/CropHealthScore";
import AISummary from "@/components/results/AISummary";
import AIChat from "@/components/results/AIChat";

export default function ResultsPage() {
  const { aiResult } = useAI();

  if (!aiResult) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-100">
        <div className="rounded-3xl bg-white p-10 text-center shadow-xl">
          <h1 className="text-3xl font-bold text-gray-800">
            No AI Result Found
          </h1>

          <p className="mt-4 text-gray-600">
            Please perform a crop analysis first.
          </p>
        </div>
      </main>
    );
  }

  const confidence =
    aiResult.confidence === "High"
      ? 90
      : aiResult.confidence === "Medium"
      ? 65
      : 35;

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 py-8 sm:py-10 lg:py-14">

      <div className="mx-auto max-w-7xl px-6">

        {/* Hero */}

        <div className="mb-12 text-center">

          <div className="inline-block rounded-full bg-green-100 px-5 py-2 text-sm font-semibold text-green-700">
            🌾 CropWise AI Report
          </div>

          <h1 className="mt-5 text-5xl font-extrabold text-gray-900">
            AI Crop Analysis Dashboard
          </h1>

          <p className="mt-4 text-lg text-gray-600">
            Your personalized agricultural insights generated using AI.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">

            <button
              onClick={() => generatePDF(aiResult)}
              className="rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
            >
              📄 Download Report
            </button>

            <VoiceOutput aiResult={aiResult} />

            <Link
              href="/analyze"
              className="rounded-xl border border-green-600 px-6 py-3 font-semibold text-green-700 transition hover:bg-green-100"
            >
              🔄 New Analysis
            </Link>

            <Link
              href="/history"
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              📜 View History
            </Link>

          </div>

        </div>

        {/* NEW HEALTH SCORE */}

        <CropHealthScore
          disease={aiResult.disease}
          confidence={aiResult.confidence}
        />
        <AISummary
  disease={aiResult.disease}
  confidence={aiResult.confidence}
  fertilizer={aiResult.fertilizer}
  irrigation={aiResult.irrigation}
  weather={aiResult.weather_precautions}
/>

        {/* Dashboard Cards */}

        <div className="grid gap-7 lg:grid-cols-3">

          <InfoCard
            emoji="🦠"
            title="Disease"
            value={aiResult.disease}
          />

          <ConfidenceCard value={confidence} />

          <InfoCard
            emoji="🧪"
            title="Fertilizer"
            value={aiResult.fertilizer}
          />

          <InfoCard
            emoji="💧"
            title="Irrigation"
            value={aiResult.irrigation}
          />

          <InfoCard
            emoji="🛡"
            title="Pest Control"
            value={aiResult.pest_control}
          />

          <InfoCard
            emoji="🌦"
            title="Weather"
            value={aiResult.weather_precautions}
          />

          {aiResult.image_assessment?.image_quality !== "Not Available" && (

            <ImageAssessmentCard
              quality={aiResult.image_assessment.image_quality}
              detected={aiResult.image_assessment.symptoms_detected}
              symptoms={aiResult.image_assessment.visible_symptoms}
            />

          )}

        </div>

        {/* Detailed AI Report */}

        <div className="mt-10 rounded-3xl bg-white p-8 shadow-xl">
            <AIChat aiResult={aiResult} />

          <Section
            title="🌱 Prevention"
            text={aiResult.prevention}
          />

          <Section
            title="🧠 AI Reasoning"
            text={aiResult.reasoning}
          />

          <Section
            title="📖 Explanation"
            text={aiResult.explanation}
          />

        </div>

      </div>
    </main>
  );
}

function Section({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <>
      <h2 className="text-2xl font-bold text-green-700">
        {title}
      </h2>

      <p className="mt-4 leading-8 text-gray-700">
        {text}
      </p>

      <hr className="my-8" />
    </>
  );
}
function InfoCard({
  emoji,
  title,
  value,
}: {
  emoji: string;
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-3xl bg-white p-7 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-2xl">

      <div className="text-5xl">{emoji}</div>

      <h3 className="mt-5 text-xl font-bold text-gray-900">
        {title}
      </h3>

      <p className="mt-4 whitespace-pre-line leading-7 text-gray-700">
        {value}
      </p>

    </div>
  );
}

function ConfidenceCard({
  value,
}: {
  value: number;
}) {
  let badge = "";
  let color = "";
  let barColor = "";

  if (value >= 85) {
    badge = "🟢 High Confidence";
    color = "text-green-700";
    barColor = "bg-green-600";
  } else if (value >= 60) {
    badge = "🟡 Moderate Confidence";
    color = "text-yellow-700";
    barColor = "bg-yellow-500";
  } else {
    badge = "🔴 Low Confidence";
    color = "text-red-700";
    barColor = "bg-red-600";
  }

  return (
    <div className="rounded-3xl bg-white p-7 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-2xl">

      <div className="text-5xl">📊</div>

      <h3 className="mt-5 text-xl font-bold">
        Confidence Score
      </h3>

      <div className="mt-6 h-4 overflow-hidden rounded-full bg-gray-200">

        <div
          className={`h-full ${barColor} transition-all duration-700`}
          style={{ width: `${value}%` }}
        />

      </div>

      <p className={`mt-4 text-3xl font-bold ${color}`}>
        {value}%
      </p>

      <div
        className={`mt-3 inline-block rounded-full bg-gray-100 px-4 py-2 text-sm font-semibold ${color}`}
      >
        {badge}
      </div>

    </div>
  );
}

function ImageAssessmentCard({
  quality,
  detected,
  symptoms,
}: {
  quality: string;
  detected: boolean;
  symptoms: string;
}) {
  return (
    <div className="rounded-3xl bg-white p-7 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-2xl lg:col-span-3">

      <div className="flex items-center gap-3">

        <div className="text-5xl">
          📷
        </div>

        <div>

          <h3 className="text-2xl font-bold">
            Image Assessment
          </h3>

          <p className="text-gray-600">
            AI visual inspection summary
          </p>

        </div>

      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-3">

        <div className="rounded-2xl bg-green-50 p-5">

          <p className="text-sm font-semibold text-gray-500">
            Image Quality
          </p>

          <h4 className="mt-2 text-2xl font-bold text-green-700">
            {quality}
          </h4>

        </div>

        <div className="rounded-2xl bg-blue-50 p-5">

          <p className="text-sm font-semibold text-gray-500">
            Symptoms Detected
          </p>

          <h4 className="mt-2 text-2xl font-bold text-blue-700">
            {detected ? "✅ Yes" : "❌ No"}
          </h4>

        </div>

        <div className="rounded-2xl bg-yellow-50 p-5">

          <p className="text-sm font-semibold text-gray-500">
            Visible Symptoms
          </p>

          <p className="mt-2 leading-7 text-gray-700">
            {symptoms}
          </p>

        </div>

      </div>

    </div>
  );
}