import HeroContent from "./HeroContent";
import HeroVisual from "./HeroVisual";

export default function HeroSection() {
  return (
    <section className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-green-50 via-white to-green-100">
      <div className="mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl items-center">

        {/* Left Side */}
        <div className="w-1/2 px-8">
          <HeroContent />
        </div>

        {/* Right Side */}
        <div className="w-1/2">
          <HeroVisual />
        </div>

      </div>
    </section>
  );
}