"use client";

import React from "react";

export default function HomeScreen({ onPlay, onFreeMode }) {
  return (
    <div className="w-full max-w-md mx-auto py-12 flex flex-col items-center">
      <div className="text-4xl font-bold mb-4 text-pink-600 drop-shadow-lg">
        Apprends les additions <span className="text-2xl">➕</span>
      </div>
      <div className="mb-10 text-lg text-purple-700">Un jeu ludique pour enfants !</div>
      <button
        className="w-full py-4 mb-4 bg-yellow-400 text-xl rounded-xl shadow hover:bg-yellow-300 font-bold"
        onClick={onPlay}
      >
        Jouer
      </button>
      <button
        className="w-full py-3 bg-green-300 text-lg rounded-xl shadow hover:bg-pink-300"
        onClick={onFreeMode}
      >
        Mode libre
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