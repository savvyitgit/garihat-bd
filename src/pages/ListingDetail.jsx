import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const ListingDetail = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/listings/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCar(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="text-center mt-20">Loading...</div>;
  if (!car) return <div className="text-center mt-20">Listing not found</div>;

  return (
    <div>
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-8 mt-16 min-h-screen">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Image */}
          <div className="rounded-xl overflow-hidden border border-gray-200">
            <img
              src={car.image || "/modem-black-car.png"}
              alt={car.title}
              className="w-full h-80 object-cover"
            />
          </div>

          {/* Details */}
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">{car.title}</h1>
            <p className="text-3xl font-bold text-[#DB1408] mb-4">৳ {car.price?.toLocaleString()}</p>

            <div className="flex flex-col gap-3 text-gray-600 mb-6">
              <div className="flex gap-2">
                <span className="font-semibold w-24">Location:</span>
                <span>{car.location}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold w-24">Year:</span>
                <span>{car.year}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold w-24">Fuel:</span>
                <span>{car.fuel}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold w-24">Brand:</span>
                <span>{car.brand}</span>
              </div>
            </div>

            {/* Contact Button */}
            <button className="w-full bg-[#DB1408] text-white py-3 rounded-xl font-bold text-lg hover:bg-red-700 transition">
              Contact Seller
            </button>

            <button className="w-full mt-3 border-2 border-[#DB1408] text-[#DB1408] py-3 rounded-xl font-bold text-lg hover:bg-red-50 transition">
              📞 Show Phone Number
            </button>
          </div>

        </div>

      </div>
      <Footer />
    </div>
  );
};

export default ListingDetail;