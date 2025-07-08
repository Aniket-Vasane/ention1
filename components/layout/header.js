import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import logo from "assets/ention-logo.png";
import { IoMenu } from "react-icons/io5";
import { GrClose } from "react-icons/gr";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import Image from "next/image";

const Header = () => {
  const [isShowModal, setShowModal] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [bgColor, setBgColor] = useState();
  const router = useRouter();

  useEffect(() => {
    const updatePosition = () => {
      const position = window.pageYOffset;
      setBgColor(position > 5 ? "none" : "#138397");
    };

    window.addEventListener("scroll", updatePosition);

    // Call once to initialize
    updatePosition();

    return () => window.removeEventListener("scroll", updatePosition);
  }, []);

  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollY > 100 && window.scrollY > lastScrollY) {
        setHidden(true); // Move navbar up on scroll down
      } else {
        setHidden(false); // Bring it back on scroll up
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    if (router && router.prefetch) {
      router.prefetch("/about");
      // Optionally prefetch other important pages:
      // router.prefetch("/ecommerce/product");
      // router.prefetch("/technical-support");
    }
  }, [router]);

  const handleOpenMenu = () => {
    setShowModal(true);
    // Prefetch important routes for instant navigation
    router.prefetch("/");
    router.prefetch("/ecommerce/product");
    router.prefetch("/about");
    router.prefetch("/technical-support");
    router.prefetch("/login");
    router.prefetch("/signup");
  };

  return (
    <motion.div
      style={{
        backdropFilter: "blur(10px)",
      }}
      initial={{ y: 0 }}
      animate={{ y: hidden ? "-100%" : "0%" }} // Move up instead of disappearing
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="h-20 fixed z-50 w-full flex items-center justify-between px-4 lg:px-10 top-0 mb-10"
    >
      {/* MOBILE HEADER: Only visible on mobile (below lg) */}
      <div className="flex lg:hidden w-full items-center justify-between">
        {/* Hamburger menu on left */}
        <button
          className="text-white text-3xl"
          onClick={handleOpenMenu}
        >
          <IoMenu />
        </button>
        {/* Centered logo */}
        <Image
          src={logo}
          alt="ention-logo-mobile"
          width={90}
          height={90}
          className="w-[90px] h-auto object-contain cursor-pointer"
          onClick={() => router.push("/")}
        />
        {/* Cart icon on right */}
        <Link href="/ecommerce/cart" className="flex items-center">
          <FaShoppingCart className="text-white text-2xl hover:text-[#01E9FE] transition" />
        </Link>
      </div>

      {/* DESKTOP HEADER: Only visible on lg and above */}
      <div className="hidden lg:flex w-full items-center justify-center gap-6 xl:gap-10 min-[1320px]:gap-10 mr-[90px] ">
        <Link
          href="/collaborate"
          className="font-semibold text-xl text-white hover:underline underline-offset-8 decoration-[#007E9E] decoration-4"
        >
          Collaborate
        </Link>
        <Link
          href="/"
          className="font-semibold text-xl text-white hover:underline underline-offset-8 decoration-[#007E9E] decoration-4"
        >
          Home
        </Link>
        <Link
          href="/ecommerce/product"
          className="font-semibold text-xl text-white hover:underline underline-offset-8 decoration-[#007E9E] decoration-4"
        >
          Products
        </Link>
        <Image
          src={logo}
          alt="ention-logo-desktop"
          width={90}
          height={90}
          className="object-contain cursor-pointer"
          onClick={() => router.push("/")}
        />
        <Link
          href="/about"
          className="font-semibold text-xl text-white hover:underline underline-offset-8 decoration-[#007E9E] decoration-4"
        >
          About Us
        </Link>
        <Link
          href="/technical-support"
          className="font-semibold text-xl text-white hover:underline underline-offset-8 decoration-[#007E9E] decoration-4"
        >
          Support
        </Link>
        
        <Link href="/ecommerce/cart" className="flex items-center">
          <FaShoppingCart className="text-white text-2xl hover:text-[#01E9FE] transition" />
        </Link>
       
      </div>

      {/* Dashboard nav link absolute left (desktop only) */}
      <Link
        href="/dashboard"
        className="hidden lg:block absolute left-10 text-white hover:text-[#01E9FE] transition"
        style={{ zIndex: 60 }}
        title="Dashboard"
      >
        <FaUserCircle className="text-3xl" />
      </Link>

      {/* Desktop auth buttons - positioned absolutely on right */}
      <div className="absolute hidden lg:flex items-center gap-2 right-10">
        <Link
          href={{
            pathname: "/login",
            query: {
              redirect: `/${pathname}?${searchParams?.toString()}`,
            },
          }}
        >
          <button className="w-24 h-8 bg-transparent border rounded-3xl border-white flex center text-white text-sm hover:scale-105  transition-all duration-300 ease-in-out">
            Login
          </button>
        </Link>
        <Link href={"/signup"}>
          <button className="px-8 h-8 bg-white border rounded-3xl border-white flex center text-black text-sm hover:scale-105  transition-all duration-300 ease-in-out">
            Register
          </button>
        </Link>
      </div>

      {isShowModal ? (
        <>
          {/* Overlay background */}
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-40 lg:hidden"
            onClick={() => setShowModal(false)}
          ></div>
          {/* Side drawer */}
          <div className="fixed left-0 top-0 h-full min-h-screen w-[80vw] max-w-[340px] bg-white z-50 flex flex-col shadow-2xl rounded-r-2xl border-r border-gray-200 overflow-y-auto transition-all duration-300 ease-in-out lg:hidden">
            {/* Header with logo and close button */}
            <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
              <Image
                src={logo}
                alt="ention-logo"
                width={60}
                height={40}
                className="w-[60px] h-auto object-contain cursor-pointer text-black" style={{color: "black"}}
                onClick={() => { setShowModal(false); router.push("/"); }}
              />
              <button
                className="text-2xl text-gray-700 p-2 rounded-full hover:bg-gray-100 focus:outline-none"
                onClick={() => setShowModal(false)}
                aria-label="Close menu"
              >
                <GrClose />
              </button>
            </div>
            {/* Navigation links */}
            <nav className="flex flex-col gap-1 flex-1 px-4 py-2 mt-2">
              <Link href="/collaborate" passHref legacyBehavior>
                <a className="text-gray-900 text-base font-semibold text-left py-3 px-2 rounded hover:bg-gray-100 transition" onClick={() => setShowModal(false)}>Collaborate</a>
              </Link>
              <Link href="/" passHref legacyBehavior>
                <a className="text-gray-900 text-base font-semibold text-left py-3 px-2 rounded hover:bg-gray-100 transition" onClick={() => setShowModal(false)}>Home</a>
              </Link>
              <Link href="/ecommerce/product" passHref legacyBehavior>
                <a className="text-gray-900 text-base font-semibold text-left py-3 px-2 rounded hover:bg-gray-100 transition" onClick={() => setShowModal(false)}>Products</a>
              </Link>
              <Link href="/about" passHref legacyBehavior>
                <a className="text-gray-900 text-base font-semibold text-left py-3 px-2 rounded hover:bg-gray-100 transition" onClick={() => setShowModal(false)}>About Us</a>
              </Link>
              <Link href="/technical-support" passHref legacyBehavior>
                <a className="text-gray-900 text-base font-semibold text-left py-3 px-2 rounded hover:bg-gray-100 transition" onClick={() => setShowModal(false)}>Support</a>
              </Link>
              <Link href="/dashboard" passHref legacyBehavior>
                <a className="text-gray-900 text-base font-semibold text-left py-3 px-2 rounded hover:bg-gray-100 transition" onClick={() => setShowModal(false)}>Dashboard</a>
              </Link>
            </nav>
            {/* Auth buttons at bottom */}
            <div className="flex flex-col gap-2 px-4 pb-6 mb-8">
              <button
                className="w-full border border-black text-black rounded-3xl py-2 font-semibold text-base hover:bg-gray-100 transition"
                onClick={() => { setShowModal(false); router.push("/login"); }}
              >
                Login
              </button>
              <button
                className="w-full bg-black text-white rounded-3xl py-2 font-semibold text-base hover:bg-gray-900 transition"
                onClick={() => { setShowModal(false); router.push("/signup"); }}
              >
                Register
              </button>
            </div>
          </div>
        </>
      ) : null}
    </motion.div>
  );
};

// header
//                 <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
//                   <h3 className="text-3xl font-semibold">Modal Title</h3>
//                   <button
//                     className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
//                     onClick={() => setShowModal(false)}
//                   >
//                     <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
//                       ×
//                     </span>
//                   </button>
//                 </div>
//                 {/*body*/}
//                 <div className="relative p-6 flex-auto">
//                   <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
//                     I always felt like I could do anything. That's the main
//                     thing people are controlled by! Thoughts- their perception
//                     of themselves! They're slowed down by their perception of
//                     themselves. If you're taught you can't do anything, you
//                     won't do anything. I was taught I could do everything.
//                   </p>
//                 </div>
//                 {/*footer*/}
//                 <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
//                   <button
//                     className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
//                     type="button"
//                     onClick={() => setShowModal(false)}
//                   >
//                     Close
//                   </button>
//                   <button
//                     className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
//                     type="button"
//                     onClick={() => setShowModal(false)}
//                   >
//                     Save Changes
//                   </button>
//                 </div>

export default Header;