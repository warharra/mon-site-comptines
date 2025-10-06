"use client";

import React, { useState } from "react";

export default function LevelSelection({ levels, onSelect, onFreeMode, onBack }) {
  const [freeMax, setFreeMax] = useState(10);

  return (
    <div className="w-full max-w-md mx-auto py-10 flex flex-col items-center">
      <button
        className="mb-6 px-4 py-2 rounded bg-purple-100 text-purple-700 shadow"
        onClick={onBack}
      >
        ← Retour
      </button>
      <div className="text-2xl font-bold mb-4 text-pink-700">Choisis ton niveau 🎯</div>
      {levels.map((lvl) => (
        <button
          key={lvl.id}
          className="w-full py-3 mb-3 bg-yellow-300 rounded-xl text-lg font-bold shadow hover:bg-yellow-200"
          onClick={() => onSelect(lvl)}
        >
          {lvl.label}
        </button>
      ))}
      
    </div>
  );
}