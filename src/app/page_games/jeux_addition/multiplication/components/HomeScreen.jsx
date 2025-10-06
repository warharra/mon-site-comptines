"use client";

import React from "react";

export default function HomeScreen({ onPlay, onFreeMode }) {
  return (
    <div className="w-full max-w-md mx-auto py-12 flex flex-col items-center">
      <div className="text-2xl font-bold mb-4 text-pink-600 drop-shadow-lg">
        Apprends les multiplications <span className="text-1xl">✖️</span>
      </div>
      <button
        className="w-full py-4 mb-4 bg-yellow-400 text-xl rounded-xl shadow hover:bg-yellow-300 font-bold"
        onClick={onPlay}
      >
        Jouer
      </button>
    
      <div className="mt-8 flex justify-center space-x-4 text-4xl">
        <span>🎈</span>
        <span>🍏</span>
        <span>🧸</span>
        <span>⭐</span>
      </div>
    </div>
  );
}