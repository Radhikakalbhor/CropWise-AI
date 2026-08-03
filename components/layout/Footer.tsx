export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-8 py-16">

        <div className="grid gap-12 md:grid-cols-3">

          {/* Brand */}

          <div>
            <h2 className="text-3xl font-bold text-green-400">
              🌾 CropWise AI
            </h2>

            <p className="mt-5 text-gray-300 leading-7">
              AI-powered agricultural decision support using
              context-aware prompt engineering to help farmers
              make smarter decisions.
            </p>
          </div>

          {/* Quick Links */}

          <div>
            <h3 className="text-xl font-semibold">
              Quick Links
            </h3>

            <ul className="mt-5 space-y-3 text-gray-300">
              <li>Home</li>
              <li>Features</li>
              <li>About</li>
              <li>Start Analysis</li>
            </ul>
          </div>

          {/* Contact */}

          <div>
            <h3 className="text-xl font-semibold">
              Contact
            </h3>

            <ul className="mt-5 space-y-3 text-gray-300">
              <li>Email</li>
              <li>GitHub</li>
              <li>LinkedIn</li>
            </ul>
          </div>

        </div>

        <div className="mt-12 border-t border-gray-700 pt-6 text-center text-gray-400">
          © 2026 CropWise AI. All rights reserved.
        </div>

      </div>
    </footer>
  );
}