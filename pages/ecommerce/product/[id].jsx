import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Footer from "components/layout/footer";
import Header from "components/layout/header";
import { Zoom } from "react-awesome-reveal";
import dynamic from 'next/dynamic';
import gradientbg1 from "assets/gradient-bg1.png";
import ImageCaraousel from "components/ImageCaraousel";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { FaShoppingCart, FaBolt, FaCamera, FaBatteryFull, FaMicrochip } from "react-icons/fa";
import { BentoGrid, BentoGridItem } from "./index";


// e1
import e1image1 from "assets/product/e1/image1.jpg";
import e1image2 from "assets/product/e1/image2.jpg";
import e1image3 from "assets/product/e1/image3.jpg";
// e2
import e2image1 from "assets/product/e2/image1.jpg";
import e2image2 from "assets/product/e2/image2.jpg";
import e2image3 from "assets/product/e2/image3.jpg";
// e1
import e3image1 from "assets/product/e3/image1.jpg";
import e3image2 from "assets/product/e3/image2.jpg";
import e3image3 from "assets/product/e3/image3.jpg";
import E5Feature from "./features/E5Feature";
import E3Feature from "./features/E3Feature";
import E4Feature from "./features/E4Feature";

const E1Images = [e1image1, e1image2, e1image3];
const E2Images = [e2image1, e2image2, e2image3];
const E3Images = [
  "/assets/product_/e3/IMG_9931.jpg",
  "/assets/product_/e3/IMG_9945.jpg",
  "/assets/product_/e3/IMG_9944.jpg",
  "/assets/product_/e3/IMG_9943.jpg",
  "/assets/product_/e3/IMG_9939.jpg",
  "/assets/product_/e3/IMG_9928.jpg",
  "/assets/product_/e3/IMG_1102.JPG",
  "/assets/product_/e3/IMG_1101.JPG",
  "/assets/product_/e3/IMG_1097.JPG",
];

const E5Images = [
  "/assets/product_/e5/IMG_1122.JPG",
  "/assets/product_/e5/IMG_9893.jpg",
  "/assets/product_/e5/IMG_9879.jpg",
  "/assets/product_/e5/IMG_9878.jpg",
  "/assets/product_/e5/IMG_9877.jpg",
  "/assets/product_/e5/IMG_9873.jpg",
  "/assets/product_/e5/IMG_9872.jpg",
  "/assets/product_/e5/IMG_9867.jpg",
  "/assets/product_/e5/IMG_9860.jpg",
  "/assets/product_/e5/IMG_1125.JPG",
  "/assets/product_/e5/IMG_1124.JPG",
  "/assets/product_/e5/IMG_1123.JPG",
];

const E4Images = [
  "/assets/product_/e4/IMG_1107.JPG",
  "/assets/product_/e4/IMG_9919.jpg",
  "/assets/product_/e4/IMG_9918.jpg",
  "/assets/product_/e4/IMG_9917.jpg",
  "/assets/product_/e4/IMG_9916.jpg",
  "/assets/product_/e4/IMG_9915.jpg",
  "/assets/product_/e4/IMG_9911.jpg",
  "/assets/product_/e4/IMG_9907.jpg",
  "/assets/product_/e4/IMG_9906.jpg",
  "/assets/product_/e4/IMG_9897.jpg",
  "/assets/product_/e4/IMG_1118.JPG",
  "/assets/product_/e4/IMG_1108.JPG",
];

const TestCarousel = dynamic(() => import('components/TestCarousel'), { ssr: false });

const allProducts = [
  { id: 5, name: "Ention E5 Laptop", price: 69999, description: "Ultimate business powerhouse. 64GB RAM, 4TB SSD, Intel i9.", image: "/assets/product/e3/image3.jpg", reviews: [ { name: "Business User", rating: 5, text: "Handles all my business needs!" } ] },
  { id: 4, name: "Ention E4 Laptop", price: 59999, description: "Professional performance for demanding tasks. 32GB RAM, 2TB SSD, Intel i7.", image: "/assets/product/e3/image2.jpg", reviews: [ { name: "Pro User", rating: 5, text: "Perfect for my workflow!" } ] },
  { id: 3, name: "Ention E3 Laptop", price: 49999, description: "High performance for creators and gamers. 16GB RAM, 1TB SSD, Intel i5.", image: "/assets/product/e3/image1.jpg", reviews: [ { name: "Creator", rating: 5, text: "Great for design and gaming!" } ] },
];

const productSpecs = {
  5: {
    model: 'E5 Series',
    processor: 'Intel i9',
    display: '17" 4K UHD',
    battery: '12 hours',
    warranty: '3 Years Onsite',
    ramOptions: ['8GB', '16GB', '32GB'],
    storageOptions: ['512GB SSD', '1TB SSD'],
    colorOptions: ['Silver', 'Black'],
  },
  4: {
    model: 'E4 Series',
    processor: 'Intel i7',
    display: '15.6" QHD',
    battery: '10 hours',
    warranty: '2 Years Onsite',
    ramOptions: ['8GB', '16GB', '32GB'],
    storageOptions: ['512GB SSD', '1TB SSD'],
    colorOptions: ['Silver', 'Black', 'Blue'],
  },
  3: {
    model: 'E3 Series',
    processor: 'Intel i5',
    display: '15.6" Full HD',
    battery: '8 hours',
    warranty: '1 Year Onsite',
    ramOptions: ['8GB', '16GB', '32GB'],
    storageOptions: ['512GB SSD', '1TB SSD'],
    colorOptions: ['Silver', 'Blue'],
  },
};

// Tab navigation for scroll-to-section
const scrollTabs = [
  { key: 'overview', label: 'Overview' },
  { key: 'tech', label: 'Tech Specs' },
  { key: 'video', label: 'Video' },
  { key: 'features', label: 'Features & Design' },
  { key: 'reviews', label: 'Customer review' },
];

const ProductDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const product = allProducts.find(p => p.id === Number(id));
  const related = allProducts.filter(p => p.id !== Number(id));
  const specs = productSpecs[product.id];

  // Refs for scroll-to-section
  const overviewRef = useRef(null);
  const techRef = useRef(null);
  const videoRef = useRef(null);
  const featuresRef = useRef(null);
  const reviewsRef = useRef(null);

  const sectionRefs = {
    overview: overviewRef,
    tech: techRef,
    video: videoRef,
    features: featuresRef,
    reviews: reviewsRef,
  };

  const handleTabClick = (key) => {
    const ref = sectionRefs[key];
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Customization state
  const [selectedRam, setSelectedRam] = useState(specs.ramOptions[0]);
  const [selectedStorage, setSelectedStorage] = useState(specs.storageOptions[0]);
  const [selectedWarranty, setSelectedWarranty] = useState('No additional warranty');
  const [coupon, setCoupon] = useState('');
  const [offerPrice, setOfferPrice] = useState(product.price);
  const [couponApplied, setCouponApplied] = useState(false);

  const handleApplyCoupon = () => {
    // Dummy coupon logic: if coupon is 'SAVE10', give 10% off
    if (coupon.trim().toUpperCase() === 'SAVE10') {
      setOfferPrice(Math.round(product.price * 0.9));
      setCouponApplied(true);
    } else {
      setOfferPrice(product.price);
      setCouponApplied(false);
    }
  };

  if (!product) return <div className="min-h-screen flex items-center justify-center text-2xl text-gray-500">Product not found.</div>;

  const getImages = (id) => {
    switch (id) {
      case "5":
        return E5Images;
      case "4":
        return E4Images;
      case "3":
        return E3Images;
      default:
        return [];
    }
  };

  const getFeatureComponent = (id) => {
    switch (id) {
      case "5":
        return <E5Feature />;
      case "4":
        return <E4Feature />;
      case "3":
        return <E3Feature />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-[#133B5C] via-[#0FAFCA] to-[#007e9e] py-10 px-4">
        {/* Cart Button Top Right */}
        <div className="max-w-6xl mx-auto flex justify-end mb-4">
          <a href="/ecommerce/cart" className="text-[#007e9e] text-3xl hover:text-[#01E9FE] transition" title="Go to cart">
            <FaShoppingCart />
          </a>
        </div>
        {/* Scrollable Tab Navigation */}
        <div className="max-w-6xl mx-auto mb-4">
          <div className="flex flex-wrap gap-2 border-b border-gray-200 text-white font-medium pt-20">
            {scrollTabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => handleTabClick(tab.key)}
                className="px-3 py-2 hover:text-[#007e9e] focus:text-[#007e9e] focus:outline-none"
                style={{ background: 'none', border: 'none' }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        <div className="max-w-6xl mx-auto">
          {/* Overview Section - Modern Intel-style layout */}
          <div ref={overviewRef} id="overview" className="mb-10">
            <div className="bg-white shadow-2xl p-0 md:p-4 flex flex-col md:flex-row gap-0 md:gap-8 items-stretch border-0">
              {/* Left: Image Carousel */}
              <div className="flex-1 flex items-center justify-center p-0 md:p-8 bg-white ">
                <div className="w-full max-w-md">
                  <Swiper
                    modules={[Navigation, Pagination]}
                    navigation
                    pagination={{ clickable: true }}
                    style={{ width: '100%', height: '100%' }}
                    className="product-swiper"
                  >
                    {getImages(String(product.id)).map((src, idx) => (
                      <SwiperSlide key={idx}>
                        <Image src={src} alt={`Product Slide ${idx + 1}`} width={400} height={400} style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '1.5rem', background: '#fff' }} />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
              {/* Right: Product Info Card */}
              <div className="flex-1 flex flex-col justify-center gap-6 p-6 md:p-10 bg-white shadow-xl border-0 min-w-[320px] max-w-xl mx-auto">
                <h1 className="text-3xl md:text-4xl font-extrabold text-[#007e9e] mb-2 leading-tight">{product.name}</h1>
                <div className="text-lg text-gray-700 font-medium mb-2">{product.description}</div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="inline-block bg-[#e0f7fa] text-[#007e9e] font-semibold px-3 py-1 rounded-full text-xs">Intel N95</span>
                  <span className="inline-block bg-[#f3e5f5] text-[#7b1fa2] font-semibold px-3 py-1 rounded-full text-xs">15.6" FHD IPS</span>
                  <span className="inline-block bg-[#fffde7] text-[#fbc02d] font-semibold px-3 py-1 rounded-full text-xs">Windows 11 Pro</span>
                  <span className="inline-block bg-[#e3f2fd] text-[#1976d2] font-semibold px-3 py-1 rounded-full text-xs">Office 365</span>
                </div>
                <div className="mb-2 flex flex-col gap-2">
                  <label className="font-medium">RAM:
                    <select className="ml-2 border rounded px-2 py-1" value={selectedRam} onChange={e => setSelectedRam(e.target.value)}>
                      {specs.ramOptions.map(opt => <option key={opt}>{opt}</option>)}
                    </select>
                  </label>
                  <label className="font-medium">SSD:
                    <select className="ml-2 border rounded px-2 py-1" value={selectedStorage} onChange={e => setSelectedStorage(e.target.value)}>
                      {specs.storageOptions.map(opt => <option key={opt}>{opt}</option>)}
                    </select>
                  </label>
                  <label className="font-medium">Additional Warranty:
                    <select className="ml-2 border rounded px-2 py-1" value={selectedWarranty} onChange={e => setSelectedWarranty(e.target.value)}>
                      <option>No additional warranty</option>
                      <option>6months</option>
                      <option>1year</option>
                    </select>
                  </label>
                </div>
                <div className="mb-2 text-2xl font-extrabold text-[#007e9e]">₹{product.price.toLocaleString()}</div>
                <div className="mb-2 flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    className="border rounded px-2 py-1"
                    value={coupon}
                    onChange={e => setCoupon(e.target.value)}
                  />
                  <button
                    className="bg-[#007e9e] text-white rounded px-4 py-1 font-semibold hover:bg-[#01E9FE] hover:text-[#000f29] transition"
                    onClick={handleApplyCoupon}
                  >Apply</button>
                  {couponApplied && <span className="text-green-600 font-semibold ml-2">Coupon Applied!</span>}
                </div>
                <div className="mb-2 text-lg font-bold">Offer Price: ₹{offerPrice.toLocaleString()}</div>
                <button className="mt-4 bg-[#007e9e] hover:bg-[#01E9FE] text-white hover:text-[#000f29] font-bold rounded-3xl px-8 py-3 transition text-lg shadow-lg">Buy Now</button>
                <div className="mt-6">
                  <div className="font-bold mb-2 text-[#1976d2]">Included</div>
                  <ul className="list-disc pl-5 text-sm text-gray-700">
                    <li>18 months onsite warranty</li>
                    <li>Laptop bag pack</li>
                    <li>Window 11 pro</li>
                    <li>Office 365</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* Tech Specs Section */}
          <div ref={techRef} id="tech" className="bg-white  shadow-md p-8 mb-10">
            <h2 className="text-2xl font-bold mb-4 text-[#000f29]">Technical Specifications</h2>
            <div className="border border-gray-300 rounded-lg overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-4 border-b md:border-b-0 md:border-r border-gray-300 text-sm">
                  <div><span className="font-semibold">Colour</span> &nbsp;&nbsp;&nbsp;&nbsp;sliver</div>
                  <div><span className="font-semibold">Display</span> &nbsp;&nbsp;&nbsp;&nbsp;15.6inch, Full HD 1920*1080 IPS 16:9 ratio</div>
                  <div><span className="font-semibold">Processor :</span> &nbsp;intel N95 up to 3.4GHz with Turbo boost</div>
                  <div><span className="font-semibold">Core, threads, Cache:</span> 4core, 4 threads, 6MB cache</div>
                  <div><span className="font-semibold">Graphic :</span> intel UHD graphics 1.20Ghz</div>
                  <div><span className="font-semibold">Fingerprint reader:</span> yes, on touch pad</div>
                  <div><span className="font-semibold">Operating system:</span> window 11</div>
                  <div><span className="font-semibold">MS office:</span> yes, 365</div>
                  <div><span className="font-semibold">USB:</span> 3 port of USB 3.0, type C(Data+DP)</div>
                  <div><span className="font-semibold">HDMI:</span> HDMI A type</div>
                  <div><span className="font-semibold">Product Dimension and weight:</span> 357.4*228*19 mm, 1.68kg</div>
                  <div><span className="font-semibold">Covered in warranty:</span> Manufacturing Defects, Physical Damage not covered.</div>
                </div>
                <div className="p-4 text-sm">
                  <div><span className="font-semibold">Power:</span> DC 12V</div>
                  <div><span className="font-semibold">Battery:</span> 5000mah</div>
                  <div><span className="font-semibold">RJ45:</span> yes</div>
                  <div><span className="font-semibold">Memory card reader:</span> yes, SD card upto 128Gb</div>
                  <div><span className="font-semibold">Earphone port:</span> 3.5mm standard headphone jack</div>
                  <div><span className="font-semibold">Mic:</span> Built in Analog microphone</div>
                  <div><span className="font-semibold">Speaker:</span> front facing Built in stereo speaker 1.0W*2</div>
                  <div><span className="font-semibold">Webcam:</span> 2.0Mega+DMIC, with Privcay sutter</div>
                  <div><span className="font-semibold">Touchpad:</span> Yes, extra large</div>
                  <div><span className="font-semibold">Keyboard:</span> US, Round with Backlight & Square with Backlight</div>
                  <div><span className="font-semibold">Included in Box:</span> Laptop, Power Cord, Adapter, User Manual</div>
                  <div><span className="font-semibold">Manufactured by:</span> Ention, Made in India.</div>
                </div>
              </div>
            </div>
          </div>
          {/* Video Section */}
          <div ref={videoRef} id="video" className="p-8 mb-10 flex flex-col items-center">
            <video controls className="w-full h-auto shadow">
              <source src="/assets/E3-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          {/* Features & Design Section */}
          <div ref={featuresRef} id="features" className="mb-10">
            <FeatureBentoGrid />
          </div>
          {/* Customer Reviews Section */}
          <div ref={reviewsRef} id="reviews" className="bg-white shadow-md p-8 mb-10">
            <h2 className="text-2xl font-bold mb-4 text-[#000f29]">Customer Reviews</h2>
            {/* Add Review Form */}
            <AddReviewSection product={product} />
          </div>
        </div>
      </div>
      
    </>
  );
};

export default ProductDetails;

export async function getStaticPaths() {
  return {
    paths: [
      { params: { id: '5' } },
      { params: { id: '4' } },
      { params: { id: '3' } },
    ],
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  return { props: {} };
}

// AddReviewSection component
function AddReviewSection({ product }) {
  const [reviews, setReviews] = React.useState(product.reviews || []);
  const [name, setName] = React.useState("");
  const [rating, setRating] = React.useState(5);
  const [text, setText] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;
    setReviews([
      { name, rating, text },
      ...reviews,
    ]);
    setName("");
    setRating(5);
    setText("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2000);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="mb-8 bg-gray-50 rounded-lg p-4 flex flex-col gap-3">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Your Name"
            className="border rounded px-3 py-2 flex-1"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          <StarRating rating={rating} setRating={setRating} />
        </div>
        <textarea
          placeholder="Write your review..."
          className="border rounded px-3 py-2 min-h-[80px]"
          value={text}
          onChange={e => setText(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-[#007e9e] text-white rounded px-6 py-2 font-semibold hover:bg-[#01E9FE] hover:text-[#000f29] transition w-fit"
        >Submit Review</button>
        {submitted && <div className="text-green-600 font-semibold">Thank you for your review!</div>}
      </form>
      <div className="flex flex-col gap-4">
        {reviews.length > 0 ? (
          reviews.map((review, idx) => (
            <div key={idx} className="border rounded-lg p-4 bg-gray-50">
              <div className="font-bold text-[#007e9e]">{review.name}</div>
              <div className="text-yellow-500">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</div>
              <div className="text-gray-700 mt-2">{review.text}</div>
            </div>
          ))
        ) : (
          <div className="text-gray-500">No reviews yet.</div>
        )}
      </div>
    </>
  );
}

// StarRating component for review form
function StarRating({ rating, setRating }) {
  return (
    <div className="flex items-center gap-1">
      {[1,2,3,4,5].map(star => (
        <button
          type="button"
          key={star}
          onClick={() => setRating(star)}
          className="focus:outline-none"
          aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
        >
          <span className={star <= rating ? 'text-yellow-400 text-2xl' : 'text-gray-300 text-2xl'}>
            ★
          </span>
        </button>
      ))}
    </div>
  );
}

function FeatureBentoGrid() {
  return (
    <section className="w-full max-w-6xl mx-auto my-16 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Row 1 */}
      <div className="bento-card bg-gradient-to-br from-[#e0f7fa] to-[#fff] p-8 flex flex-col justify-center shadow-xl border border-[#b2ebf2]">
        <h3 className="font-extrabold text-2xl text-[#007e9e] mb-3 leading-tight">Experience high-quality computing<br className='hidden md:block'/> without compromise.</h3>
        <p className="text-base md:text-lg text-gray-700 font-medium">
          The Ention Workbook Series Laptop blends <span className="font-semibold text-[#007e9e]">power</span>, <span className="font-semibold text-[#007e9e]">design</span>, and <span className="font-semibold text-[#007e9e]">affordability</span> to deliver outstanding performance on a smart budget.<br /><br />
          <span className="font-bold text-[#0d223a]">Powered by the Intel N95 processor</span> with a maximum turbo frequency of up to <span className="font-bold">3.4GHz</span> and <span className="font-bold">6MB cache</span>, it's built to keep up with your everyday tasks seamlessly.
        </p>
      </div>
      <div className="bento-card flex items-center justify-center bg-white shadow-xl border border-[#e0e0e0] p-4">
        <Image src="/assets/product_/e5/20.png" alt="Ention E5" width={350} height={220} className="object-contain drop-shadow-xl" />
      </div>
      {/* Row 2 */}
      <div className="bento-card flex items-center justify-center bg-gradient-to-br from-[#f3e5f5] to-[#fff] shadow-xl border border-[#ce93d8] p-4">
        <Image src="/assets/product_/e5/15.png" alt="Control at Your Fingertips" width={350} height={220} className="object-contain drop-shadow-xl" />
      </div>
      <div className="bento-card bg-white p-8 flex flex-col justify-center shadow-xl border border-[#e0e0e0]">
        <h3 className="font-extrabold text-2xl text-[#7b1fa2] mb-3 leading-tight">Control at Your Fingertips</h3>
        <p className="text-base md:text-lg text-gray-700 font-medium">
          Experience a smarter way to interact with your device. Easily manage <span className="font-bold text-[#7b1fa2]">volume</span> and <span className="font-bold text-[#7b1fa2]">brightness</span> with intuitive <span className="font-bold text-[#7b1fa2]">finger gestures</span>—no buttons, no hassle.
        </p>
      </div>
      {/* Row 3 */}
      <div className="bento-card bg-gradient-to-br from-[#fffde7] to-[#fff] p-8 flex flex-col justify-center shadow-xl border border-[#fff9c4]">
        <h3 className="font-extrabold text-2xl text-[#fbc02d] mb-3 leading-tight">Made for Power Users & Everyday Hustlers</h3>
        <p className="text-base md:text-lg text-gray-700 font-medium">
          A compact companion that blends <span className="font-semibold text-[#fbc02d]">performance</span> with <span className="font-semibold text-[#fbc02d]">mobility</span>, ideal for students and professionals on the go.
        </p>
        <p className="mt-2 text-base md:text-lg text-gray-700 font-medium">
          Enjoy <span className="font-bold text-[#fbc02d]">smooth performance</span> at an <span className="font-bold text-[#fbc02d]">affordable price</span>, making high-quality computing accessible to everyone.
        </p>
      </div>
      <div className="bento-card flex items-center justify-center bg-white shadow-xl border border-[#e0e0e0] p-4">
        <Image src="/assets/product_/e3/IMG_9931.jpg" alt="Powerful Yet Budget-Friendly" width={350} height={220} className="object-contain drop-shadow-xl" />
      </div>
      {/* Row 4 */}
      <div className="bento-card flex items-center justify-center bg-gradient-to-br from-[#e3f2fd] to-[#fff] shadow-xl border border-[#90caf9] p-4">
        <Image src="/assets/product_/e4/IMG_1107.JPG" alt="Stunning Display" width={350} height={220} className="object-contain drop-shadow-xl" />
      </div>
      <div className="bento-card bg-white p-8 flex flex-col justify-center shadow-xl border border-[#e0e0e0]">
        <h3 className="font-extrabold text-2xl text-[#1976d2] mb-3 leading-tight">Stunning 15.6-Inch Colour-Rich Display</h3>
        <p className="text-base md:text-lg text-gray-700 font-medium">
          Enjoy sharp visuals and vibrant colours on a compact <span className="font-bold text-[#1976d2]">15.6inch full HD IPS screen</span>, perfect for immersive viewing and clear presentations.
        </p>
      </div>
      {/* Row 5: Ports */}
      <div className="col-span-2 flex items-center justify-center bg-gradient-to-br from-[#f1f8e9] to-[#fff] shadow-xl border border-[#aed581] p-4">
        <Image src="/assets/product_/e5/IMG_1122.JPG" alt="Ports" width={700} height={220} className="object-contain drop-shadow-xl" />
      </div>
    </section>
  );
}
