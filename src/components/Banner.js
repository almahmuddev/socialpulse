

"use client";

import { FaUserPlus } from "react-icons/fa";

export default function Banner() {
  return (
    <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-12">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">
          Keep Your Friendships Alive
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Track when you last connected and never lose touch again.
        </p>
        <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition">
          <FaUserPlus />
          Add a Friend
        </button>
      </div>
    </section>
  );
}