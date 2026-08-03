import { FarmerFormData } from "@/types/farmer";
import { soilTypes, soilConditions } from "@/data/soil";

interface SoilInformationProps {
  formData: FarmerFormData;
  updateField: (
    field: keyof FarmerFormData,
    value: string | File | null
  ) => void;
}

export default function SoilInformation({
  formData,
  updateField,
}: SoilInformationProps) {
  return (
    <section className="mb-10 rounded-2xl border border-green-100 bg-green-50/40 p-6">

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-green-800">
          🌱 Soil Information
        </h2>

        <p className="mt-2 text-sm text-gray-600">
          Select the soil type and its current condition.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">

        <div>
          <label className="mb-2 block font-medium text-gray-700">
            Soil Type
          </label>

          <select
            value={formData.soilType}
            onChange={(e) => updateField("soilType", e.target.value)}
            className="w-full rounded-xl border border-gray-300 bg-white p-3 focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-200"
          >
            <option value="">Select Soil Type</option>

            {soilTypes.map((soil) => (
              <option key={soil} value={soil}>
                {soil}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block font-medium text-gray-700">
            Soil Condition
          </label>

          <select
            value={formData.soilCondition}
            onChange={(e) => updateField("soilCondition", e.target.value)}
            className="w-full rounded-xl border border-gray-300 bg-white p-3 focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-200"
          >
            <option value="">Select Soil Condition</option>

            {soilConditions.map((condition) => (
              <option key={condition} value={condition}>
                {condition}
              </option>
            ))}
          </select>
        </div>

      </div>

    </section>
  );
}