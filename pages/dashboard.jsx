import React, { useState } from "react";
import Link from "next/link";
import { getSession, useSession } from "next-auth/react";
import { FaUserCircle, FaEdit, FaSignOutAlt, FaBoxOpen, FaHeart, FaTicketAlt, FaCog, FaEnvelope, FaPlus, FaShoppingCart, FaFileInvoiceDollar, FaMapMarkerAlt, FaHistory } from "react-icons/fa";
import Image from "next/image";

const mockUser = {
  name: "John Doe",
  email: "john@example.com",
  avatar: "https://i.pravatar.cc/100?img=3",
};

const mockOrders = [
  { id: 1, product: "Ention E5 Laptop", image: "/assets/product_/e5/IMG_9872.jpg", status: "Delivered", date: "2024-05-01", tracking: "Your order was delivered on 2024-05-05." },
  { id: 2, product: "Ention E4 Laptop", image: "/assets/product_/e4/IMG_9919.jpg", status: "Shipped", date: "2024-05-10", tracking: "Your order is in transit. Expected delivery: 2024-05-15." },
];

const mockWishlist = [
  { id: 3, product: "Ention E3 Laptop", image: "/assets/product_/e3/IMG_9931.jpg" },
];

const mockTickets = [
  { id: 1, subject: "Order not received", status: "Open", date: "2024-05-12" },
  { id: 2, subject: "Warranty query", status: "Closed", date: "2024-04-28" },
];

const mockActivity = [
  { id: 1, action: "Logged in", date: "2024-05-12 09:00" },
  { id: 2, action: "Placed an order for Ention E4 Laptop", date: "2024-05-10 14:23" },
  { id: 3, action: "Added Ention E3 Laptop to wishlist", date: "2024-05-09 18:45" },
  { id: 4, action: "Submitted a support ticket", date: "2024-05-08 11:10" },
];

export default function Dashboard({ session }) {
  const [wishlist, setWishlist] = useState(mockWishlist);
  const [tickets, setTickets] = useState(mockTickets);
  const [newTicket, setNewTicket] = useState("");
  const [newsletter, setNewsletter] = useState(true);
  const [trackOrderId, setTrackOrderId] = useState(null);

  const handleRemoveWishlist = (id) => setWishlist(wishlist.filter(w => w.id !== id));
  const handleAddToCart = (id) => alert("Added to cart!");
  const handleCreateTicket = (e) => {
    e.preventDefault();
    if (newTicket.trim()) {
      setTickets([{ id: Date.now(), subject: newTicket, status: "Open", date: new Date().toISOString().slice(0,10) }, ...tickets]);
      setNewTicket("");
    }
  };
  const handleTrackOrder = (id) => setTrackOrderId(trackOrderId === id ? null : id);
  const handleDownloadInvoice = (id) => alert("Invoice downloaded for order #" + id);

  // Use session user if available
  const user = session?.user || mockUser;

  return (
    <div className="min-h-screen bg-[#f7fafc] pb-10">
      {/* Topbar */}
      <div className="w-full bg-white shadow flex flex-col md:flex-row items-center justify-between px-6 py-6 mb-8">
        <div className="flex items-center gap-4">
          <Image src={user.image || user.avatar} alt="avatar" width={64} height={64} className="w-16 h-16 rounded-full border-2 border-[#007e9e]" />
          <div>
            <div className="text-2xl font-bold text-[#000f29]">Welcome, {user.name}!</div>
            <div className="text-gray-500">{user.email}</div>
          </div>
        </div>
        <div className="flex gap-4 mt-4 md:mt-0">
          <button className="flex items-center gap-2 px-4 py-2 rounded-3xl border border-red-500 text-red-500 font-semibold hover:bg-red-500 hover:text-white transition"><FaSignOutAlt /> Logout</button>
        </div>
      </div>
      {/* Main grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Orders */}
        <div className="bg-white rounded-xl shadow p-6 flex flex-col">
          <div className="flex items-center gap-2 mb-4 text-xl font-bold text-[#007e9e]"><FaBoxOpen /> Recent Orders</div>
          {mockOrders.map(order => (
            <div key={order.id} className="flex flex-col gap-2 border-b py-3 last:border-b-0">
              <div className="flex items-center gap-4">
                <Image src={order.image} alt={order.product} width={64} height={64} className="w-16 h-16 rounded-lg object-cover" />
                <div className="flex-1">
                  <div className="font-semibold">{order.product}</div>
                  <div className="text-xs text-gray-500">{order.status} • {order.date}</div>
                </div>
                <Link href={`/orders/${order.id}`} className="text-[#007e9e] font-semibold hover:underline">View</Link>
              </div>
              <div className="flex gap-2 mt-2 ml-20">
                <button onClick={() => handleTrackOrder(order.id)} className="flex items-center gap-1 px-3 py-1 rounded-3xl border border-[#01E9FE] text-[#01E9FE] font-semibold hover:bg-[#01E9FE] hover:text-white transition text-sm"><FaMapMarkerAlt /> Track Order</button>
                <button onClick={() => handleDownloadInvoice(order.id)} className="flex items-center gap-1 px-3 py-1 rounded-3xl border border-[#007e9e] text-[#007e9e] font-semibold hover:bg-[#007e9e] hover:text-white transition text-sm"><FaFileInvoiceDollar /> Invoice</button>
              </div>
              {trackOrderId === order.id && (
                <div className="bg-blue-50 border border-blue-200 rounded p-3 mt-2 text-sm text-[#007e9e]">{order.tracking}</div>
              )}
            </div>
          ))}
          <Link href="/orders" className="mt-4 text-[#007e9e] hover:underline text-sm">View All Orders</Link>
        </div>
        {/* Wishlist */}
        <div className="bg-white rounded-xl shadow p-6 flex flex-col">
          <div className="flex items-center gap-2 mb-4 text-xl font-bold text-pink-600"><FaHeart /> Wishlist</div>
          {wishlist.length === 0 && <div className="text-gray-400">No saved products.</div>}
          {wishlist.map(item => (
            <div key={item.id} className="flex items-center gap-4 border-b py-3 last:border-b-0">
              <Image src={item.image} alt={item.product} width={64} height={64} className="w-16 h-16 rounded-lg object-cover" />
              <div className="flex-1 font-semibold">{item.product}</div>
              <button onClick={() => handleAddToCart(item.id)} className="text-[#007e9e] hover:underline flex items-center gap-1"><FaShoppingCart /> Add</button>
              <button onClick={() => handleRemoveWishlist(item.id)} className="text-red-500 hover:underline ml-2">Remove</button>
            </div>
          ))}
        </div>
        {/* Support Tickets */}
        <div className="bg-white rounded-xl shadow p-6 flex flex-col">
          <div className="flex items-center gap-2 mb-4 text-xl font-bold text-[#01E9FE]"><FaTicketAlt /> Support Tickets</div>
          <form onSubmit={handleCreateTicket} className="flex gap-2 mb-4">
            <input value={newTicket} onChange={e => setNewTicket(e.target.value)} placeholder="New ticket subject..." className="border rounded-3xl px-4 py-2 flex-1" />
            <button type="submit" className="bg-[#01E9FE] text-white rounded-3xl px-4 py-2 font-semibold flex items-center gap-1"><FaPlus /> Create</button>
          </form>
          {tickets.length === 0 && <div className="text-gray-400">No tickets yet.</div>}
          {tickets.map(ticket => (
            <div key={ticket.id} className="border-b py-3 last:border-b-0">
              <div className="font-semibold">{ticket.subject}</div>
              <div className="text-xs text-gray-500">{ticket.status} • {ticket.date}</div>
            </div>
          ))}
        </div>
        {/* Account Settings */}
        <div className="bg-white rounded-xl shadow p-6 flex flex-col">
          <div className="flex items-center gap-2 mb-4 text-xl font-bold text-[#000f29]"><FaCog /> Account Settings</div>
          <Link href="/profile" className="mb-2 text-[#007e9e] hover:underline">Edit Profile</Link>
          <Link href="/profile/password" className="mb-2 text-[#007e9e] hover:underline">Change Password</Link>
          <Link href="/profile/address" className="mb-2 text-[#007e9e] hover:underline">Manage Addresses</Link>
        </div>
        {/* Newsletter & Offers */}
        <div className="bg-white rounded-xl shadow p-6 flex flex-col col-span-1 md:col-span-2 lg:col-span-3">
          <div className="flex items-center gap-2 mb-4 text-xl font-bold text-[#007e9e]"><FaEnvelope /> Newsletter & Offers</div>
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1">{newsletter ? "You are subscribed to our newsletter and will receive the latest offers and updates." : "You are not subscribed to our newsletter."}</div>
            <button onClick={() => setNewsletter(!newsletter)} className="px-6 py-2 rounded-3xl font-semibold border border-[#007e9e] text-[#007e9e] hover:bg-[#007e9e] hover:text-white transition">
              {newsletter ? "Unsubscribe" : "Subscribe"}
            </button>
          </div>
        </div>
        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow p-6 flex flex-col col-span-1 md:col-span-2 lg:col-span-3">
          <div className="flex items-center gap-2 mb-4 text-xl font-bold text-[#000f29]"><FaHistory /> Recent Activity</div>
          <ul className="text-sm text-gray-700 space-y-2">
            {mockActivity.map(act => (
              <li key={act.id} className="flex items-center gap-2">
                <span className="text-[#007e9e]">•</span> <span>{act.action}</span> <span className="text-gray-400 ml-auto">{act.date}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// Auth protection for dashboard
export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
} 