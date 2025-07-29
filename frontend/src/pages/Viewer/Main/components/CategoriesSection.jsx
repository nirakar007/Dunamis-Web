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
      color: "text-custom-blue",
    },
    {
      icon: Beaker,
      title: "Science",
      courseCount: 8,
      color: "text-custom-blue",
    },
    {
      icon: Laptop,
      title: "Technology",
      courseCount: 27,
      color: "text-custom-blue",
    },
    {
      icon: Globe,
      title: "Languages",
      courseCount: 101,
      color: "text-custom-blue",
    },
    {
      icon: TrendingUp,
      title: "Art & Design",
      courseCount: 15,
      color: "text-custom-blue",
    },
    {
      icon: Briefcase,
      title: "Business & Finance",
      courseCount: 17,
      color: "text-custom-blue",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-8">
        <p className="text-gray-600 text-xl text-opacity-35 mb-16">
          "Discover thousands of free courses from expert teachers worldwide."
        </p>
      </div>

      <h2 className="text-4xl font-bold text-gray-900 mb-4">
        Explore <span className="text-gray-600 font-light">by Category</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <CategoryCard key={index} {...category} />
        ))}
      </div>
    </div>
  );
}

export default CategoriesSection;
