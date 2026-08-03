export default function FeaturesSection() {
  const features = [
    {
      title: "AI Crop Analysis",
      description:
        "Get personalized recommendations based on crop, soil and weather.",
      icon: "🤖",
    },
    {
      title: "Weather Intelligence",
      description:
        "Receive weather-aware farming advice to protect your crops.",
      icon: "🌤️",
    },
    {
      title: "Disease Detection",
      description:
        "Identify possible crop diseases using AI-powered analysis.",
      icon: "🌿",
    },
    {
      title: "Smart Recommendations",
      description:
        "Fertilizer, irrigation and pest control suggestions in one place.",
      icon: "📈",
    },
  ];

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-8">

        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900">
            Everything a Farmer Needs
          </h2>

          <p className="mt-4 text-lg text-gray-600">
            CropWise AI combines weather intelligence, AI recommendations and
            agricultural insights into one smart platform.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-3xl border border-green-100 bg-green-50 p-8 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="text-5xl">
                {feature.icon}
              </div>

              <h3 className="mt-6 text-xl font-bold">
                {feature.title}
              </h3>

              <p className="mt-4 text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}