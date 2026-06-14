const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-8">

          <div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Gari<span className="text-[#DB1408]">Hat</span>
            </h2>
            <p className="text-sm text-gray-400 mb-4">
              Bangladesh's Most Trusted Vehicle Marketplace
            </p>
            <div className="flex gap-3 text-xl">
              <span className="cursor-pointer hover:text-[#DB1408]">📘</span>
              <span className="cursor-pointer hover:text-[#DB1408]">📷</span>
              <span className="cursor-pointer hover:text-[#DB1408]">▶️</span>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3">Quick Links</h3>
            <ul className="text-sm space-y-2">
              <li><a href="/used-cars" className="hover:text-[#DB1408]">Used Cars</a></li>
              <li><a href="/new-cars" className="hover:text-[#DB1408]">New Cars</a></li>
              <li><a href="/trucks" className="hover:text-[#DB1408]">Trucks</a></li>
              <li><a href="/motorcycles" className="hover:text-[#DB1408]">Motorcycles</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3">Company</h3>
            <ul className="text-sm space-y-2">
              <li><a href="/about" className="hover:text-[#DB1408]">About Us</a></li>
              <li><a href="/contact" className="hover:text-[#DB1408]">Contact</a></li>
              <li><a href="/terms" className="hover:text-[#DB1408]">Terms & Conditions</a></li>
              <li><a href="/privacy" className="hover:text-[#DB1408]">Privacy Policy</a></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-gray-700 pt-4 text-center text-xs text-gray-500">
          © 2026 GariHat BD. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;