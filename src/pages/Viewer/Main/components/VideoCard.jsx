import {
  BookOpen,
  ChevronDown,
  ChevronRight,
  Clock,
  Eye,
  Play,
} from "lucide-react";
const VideoCard = ({ video, isExpanded, onToggle }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6 hover:shadow-md transition-all duration-300">
    <div className="relative group">
      <img
        src={video.thumbnail}
        alt={video.title}
        className="w-full h-56 object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
        <div className="w-16 h-16 bg-white bg-opacity-20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <Play className="w-8 h-8 text-white ml-1" />
        </div>
      </div>
      <div className="absolute top-3 right-3 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm font-medium">
        {video.duration}
      </div>
    </div>

    <div className="p-6">
      <h3 className="font-bold text-xl mb-3 text-gray-800">{video.title}</h3>
      <div className="flex items-center text-sm text-gray-600 mb-4 flex-wrap gap-2">
        <span className="font-medium">By: {video.author}</span>
        <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
        <div className="flex items-center">
          <Clock className="w-4 h-4 mr-1" />
          <span>Duration: {video.duration}</span>
        </div>
        <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
        <span>Published: {video.published}</span>
        <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
        <div className="flex items-center">
          <Eye className="w-4 h-4 mr-1" />
          <span>{video.views}</span>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        {video.categories.map((category, index) => (
          <span
            key={index}
            className="bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-medium"
          >
            {category}
          </span>
        ))}
      </div>

      <button
        onClick={() => onToggle(video.id)}
        className="flex items-center text-gray-600 hover:text-blue-900 transition-colors font-medium"
      >
        {isExpanded ? (
          <ChevronDown className="w-5 h-5 mr-1" />
        ) : (
          <ChevronRight className="w-5 h-5 mr-1" />
        )}
        Description
      </button>

      {isExpanded && (
        <div className="mt-4 p-4 bg-gray-100 rounded-sm border border-gray-300">
          <p className="text-gray-800 mb-4 leading-relaxed">
            {video.description}
          </p>
          <div>
            <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
              <BookOpen className="w-4 h-4 mr-2" />
              Course Content
            </h4>
            <ul className="space-y-4">
              {video.courseContent.map((item, index) => (
                <li key={index} className="text-sm text-gray-700">
                  <span className="font-medium text-gray-900">
                    • {item.title}:
                  </span>{" "}
                  {item.description}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  </div>
);

export default VideoCard;
