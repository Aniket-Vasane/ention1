import React, { useCallback, useState, useRef } from "react";
import { motion } from "framer-motion";
import slide1 from "assets/landingpage_carsouel/4.svg";
import slide3 from "assets/landingpage_carsouel/5.svg";
import slide4 from "assets/landingpage_carsouel/6.svg";
import { useRouter } from "next/router";

export default function IntelCarousel() {
  const [selectedSlide, setSelectedSlide] = useState(0);
  const [parallax, setParallax] = useState({}); // {0: {x, y}, 1: {x, y}, 2: {x, y}}
  const slideRefs = [useRef(), useRef(), useRef()];
  const slideTextVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4, delay: 0.3 } },
  };
  const router = useRouter();

  const getSlideUniqueStyle = useCallback(
    (slideIndex) => {
      switch (slideIndex) {
        case 0:
          return {
            flexBasis: selectedSlide === 0 ? "200vw" : "clamp(8rem,30vw,18rem)",
          };
        case 1:
          return {
            flexBasis: selectedSlide === 1 ? "200vw" : "clamp(8rem,30vw,18rem)",
            transform:
              selectedSlide === 1 ? "translateY(0)" : "translateY(3.8rem)",
          };
        case 2:
          return {
            flexBasis: selectedSlide === 2 ? "200vw" : "clamp(8rem,30vw,18rem)",
            transform:
              selectedSlide === 2 ? "translateY(0)" : "translateY(3.8rem)",
          };
        default:
          return {};
      }
    },
    [selectedSlide]
  );

  // Parallax effect handler
  const handleMouseMove = (e, idx) => {
    const rect = slideRefs[idx].current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 30; // max 15px left/right
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 30; // max 15px up/down
    setParallax((prev) => ({ ...prev, [idx]: { x, y } }));
  };
  const handleMouseLeave = (idx) => {
    setParallax((prev) => ({ ...prev, [idx]: { x: 0, y: 0 } }));
  };

  const slides = [slide1, slide3, slide4];

  const navigateToProductPage = () => {
    router.push("/product");
  };
  const playSvg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z"
      />
    </svg>
  );

  return (
    <div
      style={{
        alignItems: "flex-start",
        display: "flex",
        gap: "2rem",
        justifyContent: "center",
        listStyle: "none",
        margin: "0",
        transitionDuration: "0ms",
        position: "relative",
        width: "100%",
        height: "100%",
        transform: "translate3d(0px, 0px, 0px)",
        transitionDelay: "0ms",
        boxSizing: "border-box",
        zIndex: 1,
      }}
    >
      {slides.map((slide, idx) => (
        <div
          key={idx}
          ref={slideRefs[idx]}
          onClick={() => setSelectedSlide(selectedSlide === idx ? null : idx)}
          onMouseMove={(e) => handleMouseMove(e, idx)}
          onMouseLeave={() => handleMouseLeave(idx)}
          style={{
            ...getSlideUniqueStyle(idx),
            cursor: "pointer",
          }}
          className="front-page-slider"
        >
          <div
            className="background-image-center front-slide-hover"
            style={{
              height:
                selectedSlide === idx
                  ? "38.75rem"
                  : idx === 1
                  ? "clamp(16rem,60vh,28rem)"
                  : "clamp(18rem,60vh,32rem)",
              backgroundImage: `url(${slide.src})`,
              transition: "transform 0.2s cubic-bezier(.23,1.01,.32,1)",
              transform: parallax[idx]
                ? `translate3d(${parallax[idx].x || 0}px, ${parallax[idx].y || 0}px, 0)`
                : "none",
            }}
          ></div>
          {selectedSlide !== idx && (
            <div className="absolute w-full h-full top-0 left-0 slide-dark-cover"></div>
          )}
        </div>
      ))}
    </div>
  );
}
