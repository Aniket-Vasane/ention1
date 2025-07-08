import React from 'react';

export default function Card({ title, description, features }) {
  return (
    <div className="bg-white/10 border border-white/20 backdrop-blur p-6 rounded-xl shadow-md transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg">
      <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
      <p className="text-gray-200 mb-3">{description}</p>
      <ul className="list-disc list-inside text-sm text-gray-300">
        {features.map((feature, i) => <li key={i}>{feature}</li>)}
      </ul>
    </div>
  );
}