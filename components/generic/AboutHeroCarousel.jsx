import React, { useState, useRef, useEffect } from "react";
import { IconArrowNarrowLeft, IconArrowNarrowRight, IconCircle, IconCircleDot } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// Import background images
import slide1Bg from "assets/aboutus_page/1.svg";
import slide2Bg from "assets/aboutus_page/2.svg";
import slide3Bg from "assets/aboutus_page/3.svg";

const slides = [
  {
    key: 0,
    // heading: "Ention Is Not a Brand.",
    // subheading: "It's your working companion.",
    background: slide1Bg,
  },
  {
    key: 1,
    // description: (
    //   <>
    //     <div className="backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/20 shadow-2xl">
    //       <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto text-center font-medium leading-relaxed font-inter">
    //         Ention is more than a label; it's a philosophy. Inspired by the humble phrase <b className="text-gray-200">"mention not"</b>, Ention was thoughtfully crafted to represent our core values. Each letter in Ention stands for: <span className="font-bold text-white bg-white/10 px-2 py-1 rounded">Empowering Nations through Technology, Innovation, Opportunity, and New Ideas.</span>
    //       </p>
    //     </div>
    //   </>
    // ),
    background: slide2Bg,
  },
  {
    key: 2,
    // description: (
    //   <>
    //   </>
    // ),
    background: slide3Bg,
  },
];

export default function AboutHeroCarousel({ showText = true }) {
  const [active, setActive] = useState(0);
  const [headingLeft, setHeadingLeft] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const headingTimeout = useRef();
  const autoScrollTimeout = useRef();

  useEffect(() => {
    if (active === 0) {
      setHeadingLeft(false);
      headingTimeout.current = setTimeout(() => setHeadingLeft(true), 5); // 5ms delay before animating
    } else {
      setHeadingLeft(false); // Reset animation state for other slides
    }
    return () => clearTimeout(headingTimeout.current);
  }, [active]);

  // Auto-scroll logic
  useEffect(() => {
    if (!isPaused) {
      autoScrollTimeout.current = setTimeout(() => {
        setActive((a) => (a + 1) % slides.length);
      }, 3000);
    }
    return () => clearTimeout(autoScrollTimeout.current);
  }, [active, isPaused]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  });

  const next = () => {
    setActive((a) => (a + 1) % slides.length);
    resetAutoScroll();
  };
  const prev = () => {
    setActive((a) => (a - 1 + slides.length) % slides.length);
    resetAutoScroll();
  };
  const resetAutoScroll = () => {
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 1000); // Resume after 1s
  };

  return (
    <section className="relative w-full min-h-[60vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Blur */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={slides[active].background}
          alt="Background"
          fill
          className="object-cover scale-100"
          priority
        />
        {/* Darker overlay for better text readability */}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>
      {/* Slide content - commented out */}
      {/*
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none" style={{zIndex:0}} />
      <div className="relative w-full max-w-5xl mx-auto flex flex-col items-center justify-center z-10 px-4 py-24 overflow-visible">
        <AnimatePresence mode="wait">
          {active === 0 && showText && (
            <motion.div key="slide1" ...> ... </motion.div>
          )}
          {active === 1 && showText && (
            <motion.div key="slide2" ...> ... </motion.div>
          )}
          {active === 2 && showText && (
            <motion.div key="slide3" ...> ... </motion.div>
          )}
        </AnimatePresence>
      </div>
      */}
      {/* Carousel controls bottom right */}
      <div className="absolute bottom-8 right-8 z-20 flex items-center gap-6">
        <button
          aria-label="Previous slide"
          onClick={prev}
          className="rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 shadow-lg p-3 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={active === 0}
        >
          <IconArrowNarrowLeft size={24} stroke={2} className="text-white" />
        </button>
        <div className="flex gap-2">
          {slides.map((_, idx) =>
            active === idx ? (
              <IconCircleDot key={idx} size={16} className="text-white" />
            ) : (
              <IconCircle key={idx} size={16} className="text-white/60 hover:text-white/80 transition-colors cursor-pointer" onClick={() => setActive(idx)} />
            )
          )}
        </div>
        <button
          aria-label="Next slide"
          onClick={next}
          className="rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 shadow-lg p-3 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={active === slides.length - 1}
        >
          <IconArrowNarrowRight size={24} stroke={2} className="text-white" />
        </button>
      </div>
    </section>
  );
}