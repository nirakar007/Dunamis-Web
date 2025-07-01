// Featured Content Section Component
import { Play } from "lucide-react";
function FeaturedSection() {
  const featuredCourses = [
    {
      title: "Introduction to Functions",
      description:
        "A comprehensive course to all concepts and coverage of basic functions.",
      instructor: "Prof. Yang",
      duration: "1:52",
      category: "Math",
      image:
        "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Learn Japanese",
      description:
        "Discover the beautiful art and culture of Japan by learning Japanese language.",
      instructor: "Nomura Minato",
      duration: "1:22",
      category: "Language",
      image:
        "https://images.unsplash.com/photo-1528164344705-47542687000d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Sketching 101: Perspective",
      description:
        "Learn the fundamentals of perspective drawing and sketching techniques.",
      instructor: "Alex Fox",
      duration: "1:15",
      category: "Art",
      image:
        "https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-12">
          <span className="text-cyan-600">Featured</span> Content
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCourses.map((course, index) => (
            <FeaturedCard key={index} {...course} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default FeaturedSection;

// Featured Content Card Component
const FeaturedCard = ({
  title,
  description,
  instructor,
  duration,
  image,
  category,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative">
        <img src={image} alt={title} className="w-full h-48 object-cover" />
        <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm flex items-center gap-1">
          <Play size={12} />
          {duration}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">{instructor}</span>
          <div className="flex gap-2">
            <button className="bg-gray-900 text-white px-3 py-1 rounded text-sm hover:bg-gray-800 transition-colors">
              {category}
            </button>
            <button className="border border-gray-300 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-50 transition-colors">
              Preview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
