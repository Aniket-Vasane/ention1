import React, { useRef, useState, useEffect } from "react";
import gradientbg1 from "assets/gradient-bg1.png";
import gradientbg2 from "assets/gradient-bg2.png";
import marketpc from "assets/market-pc.png";
import ellipsemd from "assets/ellipse-gradient-md.png";
import intelprocessor from "assets/Intel-Core-X-Series-2-Custom-1000x711-1.png";
import amdprocessor from "assets/amd-1.png";
import corei5 from "assets/i5.png";
import corei7 from "assets/i7.png";
import corei9 from "assets/i9.png";
import nvidia from "assets/nvidia-3060-logo-lrg_2.jpg";
import amd5 from "assets/amd-ryzen-5-logo.png";
import amd7 from "assets/AMD-Ryzen-7-Category.png";
import swapbook from "assets/swapbook.png";
import lappy from "assets/lappy.png";
import board from "assets/board.png";
import warrantyimg from "assets/ds.png";
import ProcessorCard from "components/ProcessorCard";
import CheckIcon from "components/icons/check";
import SimpleSlider from "./slider";
import { Zoom } from "react-awesome-reveal";
import { TypingEffect } from "components/generic/TypingEffect";
import { BlurInText } from "components/generic/BlurInText";
import { FadeUpAnimate } from "components/generic/FadeUpAnimate";
import { useRouter } from "next/router";
import IntelCarousel from "components/IntelCarousel";
import dynamic from 'next/dynamic';
import { motion } from "framer-motion";
import Image from "next/image";
import { FiSettings, FiDollarSign, FiShield, FiZap } from 'react-icons/fi';
import { BsFlag } from 'react-icons/bs';

const IMAGES = [marketpc, marketpc, marketpc];

const TestCarousel = dynamic(() => import('components/TestCarousel'), { ssr: false });

// FloatingBlob component for floating/parallax effect
const FloatingBlob = ({ className = '', style = {}, children }) => (
  <motion.div
    className={className}
    style={style}
    animate={{
      y: [0, -20, 0, 20, 0],
      x: [0, 10, 0, -10, 0],
      rotate: [0, 2, 0, -2, 0],
    }}
    transition={{
      duration: 10,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    {children}
  </motion.div>
);

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [direction, setDirection] = useState(null); // Track direction for smooth transition
  const [isTransitioning, setIsTransitioning] = useState(false); // Track if transition is in progress
  const router = useRouter();

  // Handle next image action
  const nextImage = () => {
    if (isTransitioning) return; // Prevent multiple clicks during transition
    setDirection("next");
    setIsTransitioning(true);
  };

  const navigateToProductPage = () => {
    router.push("/product");
  };

  const [showBookNowForm, setShowBookNowForm] = useState(false);

  // Reset direction state and update current image index after transition is finished
  useEffect(() => {
    if (!isTransitioning) return; // Wait for the transition to finish

    const timeout = setTimeout(() => {
      setCurrentImageIndex((prevIndex) => {
        if (direction === "next") {
          return (prevIndex + 1) % IMAGES.length;
        } else if (direction === "prev") {
          return (prevIndex - 1 + IMAGES.length) % IMAGES.length;
        }
        return prevIndex;
      });
      setDirection(null); // Reset direction
      setIsTransitioning(false); // Reset transition state
    }, 500); // Wait for the transition duration (500ms)

    return () => clearTimeout(timeout);
  }, [direction, isTransitioning, IMAGES.length]);

  useEffect(() => {
    const interval = setInterval(nextImage, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <main className={"main overflow-x-hidden relative z-0 w-full"}>
        <div
          className=" flex flex-col -z-10"
          style={{
            backgroundImage: `url(${gradientbg1.src})`,
            backgroundSize: "100% 100%",
          }}
        >
          <div className="h-[130px]"></div>
          {/* Offers Bar Start */}
          <div className="w-full flex justify-center">
            <div className="w-[100%] bg-[#007E9E] text-white py-2 rounded-ls shadow-lg overflow-hidden relative z-40">
              <div className="whitespace-nowrap overflow-hidden w-full">
                <div className="animate-marquee flex items-center gap-12 text-lg font-semibold">
                  <span> Summer Sale: Up to 20% off on select laptops!</span>
                  <span> Free shipping on orders above ₹50,000</span>
                  <span> Buy 1 Get 1 Free on Accessories</span>
                  <span> No Cost EMI Available</span>
                  <span> 2 Years Extended Warranty on E3 Series</span>
                  {/* Duplicate for seamless infinite scroll */}
                  <span> Summer Sale: Up to 20% off on select laptops!</span>
                  <span> Free shipping on orders above ₹50,000</span>
                  <span> Buy 1 Get 1 Free on Accessories</span>
                  <span> No Cost EMI Available</span>
                  <span> 2 Years Extended Warranty on E3 Series</span>
                </div>
              </div>
            </div>
          </div>
          <div className="h-[20px]"></div>
          <style jsx global>{`
            @keyframes marquee {
              0% { transform: translateX(0%); }
              100% { transform: translateX(-50%); }
            }
            .animate-marquee {
              display: inline-flex;
              min-width: 200%;
              animation: marquee 25s linear infinite;
            }
          `}</style>
          {/* Offers Bar End */}
          <div className="h-[50px]"></div>
          <div className="flex flex-col w-full items-center">
            {/* Mobile: INTRODUCING + TypingEffect in one line, ENTION® COMPUTING DEVICE with TypingEffect in next line */}
            <div className="w-full flex-col items-center justify-center md:hidden">
              <div
                className="flex items-center justify-center w-full whitespace-nowrap overflow-x-auto"
                style={{ letterSpacing: "7px" }}
              >
                <span className="text-white text-base md:text-lg font-semibold mr-2">INTRODUCING</span>
                <TypingEffect className="text-[#01E9FE] font-bold text-base md:text-lg" text="MADE IN INDIA" />
              </div>
              <div className="flex items-center justify-center w-full mt-3 whitespace-nowrap overflow-x-auto">
                <TypingEffect className="text-white text-lg md:text-xl font-bold" text={"ENTION\u00A0\u00AE COMPUTING DEVICE"} />
              </div>
            </div>
            {/* Desktop: keep existing layout */}
            <div style={{ letterSpacing: "7px" }} className="hidden md:flex items-center">
              <div className="text-white text-2xl mr-4">INTRODUCING</div>
              <div>
                <TypingEffect
                  className="text-[#01E9FE] font-bold text-2xl"
                  text="MADE IN INDIA"
                />
              </div>
            </div>
            <BlurInText className="hidden md:block text-white text-[50px] mt-8 text-3xl font-bold">
              <span>ENTION</span>
              <span
                style={{ position: "relative", top: "-18px", fontSize: "31px" }}
                className="font-thin text-[50px]"
              >
                &reg;
              </span>{" "}
              <span>COMPUTING DEVICE</span>
            </BlurInText>
          </div>
          <div className="h-[100px]"></div>
          <div className="flex justify-center">
            <div className="w-[95%]">
              <IntelCarousel />
            </div>
          </div>
          <div className="w-full flex justify-center mt-24">
            <BlurInText>
              <p className="text-white text-2xl md:text-4xl lg:text-[32px] font-bold text-center max-w-4xl leading-snug">
                Get ready to experience a mesmerizing journey of performance and style with the Ention Workbook series<br />
                <span className="text-[#01E9FE] font-bold">proudly Made in India to empower.</span>
              </p>
            </BlurInText>
          </div>

          {/* For You Section */}
          <div className="w-full flex flex-col items-center mt-24">
            <h2 className="text-white text-3xl md:text-4xl font-extrabold mb-12 text-center">
              Find Your Perfect Device
            </h2>
            <div className="flex flex-col md:flex-row gap-8 w-full justify-center">
              {/* Card 1: For Students */}
              <div className="bg-[#1A2233] flex flex-col justify-between w-full max-w-xl p-4 shadow-lg border border-[#2d3748] py-8">
                <div className="text-white text-xl font-bold mb-2 text-left">For Students</div>
                <div className="flex flex-row gap-4 items-center flex-1">
                  <img src="/assets/0N1A1389.png" alt="For Students" className="w-52 h-48 object-contain" />
                  <div className="text-white text-xl text-left opacity-90 flex-1">Affordable, Lightweight, durable, and built to support your learning on the go.</div>
                </div>
                <button className="bg-[#01E9FE] hover:bg-[#00bcd4] text-black font-semibold py-1 px-4 rounded transition-all duration-300 text-sm w-fit mt-4 self-start">
                  Shop Now →
                </button>
              </div>
              {/* Card 2: For Professionals & Techies */}
              <div className="bg-[#1A2233] flex flex-col items-center w-full max-w-sm p-4 shadow-lg border border-[#2d3748]">
                <div className="text-white text-xl font-bold mb-2 text-center">For Professionals & Techies</div>
                <img src="/assets/0N1A1389.png" alt="For Professionals & Techies" className="w-52 h-48 object-contain mb-3" />
                <div className="text-white text-lg mb-3 text-center opacity-90">Customizable, seamlessly switch from work tasks to meetings with reliable performance. A powerful and customizable machine ready to take on your code, design, or research.</div>
                <button className="w-full bg-[#01E9FE] hover:bg-[#00bcd4] text-black font-semibold py-1 rounded transition-all duration-300 text-sm">
                  Shop Now →
                </button>
              </div>
            </div>
          </div>

          {/* Why Choose Ention Workbook Series Section */}
          <div className="w-full flex flex-col items-center mt-16 py-12">
            <div className="w-full max-w-6xl px-4">
              <h2 className="text-white text-3xl md:text-4xl font-extrabold mb-2 text-center">Why Choose Ention Workbook Series?</h2>
              <p className="text-white text-lg opacity-80 mb-8 text-center">From customization to performance, discover what makes Ention Workbook Series the right choice for you.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <div className="bg-white/10 rounded-lg flex flex-col items-center justify-center p-6 min-h-[140px] border border-[#01E9FE]">
                  <FiSettings className="text-cyan-400 mb-3" size={36} />
                  <span className="text-white text-base font-semibold text-center">Customizable</span>
                </div>
                <div className="bg-white/10 rounded-lg flex flex-col items-center justify-center p-6 min-h-[140px] border border-[#01E9FE]">
                  <FiDollarSign className="text-cyan-400 mb-3" size={36} />
                  <span className="text-white text-base font-semibold text-center">Affordable Without Compromise</span>
                </div>
                <div className="bg-white/10 rounded-lg flex flex-col items-center justify-center p-6 min-h-[140px] border border-[#01E9FE]">
                  <FiShield className="text-cyan-400 mb-3" size={36} />
                  <span className="text-white text-base font-semibold text-center">18-Month On-Site Warranty</span>
                </div>
                <div className="bg-white/10 rounded-lg flex flex-col items-center justify-center p-6 min-h-[140px] border border-[#01E9FE]">
                  <BsFlag className="text-cyan-400 mb-3" size={36} />
                  <span className="text-white text-base font-semibold text-center">Made in India. Made for You.</span>
                </div>
                <div className="bg-white/10 rounded-lg flex flex-col items-center justify-center p-6 min-h-[140px] border border-[#01E9FE]">
                  <FiZap className="text-cyan-400 mb-3" size={36} />
                  <span className="text-white text-base font-semibold text-center">Performance That Powers You</span>
                </div>
              </div>
            </div>
          </div>

          <FadeUpAnimate spaceToMove={50}>
            <div className="w-full flex  justify-center mt-32">
              <button
                onClick={navigateToProductPage}
                className="text-white rounded-[30px] text-[20px] xl:text-[25px] flex items-center justify-center w-[160px] h-[40px] md:w-[220px] md:h-[50px] xl:w-[253px] xl:h-[68px] bg-[#070D2A] hover:bg-[#273dac] transition-all duration-300 ease-in-out"
              >
                Buy Now
              </button>
            </div>
          </FadeUpAnimate>

          {/*
            CPU Cards Section (High Performance Power house with Intel/AMD cards) commented out for future use
            <div className="w-full flex justify-center">
              <div className="flex flex-col items-center w-full mt-16">
                <FadeUpAnimate spaceToMove={50} duration={1}>
                  <div className="flex flex-col items-center">
                    <p className="text-white text-2xl md:text-4xl lg:text-[56px] font-bold md:whitespace-nowrap text-center">
                      High Performance Power house
                    </p>
                    <p className="text-white text-xl md:text-2xl lg:text-4xl mt-4 lg:mt-8 md:whitespace-nowrap text-center">
                      Ention
                      <span
                        className="font-thin"
                        style={{
                          position: "relative",
                          top: "-5px",
                          fontSize: "25px",
                        }}
                      >
                        &reg;
                      </span>{" "}
                      Laptop equipped with latest generation Processor
                    </p>
                  </div>
                </FadeUpAnimate>
                <div className="w-[80%] sm:w-full h-full lg:mt-5 relative z-[0]">
                  <div
                    className="w-full h-full absolute opacity-10"
                    style={{
                      backgroundImage: `url(${board.src})`,
                      backgroundSize: "35%",
                    }}
                  ></div>

                  <div className="mt-16 w-full h-full md:h-[700px] flex md:flex-row flex-col items-center md:items-start justify-center gap-6 md:gap-10 lg:gap-20 relative z-[1]">
                    <FadeUpAnimate spaceToMove={200}>
                      <ProcessorCard
                        img={intelprocessor}
                        title={
                          <>
                            <b>Intel</b> Family Processor
                          </>
                        }
                        content={
                          "The lineup of Core processors includes the Intel Core i3, Intel Core i5, Intel Core i7, and Intel Core i9, along with the X-series of Intel Core CPUs."
                        }
                      />
                    </FadeUpAnimate>
                    <FadeUpAnimate spaceToMove={400} duration={0.7}>
                      <ProcessorCard
                        img={amdprocessor}
                        title={
                          <>
                            <b>AMD</b> Series Processor
                          </>
                        }
                        content={
                          "The lineup of Core processors includes the Intel Core i3, Intel Core i5, Intel Core i7, and Intel Core i9, along with the X-series of Intel Core CPUs."
                        }
                      />
                    </FadeUpAnimate>
                  </div>
                </div>
              </div>
            </div>
          */}
        </div>
        <div
          className=" flex flex-col -z-10"
          style={{
            backgroundImage: `url(${gradientbg1.src})`,
            backgroundSize: "100% 100%",
          }}
        >
          {/* Warranty Card */}
          <FadeUpAnimate spaceToMove={100}>
            <div className="w-full flex justify-center">
              <div className="flex flex-col items-center w-[80%] -mt-5">
                <div
                  className="px-8 py-4 border rounded-3xl w-full flex flex-col sm:flex-row justify-center items-center relative"
                  style={{ borderColor: "rgba(34, 209, 238, 1" }}
                >
                  <Image src={warrantyimg} alt="warranty-img" width={390} height={240} className="w-[320px] sm:w-[240px] md:w-[280px] lg:w-[320px] xl:w-[390px] h-auto z-[2]" />
                  <FloatingBlob
                    className="absolute z-[1] top-10 sm:top-[150px] left-16 w-[80px] h-[80px] sm:w-[120px] sm:h-[120px] lg:w-[140px] lg:h-[140px]"
                    style={{ backgroundImage: `url(${ellipsemd.src})`, backgroundSize: "100% 100%" }}
                  />
                  <FloatingBlob
                    className="absolute z-[1] top-10 sm:top-[100px] left-[38%] xl:left-[42%] w-[20px] h-[20px] lg:w-[30px] lg:h-[30px]"
                    style={{ backgroundImage: `url(${ellipsemd.src})`, backgroundSize: "100% 100%" }}
                  />
                  <FloatingBlob
                    className="absolute z-[1] bottom-4 xl:bottom-10 right-12 xl:right-16 w-[60px] h-[60px] sm:w-[60px] sm:h-[60px] lg:w-[80px] lg:h-[80px] xl:w-[100px] xl:h-[100px]"
                    style={{ backgroundImage: `url(${ellipsemd.src})`, backgroundSize: "100% 100%" }}
                  />
                  <div className="w-10"></div>
                  <div className="flex flex-col items-center sm:items-start gap-8 lg:gap-16 w-full min-[540px]:w-[360px] text-center sm:text-left sm:w-[320px] lg:w-[360px] xl:w-[480px] ">
                    <p className="text-[16px] min-[360px]:text-lg min-[420px]:text-xl min-[540px]:text-2xl sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-white leading-8 sm:leading-7 md:leading-8 lg:leading-10">
                      On-Site Warranty is Rather a Guaranty of Our Infallible
                      Faith in Our Machine.
                    </p>
                    <button
                      className="z-[2] w-[200px] h-[45px] sm:w-[180px] md:w-[200px] sm:h-[38px] md:h-[42px] xl:w-[248px] xl:h-[58px] rounded-3xl flex justify-center items-center text-black text-lg md:text-xl xl:text-2xl hover:scale-105  transition-all duration-300 ease-in-out"
                      style={{ backgroundColor: "rgba(34, 209, 238, 1)" }}
                      onClick={() => router.push('/technical-support')}
                    >
                      Know More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </FadeUpAnimate>

          {/* Computer List */}
          <Zoom cascade triggerOnce>
            <div className="w-full hidden sm:flex justify-center">
              <div className="flex flex-col items-center w-[80%] mt-16">
                <div className="w-[640px] lg:w-full h-auto flex justify-center mt-16">
                  <SimpleSlider />
                </div>
              </div>
            </div>
          </Zoom>
          {/* Workbook series  */}
          <div className="w-full flex flex-col items-center relative">
            <motion.h2
              className="font-extrabold text-white text-4xl md:text-6xl text-center mb-8 mt-40 drop-shadow-lg"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Classroom to Boardroom
            </motion.h2>
            {/* Floating blobs in whitespace */}
            <FloatingBlob className="hidden md:block absolute left-0 top-10 w-40 h-40 opacity-40 z-0" style={{ backgroundImage: `url(${ellipsemd.src})`, backgroundSize: "100% 100%" }} />
            <FloatingBlob className="hidden md:block absolute right-10 bottom-0 w-32 h-32 opacity-30 z-0" style={{ backgroundImage: `url(${ellipsemd.src})`, backgroundSize: "100% 100%" }} />
            <FloatingBlob className="hidden md:block absolute left-1/3 top-1/2 w-24 h-24 opacity-20 z-0" style={{ backgroundImage: `url(${ellipsemd.src})`, backgroundSize: "100% 100%" }} />
            <div className="flex flex-col md:flex-row justify-center items-start md:items-center gap-6 md:gap-12 lg:gap-24 w-[80%] md:w-full mt-8 min-[876px]:mt-24 xl:mt-32 relative z-10">
              <motion.div initial={{ opacity: 0, x: 100 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} className="w-full md:w-[360px] lg:w-[480px] min-[1240px]:w-[540px] xl:w-[640px]">
                <Image src={marketpc} alt="discussing-image" width={640} height={480} className="w-full h-auto" />
              </motion.div>
              <FadeUpAnimate spaceToMove={300}>
                <div className="flex flex-col gap-4 sm:gap-8 md:gap-4 lg:gap-6 xl:gap-10">
                  <p className="text-[28px] min-[540px]:text-[36px]  md:text-xl lg:text-[24px] xl:text-3xl text-white font-bold">
                    ENTION WORKBOOK
                    <span
                      className="font-thin"
                      style={{ position: "relative", top: "-5px" }}
                    >
                      &reg;
                    </span>{" "}
                    SERIES
                  </p>
                  <div className="flex flex-col gap-1 sm:gap-4 md:gap-1 lg:gap-4">
                    <li className="text-white text-lg min-[450px]:text-xl sm:text-2xl md:text-lg lg:text-xl xl:text-2xl ">
                      Students
                    </li>
                    <li className="text-white text-lg min-[450px]:text-xl sm:text-2xl md:text-lg lg:text-xl xl:text-2xl ">
                      Working Professional
                    </li>
                  </div>
                  <div className="flex gap-5 mt-5">
                    <Image src={corei5} alt="cpu-image" width={80} height={80} className="w-12 min-[450px]:w-16 sm:w-20 md:w-16 lg:w-20 h-auto" />
                    <Image src={corei7} alt="cpu-image" width={80} height={80} className="w-12 min-[450px]:w-16 sm:w-20 md:w-16 lg:w-20 h-auto" />
                    <Image src={amd5} alt="cpu-image" width={80} height={80} className="w-12 min-[450px]:w-16 sm:w-20 md:w-16 lg:w-20 h-auto" />
                    <Image src={amd7} alt="cpu-image" width={80} height={80} className="w-12 min-[450px]:w-16 sm:w-20 md:w-16 lg:w-20 h-auto" />
                  </div>
                  <button
                    className="bg-white mt-4 xl:mt-8 z-[2] w-[160px] h-[36px] min-[450px]:w-[200px] min-[450px]:h-[45px] sm:w-[Cpx] md:w-[200px] sm:h-[38px] md:h-[42px] xl:w-[248px] xl:h-[58px] rounded-3xl flex justify-center items-center text-black text-base min-[450px]:text-lg md:text-xl xl:text-2xl hover:scale-105  transition-all duration-300 ease-in-out"
                    onClick={() => router.push('/product')}
                  >
                    Explore More
                  </button>
                </div>
              </FadeUpAnimate>
            </div>
            <div className="flex flex-col md:flex-row-reverse justify-center items-start md:items-center gap-6 md:gap-12 lg:gap-24 w-[80%] md:w-full mt-16 min-[876px]:mt-24 xl:mt-32">
              <div className="relative h-[425px] w-full md:w-[360px] lg:w-[480px] min-[1240px]:w-[540px] xl:w-[640px] flex items-center justify-center">
                {/* Blurred/partial laptop image */}
                <Image src={marketpc} alt="swapbook-coming-soon" width={640} height={200} className="w-full h-[200px] object-cover rounded-lg md:h-full md:rounded-lg blur-sm" style={{ objectPosition: 'right' }} />
                {/* Overlay text */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-extrabold text-white text-4xl md:text-5xl lg:text-6xl text-center drop-shadow-lg">
                    Coming Soon.
                  </span>
                </div>
              </div>
              <FadeUpAnimate>
                <div className="flex flex-col gap-4 sm:gap-8 md:gap-4 lg:gap-6 xl:gap-10">
                  <p className="text-[28px] min-[540px]:text-[36px]  md:text-xl lg:text-[24px] xl:text-3xl text-white font-bold">
                    ENTION SWAPBOOK SERIES
                  </p>
                  <div className="flex flex-col gap-1 sm:gap-4 md:gap-1 lg:gap-4">
                    <li className="text-white text-lg min-[450px]:text-xl sm:text-2xl md:text-lg lg:text-xl xl:text-2xl ">
                      Gamers
                    </li>
                    <li className="text-white text-lg min-[450px]:text-xl sm:text-2xl md:text-lg lg:text-xl xl:text-2xl ">
                      Graphic Designer
                    </li>
                  </div>
                  <div className="flex gap-5 mt-5">
                    <Image src={corei9} alt="cpu-image" width={80} height={80} className="w-12 min-[450px]:w-16 sm:w-20 md:w-16 lg:w-20 h-auto" />
                    <Image src={nvidia} alt="cpu-image" width={80} height={80} className="w-12 min-[450px]:w-16 sm:w-20 md:w-16 lg:w-20 h-auto" />
                  </div>
                  <button
                    className="bg-white mt-4 xl:mt-8 z-[2] w-[160px] h-[36px] min-[450px]:w-[200px] min-[450px]:h-[45px] sm:w-[Cpx] md:w-[200px] sm:h-[38px] md:h-[42px] xl:w-[248px] xl:h-[58px] rounded-3xl flex justify-center items-center text-black text-base min-[450px]:text-lg md:text-xl xl:text-2xl hover:scale-105  transition-all duration-300 ease-in-out"
                    onClick={() => router.push('ecommerce/product')}
                  >
                    Explore More
                  </button>
                </div>
              </FadeUpAnimate>
            </div>
          </div>
        </div>
        <div
          className=" flex flex-col max-h-fit -z-10"
          style={{
            backgroundImage: `url(${gradientbg2.src})`,
            backgroundSize: "100% 100%",
          }}
        >
          <div className="w-full flex mt-20 justify-center mb-20">
            <div className="w-[80%] flex flex-col min-[940px]:flex-row items-start min-[940px]:items-center justify-between gap-20 min-[940px]:gap-5">
              <FadeUpAnimate>
                <div className="flex flex-col gap-5 ">
                  <p className="text-[28px] min-[540px]:text-[36px] min-[1120px]:text-[48px] xl:text-[54px] leading-tight text-white w-[280px] min-[540px]:w-[360px] min-[1120px]:w-[480px] xl:w-[556px] font-bold">
                    Ention laptop experience program
                  </p>
                  <div className="flex flex-col gap-4 mt-5 xl:mt-10">
                    <div className="flex gap-3 lg:gap-6 xl:gap-10 items-center">
                      <CheckIcon />
                      <p className="text-lg min-[540px]:text-xl xl:text-2xl text-white">
                        No obligation to purchase
                      </p>
                    </div>
                    <div className="flex gap-3 lg:gap-6 xl:gap-10 items-center">
                      <CheckIcon />
                      <p className="text-lg min-[540px]:text-xl xl:text-2xl text-white">
                        Exclusive Offers during B2B and Bulk purchase
                      </p>
                    </div>
                    <div className="flex gap-3 lg:gap-6 xl:gap-10 items-center">
                      <CheckIcon />
                      <p className="text-lg min-[540px]:text-xl xl:text-2xl text-white">
                        Sample Delivery to your company
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowBookNowForm(true)}
                    className="bg-white mt-4 xl:mt-8 z-[2] w-[160px] h-[36px] min-[450px]:w-[200px] min-[450px]:h-[45px] sm:w-[Cpx] md:w-[200px] sm:h-[38px] md:h-[42px] xl:w-[248px] xl:h-[58px] rounded-3xl flex justify-center items-center text-black text-base min-[450px]:text-lg md:text-xl xl:text-2xl hover:scale-105  transition-all duration-300 ease-in-out"
                  >
                    Book Now
                  </button>
                </div>
              </FadeUpAnimate>

              <motion.div
                className="w-full min-[940px]:w-[560px] h-auto min-[940px]:h-[540px] xl:h-[620px] bg-[length:90%] mx-auto"
                style={{
                  backgroundImage: `url(${lappy.src})`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
              >
                {showBookNowForm && (
                  <BlurInText duration={0.3}>
                    <div
                      className="w-full h-full p-6 min-[450px]:p-8 xl:p-12 rounded-3xl"
                      style={{ backgroundColor: "rgba(255, 255, 255, 0.6)" }}
                    >
                      <div className="flex flex-row-reverse">
                        <div
                          onClick={() => setShowBookNowForm(false)}
                          style={{
                            color: "rgb(14, 74, 103)",
                            fontSize: "30px",
                            fontWeight: "bold",
                            cursor: "pointer",
                            lineHeight: "20px",
                            marginTop: "-15px",
                            marginRight: "-15px",
                          }}
                        >
                          &times;
                        </div>
                      </div>
                      <div className="flex flex-col gap-5">
                        <p
                          className="text-xl min-[380px]:text-2xl min-[540px]:text-3xl xl:text-4xl font-bold"
                          style={{ color: "rgba(14, 74, 103, 1)" }}
                        >
                          Book Experience Program
                        </p>
                        <div className="flex flex-col gap-2">
                          <p
                            className="text-xs ml-2"
                            style={{ color: "rgba(14, 74, 103, 1)" }}
                          >
                            Name
                          </p>
                          <input
                            type="text"
                            name="name"
                            className="w-full rounded-md select-none border bg-white h-10 xl:h-14 pl-2"
                            style={{ borderColor: "rgba(111, 207, 151, 1)" }}
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <p
                            className="text-xs ml-2"
                            style={{ color: "rgba(14, 74, 103, 1)" }}
                          >
                            Company Name
                          </p>
                          <input
                            type="text"
                            name="company_name"
                            className="w-full rounded-md select-none border bg-white h-10 xl:h-14 pl-2"
                            style={{ borderColor: "rgba(111, 207, 151, 1)" }}
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <p
                            className="text-xs ml-2"
                            style={{ color: "rgba(14, 74, 103, 1)" }}
                          >
                            Email
                          </p>
                          <input
                            type="email"
                            name="email"
                            className="w-full rounded-md select-none border bg-white h-10 xl:h-14 pl-2"
                            style={{ borderColor: "rgba(111, 207, 151, 1)" }}
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <p
                            className="text-xs ml-2"
                            style={{ color: "rgba(14, 74, 103, 1)" }}
                          >
                            Message
                          </p>
                          <textarea
                            name="message"
                            className="w-full rounded-md select-none border bg-white h-10 xl:h-14 p-2"
                            style={{ borderColor: "rgba(111, 207, 151, 1)" }}
                          />
                        </div>
                        <div>
                          <input
                            type="submit"
                            name="submit"
                            content="Submit"
                            className="mt-7 xl:mt-4 cursor-pointer w-full h-10 xl:h-14 flex center rounded-md text-white text-lg min-[540px]:text-xl font-bold hover:scale-105 transition-all duration-300 ease-in-out"
                            style={{
                              backgroundColor: "#1673a2",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </BlurInText>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
