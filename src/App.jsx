import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Hero from './Components/Hero'
import BrandLogos from './Components/BrandLogos'
import FeaturedListings from "./Components/FeaturedListings"
import BrowseByCategory from "./Components/BrowseByCategory"
import HowItWorks from "./Components/HowItWorks"
import Footer from "./Components/Footer"
import Listings from "./pages/Listings"
import ListingDetail from "./pages/ListingDetail"
import PostAd from "./pages/PostAd"

function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <BrandLogos />
      <FeaturedListings />
      <BrowseByCategory />
      <HowItWorks />
      <Footer />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/listings/:id" element={<ListingDetail />} />
        <Route path="/post-ad" element={<PostAd />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App