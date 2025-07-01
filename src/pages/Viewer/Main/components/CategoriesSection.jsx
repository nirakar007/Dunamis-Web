// Category Card Component
import {
  Beaker,
  Briefcase,
  Globe,
  Laptop,
  Monitor,
  TrendingUp,
} from "lucide-react";

const CategoryCard = ({
  icon: Icon,
  title,
  courseCount,
  color = "text-blue-500",
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex flex-col items-center text-center">
        <div className={`${color} mb-4`}>
          <Icon size={40} />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-500 text-sm">{courseCount} courses</p>
      </div>
    </div>
  );
};

// Categories Section Component
function CategoriesSection() {
  const categories = [
    {
      icon: Monitor,
      title: "Mathematics",
      courseCount: 12,
      color: "text-cyan-500",
    },
    { icon: Beaker, title: "Science", courseCount: 8, color: "text-cyan-500" },
    {
      icon: Laptop,
      title: "Technology",
      courseCount: 27,
      color: "text-cyan-500",
    },
    {
      icon: Globe,
      title: "Languages",
      courseCount: 101,
      color: "text-cyan-500",
    },
    {
      icon: TrendingUp,
      title: "Art & Design",
      courseCount: 15,
      color: "text-cyan-500",
    },
    {
      icon: Briefcase,
      title: "Business & Finance",
      courseCount: 17,
      color: "text-cyan-500",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-8">
        <p className="text-gray-600 mb-2">
          "Discover thousands of free courses from expert teachers worldwide."
        </p>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mb-12">
        Explore <span className="text-gray-600">by Category</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {categories.map((category, index) => (
          <CategoryCard key={index} {...category} />
        ))}
      </div>

      {/* Filter Controls */}
      <div className="flex flex-wrap gap-4 items-center justify-between bg-gray-50 p-4 rounded-lg">
        <div className="flex gap-4">
          <select className="border border-gray-300 rounded px-3 py-2 text-sm">
            <option>Level</option>
          </select>
          <select className="border border-gray-300 rounded px-3 py-2 text-sm">
            <option>Duration</option>
          </select>
          <select className="border border-gray-300 rounded px-3 py-2 text-sm">
            <option>Sort by</option>
          </select>
        </div>
        <button className="bg-cyan-600 text-white px-6 py-2 rounded font-medium hover:bg-blue-600 transition-colors">
          Done
        </button>
      </div>
    </div>
  );
}

export default CategoriesSection;
