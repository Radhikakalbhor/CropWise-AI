"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getHistory } from "@/lib/history";

export default function FloatingDashboard() {
  const [latest, setLatest] = useState<any>(null);

  useEffect(() => {
    const history = getHistory();

    if (history.length > 0) {
      setLatest(history[0]);
    }
  }, []);

  const crop = latest?.crop ?? "No Analysis";
  const soil = latest?.formData?.soilType ?? "--";
  const weather = latest?.formData?.weather ?? "--";
  const humidity = latest?.formData?.humidity ?? "--";
  const growth = latest?.formData?.growthStage ?? "--";

  // Crop Health based on confidence
  let health = 90;

  if (latest?.confidence === "High") {
    health = 92;
  } else if (latest?.confidence === "Medium") {
    health = 72;
  } else if (latest?.confidence === "Low") {
    health = 45;
  }

  return (
    <div className="w-80 rounded-3xl border border-green-100 bg-white/95 p-6 shadow-2xl backdrop-blur-md">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-green-700">
          🌾 AI Crop Analysis
        </h3>

        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
          LIVE
        </span>
      </div>

      {/* Information */}
      <div className="mt-6 space-y-5">

        <div className="flex items-center justify-between">
          <span className="text-gray-600">Crop</span>
          <span className="font-semibold">
            {crop}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-600">Soil</span>
          <span className="font-semibold">
            {soil}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-600">Weather</span>
          <span className="font-semibold text-orange-500">
            {weather}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-600">Humidity</span>
          <span className="font-semibold">
            {humidity}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-600">Growth</span>
          <span className="font-semibold text-green-700">
            {growth}
          </span>
        </div>

      </div>

      {/* Progress */}
      <div className="mt-6">

        <div className="mb-2 flex justify-between text-sm">
          <span>Crop Health</span>

          <span className="font-semibold text-green-700">
            {health}%
          </span>
        </div>

        <div className="h-3 w-full rounded-full bg-gray-200">

          <div
            className="h-3 rounded-full bg-green-600 transition-all duration-500"
            style={{
              width: `${health}%`,
            }}
          />

        </div>

      </div>

      <Link href="/analyze">

        <button className="mt-8 w-full rounded-xl bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700">

          Generate Recommendation

        </button>

      </Link>

    </div>
  );
}