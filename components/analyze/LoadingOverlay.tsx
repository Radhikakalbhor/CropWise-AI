"use client";

import { useEffect, useState } from "react";

interface LoadingOverlayProps {
  open: boolean;
}

const steps = [
  { icon: "👨‍🌾", text: "Collecting farmer information" },
  { icon: "📷", text: "Inspecting uploaded crop image" },
  { icon: "🌦️", text: "Checking weather conditions" },
  { icon: "🌱", text: "Evaluating soil information" },
  { icon: "🤖", text: "Running AI disease diagnosis" },
  { icon: "🧪", text: "Preparing fertilizer recommendation" },
  { icon: "💧", text: "Generating irrigation advice" },
  { icon: "📄", text: "Building your AI report" },
];

export default function LoadingOverlay({
  open,
}: LoadingOverlayProps) {

  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {

    if (!open) {
      setCurrentStep(0);
      return;
    }

    const interval = setInterval(() => {

      setCurrentStep((prev) => {

        if (prev >= steps.length - 1) {
          return prev;
        }

        return prev + 1;

      });

    }, 700);

    return () => clearInterval(interval);

  }, [open]);

  if (!open) return null;

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md">

      <div className="w-[520px] rounded-3xl bg-white p-10 shadow-2xl">

        <div className="flex justify-center">

          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-100">

            <div className="h-16 w-16 animate-spin rounded-full border-[6px] border-green-600 border-t-transparent"></div>

          </div>

        </div>

        <h2 className="mt-8 text-center text-3xl font-extrabold text-green-700">

          🌾 CropWise AI

        </h2>

        <p className="mt-3 text-center text-lg text-gray-600">

          Analyzing your crop...

        </p>

        <div className="mt-10 space-y-4">

          {steps.map((step, index) => (

            <div
              key={index}
              className={`flex items-center gap-4 rounded-xl p-4 transition-all duration-500 ${
                index <= currentStep
                  ? "bg-green-50"
                  : "bg-gray-50 opacity-50"
              }`}
            >

              <div className="text-2xl">

                {step.icon}

              </div>

              <div className="flex-1">

                <p className="font-medium">

                  {step.text}

                </p>

              </div>

              {index < currentStep ? (

                <div className="text-2xl">

                  ✅

                </div>

              ) : index === currentStep ? (

                <div className="h-5 w-5 animate-spin rounded-full border-2 border-green-600 border-t-transparent"></div>

              ) : (

                <div className="text-gray-400">

                  ○

                </div>

              )}

            </div>

          ))}

        </div>

        <div className="mt-10">

          <div className="h-3 overflow-hidden rounded-full bg-gray-200">

            <div
              className="h-full rounded-full bg-green-600 transition-all duration-700"
              style={{
                width: `${((currentStep + 1) / steps.length) * 100}%`,
              }}
            />

          </div>

        </div>

        <p className="mt-6 text-center text-sm text-gray-500">

          Preparing your personalized AI report...

        </p>

      </div>

    </div>

  );

}