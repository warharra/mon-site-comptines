"use client";

import React from "react";

export default function StickerBar({ stickers }) {
  if (!stickers?.length) return null;
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white bg-opacity-70 py-2 px-4 flex flex-wrap justify-center z-20 shadow">
      <span className="font-bold text-lg mr-2 text-purple-800">Mes autocollants :</span>
      {stickers.slice(-10).map((sticker, i) => (
        <span key={i} className="mx-1 text-2xl">{sticker}</span>
      ))}
    </div>
  );
}