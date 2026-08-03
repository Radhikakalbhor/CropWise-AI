export default function AboutSection() {
  return (
    <section className="bg-green-50 py-24">
      <div className="mx-auto max-w-7xl px-8">

        <div className="grid items-center gap-16 lg:grid-cols-2">

          {/* Left Side */}

          <div>

            <span className="rounded-full bg-white px-4 py-2 text-sm font-medium text-green-700 shadow">
              🌱 About CropWise AI
            </span>

            <h2 className="mt-6 text-5xl font-bold text-gray-900">
              Smart Agriculture Powered by
              <span className="block text-green-700">
                Context-Aware AI
              </span>
            </h2>

            <p className="mt-8 text-lg leading-8 text-gray-600">
              CropWise AI is an intelligent farming assistant designed to
              provide personalized recommendations by understanding the
              farmer's crop, soil type, location, weather conditions and
              growth stage.
            </p>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              Instead of giving generic answers, CropWise AI builds
              context-aware prompts and generates practical recommendations
              for disease prevention, fertilizer selection, irrigation and
              weather-based precautions.
            </p>

          </div>

          {/* Right Side */}

          <div className="grid grid-cols-2 gap-6">

            <div className="rounded-3xl bg-white p-8 shadow-lg">
              <div className="text-5xl">🌾</div>

              <h3 className="mt-5 text-xl font-bold">
                Context Aware
              </h3>

              <p className="mt-3 text-gray-600">
                AI understands crop, soil, weather and location.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-lg">
              <div className="text-5xl">🤖</div>

              <h3 className="mt-5 text-xl font-bold">
                LLM Powered
              </h3>

              <p className="mt-3 text-gray-600">
                Uses prompt engineering with modern language models.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-lg">
              <div className="text-5xl">🌦️</div>

              <h3 className="mt-5 text-xl font-bold">
                Weather Based
              </h3>

              <p className="mt-3 text-gray-600">
                Recommendations adapt to changing weather.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-lg">
              <div className="text-5xl">📈</div>

              <h3 className="mt-5 text-xl font-bold">
                Better Yield
              </h3>

              <p className="mt-3 text-gray-600">
                Improve productivity through smarter decisions.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}