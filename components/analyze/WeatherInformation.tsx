"use client";

import { useState } from "react";
import { FarmerFormData } from "@/types/farmer";

interface Props {
  formData: FarmerFormData;
  updateField: (
    field: keyof FarmerFormData,
    value: string | number | File | null
  ) => void;
}

export default function WeatherInformation({
  formData,
  updateField,
}: Props) {
  const [loading, setLoading] = useState(false);

  async function fetchWeather() {
    if (
      formData.latitude === null ||
      formData.longitude === null
    ) {
      alert("Please select a district first.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/weather", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          latitude: formData.latitude,
          longitude: formData.longitude,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        alert(data.message);
        return;
      }

      updateField("weather", data.weather);
      updateField("temperature", data.temperature.toString());
      updateField("humidity", data.humidity.toString());
    } catch (error) {
      console.error(error);
      alert("Failed to fetch weather.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mb-10 rounded-2xl border border-green-100 bg-green-50/40 p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-green-800">
          🌦 Weather Information
        </h2>

        <p className="mt-2 text-sm text-gray-600">
          Fetch current weather automatically.
        </p>
      </div>

      <button
        type="button"
        onClick={fetchWeather}
        disabled={loading}
        className="mb-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
      >
        {loading ? "Fetching..." : "🌦 Fetch Weather"}
      </button>

      <div className="grid gap-6 md:grid-cols-3">
        <input
          readOnly
          value={formData.weather}
          placeholder="Weather"
          className="rounded-xl border bg-gray-100 p-3"
        />

        <input
          readOnly
          value={formData.temperature}
          placeholder="Temperature (°C)"
          className="rounded-xl border bg-gray-100 p-3"
        />

        <input
          readOnly
          value={formData.humidity}
          placeholder="Humidity (%)"
          className="rounded-xl border bg-gray-100 p-3"
        />
      </div>
    </section>
  );
}