"use client";

import { FarmerFormData } from "@/types/farmer";
import VoiceInput from "./VoiceInput";

interface Props {
  formData: FarmerFormData;
  updateField: (
    field: keyof FarmerFormData,
    value: string | File | null
  ) => void;
}

export default function FarmerQuestion({
  formData,
  updateField,
}: Props) {
  return (
    <section className="rounded-2xl border border-green-100 bg-green-50/40 p-6">

      <h2 className="text-2xl font-bold text-green-800">
        ❓ Farmer's Question
      </h2>

      <p className="mt-2 mb-6 text-sm text-gray-600">
        Ask CropWise AI anything about your crop.
      </p>

      <textarea
        rows={5}
        value={formData.question}
        onChange={(e) =>
          updateField("question", e.target.value)
        }
        placeholder="Describe your crop issue..."
        className="w-full rounded-xl border bg-white p-4"
      />

      <div className="mt-5 flex flex-wrap items-center gap-4">

        <VoiceInput
          language={formData.language}
          onTranscript={(text) =>
            updateField("question", text)
          }
        />

        <button
          type="button"
          onClick={() => updateField("question", "")}
          className="rounded-xl bg-gray-600 px-5 py-3 font-semibold text-white transition hover:bg-gray-700"
        >
          🗑 Clear
        </button>

      </div>

      <p className="mt-4 text-sm text-gray-500">
        💡 Tip: Click the microphone and speak naturally. Your speech will automatically
        be converted into text in the selected language.
      </p>

    </section>
  );
}