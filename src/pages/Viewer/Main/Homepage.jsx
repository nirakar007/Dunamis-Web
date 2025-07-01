import ScrollFloat from "../../../components/animations/ScrollFloat";
import CategoriesSection from "./components/CategoriesSection";
import DonationSection from "./components/DonationSection";
import FeaturedSection from "./components/FeaturedSection";
import HeroSection from "./components/HeroSection";
import NewsletterSection from "./components/NewsletterSection";

function Homepage() {
  return (
    <div className="">
      
        <SearchBar />
        <HeroSection />
        <CategoriesSection />
        <FeaturedSection />
        <DonationSection />
        <NewsletterSection />
    </div>
  );
}

export default Homepage;

import { Search } from "lucide-react";

// Search Bar Component
const SearchBar = () => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="relative">
        <input
          type="text"
          placeholder="Search for courses, topics or your own learning preferences"
          className="w-full px-4 py-3 pl-4 pr-12 border focus:border-blue-400 rounded focus:outline-none focus:border-b-4"
        />
        <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      </div>
    </div>
  );
};
