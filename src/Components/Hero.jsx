import { useState, useEffect } from 'react'

const slides = [
  {
    id: 1,
    title: "Find Your Next",
    highlight: "Car",
    subtitle: "Browse thousands of used & new cars across Bangladesh",
    image: "/modem-black-car.png",
  },
  {
    id: 2,
    title: "Find Your Next",
    highlight: "Motorcycle",
    subtitle: "Best deals on motorcycles across Bangladesh",
    image: "/bike.png",
  },
  {
    id: 3,
    title: "Find Your Next",
    highlight: "Truck",
    subtitle: "Commercial trucks & heavy vehicles for your business",
    image: "/cargo.png",
  },
  {
    id: 4,
    title: "Find Your Next",
    highlight: "More Vehicles",
    subtitle: "Find all types of vehicles across Bangladesh",
    image: "/bicycle.png",
  }
]

const brands = ['All Brands', 'Toyota', 'Honda', 'Nissan', 'Suzuki', 'Yamaha', 'Bajaj']
const models = ['All Models', 'Corolla', 'Civic', 'Axio', 'Premio', 'Allion']

const Hero = () => {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 20000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="pt-16 bg-white">
      <div className="bg-gray-100 pb-16">
        <div className="max-w-5xl mx-auto px-4 py-8">

          {/* Hero content */}
          <div className="flex flex-col md:flex-row items-center gap-8">

            {/* Text - always visible */}
            <div className="flex-1 flex flex-col justify-center text-center md:text-left">
              <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-2">
                {slides[current].title}
              </h1>
              <h2 className="text-3xl md:text-5xl font-bold text-[#DB1408] mb-4">
                {slides[current].highlight}
              </h2>
              <p className="text-gray-500 text-base md:text-lg mb-6">
                {slides[current].subtitle}
              </p>
              <a href="/listings"
                className="bg-[#DB1408] text-white px-6 py-2 rounded-lg font-bold text-base hover:bg-red-700 transition w-fit mx-auto md:mx-0">
                View Listings
              </a>
              <div className="flex gap-2 mt-6 justify-center md:justify-start">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrent(index)}
                    className={`w-3 h-3 rounded-full transition ${
                      index === current ? 'bg-[#DB1408]' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Image - hidden on mobile, visible on desktop */}
            <div className="hidden md:flex flex-1 h-[350px] items-center justify-center">
              <img
                src={slides[current].image}
                alt={slides[current].highlight}
                className="w-full h-full object-contain"
              />
            </div>

          </div>
        </div>

        {/* Search bar */}
        <div className="max-w-2xl mx-4 sm:mx-auto bg-white shadow-lg rounded-2xl sm:rounded-full px-4 py-4 flex flex-col sm:flex-row gap-3 items-center border border-gray-200 relative z-10 -mb-8">
          <select className="w-full sm:flex-1 border border-gray-300 rounded-lg px-4 py-2 text-gray-700 text-sm">
            {brands.map(brand => (
              <option key={brand}>{brand}</option>
            ))}
          </select>
          <select className="w-full sm:flex-1 border border-gray-300 rounded-lg px-4 py-2 text-gray-700 text-sm">
            {models.map(model => (
              <option key={model}>{model}</option>
            ))}
          </select>
          <button className="w-full sm:w-auto bg-[#0828AF] text-white px-8 py-2 rounded-full font-bold hover:bg-red-700 transition text-sm">
            Search
          </button>
        </div>

      </div>
    </div>
  )
}

export default Hero