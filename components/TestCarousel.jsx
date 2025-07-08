"use client"; // Ensure it runs only on the client side

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from 'next/image';

export default function TestCarousel() {
  const [middleSlide, setMiddleSlide] = useState(null);
  const totalSlides = useRef(10);
  const [selectedImage, setSelectedImage] = useState(0);
  const imagesArray = [
    "/assets/E1/e1_1.svg",
    "/assets/E1/e1_2.svg",
    "/assets/E1/e1_3.svg",
    "/assets/E1/e1_4.svg",
    "/assets/E1/e1_5.svg",
    "/assets/E1/e1_6.svg",
    "/assets/E1/e1_7.svg",
    "/assets/E1/e1_8.svg",
    "/assets/E1/e1_9.svg",
    "/assets/E1/e1_10.svg",
    "/assets/E1/e1_11.svg",
    "/assets/E1/e1_12.svg",
    "/assets/E1/e1_13.svg",
  ];
  useEffect(() => {
    console.log("middleSlide", middleSlide);
  }, [middleSlide]);
  const getStyle = useCallback(
    (index) => {
      const previndex =
        middleSlide - 1 >= 0 ? middleSlide - 1 : totalSlides.current - 1;
      const nextindex =
        middleSlide + 1 < totalSlides.current ? middleSlide + 1 : 0;
      // if middle slide
      if (middleSlide === index)
        return {
          opacity: "1",
          transform: "scale(1.5)",
          filter: "none",
        };
      else if (previndex === index || nextindex === index)
        return {
          opacity: "0.5",
          transform: "scale(0.6)",
          filter: "blur(8px)",
        };
      else
        return {
          opacity: "0.4",
          transform: "scale(0.5)",
          filter: "blur(16px)",
        };
    },
    [middleSlide]
  );

  const swiperRef = useRef(null);

  const goToSlide = (index) => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(index); // Change active slide
    }
  };
  return (
    <div className="w-full">
      <Swiper
        modules={[Autoplay]}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        speed={600}
        slidesPerView={1.6}
        spaceBetween={-120}
        loop={true}
        centeredSlides={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        style={{ width: '100vw', maxWidth: '100vw', overflow: 'visible' }}
        onSlideChange={(swiper) => setMiddleSlide(swiper.realIndex)}
      >
        {imagesArray.map((image, index) => {
          const isActive = middleSlide === index;
          return (
            <SwiperSlide key={index}>
              <div
                style={{
                  width: '80vw',
                  maxWidth: '900px',
                  aspectRatio: '16/9',
                  minHeight: '400px',
                  margin: '0 auto',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '2rem',
                  boxSizing: 'border-box',
                  background: 'none',
                  transform: isActive ? 'scale(1.08)' : 'scale(0.85)',
                  transition: 'transform 0.5s, box-shadow 0.5s',
                }}
                className="text-2xl font-bold"
              >
                <Image src={image} alt="laptop image" width={1200} height={600} style={{ width: '100%', height: '100%', objectFit: 'cover', background: 'transparent' }} />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div className="flex justify-center mt-5">
        {imagesArray.map((image, index) => {
          return (
            <div
              key={image}
              onClick={() => {
                setSelectedImage(index);
                goToSlide(index);
              }}
            >
              <Image
                src={image}
                alt="laptop image"
                className={`w-16 h-16 object-cover border-gray-300 rounded m-3 cursor-pointer ${
                  selectedImage === index ? "border-2" : "border"
                }`}
                width={64}
                height={64}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
