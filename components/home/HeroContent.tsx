import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HeroContent() {
  return (
    <div className="max-w-xl">

      <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
        🌾 AI-Powered Agricultural Decision Support
      </span>

      <h1 className="mt-8 text-6xl font-extrabold leading-tight text-gray-900">
        Smart Farming with
        <span className="block text-green-700">
          CropWise AI
        </span>
      </h1>

      <p className="mt-6 text-lg leading-8 text-gray-600">
        Personalized farming recommendations using
        Context-Aware Prompt Engineering, weather conditions,
        soil type, crop stage and AI.
      </p>

      <div className="mt-10 flex gap-4">

        <Link href="/analyze">
          <Button size="lg">
            Start Analysis
          </Button>
        </Link>

        <Button variant="outline" size="lg">
          How It Works
        </Button>

      </div>

    </div>
  );
}