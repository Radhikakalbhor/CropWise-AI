"use client";

import { FarmerFormData } from "@/types/farmer";

interface Props {
  formData: FarmerFormData;
  updateField: (field: keyof FarmerFormData, value: any) => void;
}

export default function LanguageSelector({
  formData,
  updateField,
}: Props) {
  return (
    <div className="mb-8">

      <h2 className="mb-4 text-2xl font-bold text-green-800">
        🌐 Preferred Language
      </h2>

      <select
        value={formData.language}
        onChange={(e) =>
          updateField("language", e.target.value)
        }
        className="w-full rounded-xl border border-gray-300 bg-white p-4 shadow-sm focus:border-green-600 focus:outline-none"
      >
        <option value="English">
          🇬🇧 English
        </option>

        <option value="Hindi">
          🇮🇳 Hindi
        </option>

        <option value="Marathi">
          🇮🇳 Marathi
        </option>

        <option value="Gujarati">
          🇮🇳 Gujarati
        </option>
      </select>

    </div>
  );
}