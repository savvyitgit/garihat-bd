import { useState } from "react";

const listings = [
  { id: 1, title: "Toyota Corolla Axio", year: 2019, price: "18,00,000", location: "Dhaka", fuel: "Petrol", image: "/modem-black-car.png" },
  { id: 2, title: "Honda Civic", year: 2018, price: "22,00,000", location: "Chittagong", fuel: "Petrol", image: "/modem-black-car.png" },
  { id: 3, title: "Toyota Premio", year: 2020, price: "25,00,000", location: "Dhaka", fuel: "Hybrid", image: "/modem-black-car.png" },
  { id: 4, title: "Nissan X-Trail", year: 2017, price: "30,00,000", location: "Sylhet", fuel: "Petrol", image: "/modem-black-car.png" },
  { id: 5, title: "Suzuki Swift", year: 2021, price: "15,00,000", location: "Dhaka", fuel: "Petrol", image: "/modem-black-car.png" },
  { id: 6, title: "Mitsubishi Outlander", year: 2019, price: "35,00,000", location: "Dhaka", fuel: "Petrol", image: "/modem-black-car.png" },
  { id: 7, title: "Toyota Allion", year: 2018, price: "20,00,000", location: "Rajshahi", fuel: "Petrol", image: "/modem-black-car.png" },
  { id: 8, title: "Honda Vezel", year: 2020, price: "28,00,000", location: "Dhaka", fuel: "Hybrid", image: "/modem-black-car.png" },
];

const FeaturedListings = () => {
  const [current, setCurrent] = useState(0);
  const visible = 4;

  const prev = () => setCurrent((c) => Math.max(c - visible, 0));
  const next = () => setCurrent((c) => (c + visible >= listings.length ? 0 : c + visible));

  const visibleListings = listings.slice(current, current + visible);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">

        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Featured Listings</h2>
            <p className="text-gray-400 text-sm mt-1">Top vehicles available now</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={prev}
              disabled={current === 0}
              className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:border-[#DB1408] hover:text-[#DB1408] disabled:opacity-30 transition"
            >
              &lsaquo;
            </button>
            <button
              onClick={next}
              className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:border-[#DB1408] hover:text-[#DB1408] transition"
            >
              &rsaquo;
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {visibleListings.map((car) => (
            <div key={car.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition cursor-pointer">
              <div className="h-48 bg-gray-100 overflow-hidden">
                <img src={car.image} alt={car.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-3">
                <h3 className="font-semibold text-gray-800 text-sm mb-1">{car.title}</h3>
                <p className="text-[#DB1408] font-bold text-base mb-2">৳ {car.price}</p>
                <div className="flex flex-wrap gap-1 text-xs text-gray-400">
                  <span>📍 {car.location}</span>
                  <span>· {car.year}</span>
                  <span>· {car.fuel}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <a href="/listings" className="inline-block border-2 border-[#DB1408] text-[#DB1408] px-8 py-2 rounded-full font-semibold hover:bg-[#DB1408] hover:text-white transition">
            View All Listings
          </a>
        </div>

      </div>
    </section>
  );
};

export default FeaturedListings;