import { motion } from "framer-motion";
import CategoriesSection from "./components/CategoriesSection";
import DonationSection from "./components/DonationSection";
import FeaturedSection from "./components/FeaturedSection";
import HeroSection from "./components/HeroSection";
import NewsletterSection from "./components/NewsletterSection";

function Homepage() {
  return (
    <div className="p-2">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <SearchBar />
        <HeroSection />
        <CategoriesSection />
        <FeaturedSection />
        <DonationSection />
        <NewsletterSection />
      </motion.div>
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
          className="w-full px-4 py-3 pl-4 pr-12 rounded focus:outline-custom-blue"
        />
        <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      </div>
    </div>
  );
};
