
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiDownload, FiHeadphones, FiPhone, FiTool, FiChevronRight, FiSearch, FiMonitor, FiSettings, FiShield, FiWifi, FiBatteryCharging, FiCheckCircle, FiAlertTriangle, FiBookOpen, FiArrowRight, FiMessageCircle } from 'react-icons/fi';

const resourceLinks = [
  { title: 'Troubleshooting', desc: 'Guides and solutions for common issues', href: '#' },
  { title: 'Drivers & Downloads', desc: 'Get the latest drivers and software', href: '#' },
  { title: 'Warranty Services', desc: 'Check and manage your warranty', href: '#' },
  { title: 'User Manuals', desc: 'Find and download user manuals', href: '#' },
  { title: 'Product Registration', desc: 'Register your Ention product', href: '#' },
  { title: 'Order Parts', desc: 'Order replacement parts and accessories', href: '#' },
  { title: 'FAQs', desc: 'Frequently asked questions', href: '#' },
  { title: 'Community Forums', desc: 'Join the Ention community', href: '#' },
  { title: 'Contact Support', desc: 'Get in touch with our support team', href: '#' },
];

const articleData = [
  {
    title: 'How to Optimize Battery Life',
    desc: "Learn tips to extend your laptop's battery performance",
    views: '15,234 views',
    icon: FiBatteryCharging,
    img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80',
    link: '#',
  },
  {
    title: 'WiFi Connection Issues',
    desc: 'Troubleshoot wireless connectivity problems',
    views: '12,891 views',
    icon: FiWifi,
    img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    link: '#',
  },
  {
    title: 'Installing Latest Drivers',
    desc: 'Step-by-step guide to update your drivers',
    views: '18,567 views',
    icon: FiDownload,
    img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80',
    link: '#',
  },
  {
    title: 'Laptop Overheating Solutions',
    desc: 'Fix overheating issues and improve cooling',
    views: '9,432 views',
    icon: FiAlertTriangle,
    img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    link: '#',
  },
  {
    title: 'Keyboard Not Working Fix',
    desc: 'Resolve keyboard and key responsiveness issues',
    views: '11,765 views',
    icon: FiTool,
    img: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
    link: '#',
  },
  {
    title: 'Screen Flickering Solutions',
    desc: 'Fix display issues and screen problems',
    views: '7,891 views',
    icon: FiMonitor,
    img: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80',
    link: '#',
  },
];

const categoryData = [
  {
    key: 'hardware',
    icon: FiMonitor,
    title: 'Hardware Support',
    items: [
      'Battery Issues',
      'Display Problems',
      'Keyboard & Touchpad',
      'Audio Issues',
      'Overheating',
    ],
  },
  {
    key: 'software',
    icon: FiSettings,
    title: 'Software Support',
    items: [
      'Driver Updates',
      'BIOS Updates',
      'Windows Issues',
      'Performance Optimization',
      'Security Updates',
    ],
  },
  {
    key: 'warranty',
    icon: FiShield,
    title: 'Warranty & Service',
    items: [
      'Check Warranty Status',
      'Extended Warranty',
      'Repair Services',
      'Parts Replacement',
      'Service Centers',
    ],
  },
];

const IconWrapper = ({ icon: Icon, size = 24 }) => <Icon size={size} />;

export default function TechnicalSupport() {
  return (
    <main className="bg-[#070D2A] min-h-screen">
      
      {/* Header Section */}
      <header className="text-center py-20">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3">Ention Support</h1>
        <p className="text-lg md:text-xl text-white mb-8 font-medium">Get help with your Ention laptop. Find drivers, manuals, troubleshooting guides and more.</p>
        <form className="flex justify-center items-center mx-auto max-w-xl border border-gray-200 rounded-lg overflow-hidden">
          <div className="relative w-full">
            <input className="w-full py-3 px-4 pr-12 bg-gray-100 border-none rounded-l-lg text-base focus:outline-none" placeholder="Search for support articles, drivers, or product guides..." aria-label="Search" />
            <button type="submit" aria-label="Search" className="absolute right-0 top-0 bottom-0 px-3 text-gray-600 hover:text-blue-600 flex items-center justify-center text-xl">
              <FiSearch />
            </button>
          </div>
        </form>
      </header>

      {/* Quick Support Options */}
      <section className="py-12 w-full">
        <h2 className="text-center text-2xl font-extrabold underline underline-offset-8 mb-10 text-white ">Quick Support Options</h2>
        <div className="flex flex-wrap justify-center gap-8 mb-8">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl shadow-md flex flex-col items-center w-72 max-w-xs p-0">
            <Image src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80" alt="Drivers & Downloads" width={400} height={150} className="rounded-t-2xl w-full h-[150px] object-cover" />
            <div className="flex flex-col items-center p-4 w-full flex-1">
              <div className="text-3xl text-gray-800 mb-2"><FiDownload /></div>
              <div className="font-bold text-lg mb-1">Drivers & Downloads</div>
              <div className="text-gray-600 text-base mb-2">Get the latest drivers and software</div>
              <div className="flex-1" />
              <a href="#" className="text-sky-600 font-bold text-base hover:underline mt-2">Download Now</a>
            </div>
          </div>
          {/* Card 2 */}
          <div className="bg-white rounded-2xl shadow-md flex flex-col items-center w-72 max-w-xs p-0">
            <Image src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80" alt="Live Chat" width={400} height={150} className="rounded-t-2xl w-full h-[150px] object-cover" />
            <div className="flex flex-col items-center p-4 w-full flex-1">
              <div className="text-3xl text-gray-800 mb-2"><FiHeadphones /></div>
              <div className="font-bold text-lg mb-1">Live Chat</div>
              <div className="text-gray-600 text-base mb-2">Chat with our support team</div>
              <div className="flex-1" />
              <a href="#" className="text-sky-600 font-bold text-base hover:underline mt-2">Start Chat</a>
            </div>
          </div>
          {/* Card 3 */}
          <div className="bg-white rounded-2xl shadow-md flex flex-col items-center w-72 max-w-xs p-0">
            <Image src="https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80" alt="Phone Support" width={400} height={150} className="rounded-t-2xl w-full h-[150px] object-cover" />
            <div className="flex flex-col items-center p-4 w-full flex-1">
              <div className="text-3xl text-gray-800 mb-2"><FiPhone /></div>
              <div className="font-bold text-lg mb-1">Phone Support</div>
              <div className="text-gray-600 text-base mb-2">Call our technical support</div>
              <div className="flex-1" />
              <a href="#" className="text-sky-600 font-bold text-base hover:underline mt-2">Get Number</a>
            </div>
          </div>
          {/* Card 4 */}
          <div className="bg-white rounded-2xl shadow-md flex flex-col items-center w-72 max-w-xs p-0">
            <Image src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" alt="Service Request" width={400} height={150} className="rounded-t-2xl w-full h-[150px] object-cover" />
            <div className="flex flex-col items-center p-4 w-full flex-1">
              <div className="text-3xl text-gray-800 mb-2"><FiTool /></div>
              <div className="font-bold text-lg mb-1">Service Request</div>
              <div className="text-gray-600 text-base mb-2">Book a repair or maintenance service for your device</div>
              <div className="flex-1" />
              <a href="#" className="text-sky-600 font-bold text-base hover:underline mt-2">Book Service</a>
            </div>
          </div>
        </div>
      </section>

      {/* Support Downloads & Resources */}
      <section className="py-12 w-full">
        <h2 className="text-center text-2xl font-extrabold underline underline-offset-8  mb-10 text-white">Support Downloads & Resources</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {resourceLinks.map(link => (
            <a href={link.href} key={link.title} tabIndex={0} aria-label={link.title} className="bg-white rounded-xl shadow-md p-8 flex flex-col hover:shadow-lg transition-all cursor-pointer">
              <div className="font-bold text-lg text-sky-700 mb-2">{link.title}</div>
              <div className="text-gray-600 text-base">{link.desc}</div>
            </a>
          ))}
        </div>
      </section>

      {/* Browse Support by Category */}
      <section className="py-12 w-full">
        <h2 className="text-center text-2xl font-extrabold underline underline-offset-8  mb-10 text-white">Browse Support by Category</h2>
        <div className="flex flex-wrap justify-center gap-8 mb-8">
          {categoryData.map((cat) => (
            <div key={cat.key} className="bg-white rounded-xl shadow-md p-8 min-w-[240px] max-w-xs flex-1 flex flex-col">
              <div className="flex items-center text-sky-700 font-bold text-lg mb-4 gap-2">
                <IconWrapper icon={cat.icon} /> {cat.title}
              </div>
              <ul className="text-gray-800 text-base space-y-2">
                {cat.items.map((item, index) => (
                  <li key={index}>
                    <Link href={`/support/${cat.key}/${item.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-sky-600 font-medium transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Find Your Product */}
      <section className="py-12 w-full">
        <h3 className="text-center text-xl font-extrabold underline underline-offset-8 mb-2 text-white">Find Your Product</h3>
        <p className="text-center text-white mb-6">Enter your service tag or product model to get personalized support</p>
        <form className="flex flex-col items-center gap-3 bg-white rounded-xl shadow-md p-8 max-w-md mx-auto">
          <input className="w-full border border-gray-200 rounded-md py-3 px-4 text-base" placeholder="e.g., ENTION-XPS-13-2024" aria-label="Service Tag or Product Model" />
          <button type="submit" className="w-full bg-gray-900 text-white font-bold py-3 rounded-md hover:bg-black transition">Find My Product</button>
        </form>
        <div className="text-center text-sky-600 mt-2 text-base">Don't know your service tag? <a href="#" className="underline">Learn how to find it</a></div>
      </section>

      {/* Popular Support Articles */}
      <section className="py-12 w-full">
        <h2 className="text-center text-2xl font-extrabold underline underline-offset-8  mb-10 text-white">Popular Support Articles</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {articleData.map((a, i) => (
            <div key={i} className="bg-white rounded-xl shadow-md flex flex-col overflow-hidden">
              <Image src={a.img} alt={a.title} width={400} height={140} className="w-full h-[140px] object-cover" />
              <div className="flex flex-col flex-1 p-4">
                <div className="flex items-center gap-2 font-bold text-lg mb-2 text-gray-800"><IconWrapper icon={a.icon} /> {a.title}</div>
                <div className="text-gray-600 text-base mb-2">{a.desc}</div>
                <div className="flex-1" />
                <a href={a.link} className="text-sky-600 font-bold text-base hover:underline mt-2">Read More</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Service Tools & Features */}
      <section className="py-12 w-full">
        <h2 className="text-center text-2xl font-extrabold underline underline-offset-8 mb-10 text-white">Service Tools & Features</h2>
        <div className="flex flex-wrap justify-center gap-8 mb-8">
          <div className="bg-green-50 rounded-2xl shadow-md p-8 min-w-[320px] max-w-md flex-1 flex flex-col items-start">
            <div className="flex items-center text-green-700 font-bold text-lg mb-4 gap-2"><FiBookOpen /> Track Service Status</div>
            <div className="text-gray-800 text-base mb-6">Monitor your repair progress in real-time and get updates on your service request.</div>
            <button className="w-full bg-green-700 text-white font-bold py-3 rounded-md hover:bg-green-800 transition">Track Your Service</button>
          </div>
        </div>
      </section>

      {/* Knowledge Base Articles */}
      <section className="py-12 w-full">
        <h3 className="text-center text-xl font-extrabold underline underline-offset-8  mb-10 text-white">Knowledge Base Articles</h3>
        <div className="flex flex-wrap justify-center gap-8 mb-8">
          <div className="min-w-[260px] max-w-xs flex-1">
            <div className="bg-gray-100 rounded-xl shadow p-6 mb-6">
              <a href="#" className="flex justify-between items-center font-bold text-base text-gray-800 hover:text-sky-600 transition-colors mb-2">First Time Setup Guide <FiChevronRight /></a>
              <div className="text-gray-500 text-sm mb-2">Complete setup instructions for new Ention laptops</div>
              <a href="#" className="flex justify-between items-center font-bold text-base text-gray-800 hover:text-sky-600 transition-colors mb-2">System Recovery Options <FiChevronRight /></a>
              <div className="text-gray-500 text-sm mb-2">How to restore your system to factory settings</div>
              <a href="#" className="flex justify-between items-center font-bold text-base text-gray-800 hover:text-sky-600 transition-colors mb-2">BIOS Settings Guide <FiChevronRight /></a>
              <div className="text-gray-500 text-sm">Navigate and configure BIOS settings</div>
            </div>
          </div>
          <div className="min-w-[260px] max-w-xs flex-1">
            <div className="bg-gray-100 rounded-xl shadow p-6 mb-6">
              <a href="#" className="flex justify-between items-center font-bold text-base text-gray-800 hover:text-sky-600 transition-colors mb-2">Boot Issues Resolution <FiChevronRight /></a>
              <div className="text-gray-500 text-sm mb-2">Fix startup and boot-related problems</div>
              <a href="#" className="flex justify-between items-center font-bold text-base text-gray-800 hover:text-sky-600 transition-colors mb-2">Performance Optimization <FiChevronRight /></a>
              <div className="text-gray-500 text-sm mb-2">Speed up your laptop and improve performance</div>
              <a href="#" className="flex justify-between items-center font-bold text-base text-gray-800 hover:text-sky-600 transition-colors mb-2">Audio & Video Issues <FiChevronRight /></a>
              <div className="text-gray-500 text-sm">Resolve multimedia and device problems</div>
            </div>
          </div>
        </div>
      </section>

      {/* Help Footer */}
      <footer className="text-center py-12 mt-12">
        <h3 className="text-2xl font-extrabold underline underline-offset-8  mb-2 text-white">Still Need Help?</h3>
        <p className="text-lg text-white mb-6">Our support team is here to assist you 24/7</p>
        <div className="flex justify-center gap-4">
          <button className="bg-white border border-sky-600 text-sky-600 font-bold py-3 px-8 rounded-md hover:bg-sky-50 transition">Contact Support</button>
          <button className="bg-sky-600 text-white font-bold py-3 px-8 rounded-md hover:bg-sky-700 transition">Schedule Callback</button>
        </div>
      </footer>

      {/* Floating Chat Button */}
      <button aria-label="Chat with support" className="fixed right-8 bottom-8 z-50 bg-sky-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-3xl shadow-lg hover:bg-sky-700 transition">
        <FiMessageCircle />
      </button>
      
    </main>
  );
}
