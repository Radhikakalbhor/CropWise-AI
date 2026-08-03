interface Props {
  disease: string;
  confidence: string;
  fertilizer: string;
  irrigation: string;
  weather: string;
}

export default function AISummary({
  disease,
  confidence,
  fertilizer,
  irrigation,
  weather,
}: Props) {
  const fertilizerLine =
    fertilizer.split(".")[0] || fertilizer;

  const irrigationLine =
    irrigation.split(".")[0] || irrigation;

  const weatherLine =
    weather.split(".")[0] || weather;

  return (
    <div className="mb-10 rounded-3xl bg-gradient-to-r from-emerald-600 to-green-700 p-8 text-white shadow-2xl">

      <div className="flex items-center gap-3">

        <div className="text-5xl">
          🤖
        </div>

        <div>

          <h2 className="text-3xl font-bold">
            AI Quick Summary
          </h2>

          <p className="mt-1 text-green-100">
            Important recommendations at a glance
          </p>

        </div>

      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2">

        <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">

          <h3 className="font-bold">
            🦠 Disease
          </h3>

          <p className="mt-2">
            {disease}
          </p>

        </div>

        <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">

          <h3 className="font-bold">
            📊 Confidence
          </h3>

          <p className="mt-2">
            {confidence}
          </p>

        </div>

        <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">

          <h3 className="font-bold">
            🧪 Fertilizer
          </h3>

          <p className="mt-2">
            {fertilizerLine}
          </p>

        </div>

        <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">

          <h3 className="font-bold">
            💧 Irrigation
          </h3>

          <p className="mt-2">
            {irrigationLine}
          </p>

        </div>

        <div className="rounded-2xl bg-white/10 p-5 backdrop-blur md:col-span-2">

          <h3 className="font-bold">
            🌦 Weather Precaution
          </h3>

          <p className="mt-2">
            {weatherLine}
          </p>

        </div>

      </div>

    </div>
  );
}