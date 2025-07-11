import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Custom Carousel Component
function CustomCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const images = [
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80",
    "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
  ];

  // Auto-advance carousel every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full h-full">
      {/* Images */}
      <div className="relative w-full h-full">
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Learning image ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
              index === activeIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-50 flex gap-3">
        {images.map((_, index) => (
          <button
            key={index}
            className={`block h-2 cursor-pointer rounded-full transition-all duration-300 ${
              activeIndex === index
                ? "w-8 bg-white shadow-lg"
                : "w-2 bg-white/60 hover:bg-white/80"
            }`}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>

      {/* Arrow Navigation */}
      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-50 bg-black/20 hover:bg-black/40 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 backdrop-blur-sm"
        onClick={() =>
          setActiveIndex((prev) => (prev - 1 + images.length) % images.length)
        }
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-50 bg-black/20 hover:bg-black/40 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 backdrop-blur-sm"
        onClick={() => setActiveIndex((prev) => (prev + 1) % images.length)}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </div>
  );
}

// Hero Section Component
function HeroSection() {
  const navigate = useNavigate();
  const handleClick = (path) => {
    navigate(path);
  };
  return (
    <div className="rounded-xl overflow-hidden bg-gradient-to-br bg-custom-blue text-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
        {/* Left Side - Text Content */}
        <div className="flex flex-col justify-center px-8 lg:px-12 py-16 bg-custom-blue relative">
          {/* Decorative Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-transparent to-blue-700/20"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]"></div>

          <div className="relative z-10">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Learn something new everyday.
            </h1>
            <p className="text-lg lg:text-xl mb-8 opacity-90 italic">
              "If you are determined to learn, no one can stop you." - Zig
              Ziglar
            </p>
            <button
              onClick={() => {
                handleClick("/resources");
              }}
              className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/30 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Start Learning Today
            </button>
          </div>
        </div>

        {/* Right Side - Carousel */}
        <div className="relative">
          <CustomCarousel />
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
