import Navbar from './Components/Navbar'
import Hero from './Components/Hero'
import BrandLogos from './Components/BrandLogos'
import FeaturedListings from "./Components/FeaturedListings";
import BrowseByCategory from "./Components/BrowseByCategory";
import HowItWorks from "./Components/HowItWorks";
import Footer from "./Components/Footer";

function App() {
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

export default App