export default function WeatherCard() {
  return (
    <div className="absolute bottom-10 right-4 w-64 rounded-3xl border border-blue-100 bg-white p-5 shadow-xl">

      <div className="flex items-center justify-between">
        <h3 className="font-bold text-blue-700">
          🌤 Weather
        </h3>

        <span className="text-2xl">
          ☀️
        </span>
      </div>

      <div className="mt-5 space-y-3">

        <div className="flex justify-between">
          <span>Temperature</span>
          <span className="font-semibold">
            28°C
          </span>
        </div>

        <div className="flex justify-between">
          <span>Humidity</span>
          <span className="font-semibold">
            62%
          </span>
        </div>

        <div className="flex justify-between">
          <span>Wind</span>
          <span className="font-semibold">
            12 km/h
          </span>
        </div>

      </div>

    </div>
  );
}