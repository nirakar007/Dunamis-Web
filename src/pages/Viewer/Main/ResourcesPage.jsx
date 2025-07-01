import {
  ArrowLeft,
  BookOpen,
  ChevronDown,
  Clock,
  Eye,
  Filter,
  Mail,
  Search,
} from "lucide-react";
import { useMemo, useState } from "react";

const VideoCard = ({ video, isExpanded, onToggle }) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
    <div className="flex items-start p-6">
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
          </div>
        </div>

        {isExpanded && (
          <div className="mt-6 pt-6 border-t border-gray-100">
            <h4 className="font-semibold text-gray-900 mb-4">Course Content</h4>
            <div className="grid gap-3">
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

        <div className="mt-4 pt-4 border-t border-gray-100">
          <button
            onClick={() => onToggle(video.id)}
            className="text-custom-blue text-sm font-medium hover:text-blue-600 transition-colors"
          >
            {isExpanded ? "Show Less" : "Show Course Content"}
          </button>
        </div>
      </div>
    </div>
  </div>
);

const ResourcesPage = () => {
  const [activeTab, setActiveTab] = useState("videos");
  const [selectedContent, setSelectedContent] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedVideo, setExpandedVideo] = useState(null);
  const [currentChapter, setCurrentChapter] = useState("introduction");
  const [activeReadTab, setActiveReadTab] = useState("pdfs");
  const [email, setEmail] = useState("");

  // Filter states
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedTags, setSelectedTags] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  // Mock data - expanded with more videos for better filtering demonstration
  const videos = [
    {
      id: 1,
      title: "Learn Japanese",
      author: "Namikaze Minato",
      duration: "45 mins",
      published: "March 24, 2025",
      publishedDate: new Date("2025-03-24"),
      views: 122,
      categories: ["Communication", "Language"],
      thumbnail:
        "https://images.unsplash.com/photo-1528164344705-47542687000d?w=400&h=250&fit=crop",
      description:
        "Konnichiwa! 🌸 Embark on a Journey to Japan through its beautiful language. From essential phrases to understanding anime and manga Master hiragana, katakana, and basic kanji. Open doors to a rich culture and new connections!",
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
    },
    {
      id: 2,
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
    },
    {
      id: 3,
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
    },
    {
      id: 4,
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
          "https://images.unsplash.com/photo-1490884786073-80aeb7b37a50?w=100&h=80&fit=crop",
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
          "https://images.unsplash.com/photo-1490884786073-80aeb7b37a50?w=100&h=80&fit=crop",
        type: "article",
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
      },
    ],
  };

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
  };

  const pdfContent = `Introduction

About This Book
Welcome to Japanese for Beginners! Whether you're learning Japanese for travel, culture, anime, or future studies, this book is designed to give you a strong foundation in the language. You'll learn how to read and write using Japan's three writing systems, understand basic grammar, and start holding simple conversations.

We believe language learning should be practical, fun, and culturally rich — so in addition to language instruction, you'll also find cultural tips, etiquette guides, and real-world expressions used in everyday life.

How to Use This Book
Each chapter in this book builds on the previous one, so we recommend going through it in order. Here's what to expect in each chapter:

• Grammar Points: Clear explanations with examples
• Vocabulary Lists: Useful words grouped by theme  
• Practice Exercises: To reinforce what you've learned
• Conversation Examples: Realistic dialogues you can use
• Cultural Notes: Tips on Japanese customs and etiquette

Feel free to go at your own pace. Language learning is a journey, not a race!

Tips for Studying Japanese
• Practice daily, even if it's just 10–15 minutes. Consistency is key.
• Use flashcards to memorize vocabulary and kana.
• Repeat aloud — speaking helps reinforce memory.
• Watch Japanese media (anime, dramas, YouTube) with subtitles to hear real-world usage.
• Don't fear mistakes — they're part of learning!

Remember: It's okay not to understand everything right away. The more you expose yourself to the language, the more it will start to make sense.

Overview of the Japanese Language
Japanese is a unique and fascinating language spoken by over 125 million people. Some features include:

• Three writing systems: Hiragana (ひらがな), Katakana (カタカナ), and Kanji (漢字)
• Sentence order: Subject-Object-Verb (e.g., "I sushi eat.")
• Particles: Small words like は (wa) and を (o) that show how words relate to each other
• No plurals or articles (like "a" or "the") — context is everything
• Levels of politeness: Formal and informal speech depending on the situation

Don't worry if that sounds overwhelming! We'll break it all down into simple, manageable steps.


Chapter 1: Japanese Writing Systems
The Marvelously Mysterious Triple-Script System of the Japanese Language

1.1 A Language Written in Three Scripts — And Sometimes, All at Once

Imagine this: you're in Tokyo. You walk past a ramen shop with its menu written in loopy, elegant characters. Then you spot a sign that screams "コーヒー — 50% OFF!" in sharp, angular letters. You pull out your guidebook and try to decipher what 日本語 even means. Confused yet?

Welcome to the Japanese writing system — a beautiful, intricate, sometimes confounding blend of Hiragana, Katakana, and Kanji. These three scripts form the foundation of written Japanese, and all three are used in combination to express everything from poetic haiku to supermarket ads.

Let's get this out of the way now:
Yes, Japanese uses three scripts.
Yes, they're all necessary.
No, you don't need to memorize all 2,000 kanji this week.

We'll walk through each system, one at a time, and show you why this apparent madness is, in fact, elegant genius.

1.2 Hiragana (ひらがな): The Friendly Script That Holds Everything Together

What is Hiragana?
If the Japanese writing system were a house, Hiragana would be the walls and foundation. It's soft, curvy, and completely phonetic — that means each character represents a sound, not a meaning.

Hiragana consists of 46 basic characters, which can be combined with diacritics (those two little dots or small circles) and digraphs (combined sounds like きゃ, kya) to express the entire range of Japanese syllables.

It's used for:
• Grammatical glue — particles, verb endings, and function words
• Native Japanese words that don't have or don't use kanji
• Children's books and beginner's texts (you'll love hiragana-only manga!)
• Furigana, or small hiragana above kanji to show pronunciation`;

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
        case "views":f
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

  const ReadableCard = ({ item, type }) => (
    <div
      className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden mb-4 cursor-pointer hover:shadow-md transition-all duration-300 hover:border-custom-blue"
      onClick={() => (type === "pdfs" ? setSelectedContent(item) : null)}
    >
      <div className="flex items-center p-4">
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
    </div>
  );

  const TableOfContents = ({ onChapterClick, currentChapter }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-6">
      <div className="flex items-center mb-6">
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
              className={`text-left w-full text-sm py-3 px-3 rounded-lg hover:bg-custom-bluetransition-colors font-medium ${
                currentChapter === key
                  ? "bg-custom-blue text-custom-blue"
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
    <div className="flex gap-8">
      <div className="flex-1">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <div className="prose max-w-none">
            <div className="text-gray-800 leading-relaxed space-y-6">
              {pdfContent.split("\n\n").map((paragraph, index) => {
                if (paragraph.trim().startsWith("•")) {
                  return (
                    <ul
                      key={index}
                      className="list-disc list-inside space-y-2 ml-4"
                    >
                      {paragraph.split("\n").map((item, itemIndex) => (
                        <li key={itemIndex} className="text-gray-700">
                          {item.replace("• ", "")}
                        </li>
                      ))}
                    </ul>
                  );
                } else if (paragraph.trim() && !paragraph.includes("\n")) {
                  const isMainHeading =
                    paragraph.length < 50 && !paragraph.includes(".");
                  return (
                    <h2
                      key={index}
                      className={`font-bold text-gray-900 ${
                        isMainHeading ? "text-2xl mb-4" : "text-lg mb-3"
                      }`}
                    >
                      {paragraph.trim()}
                    </h2>
                  );
                } else {
                  return (
                    <p key={index} className="text-gray-700 leading-relaxed">
                      {paragraph.trim()}
                    </p>
                  );
                }
              })}
            </div>
          </div>
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
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
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
    </div>
  );

  const ContentList = () => {
    if (activeTab === "videos") {
      return (
        <div className="space-y-6">
          <FilterSection />

          {/* Results count */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing {filteredAndSortedVideos.length} of {videos.length} videos
            </p>
          </div>

          {/* Video List */}
          <div className="space-y-6">
            {filteredAndSortedVideos.length > 0 ? (
              filteredAndSortedVideos.map((video) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  isExpanded={expandedVideo === video.id}
                  onToggle={(id) =>
                    setExpandedVideo(expandedVideo === id ? null : id)
                  }
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
        </div>
      );
    }

    if (activeTab === "read") {
      return (
        <div className="space-y-6">
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
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
              <div className="relative mb-8">
                <Search className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search in contents, eg. Communication, Art"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border-b border-gray-400 focus:border-custom-blue bg-white text-gray-800 placeholder-gray-500"
                />
              </div>

              <ContentList />
            </div>
          ) : (
            <div className="p-8">
              {/* Back button */}
              <button
                onClick={() => setSelectedContent(null)}
                className="mb-6 text-custom-blue hover:text-custom-blue transition-colors flex items-center font-medium"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to {activeTab}
              </button>

              <PDFReader content={selectedContent} />
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
                <button className="w-full border-gray-500 border-2 border-opacity-30 text-gray-700 py-3 px-4 rounded-lg text-sm font-medium hover:bg-custom-blue transition-colors shadow-sm">
                  💳 Donate Rs 250
                </button>
                <button className="w-full border-gray-500 border-2 border-opacity-30 text-gray-700 py-3 px-4 rounded-lg text-sm font-medium hover:bg-yellow-600 transition-colors shadow-sm">
                  💳 Donate Rs 500
                </button>
                <button className="w-full border-custom-blue border-2 border-opacity-30 text-gray-700 py-3 px-4 rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors shadow-sm">
                  Custom amount
                </button>
              </div>
            </div>

            <div className="mb-8">
              <div className="flex items-center mb-4">
                <Mail className="w-5 h-5 text-gray-600 mr-2" />
                <span className="font-semibold text-gray-800">Get Updates</span>
              </div>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                Subscribe to get notified of new content from this teacher.
              </p>
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm mb-4 focus:ring-2 focus:ring-custom-blue focus:border-transparent"
              />
              <button className="w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm">
                📝 Subscribe
              </button>
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
    </div>
  );
};

export default ResourcesPage;
