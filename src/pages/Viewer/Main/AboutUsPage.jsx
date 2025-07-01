import { BookOpen, ChevronRight, Heart, Upload, Users } from "lucide-react";
import { useEffect, useState } from "react";

const AboutUsPage = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  // Track cursor position for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-indigo-50 overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 pointer-events-none">
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

      {/* Custom cursor effect */}
      <div
        className="fixed w-8 h-8 rounded-full bg-blue-100 border border-blue-200 pointer-events-none z-50"
        style={{
          left: cursorPosition.x - 14,
          top: cursorPosition.y - 14,
          transform: "scale(1)",
          transition: "transform 0.1s ease, background 0.3s ease",
          mixBlendMode: "multiply",
        }}
      />

      <div className="max-w-6xl mx-auto px-4 py-16 sm:px-6 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-20 relative">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            <span className="inline-block relative">
              <span className="relative z-10">Welcome to Dunamis</span>
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
          <p className="text-lg opacity-75 max-w-3xl mx-auto leading-relaxed">
            Where learning meets generosity. A donation-supported,
            content-sharing platform built to make education freely accessible
            for all.
          </p>

          {/* Floating elements */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-100 rounded-full opacity-10 animate-pulse-slow" />
          <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-purple-100 rounded-full opacity-10 animate-ping-slow" />
        </div>

        {/* Mission Section */}
        <div
          className="mb-20 bg-white rounded-2xl p-8 shadow-sm border border-gray-100 relative overflow-hidden"
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
                Whether you're here to explore new knowledge or to share your
                expertise, Dunamis offers a space where learning is guided by
                passion, not paywalls.
              </p>
              <p className="text-base opacity-75">
                We believe that education should never be out of reach. That's
                why all our learning materials are open to the public. Our
                platform is designed for individuals who want to learn, grow,
                and contribute to a community built on knowledge and kindness.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="relative group">
                <div className="w-48 h-48 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-full flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-2 border-dashed border-blue-200 animate-spin-slow" />
                  <BookOpen className="text-custom-blu w-16 h-16 transition-all duration-1000 group-hover:scale-110" />
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
              className="bg-white rounded-xl p-7 shadow-sm border border-gray-100 h-full flex flex-col transition-all duration-300 relative group"
              style={{
                transform: `translate(${
                  (cursorPosition.x / window.innerWidth - 0.5) * -3
                }px, ${(cursorPosition.y / window.innerHeight - 0.5) * -3}px)`,
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
              className="bg-white rounded-xl p-7 shadow-sm border border-gray-100 h-full flex flex-col transition-all duration-300 relative group"
              style={{
                transform: `translate(${
                  (cursorPosition.x / window.innerWidth - 0.5) * -3
                }px, ${(cursorPosition.y / window.innerHeight - 0.5) * -3}px)`,
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
              className="bg-white rounded-xl p-7 shadow-sm border border-gray-100 h-full flex flex-col transition-all duration-300 relative group"
              style={{
                transform: `translate(${
                  (cursorPosition.x / window.innerWidth - 0.5) * -3
                }px, ${(cursorPosition.y / window.innerHeight - 0.5) * -3}px)`,
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
                Those who are able and inspired can donate to support creators
                and keep the platform alive.
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
          className="bg-gradient-to-r from-custom-blue to-cyan-600 rounded-2xl p-10 text-center overflow-hidden relative"
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
              Our commitment goes beyond education - we're building bridges to
              knowledge and creating opportunities for everyone to learn and
              grow.
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
          © {new Date().getFullYear()} Dunamis. Making education accessible to
          all.
        </p>
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
    </div>
  );
};

export default AboutUsPage;
