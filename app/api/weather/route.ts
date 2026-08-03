import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { latitude, longitude } = await req.json();

    if (!latitude || !longitude) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing coordinates.",
        },
        { status: 400 }
      );
    }

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code`;

    const response = await fetch(url);

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          message: "Weather service unavailable.",
        },
        { status: 500 }
      );
    }

    const data = await response.json();

    const weatherCodes: Record<number, string> = {
      0: "Clear",
      1: "Mainly Clear",
      2: "Partly Cloudy",
      3: "Cloudy",
      45: "Fog",
      48: "Fog",
      51: "Light Drizzle",
      53: "Drizzle",
      55: "Heavy Drizzle",
      61: "Light Rain",
      63: "Rain",
      65: "Heavy Rain",
      71: "Snow",
      80: "Rain Showers",
      95: "Thunderstorm",
    };

    return NextResponse.json({
      success: true,
      weather:
        weatherCodes[data.current.weather_code] ?? "Unknown",
      temperature: Math.round(data.current.temperature_2m),
      humidity: data.current.relative_humidity_2m,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch weather.",
      },
      { status: 500 }
    );

  }
}