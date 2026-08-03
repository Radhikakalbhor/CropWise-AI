export default function FloatingDashboard() {
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
            Tomato 🍅
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-600">Soil</span>
          <span className="font-semibold">
            Black Soil
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-600">Weather</span>
          <span className="font-semibold text-orange-500">
            ☀️ 28°C
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-600">Humidity</span>
          <span className="font-semibold">
            62%
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-600">Growth</span>
          <span className="font-semibold text-green-700">
            Flowering 🌼
          </span>
        </div>

      </div>

      {/* Progress */}
      <div className="mt-6">
        <div className="mb-2 flex justify-between text-sm">
          <span>Crop Health</span>
          <span className="font-semibold text-green-700">
            92%
          </span>
        </div>

        <div className="h-3 w-full rounded-full bg-gray-200">
          <div className="h-3 w-[92%] rounded-full bg-green-600"></div>
        </div>
      </div>

      {/* Button */}
      <button className="mt-8 w-full rounded-xl bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700">
        Generate Recommendation
      </button>

    </div>
  );
}