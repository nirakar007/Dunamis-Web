import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  BookOpen, // Added for error message icon
  CheckCircle,
  ChevronDown,
  Clock,
  Eye,
  Filter,
  Mail, // Added for success message icon
  Play,
  PlayCircle,
  Search,
  XCircle, // Added for error message icon
} from "lucide-react";
import { useMemo, useState } from "react";

// Featured Content Card Component
const FeaturedCard = ({
  title,
  description,
  instructor,
  duration,
  image,
  category,
  onPlayVideo, // New prop to handle playing the video
  videoData, // New prop to pass the full video object
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
            <button
              onClick={() => onPlayVideo(videoData)} // Use onPlayVideo to set selectedContent
              className="border border-gray-300 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-50 transition-colors"
            >
              Preview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Featured Content Section Component - Now receives 'allVideos' as a prop
function FeaturedSection({ onPlayVideo, allVideos }) {
  // Select the first 3 videos from the allVideos array to be featured
  // Ensure these videos have all necessary properties for VideoPlayer
  const featuredCourses = useMemo(() => {
    return allVideos.slice(0, 3).map((video) => ({
      id: video.id,
      title: video.title,
      description: video.description,
      instructor: video.author, // Map author to instructor
      duration: video.duration,
      category: video.categories[0], // Use the first category as the main category
      image: video.thumbnail, // Use thumbnail as image
      youtubeEmbedUrl: video.youtubeEmbedUrl,
      published: video.published,
      publishedDate: video.publishedDate,
      views: video.views,
      categories: video.categories,
      courseContent: video.courseContent,
      type: "video",
    }));
  }, [allVideos]);

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-12">
          <span className="text-custom-blue">Featured</span> Content
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCourses.map((course) => (
            <FeaturedCard
              key={course.id}
              {...course}
              onPlayVideo={onPlayVideo}
              videoData={course} // Pass the full course object as videoData
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const VideoCard = ({ video, isExpanded, onToggle, onPlayVideo }) => (
  <div
    className={`bg-white rounded-lg shadow-sm border overflow-hidden ${
      isExpanded ? "border-2 border-custom-blue shadow-lg" : "border-gray-100"
    }`}
  >
    <div className="flex items-start p-6 border-2 rounded-md">
      <div className="flex-shrink-0 mr-6">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-32 h-20 object-cover rounded-lg"
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 text-lg mb-2">
              {video.title}
            </h3>
            <div className="text-sm text-gray-600 mb-3">
              <span className="font-medium">By:</span> {video.author}
            </div>
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <Clock className="w-4 h-4 mr-1" />
              <span>{video.duration}</span>
              <span className="mx-2">•</span>
              <span>Published: {video.published}</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {video.categories.map((category, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-custom-blue text-blue-50 text-xs rounded-full"
                >
                  {category}
                </span>
              ))}
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              {video.description}
            </p>
          </div>
          <div className="flex flex-col items-center ml-6">
            <Eye className="w-5 h-5 text-custom-blue mb-1" />
            <span className="text-sm text-gray-600 font-medium">
              {video.views}
            </span>
            {isExpanded && (
              <span className="mt-2 px-3 py-1 bg-green-500 text-white text-xs rounded-full animate-pulse">
                Playing
              </span>
            )}
          </div>
        </div>

        {isExpanded && (
          <div className="mt-6 pt-6 border-t border-gray-100">
            <h4 className="font-semibold text-gray-900 mb-4">Course Content</h4>
            <div className="grid gap-1">
              {video.courseContent.map((content, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <h5 className="font-medium text-gray-900 mb-2">
                    {content.title}
                  </h5>
                  <p className="text-sm text-gray-600">{content.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
          <button
            onClick={() => onToggle(video.id)}
            className="text-custom-blue text-sm font-medium hover:text-blue-600 transition-colors"
          >
            {isExpanded ? "Show Less" : "Show Course Content"}
          </button>
          <button
            onClick={() => onPlayVideo(video)}
            className="flex items-center px-4 py-2 bg-custom-blue text-white text-sm font-medium rounded-md hover:bg-blue-600 transition-colors"
          >
            <PlayCircle className="w-4 h-4 mr-2" /> Go to Video
          </button>
        </div>
      </div>
    </div>
  </div>
);

// Updated VideoPlayer component
const VideoPlayer = ({ video, onClose }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-2 w-full max-w-3xl mx-auto">
    {" "}
    {/* Reduced width with max-w-3xl and mx-auto for centering */}
    <button
      onClick={onClose}
      className="mb-6 text-custom-blue hover:text-blue-600 transition-colors flex items-center font-medium cursor-pointer" // Made back button accessible/clickable
    >
      <ArrowLeft className="w-4 h-4 mr-2" />
      Back to Videos
    </button>
    <h2 className="font-bold text-gray-900 text-3xl mb-4">{video.title}</h2>
    <div className="aspect-video w-full bg-black rounded-lg overflow-hidden mb-6">
      {/* YouTube embedded video */}
      <iframe
        width="100%"
        height="100%"
        src={
          video.youtubeEmbedUrl ||
          "https://youtu.be/rGrBHiuPlT0?si=8S2tiHL7gAjUqmsE"
        } // Default YouTube video if none provided
        title={video.title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
    <div className="flex items-center text-sm text-gray-500 mb-4">
      <Clock className="w-4 h-4 mr-1" />
      <span>{video.duration}</span>
      <span className="mx-2">•</span>
      <span>Published: {video.published}</span>
      <span className="mx-2">•</span>
      <Eye className="w-4 h-4 mr-1" />
      <span>{video.views} Views</span>
    </div>
    <div className="flex flex-wrap gap-2 mb-4">
      {video.categories.map((category, index) => (
        <span
          key={index}
          className="px-3 py-1 bg-custom-blue text-blue-50 text-xs rounded-full"
        >
          {category}
        </span>
      ))}
    </div>
    <p className="text-gray-700 text-base leading-relaxed mb-6">
      {video.description}
    </p>
    <h4 className="font-semibold text-gray-900 mb-4">Course Content</h4>
    <div className="grid gap-3">
      {video.courseContent.map((content, index) => (
        <div key={index} className="p-4 bg-gray-50 rounded-lg">
          <h5 className="font-medium text-gray-900 mb-2">{content.title}</h5>
          <p className="text-sm text-gray-600">{content.description}</p>
        </div>
      ))}
    </div>
  </div>
);

const ResourcesPage = () => {
  const [activeTab, setActiveTab] = useState("videos");
  const [selectedContent, setSelectedContent] = useState(null); // Can be a video object or a readable item
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedVideo, setExpandedVideo] = useState(null);
  const [currentChapter, setCurrentChapter] = useState("introduction");
  const [activeReadTab, setActiveReadTab] = useState("pdfs");
  const [email, setEmail] = useState("");
  const [isSubmittingEmail, setIsSubmittingEmail] = useState(false);
  const [emailSubmitMessage, setEmailSubmitMessage] = useState({
    type: "",
    text: "",
  }); // {type: 'success'|'error', text: 'message'}

  const navigate = (path) => {
    navigate(path);
  };

  // Filter states
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedTags, setSelectedTags] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  // Mock data - expanded with more videos for better filtering demonstration
  const videos = [
    {
      id: 1,
      title: "History of Japan",
      author: "Namikaze Minato",
      duration: "90 mins",
      published: "July 29, 2025",
      publishedDate: new Date("2025-03-24"),
      views: 122,
      categories: ["Language"],
      thumbnail:
        "https://images.unsplash.com/photo-1668261200632-1d781ab9e0c4?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D=crop",
      description: "Read through the past of Japan when samurai existed",
      courseContent: [
        {
          title: "Foundations",
          description: "Master Hiragana, Katakana, and essential greetings.",
        },
        {
          title: "Core Grammar & Vocabulary",
          description: "Learn basic sentence structures and everyday words.",
        },
        {
          title: "Practical Conversation",
          description: "Develop skills for simple daily interactions.",
        },
        {
          title: "Kanji Introduction",
          description: "Begin exploring common ideographic characters.",
        },
      ],
      youtubeEmbedUrl: "https://www.youtube.com/embed/sM34lfjEos4", // Example YouTube URL
      type: "video", // Added type for consistent selectedContent handling
    },
    {
      id: 2,
      title: "Learn Japanese",
      author: "Namikaze Minato",
      duration: "45 mins",
      published: "March 24, 2025",
      publishedDate: new Date("2025-03-24"),
      views: 122,
      categories: ["Language"],
      thumbnail:
        "https://images.unsplash.com/photo-1528164344705-47542687000d?w=400&h=250&fit=crop",
      description:
        "Konnichiwa! 🌸 Embark on a Journey to Japan through its beautiful language. Open doors to a rich culture and new connections!",
      courseContent: [
        {
          title: "Foundations",
          description: "Master Hiragana, Katakana, and essential greetings.",
        },
        {
          title: "Core Grammar & Vocabulary",
          description: "Learn basic sentence structures and everyday words.",
        },
        {
          title: "Practical Conversation",
          description: "Develop skills for simple daily interactions.",
        },
        {
          title: "Kanji Introduction",
          description: "Begin exploring common ideographic characters.",
        },
      ],
      youtubeEmbedUrl: "https://www.youtube.com/embed/rGrBHiuPlT0", // Example YouTube URL
      type: "video", // Added type for consistent selectedContent handling
    },
    {
      id: 3,
      title: "Introduction to Digital Art",
      author: "Sarah Johnson",
      duration: "32 mins",
      published: "March 20, 2025",
      publishedDate: new Date("2025-03-20"),
      views: 89,
      categories: ["Art", "Digital"],
      thumbnail:
        "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=250&fit=crop",
      description:
        "Discover the fundamentals of digital art creation. Learn about different software, techniques, and develop your artistic skills in the digital medium.",
      courseContent: [
        {
          title: "Getting Started",
          description: "Introduction to digital art tools and software.",
        },
        {
          title: "Basic Techniques",
          description: "Learn fundamental drawing and coloring techniques.",
        },
      ],
      youtubeEmbedUrl: "https://www.youtube.com/embed/WLU26nqcvfY", // Example YouTube URL
      type: "video",
    },
    {
      id: 4,
      title: "Web Development Basics",
      author: "Alex Chen",
      duration: "60 mins",
      published: "March 18, 2025",
      publishedDate: new Date("2025-03-18"),
      views: 245,
      categories: ["Programming", "Web Development"],
      thumbnail:
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop",
      description:
        "Start your journey into web development. Learn HTML, CSS, and JavaScript fundamentals to build your first website.",
      courseContent: [
        {
          title: "HTML Fundamentals",
          description: "Structure your web pages with HTML.",
        },
        {
          title: "CSS Styling",
          description: "Style your websites with CSS.",
        },
        {
          title: "JavaScript Basics",
          description: "Add interactivity with JavaScript.",
        },
      ],
      youtubeEmbedUrl: "https://www.youtube.com/embed/ieCZvKsC_po", // Example YouTube URL
      type: "video",
    },
    {
      id: 5,
      title: "Photography Composition",
      author: "Maria Rodriguez",
      duration: "28 mins",
      published: "March 15, 2025",
      publishedDate: new Date("2025-03-15"),
      views: 156,
      categories: ["Photography", "Art"],
      thumbnail:
        "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=250&fit=crop",
      description:
        "Master the art of composition in photography. Learn the rule of thirds, leading lines, and other essential techniques.",
      courseContent: [
        {
          title: "Rule of Thirds",
          description: "Understanding the fundamental composition rule.",
        },
        {
          title: "Leading Lines",
          description: "Use lines to guide the viewer's eye.",
        },
      ],
      youtubeEmbedUrl: "https://www.youtube.com/embed/fD3yqP1P65A", // Example YouTube URL
      type: "video",
    },
  ];

  const readables = {
    pdfs: [
      {
        id: 1,
        title: "Your First Step into Japanese",
        author: "Namikaze Minato",
        readTime: "24 hours",
        published: "March 24, 2025",
        views: 122,
        thumbnail:
          "https://images.unsplash.com/photo-1528164344705-47542687000d?w=100&h=80&fit=crop",
        type: "pdf",
      },
      {
        id: 2,
        title:
          "An Introduction to the Language, Culture, and Learning Approach",
        author: "Haruka Tanaka & Jennifa Miller",
        readTime: "24 hours",
        published: "March 27, 2025",
        views: 122,
        thumbnail:
          "https://images.unsplash.com/photo-1522547902298-51566e4fb383?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D=crop",
        type: "pdf",
      },
    ],
    articles: [
      {
        id: 3,
        title: "Wonders of Traditional Culture in Japan",
        author: "Japan Education Travel",
        readTime: "7 mins",
        published: "March 7, 2025",
        views: 122,
        thumbnail:
          "https://images.unsplash.com/photo-1678733836013-1b49058ae7d4?q=80&w=784&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D  =crop",
        type: "article",
        url: "https://www.japan.travel/en/things-to-do/culture/traditional-culture/", // Added URL
      },
      {
        id: 4,
        title: "Samurai: History, Myths, and Legends",
        author: "Doblin Ernst",
        readTime: "2 mins",
        published: "Aug 03, 2020",
        views: 136,
        thumbnail:
          "https://images.unsplash.com/photo-1528164344705-47542687000d?w=100&h=80&fit=crop",
        type: "article",
        url: "https://www.britannica.com/topic/samurai", // Added URL
      },
    ],
  };

  // Expanded Table of Contents and PDF content
  const tableOfContents = {
    introduction: {
      title: "Introduction",
      subsections: [
        "About This Book",
        "How to Use This Book",
        "Tips for Studying Japanese",
        "Overview of the Japanese Language",
      ],
    },
    part1: {
      title: "Part I: The Basics",
      subsections: [
        "Japanese Writing Systems",
        "Hiragana",
        "Katakana",
        "Introduction to Kanji",
        "Pronunciation Guide",
        "Basic Japanese Grammar",
        "Sentence Structure: Subject-Object-Verb(SOV)",
        "Particles Overview (は, が, に, を, の, と, も)",
      ],
    },
    part2: {
      // New Chapter
      title: "Part II: Conversational Japanese",
      subsections: [
        "Greetings and Farewells",
        "Introducing Yourself",
        "Asking for Directions",
        "Ordering Food",
        "Shopping Phrases",
      ],
    },
    part3: {
      // New Chapter
      title: "Part III: Japanese Culture & Etiquette",
      subsections: [
        "Social Customs",
        "Dining Etiquette",
        "Temple and Shrine Visits",
        "Festivals and Traditions",
      ],
    },
  };

  const allPdfChaptersContent = {
    introduction: `
      <h2>Introduction</h2>
      <h3>About This Book</h3>
      <p>Welcome to Japanese for Beginners! Whether you're learning Japanese for travel, culture, anime, or future studies, this book is designed to give you a strong foundation in the language. You'll learn how to read and write using Japan's three writing systems, understand basic grammar, and start holding simple conversations.</p>
      <p>We believe language learning should be practical, fun, and culturally rich — so in addition to language instruction, you'll also find cultural tips, etiquette guides, and real-world expressions used in everyday life.</p>
      <h3>How to Use This Book</h3>
      <p>Each chapter in this book builds on the previous one, so we recommend going through it in order. Here's what to expect in each chapter:</p>
      <ul>
        <li><b>Grammar Points:</b> Clear explanations with examples</li>
        <li><b>Vocabulary Lists:</b> Useful words grouped by theme</li>
        <li><b>Practice Exercises:</b> To reinforce what you've learned</li>
        <li><b>Conversation Examples:</b> Realistic dialogues you can use</li>
        <li><b>Cultural Notes:</b> Tips on Japanese customs and etiquette</li>
      </ul>
      <p>Feel free to go at your own pace. Language learning is a journey, not a race!</p>
      <h3>Tips for Studying Japanese</h3>
      <ul>
        <li>Practice daily, even if it's just 10–15 minutes. Consistency is key.</li>
        <li>Use flashcards to memorize vocabulary and kana.</li>
        <li>Repeat aloud — speaking helps reinforce memory.</li>
        <li>Watch Japanese media (anime, dramas, YouTube) with subtitles to hear real-world usage.</li>
        <li>Don't fear mistakes — they're part of learning!</li>
      </ul>
      <p>Remember: It's okay not to understand everything right away. The more you expose yourself to the language, the more it will start to make sense.</p>
      <h3>Overview of the Japanese Language</h3>
      <p>Japanese is a unique and fascinating language spoken by over 125 million people. Some features include:</p>
      <ul>
        <li>Three writing systems: Hiragana (ひらがな), Katakana (カタカナ), and Kanji (漢字)</li>
        <li>Sentence order: Subject-Object-Verb (e.g., "I sushi eat.")</li>
        <li>Particles: Small words like は (wa) and を (o) that show how words relate to each other</li>
        <li>No plurals or articles (like "a" or "the") — context is everything</li>
        <li>Levels of politeness: Formal and informal speech depending on the situation</li>
      </ul>
      <p>Don't worry if that sounds overwhelming! We'll break it all down into simple, manageable steps.</p>
    `,
    part1: `
      <h2>Part I: The Basics</h2>
      <h3>Chapter 1: Japanese Writing Systems</h3>
      <p>The Marvelously Mysterious Triple-Script System of the Japanese Language</p>
      <h4>1.1 A Language Written in Three Scripts — And Sometimes, All at Once</h4>
      <p>Imagine this: you're in Tokyo. You walk past a ramen shop with its menu written in loopy, elegant characters. Then you spot a sign that screams "コーヒー — 50% OFF!" in sharp, angular letters. You pull out your guidebook and try to decipher what 日本語 even means. Confused yet?</p>
      <p>Welcome to the Japanese writing system — a beautiful, intricate, sometimes confounding blend of Hiragana, Katakana, and Kanji. These three scripts form the foundation of written Japanese, and all three are used in combination to express everything from poetic haiku to supermarket ads.</p>
      <p>Let's get this out of the way now:</p>
      <ul>
        <li>Yes, Japanese uses three scripts.</li>
        <li>Yes, they're all necessary.</li>
        <li>No, you don't need to memorize all 2,000 kanji this week.</li>
      </ul>
      <p>We'll walk through each system, one at a time, and show you why this apparent madness is, in fact, elegant genius.</p>
      <h4>1.2 Hiragana (ひらがな): The Friendly Script That Holds Everything Together</h4>
      <p>What is Hiragana?</p>
      <p>If the Japanese writing system were a house, Hiragana would be the walls and foundation. It's soft, curvy, and completely phonetic — that means each character represents a sound, not a meaning.</p>
      <p>Hiragana consists of 46 basic characters, which can be combined with diacritics (those two little dots or small circles) and digraphs (combined sounds like きゃ, kya) to express the entire range of Japanese syllables.</p>
      <p>It's used for:</p>
      <ul>
        <li>Grammatical glue — particles, verb endings, and function words</li>
        <li>Native Japanese words that don't have or don't use kanji</li>
        <li>Children's books and beginner's texts (you'll love hiragana-only manga!)</li>
        <li>Furigana, or small hiragana above kanji to show pronunciation</li>
      </ul>
    `,
    part2: `
      <h2>Part II: Conversational Japanese</h2>
      <h3>Chapter 2: Essential Daily Phrases</h3>
      <p>Now that you have a grasp of the basics, let's dive into phrases you'll use every day!</p>
      <h4>2.1 Greetings and Farewells</h4>
      <ul>
        <li><b>おはようございます (Ohayou gozaimasu):</b> Good morning (formal)</li>
        <li><b>こんにちは (Konnichiwa):</b> Hello/Good afternoon</li>
        <li><b>こんばんは (Konbanwa):</b> Good evening</li>
        <li><b>おやすみなさい (Oyasuminasai):</b> Good night</li>
        <li><b>さようなら (Sayounara):</b> Goodbye</li>
        <li><b>またね (Mata ne):</b> See you later (informal)</li>
      </ul>
      <h4>2.2 Introducing Yourself</h4>
      <p>When meeting someone new, here's how to introduce yourself:</p>
      <ul>
        <li><b>はじめまして (Hajimemashite):</b> Nice to meet you (first time meeting)</li>
        <li><b>[Your Name] です ([Your Name] desu):</b> I am [Your Name]</li>
        <li><b>どうぞよろしくお願いします (Douzo yoroshiku onegaishimasu):</b> Pleased to make your acquaintance (a very common and important phrase!)</li>
      </ul>
      <h4>2.3 Asking for Directions</h4>
      <p>Getting around Japan is easier with a few key phrases:</p>
      <ul>
        <li><b>すみません (Sumimasen):</b> Excuse me / Sorry (to get attention)</li>
        <li><b>[Place] はどこですか ([Place] wa doko desu ka?):</b> Where is [Place]?</li>
        <li><b>まっすぐ (Massugu):</b> Straight ahead</li>
        <li><b>右 (Migi):</b> Right</li>
        <li><b><b>左 (Hidari):</b> Left</li>
      </ul>
      <p>Practice these phrases with a native speaker or a language exchange partner to build your confidence!</p>
    `,
    part3: `
      <h2>Part III: Japanese Culture & Etiquette</h2>
      <h3>Chapter 3: Navigating Social Norms</h3>
      <p>Understanding Japanese customs will enhance your experience and show respect.</p>
      <h4>3.1 Social Customs and Politeness</h4>
      <ul>
        <li><b>Bowing (お辞儀 - Ojigi):</b> Bowing is a fundamental part of Japanese etiquette, used for greetings, apologies, and showing respect. The depth of the bow conveys different levels of formality.</li>
        <li><b>Exchanging Business Cards (名刺交換 - Meishi Koukan):</b> When exchanging business cards, present and receive them with both hands, reading the card carefully before putting it away respectfully.</li>
        <li><b>Taking Off Shoes (靴を脱ぐ - Kutsu o Nugu):</b> Always remove your shoes when entering a Japanese home, some restaurants, temples, and traditional accommodations like ryokan. Look for a genkan (entryway) and slippers.</li>
      </ul>
      <h4>3.2 Dining Etiquette</h4>
      <p>Enjoying Japanese food comes with its own set of etiquette:</p>
      <ul>
        <li><b>"Itadakimasu" and "Gochisousama":</b> Before eating, say "Itadakimasu" (いただきます) to express gratitude for the meal. After finishing, say "Gochisousama (deshita)" (ごちそうさま (でした)) to thank the host or chef.</li>
        <li><b>Chopsticks (箸 - Hashi):</b> Do not stick chopsticks upright in your rice, pass food with chopsticks, or point with them. When not in use, place them on a chopstick rest.</li>
        <li><b>Slurping Noodles:</b> It's generally acceptable, and even encouraged by some, to slurp noodles and soup in Japan, as it can be a sign of enjoyment.</li>
      </ul>
      <p>These cultural notes are just a starting point. Observing and learning from locals is always the best way to immerse yourself!</p>
    `,
  };

  // Get all unique tags from videos
  const allTags = useMemo(() => {
    const tags = videos.flatMap((video) => video.categories);
    return [...new Set(tags)];
  }, [videos]);

  // Filter and sort videos
  const filteredAndSortedVideos = useMemo(() => {
    let filtered = videos;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (video) =>
          video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          video.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
          video.categories.some((cat) =>
            cat.toLowerCase().includes(searchQuery.toLowerCase())
          ) ||
          video.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply tag filter
    if (selectedTags.length > 0) {
      filtered = filtered.filter((video) =>
        selectedTags.some((tag) => video.categories.includes(tag))
      );
    }

    // Sort videos
    filtered.sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case "date":
          comparison = a.publishedDate.getTime() - b.publishedDate.getTime();
          break;
        case "title":
          comparison = a.title.localeCompare(b.title);
          break;
        case "author":
          comparison = a.author.localeCompare(b.author);
          break;
        case "views":
          comparison = a.views - b.views;
          break;
        case "duration":
          const aDuration = parseInt(a.duration.replace(/\D/g, ""));
          const bDuration = parseInt(b.duration.replace(/\D/g, ""));
          comparison = aDuration - bDuration;
          break;
        default:
          comparison = 0;
      }

      return sortOrder === "asc" ? comparison : -comparison;
    });

    return filtered;
  }, [videos, searchQuery, selectedTags, sortBy, sortOrder]);

  const handleTagToggle = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedTags([]);
    setSortBy("date");
    setSortOrder("desc");
  };

  const ReadableCard = ({ item, type }) => {
    const cardContent = (
      <div className="flex items-center p-4 border">
        <div className="flex-shrink-0 mr-4">
          <img
            src={item.thumbnail}
            alt={item.title}
            className="w-20 h-16 object-cover rounded-lg"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-2">
            {item.title}
          </h3>
          <div className="text-xs text-gray-600 mb-2">
            <span className="font-medium">By:</span> {item.author}
          </div>
          <div className="flex items-center text-xs text-gray-500">
            <Clock className="w-3 h-3 mr-1" />
            <span>Read time: {item.readTime}</span>
            <span className="mx-2">•</span>
            <span>Published: {item.published}</span>
          </div>
        </div>
        <div className="flex-shrink-0 flex flex-col items-center justify-center ml-4">
          <Eye className="w-4 h-4 text-custom-blue mb-1" />
          <span className="text-xs text-gray-600 font-medium">
            {item.views}
          </span>
        </div>
      </div>
    );

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden mb-4 cursor-pointer hover:shadow-md transition-all duration-300 hover:border-custom-blue"
      >
        {type === "pdfs" ? (
          <div onClick={() => setSelectedContent(item)}>{cardContent}</div>
        ) : (
          <a href={item.url} target="_blank" rel="noopener noreferrer">
            {cardContent}
          </a>
        )}
      </motion.div>
    );
  };

  const TableOfContents = ({ onChapterClick, currentChapter }) => (
    <div className="bg-white rounded-md shadow-sm border-2 border-gray-200 p-6 sticky top-6">
      <div className="flex border-b-2 py-2 items-center mb-2">
        <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mr-3">
          <BookOpen className="w-4 h-4 text-white" />
        </div>
        <h3 className="font-semibold text-gray-800">Table of content</h3>
      </div>

      <div className="space-y-1">
        {Object.entries(tableOfContents).map(([key, section]) => (
          <div key={key}>
            <button
              onClick={() => onChapterClick(key)}
              className={`text-left w-full text-sm py-3 px-3 rounded-md hover:bg-custom-blue/10 transition-colors font-medium ${
                currentChapter === key
                  ? "bg-custom-blue text-white"
                  : "text-gray-700 hover:text-custom-blue"
              }`}
            >
              {section.title}
            </button>
            {section.subsections && (
              <div className="ml-6 mt-1 space-y-1">
                {section.subsections.map((subsection, index) => (
                  <button
                    key={index}
                    // This button doesn't change chapters directly, it's just for display
                    className="text-xs text-gray-600 block py-2 hover:text-custom-blue transition-colors"
                  >
                    -{subsection}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const PDFReader = ({ content }) => (
    <div
      className="flex gap-2
    "
    >
      <div className="flex-1">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-2">
          {/* Back button specific to PDF reader */}
          <button
            onClick={() => setSelectedContent(null)}
            className="mb-6 text-custom-blue hover:text-blue-600 transition-colors flex items-center font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Reads
          </button>
          <h2 className="font-bold text-gray-900 text-3xl mb-4">
            {content.title}
          </h2>
          <div className="text-sm text-gray-600 mb-6">
            <span className="font-medium">By:</span> {content.author}
            <span className="mx-2">•</span>
            <span>Published: {content.published}</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentChapter} // Key changes to trigger animation on chapter change
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="prose max-w-none"
            >
              <div
                className="bg-neutral-100 p-6 rounded-md border border-custom-blue border-opacity-50 text-gray-800 leading-relaxed space-y-6"
                dangerouslySetInnerHTML={{
                  __html: allPdfChaptersContent[currentChapter],
                }}
              ></div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <div className="w-80">
        <TableOfContents
          onChapterClick={setCurrentChapter}
          currentChapter={currentChapter}
        />
      </div>
    </div>
  );

  const FilterSection = () => (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mb-6"
    >
      <div className="flex items-center justify-between ">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Filter className="w-4 h-4 mr-2" />
          <span className="font-medium">Filters</span>
          <ChevronDown
            className={`w-4 h-4 ml-2 transition-transform ${
              showFilters ? "rotate-180" : ""
            }`}
          />
        </button>

        {(selectedTags.length > 0 ||
          searchQuery ||
          sortBy !== "date" ||
          sortOrder !== "desc") && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-custom-blue hover:text-custom-blue font-medium"
          >
            Clear all filters
          </button>
        )}
      </div>

      {showFilters && (
        <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
          {/* Sort Options */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Sort by</h4>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center space-x-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-custom-blue focus:border-transparent"
                >
                  <option value="date">Date Published</option>
                  <option value="title">Title</option>
                  <option value="author">Author</option>
                  <option value="views">Views</option>
                  <option value="duration">Duration</option>
                </select>
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-custom-blue focus:border-transparent"
                >
                  <option value="desc">Descending</option>
                  <option value="asc">Ascending</option>
                </select>
              </div>
            </div>
          </div>

          {/* Tags Filter */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Filter by Tags</h4>
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagToggle(tag)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    selectedTags.includes(tag)
                      ? "bg-custom-blue text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
            {selectedTags.length > 0 && (
              <div className="mt-3">
                <span className="text-sm text-gray-600">
                  Active filters: {selectedTags.join(", ")}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );

  const ContentList = () => {
    if (activeTab === "videos") {
      return (
        <motion.div
          key={searchQuery + selectedTags.length + sortBy + sortOrder} // Key to re-animate on filter change
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-2"
        >
          <div className="flex justify-between items-center">
            <FilterSection />
            {/* Results count */}
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600 p-2">
                Showing {filteredAndSortedVideos.length} of {videos.length}{" "}
                videos
              </p>
            </div>
          </div>

          {/* Video List */}
          <div className="space-y-2">
            {filteredAndSortedVideos.length > 0 ? (
              filteredAndSortedVideos.map((video) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  isExpanded={expandedVideo === video.id}
                  onToggle={(id) =>
                    setExpandedVideo(expandedVideo === id ? null : id)
                  }
                  onPlayVideo={(videoToPlay) => setSelectedContent(videoToPlay)}
                />
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">
                  No videos found matching your filters.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="mt-2 text-custom-blue hover:text-custom-blue font-medium"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </motion.div>
      );
    }

    if (activeTab === "read") {
      return (
        <motion.div
          key={activeReadTab} // Key to re-animate on read tab change
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-6"
        >
          {/* Tab Navigation */}
          <div className="flex space-x-1 bg-gray-100 rounded-sm p-1">
            <button
              onClick={() => setActiveReadTab("pdfs")}
              className={`flex-1 px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                activeReadTab === "pdfs"
                  ? "bg-custom-blue text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
            >
              PDFs ({readables.pdfs.length})
            </button>
            <button
              onClick={() => setActiveReadTab("articles")}
              className={`flex-1 px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                activeReadTab === "articles"
                  ? "bg-custom-blue text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
            >
              Articles/Blog Posts ({readables.articles.length})
            </button>
          </div>

          {/* Content List */}
          <div className="space-y-4">
            {readables[activeReadTab].map((item) => (
              <ReadableCard key={item.id} item={item} type={activeReadTab} />
            ))}
          </div>
        </motion.div>
      );
    }
  };

  const handleSubscribe = () => {
    setEmailSubmitMessage({ type: "", text: "" }); // Clear previous messages

    if (!email || !email.includes("@") || !email.includes(".")) {
      setEmailSubmitMessage({
        type: "error",
        text: "Please enter a valid email address.",
      });
      return;
    }

    setIsSubmittingEmail(true);

    // Simulate API call to a backend email service
    setTimeout(() => {
      setIsSubmittingEmail(false);
      // Simulate success or failure
      if (Math.random() > 0.2) {
        // 80% chance of success
        setEmailSubmitMessage({
          type: "success",
          text: "Successfully subscribed! Check your inbox.",
        });
        setEmail(""); // Clear email on success
      } else {
        setEmailSubmitMessage({
          type: "error",
          text: "Failed to subscribe. Please try again.",
        });
      }
    }, 1500); // Simulate network delay
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex">
          {/* Left Sidebar */}
          <div className="w-44 bg-white shadow-sm border-r border-gray-200 min-h-screen">
            <div className="p-3">
              <h2 className="font-semibold text-gray-800 text-2xl mb-6 px-4 py-4 border-b-2">
                Contents
              </h2>
              <div className="space-y-3">
                <button
                  onClick={() => {
                    setActiveTab("videos");
                    setSelectedContent(null);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-sm text-sm font-medium transition-all duration-200 ${
                    activeTab === "videos"
                      ? "bg-custom-blue text-white shadow-sm"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                  }`}
                >
                  Videos ({videos.length})
                </button>
                <button
                  onClick={() => {
                    setActiveTab("read");
                    setSelectedContent(null);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-sm text-sm font-medium transition-all duration-200 ${
                    activeTab === "read"
                      ? "bg-custom-blue text-white shadow-sm"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                  }`}
                >
                  Read (4)
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {!selectedContent ? (
              <div className="p-8">
                {/* Search Bar */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="relative mb-8"
                >
                  <Search className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search in contents, eg. Communication, Art"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 border-b border-gray-400 focus:border-custom-blue bg-white text-gray-800 placeholder-gray-500"
                  />
                </motion.div>

                <ContentList />
                {/* Featured Section added here, passing the main videos array */}
                <FeaturedSection
                  onPlayVideo={(videoToPlay) => setSelectedContent(videoToPlay)}
                  allVideos={videos} // Pass the main videos array
                />
              </div>
            ) : (
              <div className="p-8">
                {selectedContent.type === "pdf" ? (
                  <PDFReader content={selectedContent} />
                ) : (
                  <VideoPlayer
                    video={selectedContent}
                    onClose={() => setSelectedContent(null)}
                  />
                )}
              </div>
            )}
          </div>

          {/* Right Sidebar - Support Section */}
          {!selectedContent && (
            <div className="w-80 bg-white shadow-sm border-l border-gray-200 p-6">
              <div className="mb-8">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mr-3">
                    <BookOpen className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <span className="font-semibold text-gray-800">Support</span>
                    <span className="text-sm text-gray-600 ml-2">
                      Free Education
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                  Help the creator continue making quality educational content.
                </p>

                <div className="space-y-3">
                  <button
                    onClick={() => handleClick("/donate")}
                    className="w-full border-gray-500 border-2 border-opacity-30 text-gray-700 py-3 px-4 rounded-lg text-sm font-medium hover:bg-custom-blue hover:text-white transition-colors shadow-sm"
                  >
                    💳 Donate Rs 250
                  </button>
                  <button
                    onClick={() => handleClick("/donate")}
                    className="w-full border-gray-500 border-2 border-opacity-30 text-gray-700 py-3 px-4 rounded-lg text-sm font-medium hover:bg-yellow-600 hover:text-white transition-colors shadow-sm"
                  >
                    💳 Donate Rs 500
                  </button>
                  <button
                    onClick={() => handleClick("/donate")}
                    className="w-full border-custom-blue border-2 border-opacity-30 text-gray-700 py-3 px-4 rounded-lg text-sm font-medium hover:bg-orange-600 hover:text-white transition-colors shadow-sm"
                  >
                    Custom amount
                  </button>
                </div>
              </div>

              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <Mail className="w-5 h-5 text-gray-600 mr-2" />
                  <span className="font-semibold text-gray-800">
                    Get Updates
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  Subscribe to get notified of new content from this teacher.
                </p>
                <input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailSubmitMessage({ type: "", text: "" }); // Clear message on input change
                  }}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm mb-4 focus:ring-2 focus:ring-custom-blue focus:border-transparent"
                  disabled={isSubmittingEmail}
                />
                <button
                  onClick={handleSubscribe}
                  className={`w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-lg text-sm font-medium transition-colors shadow-sm
                    ${
                      isSubmittingEmail
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-gray-900 hover:text-white"
                    }`}
                  disabled={isSubmittingEmail}
                >
                  {isSubmittingEmail ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-700"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Subscribing...
                    </span>
                  ) : (
                    "📝 Subscribe"
                  )}
                </button>
                {emailSubmitMessage.text && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mt-3 flex items-center text-sm ${
                      emailSubmitMessage.type === "success"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {emailSubmitMessage.type === "success" ? (
                      <CheckCircle className="w-4 h-4 mr-2" />
                    ) : (
                      <XCircle className="w-4 h-4 mr-2" />
                    )}
                    {emailSubmitMessage.text}
                  </motion.div>
                )}
              </div>

              <div>
                <div className="flex items-center mb-4">
                  <div className="w-6 h-6 bg-custom-blue rounded-full flex items-center justify-center mr-2">
                    <BookOpen className="w-3 h-3 text-white" />
                  </div>
                  <span className="font-semibold text-gray-800">
                    Related Content
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="border border-gray-200 rounded-lg p-3 hover:border-custom-blue transition-colors cursor-pointer">
                    <img
                      src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=100&h=60&fit=crop"
                      alt="Learn Spanish"
                      className="w-full h-16 object-cover rounded mb-2"
                    />
                    <p className="text-xs text-center font-medium text-gray-700">
                      Learn Spanish
                    </p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-3 hover:border-custom-blue transition-colors cursor-pointer">
                    <img
                      src="https://images.unsplash.com/photo-1527866959252-deab85ef7d1b?w=100&h=60&fit=crop"
                      alt="Learn German"
                      className="w-full h-16 object-cover rounded mb-2"
                    />
                    <p className="text-xs text-center font-medium text-gray-700">
                      Learn German
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ResourcesPage;
