const fs = require('fs');

const code = `import { useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const brandsByCategory = {
  Car: ["Toyota", "Honda", "Nissan", "Suzuki", "Mitsubishi", "Hyundai", "Kia", "BMW"],
  Motorcycle: ["Yamaha", "Bajaj", "Honda", "Suzuki", "TVS", "Hero"],
  Truck: ["Tata", "Isuzu", "Hino", "Mitsubishi Fuso", "Ashok Leyland"],
  Bus: ["Hino", "Isuzu", "Tata", "Ashok Leyland"],
  "Commercial Vehicle": ["Tata", "Isuzu", "Mahindra"],
  "Spare Parts": ["Toyota", "Honda", "Nissan", "Suzuki", "Yamaha"],
};

const locations = ["Dhaka", "Chittagong", "Sylhet", "Rajshahi", "Khulna", "Barisal", "Mymensingh", "Rangpur"];

const PostAd = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    category: "Car", brand: "", model: "", year: new Date().getFullYear(),
    condition: "Used", fuel: "Petrol", price: "", location: "Dhaka",
    description: "", sellerName: "", sellerPhone: ""
  });
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handle = e => {
    const { name, value } = e.target;
    if (name === "category") {
      setForm({ ...form, category: value, brand: "" });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleImages = e => {
    const files = Array.from(e.target.files).slice(0, 4);
    setImages(files);
    const urls = files.map(f => URL.createObjectURL(f));
    setPreviews(urls);
  };

  const removeImage = idx => {
    const newImages = images.filter((_, i) => i !== idx);
    const newPreviews = previews.filter((_, i) => i !== idx);
    setImages(newImages);
    setPreviews(newPreviews);
  };

  const next = () => setStep(s => s + 1);
  const back = () => setStep(s => s - 1);

  const submit = async e => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      let imageUrls = ["/modem-black-car.png"];

      if (images.length > 0) {
        const formData = new FormData();
        images.forEach(img => formData.append("images", img));
        const uploadRes = await fetch("http://localhost:5000/api/upload", {
          method: "POST",
          body: formData,
        });
        const uploadData = await uploadRes.json();
        if (uploadData.urls) { imageUrls = uploadData.urls; }
      }

      const res = await fetch("http://localhost:5000/api/listings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.brand + " " + form.model + " " + form.year,
          brand: form.brand, model: form.model,
          year: parseInt(form.year), price: parseInt(form.price),
          category: form.category, condition: form.condition,
          fuel: form.fuel, location: form.location,
          description: form.description,
          images: imageUrls,
          seller: { name: form.sellerName, phone: form.sellerPhone }
        })
      });
      if (res.ok) { setSuccess(true); }
      else { setError("Something went wrong. Please try again."); }
    } catch (err) { setError("Server error. Please try again."); }
    setLoading(false);
  };

  if (success) return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Ad Posted Successfully!</h2>
          <p className="text-gray-500 mb-6">Your listing is now live on GariHat BD</p>
          <a href="/listings" className="bg-[#DB1408] text-white px-8 py-3 rounded-xl font-bold hover:bg-red-700 transition">
            View All Listings
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 max-w-2xl mx-auto px-4 py-8 mt-16 w-full">

        <h1 className="text-2xl font-bold text-gray-800 mb-2">Post an Ad</h1>
        <p className="text-gray-400 text-sm mb-6">Step {step} of 3</p>

        <div className="flex gap-2 mb-8">
          {[1, 2, 3].map(s => (
            <div key={s} className={"h-2 flex-1 rounded-full transition-all " + (s <= step ? "bg-[#DB1408]" : "bg-gray-200")} />
          ))}
        </div>

        {error && <p className="text-red-500 mb-4 bg-red-50 p-3 rounded-lg">{error}</p>}

        {step === 1 && (
          <div className="flex flex-col gap-4">
            <h2 className="font-bold text-gray-700 text-lg">Vehicle Details</h2>
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-1 block">Category</label>
              <select name="category" value={form.category} onChange={handle} className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm">
                {Object.keys(brandsByCategory).map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-1 block">Brand</label>
              <select name="brand" value={form.brand} onChange={handle} className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm">
                <option value="">Select Brand</option>
                {brandsByCategory[form.category].map(b => <option key={b}>{b}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-1 block">Model</label>
              <input name="model" value={form.model} onChange={handle} placeholder="e.g. Corolla Axio" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1 block">Year</label>
                <input name="year" value={form.year} onChange={handle} type="number" min="1990" max="2026" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm" />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1 block">Condition</label>
                <select name="condition" value={form.condition} onChange={handle} className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm">
                  <option value="Used">Used</option>
                  <option value="New">New</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-1 block">Fuel Type</label>
              <select name="fuel" value={form.fuel} onChange={handle} className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm">
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Electric">Electric</option>
                <option value="CNG">CNG</option>
                <option value="Octane">Octane</option>
              </select>
            </div>
            <button onClick={next} disabled={!form.brand} className="bg-[#DB1408] text-white py-3 rounded-xl font-bold hover:bg-red-700 transition disabled:opacity-50">
              Next →
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-4">
            <h2 className="font-bold text-gray-700 text-lg">Price and Location</h2>
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-1 block">Price (BDT)</label>
              <input name="price" value={form.price} onChange={handle} type="number" placeholder="e.g. 1800000" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm" />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-1 block">Location</label>
              <select name="location" value={form.location} onChange={handle} className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm">
                {locations.map(l => <option key={l}>{l}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-1 block">Description</label>
              <textarea name="description" value={form.description} onChange={handle} rows={5} placeholder="Describe your vehicle in detail..." className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm" />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700 mb-1 block">Photos (up to 4)</label>
              <input type="file" accept="image/*" multiple onChange={handleImages} className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm" />
              {previews.length > 0 && (
                <div className="grid grid-cols-4 gap-2 mt-3">
                  {previews.map((url, idx) => (
                    <div key={idx} className="relative">
                      <img src={url} alt="preview" className="w-full h-20 object-cover rounded-lg" />
                      <button onClick={() => removeImage(idx)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">x</button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <button onClick={back} className="flex-1 border-2 border-gray-300 text-gray-600 py-3 rounded-xl font-bold hover:border-[#DB1408] hover:text-[#DB1408] transition">← Back</button>
              <button onClick={next} disabled={!form.price} className="flex-1 bg-[#DB1408] text-white py-3 rounded-xl font-bold hover:bg-red-700 transition disabled:opacity-50">Next →</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <form onSubmit={submit} className="flex flex-col gap-4">
            <h2 className="font-bold text-gray-700 text-lg">Contact Information</h2>
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-1 block">Your Name</label>
              <input name="sellerName" value={form.sellerName} onChange={handle} required placeholder="Full name" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm" />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-1 block">Phone Number</label>
              <input name="sellerPhone" value={form.sellerPhone} onChange={handle} required placeholder="01711234567" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm" />
            </div>
            <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-500">
              <p className="font-semibold text-gray-700 mb-2">Ad Summary:</p>
              <p>{form.brand} {form.model} {form.year}</p>
              <p>৳ {parseInt(form.price || 0).toLocaleString()} — {form.location}</p>
              <p>{form.condition} · {form.fuel} · {form.category}</p>
              <p>{previews.length} photo(s) selected</p>
            </div>
            <div className="flex gap-3">
              <button type="button" onClick={back} className="flex-1 border-2 border-gray-300 text-gray-600 py-3 rounded-xl font-bold hover:border-[#DB1408] hover:text-[#DB1408] transition">← Back</button>
              <button type="submit" disabled={loading || !form.sellerName || !form.sellerPhone} className="flex-1 bg-[#DB1408] text-white py-3 rounded-xl font-bold hover:bg-red-700 transition disabled:opacity-50">
                {loading ? "Posting..." : "Post Ad ✓"}
              </button>
            </div>
          </form>
        )}

      </div>
      <Footer />
    </div>
  );
};

export default PostAd;`;

fs.writeFileSync('src/pages/PostAd.jsx', code);
console.log('Done! Lines:', code.split('\n').length);
