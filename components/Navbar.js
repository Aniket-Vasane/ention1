import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import logo from "../public/assets/log2.png";
import Image from "next/image";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { HiMenuAlt3 } from "react-icons/hi";
import { useSession, signOut } from "next-auth/react";
import { usePathname, useSearchParams } from "next/navigation";
import { IoIosArrowDown } from "react-icons/io";
const Products = ({ className }) => {
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);

  return (
    <div
      className={
        "relative  pt-4 md:pt-6 pb-4 px-4 md:px-8 min-w-[40vw] md:min-w-[35vw] text-gray-800 bg-white/90 md:flex md:gap-6 rounded-lg ml-12 md:ml-0"
      }
      style={{ zIndex: 99999999999, transform: "1px" }}
    >
      <div className="absolute left-1/2 -top-[25px] transform -translate-x-5/12 -ml-4 text-white bg-transparent text-lg font-bold w-20 h-10"></div>
      <div className="w-full md:w-1/2 lg:w-1/2 flex-col ">
        <h2 className="text-lg md:text-2xl font-semibold text-[#007E9E] mb-1 md:mb-3 hover:underline underline-offset-2 flex">
          {" "}
          <Link href="/products/laptops"> Laptops </Link>
          <span
            className="block md:hidden text-[#007E9E] pl-2 text-md pt-2"
            onClick={() => setShow(!show)}
          >
            {" "}
            <IoIosArrowDown />
          </span>{" "}
        </h2>
        <div
          className={`${
            show ? "" : "hidden"
          }  text-black md:flex relative  justify-start items-center select-none`}
        >
          <div>
            <h2 className="font-semibold mb-1 hover:underline underline-offset-2 text-[14px] lg:text-[16px]">
              {" "}
              <Link href="/products/laptops">Intel i7 processor </Link>{" "}
            </h2>

            <h2 className="font-semibold mb-1 hover:underline underline-offset-2 text-[14px] lg:text-[16px]">
              {" "}
              <Link href="/products/laptops"> Intel i5 processor</Link>{" "}
            </h2>

            <h2 className="font-semibold mb-1 hover:underline underline-offset-2 text-[14px] lg:text-[16px]">
              {" "}
              <Link href="/products/laptops"> AMD R5 processor</Link>{" "}
            </h2>

            {/* <h2 className='font-semibold mb-1 hover:underline underline-offset-2 text-[14px] lg:text-[16px]' > <Link href='/products/laptops'> AMD R7 processor</Link> </h2> */}

            <h2 className="font-semibold mb-1 hover:underline underline-offset-2 text-[14px] lg:text-[16px]">
              {" "}
              <Link href="/products/laptops"> Intel J4105 processor</Link>{" "}
            </h2>
            {/*}  <h2 className='font-semibold mb-1 hover:underline underline-offset-2 grow flex-1 text-[14px] lg:text-[16px]' > <Link href='/products/laptops'> Swap Series </Link> </h2>*/}
          </div>
        </div>
      </div>
      {/* <div className="w-full md:w-1/4 lg:w-1/4 flex-col ">
        <h2 className='text-lg md:text-2xl font-semibold text-[#007E9E] mb-1 md:mb-3 hover:underline underline-offset-2 flex' > <Link href='/products/desktops'> Desktops </Link> <span className='block md:hidden text-[#007E9E] pl-2 text-md pt-2' onClick={() => setShow1(!show1)}>	<IoIosArrowDown /></span> </h2>
        <div className={`${show1 ? '' : 'hidden'}  text-black md:flex relative  justify-start items-center select-none`}>
<div>
        <h2 className='font-semibold mb-1 hover:underline underline-offset-2 text-[14px] lg:text-[16px]' > <Link href='/products/laptops'> H Series </Link> </h2>
        <h2 className='font-semibold mb-1 hover:underline underline-offset-2 text-[14px] lg:text-[16px]' > <Link href='/products/laptops'> B Series </Link> </h2>
        <h2 className='font-semibold mb-1 hover:underline underline-offset-2 text-[14px] lg:text-[16px]' > <Link href='/products/laptops'> S Series </Link> </h2>
        <h2 className='font-semibold mb-1 hover:underline underline-offset-2 grow flex-1 text-[14px] lg:text-[16px]' > <Link href='/products/laptops'> Swap Series </Link> </h2>
    </div></div></div> */}
      {/* <div className="w-full md:w-1/4 lg:w-1/4 flex-col ">
        <h2 className='text-lg md:text-2xl font-semibold text-[#007E9E] mb-1 md:mb-3 hover:underline underline-offset-2 flex' > <Link href='/products/accessories'> Accessories </Link><span className='block md:hidden text-[#007E9E] pl-2 text-md pt-2' onClick={() => setShow2(!show2)}>	<IoIosArrowDown /></span>  </h2>
        <div className={`${show2 ? '' : 'hidden'}  text-black md:flex relative  justify-start items-center select-none`}>
<div>
        <h2 className='font-semibold mb-1 hover:underline underline-offset-2 text-[14px] lg:text-[16px]' > <Link href='/products/accessories/?category=charger'> Charger </Link> </h2>
        
        <h2 className='font-semibold mb-1 hover:underline underline-offset-2 text-[14px] lg:text-[16px]' > <Link href='/products/accessories/?category=ssd'> SSD </Link> </h2>
        <h2 className='font-semibold mb-1 hover:underline underline-offset-2 grow flex-1 text-[14px] lg:text-[16px]' > <Link href='/products/accessories/?category=ram'> RAM </Link> </h2>
        <h2 className='font-semibold mb-1 hover:underline underline-offset-2 grow flex-1 text-[14px] lg:text-[16px]' > <Link href='/products/accessories/?category=bags'> Laptop Bags </Link> </h2>
    </div>  </div></div> */}
      <div className="w-full md:w-1/2 lg:w-1/2 flex-col ">
        <h2 className="text-lg md:text-2xl font-semibold text-[#007E9E] mb-1 md:mb-3 hover:underline underline-offset-2 flex ">
          {" "}
          <Link href="/warranty"> Warranty </Link>
          <span
            className="block md:hidden text-[#007E9E] pl-2 text-md pt-2"
            onClick={() => setShow3(!show3)}
          >
            <IoIosArrowDown />
          </span>{" "}
        </h2>
        <div
          className={`${
            show3 ? "" : "hidden"
          }  text-black md:flex relative  justify-start items-center select-none`}
        >
          <div>
            {/* <h2 className='font-semibold mb-1 hover:underline underline-offset-2 text-[14px] lg:text-[16px]' > <Link href='/warranty'> Driver Search </Link> </h2> */}
            <h2 className="font-semibold mb-1 hover:underline underline-offset-2 text-[14px] lg:text-[16px]">
              {" "}
              <Link href="/warranty"> Warranty Lookup </Link>{" "}
            </h2>
            <h2 className="font-semibold mb-1 hover:underline underline-offset-2 text-[14px] lg:text-[16px]">
              {" "}
              <Link href="/warranty"> Warranty Upgradation </Link>{" "}
            </h2>
            <h2 className="font-semibold mb-1 hover:underline underline-offset-2 grow flex-1 text-[14px] lg:text-[16px]">
              {" "}
              <Link href="/warranty"> </Link>{" "}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};
const Business = ({ className }) => {
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [show4, setShow4] = useState(false);
  const [show5, setShow5] = useState(false);
  const [show6, setShow6] = useState(false);
  const [show7, setShow7] = useState(false);
  const [show8, setShow8] = useState(false);
  return (
    <div
      className={
        "relative pt-4 md:pt-6 pb-4 px-2 lg:px-10 min-w-[90vw] md:min-w-[90vw] lg:min-w-[90vw] text-gray-800 bg-white/90 flex flex-wrap rounded-lg ml-28 lg:ml-0 mr-0 lg:mr-10"
      }
      style={{ zIndex: 99999 }}
    >
      <div className="absolute left-1/2 -top-[25px] transform -translate-x-6/12 -ml-4 text-white bg-transparent text-lg font-bold w-20 h-10"></div>
      <div className="w-full md:w-1/4 lg:w-[20%] flex-col  pl-4 md:pl-0">
        <h2 className="text-md md:text-xl font-semibold text-[#007E9E] mb-3 hover:underline underline-offset-2 flex">
          {" "}
          <Link href="/service/start-a-business"> Start a Business </Link>
          <span
            className="block md:hidden text-[#007E9E] pl-2 text-md pt-2"
            onClick={() => setShow(!show)}
          >
            <IoIosArrowDown />
          </span>{" "}
        </h2>
        <div
          className={`${
            show ? "" : "hidden"
          }  text-black md:flex relative  justify-start items-center select-none`}
        >
          <div>
            <h2 className="font-semibold mb-1 hover:underline underline-offset-2 text-[12px] lg:text-[16px]">
              {" "}
              <Link href="/service/start-a-business/?category=sole-proprietorship">
                {" "}
                Sole proprietorship{" "}
              </Link>
            </h2>
            <h2 className="font-semibold mb-1 hover:underline underline-offset-2 text-[12px] lg:text-[16px]">
              <Link href="/service/start-a-business/?category=partnership-firm">
                {" "}
                Partnership firm{" "}
              </Link>
            </h2>
            <h2 className="font-semibold mb-1 hover:underline underline-offset-2 text-[12px] lg:text-[16px]">
              {" "}
              <Link href="/service/start-a-business/?category=opc">
                {" "}
                OPC{" "}
              </Link>{" "}
            </h2>
            <h2 className="font-semibold mb-1 hover:underline underline-offset-2 grow flex-1 text-[12px] lg:text-[16px]">
              {" "}
              <Link href="/service/start-a-business/?category=llp">
                {" "}
                LLP{" "}
              </Link>{" "}
            </h2>
            <h2 className="font-semibold mb-1 hover:underline underline-offset-2 text-[12px] lg:text-[16px]">
              {" "}
              <Link href="/service/start-a-business/?category=private-limited">
                {" "}
                Private limited company{" "}
              </Link>
            </h2>
            <h2 className="font-semibold mb-1 hover:underline underline-offset-2 text-[12px] lg:text-[16px]">
              <Link href="/service/start-a-business/?category=public-limited">
                {" "}
                Public limited company{" "}
              </Link>
            </h2>
            <h2 className="font-semibold mb-1 hover:underline underline-offset-2 text-[12px] lg:text-[16px]">
              {" "}
              <Link href="/service/start-a-business/?category=producer-company">
                {" "}
                Producer company{" "}
              </Link>{" "}
            </h2>
            <h2 className="font-semibold mb-1 hover:underline underline-offset-2 grow flex-1 text-[12px] lg:text-[16px]">
              {" "}
              <Link href="/service/start-a-business/?category=nidhi-company">
                Nidhi company{" "}
              </Link>{" "}
            </h2>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/4 lg:w-[25%] flex-col pl-4 md:pl-0">
        <h2 className="text-md md:text-xl font-semibold text-[#007E9E] mb-3 hover:underline underline-offset-2 flex">
          <Link href="/service/certification-registration">
            Certification and Registration{" "}
          </Link>
          <span
            className="block md:hidden text-[#007E9E] pl-2 text-md pt-2"
            onClick={() => setShow1(!show1)}
          >
            <IoIosArrowDown />
          </span>{" "}
        </h2>
        <div
          className={`${
            show1 ? "" : "hidden"
          }  text-black md:flex relative  justify-start items-center select-none`}
        >
          <div>
            <h2 className="font-semibold mb-1 hover:underline underline-offset-2 text-[12px] lg:text-[16px]">
              {" "}
              <Link href="/service/certification-registration/?category=startup-registration">
                Startup registration
              </Link>
            </h2>
            <h2 className="font-semibold mb-1 hover:underline underline-offset-2 text-[12px] lg:text-[16px]">
              <Link href="/service/certification-registration/?category=msme">
                MSME Registration{" "}
              </Link>
            </h2>

            <h2 className="font-semibold mb-1 hover:underline underline-offset-2 text-[12px] lg:text-[16px]">
              <Link href="/service/certification-registration/?category=fssai">
                FSSAI Registration{" "}
              </Link>{" "}
            </h2>
            <h2 className="font-semibold mb-1 hover:underline underline-offset-2 grow flex-1 text-[12px] lg:text-[16px]">
              {" "}
              <Link href="/service/certification-registration/?category=bis">
                BIS Registration
              </Link>{" "}
            </h2>
            <h2 className="font-semibold mb-1 hover:underline underline-offset-2 text-[12px] lg:text-[16px]">
              {" "}
              <Link href="/service/certification-registration/?category=iso-certification">
                ISO Certification{" "}
              </Link>
            </h2>
            <h2 className="font-semibold mb-2 hover:underline underline-offset-2 text-[14px] lg:text-[16px]">
              {" "}
              <Link href="/service/cert-register/?category=shop-establishment">
                {" "}
                Shop and establishment registration
              </Link>{" "}
            </h2>
            <h2 className="font-semibold mb-2 hover:underline underline-offset-2 text-[14px] lg:text-[16px]">
              {" "}
              <Link href="/service/cert-register/?category=pf-registration">
                PF registration{" "}
              </Link>{" "}
            </h2>
            <h2 className="font-semibold mb-2 hover:underline underline-offset-2 text-[14px] lg:text-[16px]">
              {" "}
              <Link href="/service/cert-register/?category=esi-registration">
                {" "}
                ESI Registration{" "}
              </Link>{" "}
            </h2>
            <h2 className="font-semibold mb-2 hover:underline underline-offset-2 text-[14px] lg:text-[16px]">
              {" "}
              <Link href="/service/cert-register/?category=iec">
                {" "}
                IEC(import export code)
              </Link>{" "}
            </h2>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/4 lg:w-[20%] flex-col pl-4 md:pl-0">
        <h2 className="text-md md:text-xl font-semibold text-[#007E9E] mb-3 hover:underline underline-offset-2 flex">
          <Link href="/service/trademark"> Trademark </Link>
          <span
            className="block md:hidden text-[#007E9E] pl-2 text-md pt-2"
            onClick={() => setShow2(!show2)}
          >
            <IoIosArrowDown />
          </span>{" "}
        </h2>
        <div
          className={`${
            show2 ? "" : "hidden"
          }  text-black md:flex relative  justify-start items-center select-none`}
        >
          <div>
            <h2 className="font-semibold mb-1 hover:underline underline-offset-2 text-[12px] lg:text-[16px]">
              {" "}
              <Link href="/service/trademark/?category=search-report">
                Trademark Search Report
              </Link>
            </h2>
            <h2 className="font-semibold mb-1 hover:underline underline-offset-2 text-[12px] lg:text-[16px]">
              <Link href="/service/trademark/?category=trademark-registration">
                Trademark Registration
              </Link>
            </h2>

            <h2 className="font-semibold mb-1 hover:underline underline-offset-2 text-[12px] lg:text-[16px]">
              <Link href="/service/trademark/?category=reply-objection">
                Reply to Objection
              </Link>{" "}
            </h2>
            <h2 className="font-semibold mb-1 hover:underline underline-offset-2 grow flex-1 text-[12px] lg:text-[16px]">
              {" "}
              <Link href="/service/trademark/?category=trademark-renewal">
                Trademark Renewal
              </Link>{" "}
            </h2>

            <h2 className="font-semibold mb-2 hover:underline underline-offset-2 text-[14px] lg:text-[16px]">
              {" "}
              <Link href="/service/trademark/?category=assignment-trademark">
                {" "}
                Assignment of Trademark{" "}
              </Link>{" "}
            </h2>
            <h2 className="font-semibold mb-2 hover:underline underline-offset-2 text-[14px] lg:text-[16px]">
              {" "}
              <Link href="/service/trademark/?category=trademark-watch">
                {" "}
                Trademark Watch{" "}
              </Link>{" "}
            </h2>
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/4 lg:w-[15%] flex-col pl-4 md:pl-4">
        <h2 className="text-md md:text-xl font-semibold text-[#007E9E] mb-3 hover:underline underline-offset-2 flex">
          <Link href="/service/tax-complain"> Tax & Complainces </Link>
          <span
            className="block md:hidden text-[#007E9E] pl-2 text-md pt-2"
            onClick={() => setShow3(!show3)}
          >
            <IoIosArrowDown />
          </span>{" "}
        </h2>
        <div
          className={`${
            show3 ? "" : "hidden"
          }  text-black md:flex relative  justify-start items-center select-none`}
        >
          <div>
            <h2 className="font-semibold mb-1 hover:underline underline-offset-2 text-[12px] lg:text-[16px]">
              {" "}
              <Link href="/service/tax-complain/?category=pan-tan">
                {" "}
                PAN and TAN{" "}
              </Link>
            </h2>
            <h2 className="font-semibold mb-1 hover:underline underline-offset-2 text-[12px] lg:text-[16px]">
              <Link href="/service/tax-complain/?category=gst-registration">
                {" "}
                GST registration
              </Link>
            </h2>

            <h2 className="font-semibold mb-1 hover:underline underline-offset-2 text-[12px] lg:text-[16px]">
              <Link href="/service/tax-complain/?category=gst-return">
                {" "}
                GST Return{" "}
              </Link>{" "}
            </h2>
            <h2 className="font-semibold mb-1 hover:underline underline-offset-2 grow flex-1 text-[12px] lg:text-[16px]">
              {" "}
              <Link href="/service/tax-complain/?category=itr">ITR </Link>{" "}
            </h2>
            <h2 className="font-semibold mb-1 hover:underline underline-offset-2 text-[12px] lg:text-[16px]">
              {" "}
              <Link href="/service/tax-complain/?category=tds-return">
                {" "}
                TDS Return{" "}
              </Link>
            </h2>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/4 lg:w-[15%] flex-col pl-4 lg:pl-10">
        <h2 className="text-md md:text-xl font-semibold text-[#007E9E] mb-3 hover:underline underline-offset-2 flex">
          <Link href="/service/annual-compilance"> Annual Complaince</Link>
          <span
            className="block md:hidden text-[#007E9E] pl-2 text-md pt-2"
            onClick={() => setShow4(!show4)}
          >
            <IoIosArrowDown />
          </span>{" "}
        </h2>
        <div
          className={`${
            show4 ? "" : "hidden"
          }  text-black md:flex relative  justify-start items-center select-none`}
        >
          <div>
            <h2 className="font-semibold mb-2 hover:underline underline-offset-2 grow flex-1 text-[14px] lg:text-[16px]  capitalize">
              {" "}
              <Link href="/service/annual-compilance">
                Annual compliance{" "}
              </Link>{" "}
            </h2>
            <h2 className="font-semibold mb-2 hover:underline underline-offset-2 grow flex-1 text-[14px] lg:text-[16px] capitalize">
              {" "}
              <Link href="/service/accounting">Accounting </Link>{" "}
            </h2>
            <h2 className="font-semibold mb-2 hover:underline underline-offset-2 grow flex-1 text-[14px] lg:text-[16px] capitalize">
              {" "}
              <Link href="/service/report">Report </Link>{" "}
            </h2>
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/4 lg:w-[20%] flex-col  pl-4 md:pl-0">
        <h2 className="text-md md:text-xl font-semibold text-[#007E9E] mb-3 hover:underline underline-offset-2 flex">
          <Link href="/service/ngo-service"> NGO Services </Link>
          <span
            className="block md:hidden text-[#007E9E] pl-2 text-md pt-2"
            onClick={() => setShow5(!show5)}
          >
            <IoIosArrowDown />
          </span>{" "}
        </h2>
        <div
          className={`${
            show5 ? "" : "hidden"
          }  text-black md:flex relative  justify-start items-center select-none`}
        >
          <div>
            <h2 className="font-semibold mb-1 hover:underline underline-offset-2 text-[12px] lg:text-[16px]">
              {" "}
              <Link href="/service/ngo-service/?category=society-regitration">
                Society registration{" "}
              </Link>
            </h2>
            <h2 className="font-semibold mb-1 hover:underline underline-offset-2 text-[12px] lg:text-[16px]">
              <Link href="/service/ngo-service/?category=trust-registration">
                Trust registration
              </Link>
            </h2>

            <h2 className="font-semibold mb-1 hover:underline underline-offset-2 text-[12px] lg:text-[16px]">
              <Link href="/service/ngo-service/?category=sec-company">
                Sec 8 company registration
              </Link>{" "}
            </h2>
            <h2 className="font-semibold mb-1 hover:underline underline-offset-2 grow flex-1 text-[12px] lg:text-[16px]">
              {" "}
              <Link href="/service/ngo-service/?category=darpan-registration">
                Darpan Registration{" "}
              </Link>{" "}
            </h2>
            <h2 className="font-semibold mb-2 hover:underline underline-offset-2 text-[14px] lg:text-[16px]">
              {" "}
              <Link href="/service/ngo-service/?category=sec-12a">
                {" "}
                Sec 12A and Sec80G registration{" "}
              </Link>{" "}
            </h2>
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/4 lg:w-[25%] flex-col  pl-4 md:pl-0">
        <h2 className="text-md md:text-xl font-semibold text-[#007E9E] mb-3 hover:underline underline-offset-2 flex">
          <Link href="/service/patent-copyright"> Patent & Copy Right </Link>
          <span
            className="block md:hidden text-[#007E9E] pl-2 text-md pt-2"
            onClick={() => setShow7(!show7)}
          >
            <IoIosArrowDown />
          </span>{" "}
        </h2>
        <div
          className={`${
            show7 ? "" : "hidden"
          }  text-black md:flex relative  justify-start items-center select-none`}
        >
          <div>
            <h2 className="font-semibold mb-2 hover:underline underline-offset-2 grow flex-1 text-[14px] lg:text-[16px]  ">
              {" "}
              <Link href="/service/patent-copyright/?category=patent-search">
                Patent Search{" "}
              </Link>{" "}
            </h2>
            <h2 className="font-semibold mb-2 hover:underline underline-offset-2 grow flex-1 text-[14px] lg:text-[16px] ">
              {" "}
              <Link href="/service/patent-copyright/?category=patent-provisional">
                Patent Provisional Application{" "}
              </Link>{" "}
            </h2>
            <h2 className="font-semibold mb-2 hover:underline underline-offset-2 grow flex-1 text-[14px] lg:text-[16px] ">
              {" "}
              <Link href="/service/patent-copyright/?category=patent-permanent">
                Patent Permanent Application
              </Link>{" "}
            </h2>
            <h2 className="font-semibold mb-2 hover:underline underline-offset-2 grow flex-1 text-[14px] lg:text-[16px] ">
              {" "}
              <Link href="/service/patent-copyright/?category=copy-right">
                Copy Right Registration
              </Link>{" "}
            </h2>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/4 lg:w-[30%] flex-col pl-4 lg:pl-0">
        <h2 className="text-md md:text-xl font-semibold text-[#007E9E] mb-3 hover:underline underline-offset-2 flex">
          <Link href="/service/conversion"> Conversion </Link>
          <span
            className="block md:hidden text-[#007E9E] pl-2 text-md pt-2"
            onClick={() => setShow6(!show6)}
          >
            <IoIosArrowDown />
          </span>{" "}
        </h2>
        <div
          className={`${
            show6 ? "" : "hidden"
          }  text-black md:flex relative  justify-start items-center select-none`}
        >
          <div>
            <h2 className="font-semibold mb-1 hover:underline underline-offset-2 text-[12px] lg:text-[16px]">
              {" "}
              <Link href="/service/conversion/?category=conversion-proprietorship">
                Conversion of proprietorship into company{" "}
              </Link>
            </h2>
            <h2 className="font-semibold mb-1 hover:underline underline-offset-2 text-[12px] lg:text-[16px]">
              <Link href="/service/conversion/?category=conversion-partnership">
                {" "}
                Conversion of partnership firm into company
              </Link>
            </h2>

            <h2 className="font-semibold mb-1 hover:underline underline-offset-2 text-[12px] lg:text-[16px]">
              <Link href="/service/conversion/?category=conversion-opc">
                Conversion of OPC into company
              </Link>{" "}
            </h2>
            <h2 className="font-semibold mb-1 hover:underline underline-offset-2 grow flex-1 text-[12px] lg:text-[16px]">
              {" "}
              <Link href="/service/conversion/?category=conversion-llp">
                Conversion of LLP into company{" "}
              </Link>{" "}
            </h2>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/4 lg:w-[20%] flex-col  pl-4 md:pl-4">
        <h2 className="text-md md:text-xl font-semibold text-[#007E9E] mb-3 hover:underline underline-offset-2 flex">
          <Link href="/service/eveIT-services"> eveIT Services </Link>
          <span
            className="block md:hidden text-[#007E9E] pl-2 text-md pt-2"
            onClick={() => setShow8(!show8)}
          >
            <IoIosArrowDown />
          </span>{" "}
        </h2>
        <div
          className={`${
            show8 ? "" : "hidden"
          }  text-black md:flex relative  justify-start items-center select-none`}
        >
          <div>
            <h2 className="font-semibold mb-2 hover:underline underline-offset-2 grow flex-1 text-[14px] lg:text-[16px]  ">
              {" "}
              <Link href="/service/eveIT-services/?category=website-development">
                Website Development{" "}
              </Link>{" "}
            </h2>
            <h2 className="font-semibold mb-2 hover:underline underline-offset-2 grow flex-1 text-[14px] lg:text-[16px] ">
              {" "}
              <Link href="/service/eveIT-services/?category=social-media-marketing">
                Social Media Marketing{" "}
              </Link>{" "}
            </h2>
            <h2 className="font-semibold mb-2 hover:underline underline-offset-2 grow flex-1 text-[14px] lg:text-[16px] ">
              {" "}
              <Link href="/service/eveIT-services/?category=email-marketing">
                Email Marketing
              </Link>{" "}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [desktopNav, setDesktopNav] = useState(false);
  const toggleDesktopnav = () => setDesktopNav(() => !desktopNav);
  const auth = useSession();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <nav className="bg-transparent py-2 px-7 flex justify-between z-0">
      <Link href="/">
        <Image src={logo} width={80} height={80} alt="Logo" />
      </Link>

      <div
        className={`${
          visible ? "" : "hidden"
        } text-gray-200 text-[18px] lg:inline-flex relative flex justify-center items-center select-none`}
      >
        <div className="flex flex-col lg:flex-row justify-center items-center w-full my-auto relative">
          <Link
            href="/vision"
            className="mr-5 hover:underline underline-offset-8 decoration-[#007E9E] decoration-4 hover:text-white font-semibold"
          >
            Vision
          </Link>
          <div className="relative group">
            <Link
              href="/ecommerce/product"
              className="mr-5 group-hover:text-white group-hover:underline underline-offset-8 decoration-[#007E9E] decoration-4 font-semibold cursor-pointer"
            >
              Product
            </Link>
            <div
              className="absolute top-10 transform -translate-x-1/2 left-1 group-hover:block hidden "
              style={{ zIndex: 999999 }}
            >
              {" "}
              <Products />{" "}
            </div>
          </div>
          <div className="relative group">
            <h2
              href="/service/start-a-business"
              className="mr-5 group-hover:text-white group-hover:underline underline-offset-8 decoration-[#007E9E] decoration-4 font-semibold cursor-pointer"
            >
              Business Service
            </h2>
            <div
              className="absolute top-10 transform -translate-x-1/2 left-1 group-hover:block hidden "
              style={{ zIndex: 999999 }}
            >
              {" "}
              <Business />{" "}
            </div>
          </div>

          {/* <Link href="/technical-support" className='mr-5 hover:text-white font-semibold hover:underline underline-offset-8 decoration-[#007E9E] decoration-4'>Technical Support</Link> */}
          <Link
            href="/associate"
            className="mr-5 hover:text-white font-semibold hover:underline underline-offset-8 decoration-[#007E9E] decoration-4"
          >
            Associate With Us
          </Link>
          <Link
            href="/blogs"
            className="mr-5 hover:text-white font-semibold hover:underline underline-offset-8 decoration-[#007E9E] decoration-4"
          >
            {" "}
            Knowledge Blog
          </Link>
          <div className="relative mr-5 hover:text-white font-semibold text-lg group">
            <span
              className="cursor-pointer text-xl ease-linear"
              onClick={toggleDesktopnav}
              onMouseEnter={() => setDesktopNav(true)}
            >
              {" "}
              {desktopNav ? "X" : <>&#9776;</>}{" "}
            </span>
          </div>
          <div
            className={`${
              desktopNav ? "block" : "hidden"
            } absolute right-5 top-5 pt-5 bg-transparent text-[#000F29]`}
            style={{ zIndex: 999999 }}
            onMouseLeave={() => setDesktopNav(false)}
          >
            <div className="w-full py-2 flex flex-col bg-white/90 rounded font-semibold text-lg shadow-lg">
              {/* <Link href="/about" className="px-4 py-1 hover:bg-[#000F29]/70 hover:text-white"> About Us </Link> */}
              <Link
                href="/career"
                className="px-4 py-1 hover:bg-[#000F29]/70 hover:text-white"
              >
                {" "}
                Career{" "}
              </Link>
              <Link
                href="/corporate"
                className="px-4 py-1 hover:bg-[#000F29]/70 hover:text-white"
              >
                {" "}
                Contact Us
              </Link>
              <Link
                href="/news-events"
                className="px-4 py-1 hover:bg-[#000F29]/70 hover:text-white"
              >
                {" "}
                News & Events{" "}
              </Link>

              {auth.status === "authenticated" ? (
                <p
                  className="px-4 py-1 hover:bg-[#000F29]/70 hover:text-white cursor-pointer"
                  onClick={() => signOut({ redirect: false })}
                >
                  {" "}
                  Logout{" "}
                </p>
              ) : (
                <Link
                  href={{
                    pathname: "/login",
                    query: {
                      redirect: `/${pathname}?${searchParams?.toString()}`,
                    },
                  }}
                  className="px-4 py-1 hover:bg-[#000F29]/70 hover:text-white"
                >
                  {" "}
                  Login{" "}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        className="block lg:hidden text-white "
        onClick={() => setVisible(!visible)}
      >
        <HiOutlineMenuAlt3 size={30} />
      </div>
    </nav>
  );
};

export default Navbar;
