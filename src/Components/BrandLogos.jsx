import { useState } from "react";

const topBrands = [
  { id: 1, name: "Toyota", logo: "/Toyota.png" },
  { id: 2, name: "Honda", logo: "/honda.png" },
  { id: 3, name: "Suzuki", logo: "/Suzuki logo.png" },
  { id: 4, name: "Nissan", logo: "/nissan.png" },
];

const moreBrands = [
  "Mitsubishi", "Hyundai", "Kia", "BMW",
  "Isuzu", "Tata", "Mahindra", "Ford",
  "Volvo", "Mercedes", "Audi", "Jeep",
];

const BrandLogos = () => {
  const [showAll, setShowAll] = useState(false);

  return (
    <section className="py-12 bg-white">
      <div className="max-w-5xl mx-auto px-4">

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Browse by Brand
        </h2>
        <p className="text-center text-gray-400 mb-8 text-sm">
          Find your favourite car brand
        </p>

        {/* Top 4 logo cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {topBrands.map((brand) => (
            <div
              key={brand.id}
              className="flex flex-col items-center justify-center py-8 border border-gray-200 rounded-lg hover:border-[#DB1408] cursor-pointer transition-all duration-200"
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="h-10 object-contain mb-3"
              />
              <span className="text-xs font-bold tracking-widest text-gray-700 uppercase">
                {brand.name}
              </span>
            </div>
          ))}
        </div>

        {/* All brands - 4 column text grid like AutoTrader */}
        {showAll && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
            {moreBrands.map((name) => (
              <div
                key={name}
                className="flex items-center px-4 py-3 border border-gray-200 rounded-lg hover:border-[#DB1408] cursor-pointer transition-all duration-200"
              >
                <span className="text-sm text-gray-700">{name}</span>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-6">
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-gray-500 text-sm hover:text-[#DB1408] transition-colors duration-200"
          >
            {showAll ? "✕ Hide all" : "+ Show all brands"}
          </button>
        </div>

      </div>
    </section>
  );
};

export default BrandLogos;