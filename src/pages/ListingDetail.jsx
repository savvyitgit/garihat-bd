import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const ListingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPhone, setShowPhone] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/listings/" + id)
      .then((res) => res.json())
      .then((data) => { setCar(data); setLoading(false); })
      .catch((err) => { console.log("Error:", err); setLoading(false); });
  }, [id]);

  if (loading) return <div className="text-center mt-20">Loading...</div>;
  if (!car) return <div className="text-center mt-20">Listing not found</div>;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 max-w-5xl mx-auto px-4 py-8 mt-16 w-full">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 hover:text-[#DB1408] mb-6 transition"
        >
          ← Back to Listings
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Image */}
          <div className="rounded-xl overflow-hidden border border-gray-200">
            <img
              src={car.images && car.images[0] ? car.images[0] : "/modem-black-car.png"}
              alt={car.title}
              className="w-full h-80 object-cover"
            />
          </div>

          {/* Details */}
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">{car.title}</h1>
            <p className="text-3xl font-bold text-[#DB1408] mb-4">৳ {car.price?.toLocaleString()}</p>

            <div className="flex flex-col gap-3 text-gray-600 mb-4">
              <div className="flex gap-2">
                <span className="font-semibold w-28">Location:</span>
                <span>{car.location}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold w-28">Year:</span>
                <span>{car.year}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold w-28">Fuel:</span>
                <span>{car.fuel}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold w-28">Brand:</span>
                <span>{car.brand}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold w-28">Condition:</span>
                <span>{car.condition}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold w-28">Category:</span>
                <span>{car.category}</span>
              </div>
            </div>

            {/* Seller Info */}
            <div className="bg-gray-50 rounded-xl p-4 mb-4">
              <p className="font-semibold text-gray-700 mb-1">Seller</p>
              <p className="text-gray-600">{car.seller?.name}</p>
              <p className="text-xs text-gray-400 mt-1">
                Posted: {new Date(car.createdAt).toLocaleDateString()}
              </p>
            </div>

            {/* Buttons */}
            <button className="w-full bg-[#DB1408] text-white py-3 rounded-xl font-bold text-lg hover:bg-red-700 transition mb-3">
              Contact Seller
            </button>

            <button
              onClick={() => setShowPhone(!showPhone)}
              className="w-full border-2 border-[#DB1408] text-[#DB1408] py-3 rounded-xl font-bold text-lg hover:bg-red-50 transition"
            >
              {showPhone ? car.seller?.phone : "📞 Show Phone Number"}
            </button>
          </div>

        </div>

        {/* Description */}
        {car.description && (
          <div className="mt-8 border-t pt-6">
            <h2 className="text-xl font-bold text-gray-800 mb-3">Description</h2>
            <p className="text-gray-600 leading-relaxed">{car.description}</p>
          </div>
        )}

      </div>
      <Footer />
    </div>
  );
};

export default ListingDetail;