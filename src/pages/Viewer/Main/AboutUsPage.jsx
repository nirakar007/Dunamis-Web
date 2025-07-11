import { motion } from "framer-motion";
import { BookOpen, ChevronRight, Heart, Upload, Users } from "lucide-react";
import { useEffect, useState } from "react";

const AboutUsPage = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  // Track cursor position for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Track scroll position for parallax effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate cursor distance for interactive elements
  const calculateDistance = (element) => {
    if (!element) return 1000;
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    return Math.sqrt(
      Math.pow(cursorPosition.x - centerX, 2) +
        Math.pow(cursorPosition.y - centerY, 2)
    );
  };

  // Calculate parallax offset
  const parallaxOffset = scrollY * 0.5;
  const fadeOpacity = Math.max(0, 1 - scrollY / 800);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Navbar spacer */}
      <div className="h-20 w-full"></div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Parallax Mountain Background - Lower z-index */}
        <div
          className="fixed bg-cover bg-center bg-no-repeat z-0"
          style={{
            top: "80px",
            left: "0",
            right: "0",
            bottom: "0",
            backgroundImage: `url('data:image/svg+xml;base64,${btoa(`
            <svg width="1920" height="1080" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style="stop-color:#87CEEB;stop-opacity:1" />
                  <stop offset="70%" style="stop-color:#E0F6FF;stop-opacity:1" />
                  <stop offset="100%" style="stop-color:#F0F8FF;stop-opacity:1" />
                </linearGradient>
                <linearGradient id="mountain1" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style="stop-color:#4A5568;stop-opacity:1" />
                  <stop offset="100%" style="stop-color:#2D3748;stop-opacity:1" />
                </linearGradient>
                <linearGradient id="mountain2" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style="stop-color:#718096;stop-opacity:1" />
                  <stop offset="100%" style="stop-color:#4A5568;stop-opacity:1" />
                </linearGradient>
                <linearGradient id="mountain3" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style="stop-color:#A0AEC0;stop-opacity:1" />
                  <stop offset="100%" style="stop-color:#718096;stop-opacity:1" />
                </linearGradient>
              </defs>
              
              <!-- Sky -->
              <rect width="1920" height="1080" fill="url(#skyGradient)"/>
              
              <!-- Distant Mountains -->
              <path d="M0,600 L400,400 L800,500 L1200,350 L1600,450 L1920,400 L1920,1080 L0,1080 Z" fill="url(#mountain3)" opacity="0.6"/>
              
              <!-- Mid Mountains -->
              <path d="M0,700 L300,500 L600,600 L900,450 L1200,550 L1500,400 L1800,500 L1920,480 L1920,1080 L0,1080 Z" fill="url(#mountain2)" opacity="0.8"/>
              
              <!-- Front Mountains -->
              <path d="M0,800 L200,600 L400,700 L700,550 L1000,650 L1300,500 L1600,600 L1920,580 L1920,1080 L0,1080 Z" fill="url(#mountain1)"/>
              
              <!-- Snow caps -->
              <path d="M300,500 L350,480 L400,500 L350,520 Z" fill="white" opacity="0.9"/>
              <path d="M700,550 L750,530 L800,550 L750,570 Z" fill="white" opacity="0.9"/>
              <path d="M1000,650 L1050,630 L1100,650 L1050,670 Z" fill="white" opacity="0.9"/>
              <path d="M1300,500 L1350,480 L1400,500 L1350,520 Z" fill="white" opacity="0.9"/>
              
              <!-- Clouds -->
              <ellipse cx="300" cy="200" rx="80" ry="30" fill="white" opacity="0.7"/>
              <ellipse cx="320" cy="190" rx="60" ry="25" fill="white" opacity="0.7"/>
              <ellipse cx="340" cy="210" rx="70" ry="28" fill="white" opacity="0.7"/>
              
              <ellipse cx="800" cy="150" rx="90" ry="35" fill="white" opacity="0.6"/>
              <ellipse cx="820" cy="140" rx="70" ry="30" fill="white" opacity="0.6"/>
              <ellipse cx="840" cy="160" rx="80" ry="32" fill="white" opacity="0.6"/>
              
              <ellipse cx="1400" cy="180" rx="75" ry="28" fill="white" opacity="0.5"/>
              <ellipse cx="1420" cy="170" rx="55" ry="23" fill="white" opacity="0.5"/>
              <ellipse cx="1440" cy="190" rx="65" ry="25" fill="white" opacity="0.5"/>
            </svg>
          `)}')`,
            transform: `translateY(${parallaxOffset}px)`,
            opacity: fadeOpacity,
          }}
        />

        {/* Overlay gradient for better text readability - Lower z-index */}
        <div
          className="fixed bg-gradient-to-b from-transparent via-white/10 to-white/60 z-0"
          style={{
            top: "80px",
            left: "0",
            right: "0",
            bottom: "0",
            opacity: Math.min(1, scrollY / 400),
          }}
        />

        {/* Content overlay - Higher z-index than background */}
        <div className="relative z-10 bg-gradient-to-b from-transparent via-white/80 to-white">
          {/* Animated background elements - Lower z-index */}
          <div
            className="absolute inset-0 pointer-events-none z-0"
            style={{ top: "80px" }}
          >
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full opacity-5 bg-indigo-300"
                style={{
                  width: `${Math.random() * 200 + 50}px`,
                  height: `${Math.random() * 200 + 50}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animation: `float ${
                    Math.random() * 20 + 10
                  }s infinite ease-in-out`,
                  animationDelay: `${Math.random() * 5}s`,
                }}
              />
            ))}
          </div>

          <div className="max-w-6xl mx-auto px-4 py-16 sm:px-6 relative z-20">
            {/* Hero Section */}
            <div
              className="text-center mb-20 relative"
              style={{ minHeight: "60vh" }}
            >
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
                <span className="inline-block relative">
                  <span className="relative z-10 text-white">
                    Welcome to Dunamis
                  </span>
                  <span
                    className="absolute inset-0 bg-gradient-to-r from-indigo-200 to-purple-200 opacity-30 rounded-full blur-lg"
                    style={{
                      transform: `translate(${
                        (cursorPosition.x / window.innerWidth - 0.5) * 20
                      }px, ${
                        (cursorPosition.y / window.innerHeight - 0.5) * 20
                      }px)`,
                      transition: "transform 0.2s ease-out",
                    }}
                  />
                </span>
              </h1>
              <p className="text-lg opacity-75 max-w-3xl mx-auto leading-relaxed text-gray-700">
                Where learning meets generosity. A donation-supported,
                content-sharing platform built to make education freely
                accessible for all.
              </p>

              {/* Floating elements */}
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-100 rounded-full opacity-10 animate-pulse-slow" />
              <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-purple-100 rounded-full opacity-10 animate-ping-slow" />
            </div>

            {/* Mission Section */}
            <div
              className="mb-20 bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-gray-100 relative overflow-hidden"
              style={{
                transform: `translate(${
                  (cursorPosition.x / window.innerWidth - 0.5) * -4
                }px, ${(cursorPosition.y / window.innerHeight - 0.5) * -4}px)`,
                transition: "transform 0.3s ease-out",
              }}
            >
              <div className="grid md:grid-cols-2 gap-10 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-5">
                    Our Mission
                  </h2>
                  <p className="text-base opacity-75 mb-4">
                    Whether you're here to explore new knowledge or to share
                    your expertise, Dunamis offers a space where learning is
                    guided by passion, not paywalls.
                  </p>
                  <p className="text-base opacity-75">
                    We believe that education should never be out of reach.
                    That's why all our learning materials are open to the
                    public. Our platform is designed for individuals who want to
                    learn, grow, and contribute to a community built on
                    knowledge and kindness.
                  </p>
                </div>
                <div className="flex justify-center">
                  <div className="relative group">
                    <div className="w-48 h-48 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-full flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full border-2 border-dashed border-blue-200 animate-spin-slow" />
                      <BookOpen className="text-blue-600 w-16 h-16 transition-all duration-1000 group-hover:scale-110" />
                    </div>
                    <div className="absolute -inset-4 rounded-full bg-indigo-100 opacity-0 group-hover:opacity-30 blur-lg transition-all duration-500" />
                  </div>
                </div>
              </div>

              {/* Floating particles */}
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full bg-indigo-100 opacity-20"
                  style={{
                    width: `${Math.random() * 12 + 4}px`,
                    height: `${Math.random() * 12 + 4}px`,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animation: `float-small ${
                      Math.random() * 15 + 8
                    }s infinite ease-in-out`,
                    animationDelay: `${Math.random() * 3}s`,
                  }}
                />
              ))}
            </div>

            {/* Community Section */}
            <div className="mb-20">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  More than just content delivery
                </h2>
                <p className="text-lg opacity-75 max-w-2xl mx-auto">
                  It's a community-driven initiative built on shared values
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {/* Card 1 */}
                <div
                  className="bg-white/90 backdrop-blur-sm rounded-xl p-7 shadow-sm border border-gray-100 h-full flex flex-col transition-all duration-300 relative group"
                  style={{
                    transform: `translate(${
                      (cursorPosition.x / window.innerWidth - 0.5) * -3
                    }px, ${
                      (cursorPosition.y / window.innerHeight - 0.5) * -3
                    }px)`,
                    transition: "transform 0.3s ease-out",
                  }}
                >
                  <div className="text-center mb-5 relative z-10">
                    <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 group-hover:bg-blue-100 transition-colors">
                      <Upload className="w-8 h-8 text-blue-500 transition-transform duration-500 group-hover:rotate-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Educators Upload
                    </h3>
                  </div>
                  <p className="text-base opacity-75 text-center mt-auto relative z-10">
                    Educators and experts can upload valuable resources to share
                    knowledge with the community.
                  </p>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ChevronRight className="text-blue-400 w-5 h-5" />
                  </div>
                </div>

                {/* Card 2 */}
                <div
                  className="bg-white/90 backdrop-blur-sm rounded-xl p-7 shadow-sm border border-gray-100 h-full flex flex-col transition-all duration-300 relative group"
                  style={{
                    transform: `translate(${
                      (cursorPosition.x / window.innerWidth - 0.5) * -3
                    }px, ${
                      (cursorPosition.y / window.innerHeight - 0.5) * -3
                    }px)`,
                    transition: "transform 0.3s ease-out",
                  }}
                >
                  <div className="text-center mb-5 relative z-10">
                    <div className="bg-green-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 group-hover:bg-green-100 transition-colors">
                      <Users className="w-8 h-8 text-green-500 transition-transform duration-500 group-hover:rotate-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Free Access
                    </h3>
                  </div>
                  <p className="text-base opacity-75 text-center mt-auto relative z-10">
                    Viewers and learners can access everything for free, making
                    education accessible to all.
                  </p>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white to-green-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ChevronRight className="text-green-400 w-5 h-5" />
                  </div>
                </div>

                {/* Card 3 */}
                <div
                  className="bg-white/90 backdrop-blur-sm rounded-xl p-7 shadow-sm border border-gray-100 h-full flex flex-col transition-all duration-300 relative group"
                  style={{
                    transform: `translate(${
                      (cursorPosition.x / window.innerWidth - 0.5) * -3
                    }px, ${
                      (cursorPosition.y / window.innerHeight - 0.5) * -3
                    }px)`,
                    transition: "transform 0.3s ease-out",
                  }}
                >
                  <div className="text-center mb-5 relative z-10">
                    <div className="bg-rose-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 group-hover:bg-rose-100 transition-colors">
                      <Heart className="w-8 h-8 text-rose-500 transition-transform duration-500 group-hover:rotate-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Support Platform
                    </h3>
                  </div>
                  <p className="text-base opacity-75 text-center mt-auto relative z-10">
                    Those who are able and inspired can donate to support
                    creators and keep the platform alive.
                  </p>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white to-rose-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ChevronRight className="text-rose-400 w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>

            {/* Values Section */}
            <div
              className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-10 text-center overflow-hidden relative"
              style={{
                transform: `translate(${
                  (cursorPosition.x / window.innerWidth - 0.5) * -5
                }px, ${(cursorPosition.y / window.innerHeight - 0.5) * -5}px)`,
                transition: "transform 0.3s ease-out",
              }}
            >
              <div className="relative z-10">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Teaching the Word • Reaching the Unreached
                </h2>
                <p className="text-lg text-white opacity-90 max-w-2xl mx-auto">
                  Our commitment goes beyond education - we're building bridges
                  to knowledge and creating opportunities for everyone to learn
                  and grow.
                </p>
              </div>
              <div className="absolute inset-0 opacity-10">
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-white rounded-full animate-pulse-slow" />
                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white rounded-full animate-ping-slow" />
              </div>

              {/* Floating text particles */}
              {["✍️", "📚", "🌍", "❤️", "🎓", "🤝"].map((emoji, i) => (
                <div
                  key={i}
                  className="absolute text-2xl opacity-20"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animation: `float ${
                      Math.random() * 15 + 10
                    }s infinite ease-in-out`,
                    animationDelay: `${Math.random() * 5}s`,
                  }}
                >
                  {emoji}
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="max-w-6xl mx-auto px-4 py-8 text-center text-gray-600 opacity-75 text-sm">
            <p>
              © {new Date().getFullYear()} Dunamis. Making education accessible
              to all.
            </p>
          </div>
        </div>

        {/* Inline CSS for animations */}
        <style jsx>{`
          @keyframes float {
            0%,
            100% {
              transform: translateY(0) translateX(0);
            }
            25% {
              transform: translateY(-10px) translateX(5px);
            }
            50% {
              transform: translateY(5px) translateX(-10px);
            }
            75% {
              transform: translateY(-5px) translateX(10px);
            }
          }

          @keyframes float-small {
            0%,
            100% {
              transform: translateY(0) translateX(0);
            }
            50% {
              transform: translateY(-5px) translateX(3px);
            }
          }

          @keyframes spin-slow {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }

          @keyframes pulse-slow {
            0%,
            100% {
              opacity: 0.1;
              transform: scale(1);
            }
            50% {
              opacity: 0.2;
              transform: scale(1.05);
            }
          }

          @keyframes ping-slow {
            0% {
              transform: scale(1);
              opacity: 0.2;
            }
            75%,
            100% {
              transform: scale(1.8);
              opacity: 0;
            }
          }

          .animate-spin-slow {
            animation: spin-slow 20s linear infinite;
          }

          .animate-pulse-slow {
            animation: pulse-slow 6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }

          .animate-ping-slow {
            animation: ping-slow 4s cubic-bezier(0, 0, 0.2, 1) infinite;
          }
        `}</style>
      </motion.div>
    </div>
  );
};

export default AboutUsPage;
