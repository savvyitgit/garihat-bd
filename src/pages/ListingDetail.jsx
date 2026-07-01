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
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    fetch("http://localhost:5000/api/listings/" + id)
      .then((res) => res.json())
      .then((data) => { setCar(data); setLoading(false); })
      .catch((err) => { console.log("Error:", err); setLoading(false); });
  }, [id]);

  if (loading) return <div className="text-center mt-20">Loading...</div>;
  if (!car) return <div className="text-center mt-20">Listing not found</div>;

  const images = car.images && car.images.length > 0 
    ? car.images 
    : ["/modem-black-car.png"];

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

          {/* Image Gallery */}
          <div>
            {/* Main Image */}
            <div className="rounded-xl overflow-hidden border border-gray-200 mb-3">
              <img
                src={images[activeImg]}
                alt={car.title}
                className="w-full h-80 object-cover transition-all duration-300"
              />
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {images.map((img, idx) => (
                  <div
                    key={idx}
                    onClick={() => setActiveImg(idx)}
                    className={`cursor-pointer rounded-lg overflow-hidden border-2 transition ${
                      activeImg === idx 
                        ? "border-[#DB1408]" 
                        : "border-transparent hover:border-gray-300"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`photo ${idx + 1}`}
                      className="w-full h-16 object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col gap-4">
            
            {/* Title & Price */}
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-1">{car.title}</h1>
              <p className="text-3xl font-bold text-[#DB1408]">৳ {car.price?.toLocaleString()}</p>
            </div>

            {/* Key Info Grid */}
            <div className="grid grid-cols-2 gap-3 bg-gray-50 rounded-xl p-4">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Location</p>
                <p className="text-sm font-semibold text-gray-700">{car.location}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Year</p>
                <p className="text-sm font-semibold text-gray-700">{car.year}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Brand</p>
                <p className="text-sm font-semibold text-gray-700">{car.brand}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Fuel</p>
                <p className="text-sm font-semibold text-gray-700">{car.fuel}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Condition</p>
                <p className="text-sm font-semibold text-gray-700">{car.condition}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Category</p>
                <p className="text-sm font-semibold text-gray-700">{car.category}</p>
              </div>
            </div>

            {/* Seller Info */}
            <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl p-4">
              <div className="w-10 h-10 rounded-full bg-[#DB1408] flex items-center justify-center text-white font-bold text-lg shrink-0">
                {car.seller?.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-gray-800">{car.seller?.name}</p>
                <p className="text-xs text-gray-400">
                  Posted: {new Date(car.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Buttons */}
            <button className="w-full bg-[#DB1408] text-white py-3 rounded-xl font-bold text-lg hover:bg-red-700 transition">
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