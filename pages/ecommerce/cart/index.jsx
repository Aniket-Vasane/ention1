import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

const initialCart = [
  { id: 1, name: "Ention E1 Laptop", price: 29999, image: "/assets/product/e1/image1.jpg", quantity: 1 },
  { id: 2, name: "Ention Mouse", price: 999, image: "/assets/mouse.png", quantity: 2 },
];

export default function CartPage() {
  const [cart, setCart] = useState(initialCart);
  const router = useRouter();

  const updateQty = (id, delta) => {
    setCart(cart => cart.map(item => item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item));
  };
  const removeItem = id => setCart(cart => cart.filter(item => item.id !== id));
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#f7fafc] py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-8">
        <h1 className="text-3xl font-bold text-[#000f29] mb-8 text-center">Your Cart</h1>
        {cart.length === 0 ? (
          <div className="text-center text-gray-500">Your cart is empty.</div>
        ) : (
          <>
            <div className="flex flex-col gap-6 mb-8">
              {cart.map(item => (
                <div key={item.id} className="flex items-center gap-6 border-b pb-4">
                  <Image src={item.image} alt={item.name} width={80} height={80} className="rounded-lg object-cover" />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-[#000f29]">{item.name}</h3>
                    <p className="text-[#007e9e] font-bold">₹{item.price.toLocaleString()}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateQty(item.id, -1)} className="w-8 h-8 rounded-full bg-[#e5e7eb] text-[#000f29] font-bold">-</button>
                    <span className="px-2 font-bold">{item.quantity}</span>
                    <button onClick={() => updateQty(item.id, 1)} className="w-8 h-8 rounded-full bg-[#e5e7eb] text-[#000f29] font-bold">+</button>
                  </div>
                  <button onClick={() => removeItem(item.id)} className="ml-4 text-red-500 font-bold">Remove</button>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center text-xl font-bold mb-8">
              <span>Total:</span>
              <span className="text-[#007e9e]">₹{total.toLocaleString()}</span>
            </div>
            <button
              className="w-full bg-[#007e9e] text-white rounded-3xl py-3 px-8 text-lg font-bold hover:bg-[#01E9FE] hover:text-[#000f29] transition"
              onClick={() => router.push('/ecommerce/checkout')}
            >
              Checkout
            </button>
          </>
        )}
      </div>
    </div>
  );
} 