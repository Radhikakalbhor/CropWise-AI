import { FarmerFormData } from "@/types/farmer";

interface CropInformationProps {
  formData: FarmerFormData;
  updateField: (
    field: keyof FarmerFormData,
    value: string | File | null
  ) => void;
}

const crops = [
  "Rice",
  "Wheat",
  "Maize",
  "Cotton",
  "Sugarcane",
  "Soybean",
  "Groundnut",
  "Tomato",
  "Potato",
  "Onion",
  "Brinjal",
  "Chilli",
  "Banana",
  "Mango",
  "Apple",
  "Grapes",
  "Orange",
  "Pomegranate",
  "Tea",
  "Coffee",
];

const growthStages = [
  "Seed",
  "Germination",
  "Vegetative",
  "Flowering",
  "Fruiting",
  "Harvest",
];

export default function CropInformation({
  formData,
  updateField,
}: CropInformationProps) {
  return (
    <section className="mb-10 rounded-2xl border border-green-100 bg-green-50/40 p-6">

      <div className="mb-6">

        <h2 className="text-2xl font-bold text-green-800">
          🌾 Crop Information
        </h2>

        <p className="mt-2 text-sm text-gray-600">
          Tell CropWise AI about the crop you want to analyze.
        </p>

      </div>

      <div className="grid gap-6 md:grid-cols-2">

        <div>

          <label className="mb-2 block font-medium text-gray-700">
            Crop Name
          </label>

          <select
            value={formData.crop}
            onChange={(e) => updateField("crop", e.target.value)}
            className="w-full rounded-xl border border-gray-300 bg-white p-3 transition focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-200"
          >
            <option value="">Select Crop</option>

            {crops.map((crop) => (
              <option key={crop} value={crop}>
                {crop}
              </option>
            ))}
          </select>

        </div>

        <div>

          <label className="mb-2 block font-medium text-gray-700">
            Growth Stage
          </label>

          <select
            value={formData.growthStage}
            onChange={(e) => updateField("growthStage", e.target.value)}
            className="w-full rounded-xl border border-gray-300 bg-white p-3 transition focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-200"
          >
            <option value="">Select Stage</option>

            {growthStages.map((stage) => (
              <option key={stage} value={stage}>
                {stage}
              </option>
            ))}
          </select>

        </div>

      </div>

    </section>
  );
}