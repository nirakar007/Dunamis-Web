import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const ScrollFloatHero = ({ backgroundImage, children }) => {
  const containerRef = useRef(null);
  const bgRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const background = bgRef.current;
    const content = contentRef.current;

    if (!container || !background || !content) return;

    // Parallax background effect
    gsap.to(background, {
      yPercent: 20,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    // Float-up content animation
    gsap.fromTo(
      content,
      {
        opacity: 0,
        y: 80,
        scale: 0.95,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden"
    >
      {/* Background */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-cover bg-center will-change-transform"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      />

      {/* Overlay (optional, darken) */}
      <div className="absolute inset-0 bg-black/30 z-10" />

      {/* Foreground content */}
      <div
        ref={contentRef}
        className="relative z-20 flex flex-col items-center justify-center h-full px-4 text-white text-center"
      >
        {children}
      </div>
    </section>
  );
};

export default ScrollFloatHero;
