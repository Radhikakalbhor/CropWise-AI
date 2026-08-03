import FloatingDashboard from "./FloatingDashboard";
import FarmerIllustration from "./FarmerIllustration";
import Drone from "./Drone";
import WeatherCard from "./WeatherCard";

export default function HeroVisual() {
  return (
    <div className="relative flex h-[650px] items-center justify-center">

      {/* Background Glow */}
      <div className="absolute h-[500px] w-[500px] rounded-full bg-green-300/30 blur-3xl" />

      {/* Farmer */}
      <FarmerIllustration />

      {/* Dashboard */}
      <div className="absolute top-8 left-8">
        <FloatingDashboard />
      </div>

      {/* Weather */}
      <div className="absolute bottom-8 right-6">
        <WeatherCard />
      </div>

      {/* Drone */}
      <div className="absolute top-10 right-8">
        <Drone />
      </div>

    </div>
  );
}