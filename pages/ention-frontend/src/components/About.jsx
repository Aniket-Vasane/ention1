import React from 'react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="bg-gray-50 min-h-screen w-full flex flex-col items-center py-10 px-4">
      {/* Hero Section */}
      <div className="w-full max-w-3xl rounded-2xl overflow-hidden mb-12 shadow-lg">
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80"
            alt="Laptop Hero"
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-start p-10">
            <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">Associate With Us</h1>
            <p className="text-white text-lg mb-4 max-w-md">ENTION laptops are designed for diverse needs. Discover solutions tailored for you.</p>
            <Link to="/" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded shadow">Back to Home</Link>
          </div>
        </div>
      </div>

      {/* Offers Section */}
      <div className="w-full max-w-3xl space-y-10 mb-12">
        <div>
          <h2 className="text-xl font-bold mb-1">Investment Opportunities</h2>
          <p className="mb-3 text-gray-700">Explore investment opportunities with ENTION and be a part of our growth story. We offer attractive returns and a chance to contribute to the future of technology.</p>
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-900 font-medium px-4 py-2 rounded">Learn More About Investing</button>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-1">Dealer Network</h2>
          <p className="mb-3 text-gray-700">Join our dealer network and expand your business with ENTION's high-quality laptops. Benefit from our strong brand reputation and dedicated support.</p>
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-900 font-medium px-4 py-2 rounded">Become a Dealer</button>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-1">Service Provider Program</h2>
          <p className="mb-3 text-gray-700">Partner with ENTION as a service provider and offer top-notch support for our laptops. Gain access to training, resources, and a growing customer base.</p>
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-900 font-medium px-4 py-2 rounded">Join Our Service Program</button>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-1">University Solutions</h2>
          <p className="mb-3 text-gray-700">ENTION provides tailored laptop solutions for universities, enhancing learning and research capabilities. Discover our educational discounts and customized offerings.</p>
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-900 font-medium px-4 py-2 rounded">Explore University Solutions</button>
        </div>
      </div>

      {/* Why Choose ENTION */}
      <div className="w-full max-w-3xl mb-12">
        <h2 className="text-2xl font-bold mb-4">Why Choose ENTION?</h2>
        <p className="mb-6 text-gray-700">ENTION is committed to providing high-quality laptops with exceptional performance and reliability. Our products are designed to meet the diverse needs of our customers.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border rounded-lg p-4 bg-white flex flex-col items-center">
            <span className="text-2xl mb-2">⚡</span>
            <div className="font-bold">Performance</div>
            <div className="text-sm text-gray-600 text-center">Experience seamless multitasking and powerful performance with our cutting-edge technology.</div>
          </div>
          <div className="border rounded-lg p-4 bg-white flex flex-col items-center">
            <span className="text-2xl mb-2">🤝</span>
            <div className="font-bold">Customer Support</div>
            <div className="text-sm text-gray-600 text-center">Our dedicated support team is here to assist you every step of the way.</div>
          </div>
          <div className="border rounded-lg p-4 bg-white flex flex-col items-center">
            <span className="text-2xl mb-2">💡</span>
            <div className="font-bold">Innovation</div>
            <div className="text-sm text-gray-600 text-center">We constantly innovate to bring you the latest advancements in laptop technology.</div>
          </div>
        </div>
      </div>

      {/* Contact Us */}
      <div className="w-full max-w-md mb-8">
        <h2 className="text-xl font-bold mb-2">Contact Us</h2>
        <form className="flex flex-col gap-3">
          <input type="email" placeholder="Your Email" className="border rounded px-3 py-2" />
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded">Submit</button>
        </form>
      </div>
    </div>
  );
} 