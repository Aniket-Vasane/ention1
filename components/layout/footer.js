import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";
import logo from "assets/ention-logo.png";
import Image from "next/image";

const Footer = () => {
  const router = useRouter();
  return (
    <div
      className="w-full lg:h-[350px] flex items-center p-6 min-[480px]:p-10"
      style={{ backgroundColor: "rgba(7, 13, 42, 1)" }}
    >
      <div className="flex flex-col lg:flex-row items-center lg:items-start lg:h-full w-full gap-10 lg:gap-0 justify-between xl:justify-around">
        <div className="flex flex-col justify-between items-center h-[160px] lg:h-[280px]">
          <div className="flex flex-col items-center">
            <Image
              src={logo}
              alt="ention-logo"
              width={90}
              height={40}
              onClick={() => router.push("/")}
              className="w-[90px] h-auto object-none cursor-pointer"
            />
            <div className="text-white font-bold text-lg">
              Ention Technology and Services Pvt. Ltd.
            </div>
            <div className="text-white font-bold text-lg">
              Ention Energy Pvt. Ltd.
            </div>
          </div>

          <div className="flex items-center gap-10">
            <Link
              href="https://www.instagram.com/entiontech/"
              target="_blank"
              rel="noopenner noreferrer"
              className="select-none "
            >
              <BsInstagram color="#FFFFFF" size={16} />
            </Link>
            <Link
              href="https://x.com/EntionTech"
              target="_blank"
              rel="noopenner noreferrer"
              className="select-none "
            >
              <BsTwitter color="#FFFFFF" size={16} />
            </Link>
            <Link
              href="https://www.linkedin.com/company/entiontechnology/"
              target="_blank"
              rel="noopenner noreferrer"
              className="select-none "
            >
              <BsLinkedin color="#FFFFFF" size={16} />
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-2 md:flex gap-16 xl:gap-24">
          <div className="flex flex-col gap-4">
            <p className="text-white text-base">Product</p>
            <Link
              href="/"
              className="text-[#969799] text-base select-none cursor-pointer hover:text-white whitespace-nowrap"
              rel="noopenner noreferrer"
            >
              Features
            </Link>
            <Link
              href="/"
              className="text-[#969799] text-base select-none cursor-pointer hover:text-white whitespace-nowrap"
              rel="noopenner noreferrer"
            >
              Integrations
            </Link>
            <Link
              href="/"
              className="text-[#969799] text-base select-none cursor-pointer hover:text-white whitespace-nowrap"
              rel="noopenner noreferrer"
            >
              Pricing
            </Link>
            <Link
              href="/"
              className="text-[#969799] text-base select-none cursor-pointer hover:text-white whitespace-nowrap"
              rel="noopenner noreferrer"
            >
              Download
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-white text-base">Company</p>
            <Link
              className="text-[#969799] text-base select-none cursor-pointer hover:text-white whitespace-nowrap"
              rel="noopenner noreferrer"
              href="/about"
            >
              About us
            </Link>
            <Link
              className="text-[#969799] text-base select-none cursor-pointer hover:text-white whitespace-nowrap"
              rel="noopenner noreferrer"
              href="/blogs"
            >
              Blog
            </Link>
            <Link
              className="text-[#969799] text-base select-none cursor-pointer hover:text-white whitespace-nowrap"
              href="/career"
            >
              Career
            </Link>
            <Link
              href="/"
              className="text-[#969799] text-base select-none cursor-pointer hover:text-white whitespace-nowrap"
              rel="noopenner noreferrer"
            >
              Brand
            </Link>
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-white text-base">Resources</p>
            <Link
              href="/"
              className="text-[#969799] text-base select-none cursor-pointer hover:text-white whitespace-nowrap"
              rel="noopenner noreferrer"
            >
              Startup Program
            </Link>
            <Link
              href="/"
              className="text-[#969799] text-base select-none cursor-pointer hover:text-white whitespace-nowrap"
              rel="noopenner noreferrer"
            >
              Community
            </Link>
            <Link
              href="/"
              className="text-[#969799] text-base select-none cursor-pointer hover:text-white whitespace-nowrap"
              rel="noopenner noreferrer"
            >
              Contact
            </Link>
            <Link
              href="/"
              className="text-[#969799] text-base select-none cursor-pointer hover:text-white whitespace-nowrap"
              rel="noopenner noreferrer"
            >
              Privacy Policy
            </Link>
            <Link
              href="/"
              className="text-[#969799] text-base select-none cursor-pointer hover:text-white whitespace-nowrap"
              rel="noopenner noreferrer"
            >
              Terms of service
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
