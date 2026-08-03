"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getHistoryItem } from "@/lib/history";
import { generatePDF } from "@/lib/pdf";

export default function HistoryReportPage() {
  const params = useParams();
  const router = useRouter();

  const item = getHistoryItem(params.id as string);

  if (!item) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-100">
        <div className="rounded-3xl bg-white p-10 text-center shadow-xl">
          <h1 className="text-3xl font-bold text-gray-800">
            Report Not Found
          </h1>

          <Link
            href="/history"
            className="mt-6 inline-block rounded-xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
          >
            ← Back to History
          </Link>
        </div>
      </main>
    );
  }

  const result = item.result;

  const confidence =
    result.confidence === "High"
      ? 90
      : result.confidence === "Medium"
      ? 65
      : 35;

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 py-14">

      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-10 flex flex-wrap justify-between gap-4">

          <button
            onClick={() => router.back()}
            className="rounded-xl border border-green-600 px-5 py-3 font-semibold text-green-700 hover:bg-green-100"
          >
            ← Back
          </button>

          <button
            onClick={() => generatePDF(result)}
            className="rounded-xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
          >
            📄 Download PDF
          </button>

        </div>

        <div className="rounded-3xl bg-white p-8 shadow-xl">

          <h1 className="text-4xl font-extrabold text-green-800">
            🌾 {item.crop}
          </h1>

          <p className="mt-3 text-gray-600">
            📍 {item.district}, {item.state}
          </p>

          <p className="mt-2 text-gray-600">
            📅 {item.date}
          </p>

          {item.image && (
            <img
              src={item.image}
              alt="Crop"
              className="mt-8 h-72 w-full rounded-2xl object-cover"
            />
          )}

        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">

          <Card title="🦠 Disease" value={result.disease} />
          <Card title="📊 Confidence" value={`${confidence}%`} />
          <Card title="🧪 Fertilizer" value={result.fertilizer} />
          <Card title="💧 Irrigation" value={result.irrigation} />
          <Card title="🛡 Pest Control" value={result.pest_control} />
          <Card title="🌦 Weather" value={result.weather_precautions} />

        </div>

        <Section
          title="🌱 Prevention"
          value={result.prevention}
        />

        <Section
          title="🧠 AI Reasoning"
          value={result.reasoning}
        />

        <Section
          title="📖 Explanation"
          value={result.explanation}
        />

      </div>

    </main>
  );
}

function Card({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg">
      <h2 className="text-xl font-bold text-green-700">
        {title}
      </h2>

      <p className="mt-4 text-gray-700">
        {value}
      </p>
    </div>
  );
}

function Section({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="mt-8 rounded-2xl bg-white p-8 shadow-lg">
      <h2 className="text-2xl font-bold text-green-700">
        {title}
      </h2>

      <p className="mt-4 leading-8 text-gray-700">
        {value}
      </p>
    </div>
  );
}