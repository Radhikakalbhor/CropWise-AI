export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <h1 className="text-2xl font-bold text-green-700">
          🌾 CropWise AI
        </h1>

        <div className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
          <a href="#" className="hover:text-green-700 transition">
            Home
          </a>

          <a href="#" className="hover:text-green-700 transition">
            Features
          </a>

          <a href="#" className="hover:text-green-700 transition">
            About
          </a>

          <a href="#" className="hover:text-green-700 transition">
            Contact
          </a>
        </div>

        <button className="rounded-xl bg-green-600 px-5 py-2 text-white font-semibold hover:bg-green-700 transition">
          Get Started
        </button>
      </div>
    </nav>
  );
}