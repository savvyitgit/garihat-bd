import { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const Listings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/listings')
      .then((res) => res.json())
      .then((data) => { setListings(data); setLoading(false); })
      .catch((err) => { console.log('Error:', err); setLoading(false); });
  }, []);

  return (
    <div>
      <Navbar />
      <div className='max-w-6xl mx-auto px-4 py-8 mt-16'>
        <div className='mb-6'>
          <h1 className='text-2xl font-bold text-gray-800'>All Listings</h1>
          <p className='text-gray-400 text-sm mt-1'>{listings.length} vehicles found</p>
        </div>
        {loading ? (
          <p className='text-center text-gray-400'>Loading...</p>
        ) : (
          <div className='flex flex-col gap-4'>
            {listings.map((car) => (
              <a href={'/listings/' + (car.id || car._id)} key={car.id || car._id} className='flex gap-4 border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition bg-white'>
                <div className='w-48 h-36 flex-shrink-0'>
                  <img src={car.image || '/modem-black-car.png'} alt={car.title} className='w-full h-full object-cover' />
                </div>
                <div className='flex-1 p-4'>
                  <h3 className='font-bold text-gray-800 text-lg mb-1'>{car.title}</h3>
                  <p className='text-red-600 font-bold text-xl mb-2'>{car.price}</p>
                  <div className='flex flex-wrap gap-3 text-sm text-gray-500'>
                    <span>{car.location}</span>
                    <span>{car.year}</span>
                    <span>{car.fuel}</span>
                    <span>{car.brand}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Listings;