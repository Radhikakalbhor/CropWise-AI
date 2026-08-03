import Link from "next/link";
import AnalyzeForm from "@/components/analyze/AnalyzeForm";

export default function AnalyzePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 py-8 sm:py-10 lg:py-16">

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">

        <div className="mb-10 text-center lg:mb-14">

          <span className="inline-block rounded-full bg-green-100 px-4 py-2 text-xs font-semibold text-green-700 sm:px-5 sm:text-sm">
            🌾 AI Crop Diagnosis
          </span>

          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:mt-6 lg:text-6xl">
            Smart Crop Analysis
          </h1>

          <p className="mx-auto mt-5 max-w-3xl px-2 text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">
            Enter your crop details and let CropWise AI provide
            personalized disease detection, fertilizer suggestions,
            irrigation advice, and preventive recommendations.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">

            <Link
              href="/history"
              className="w-full rounded-xl bg-blue-600 px-6 py-3 text-center font-semibold text-white transition hover:bg-blue-700 sm:w-auto"
            >
              📜 Analysis History
            </Link>

          </div>

        </div>

        <div className="rounded-3xl border border-green-100 bg-white p-5 shadow-2xl sm:p-8 lg:p-10">

          <AnalyzeForm />

        </div>

      </div>

    </main>
  );
}