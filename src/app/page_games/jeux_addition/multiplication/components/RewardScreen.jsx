"use client";

import React, { useEffect } from "react";


function formatTime(ms) {
  if (!ms) return "0:00";
  const s = Math.floor(ms / 1000);
  const min = Math.floor(s / 60);
  const sec = s % 60;
  return `${min}:${sec.toString().padStart(2, "0")}`;
}

export default function RewardScreen({
  score,
  total,
  stickers,
  errors,
  onBack,
  onReplay,
  onNextLevel,
  startTime,
  endTime
}) {
  useEffect(() => {
    const applauseEl = document.getElementById("sndApplause");
    if (applauseEl) {
      applauseEl.currentTime = 0;
      applauseEl.play();
    }
  }, []);

  const timeTaken = endTime && startTime ? endTime - startTime : null;

  return (
    <div className="w-full max-w-md mx-auto py-10 flex flex-col items-center">
      <div className="text-3xl font-bold text-pink-700 mb-4">
        Félicitations ! 🌟
      </div>
      <div className="mb-2 text-xl text-purple-700">
        Tu as fini le niveau avec <span className="font-bold">{score}</span> bonnes réponses !
      </div>
      <div className="mb-2 text-lg text-red-600">
        Nombre d'erreurs : <span className="font-bold">{errors}</span>
      </div>
      <div className="mb-2 text-lg text-blue-700">
        Temps réalisé : <span className="font-bold">{formatTime(timeTaken)}</span>
      </div>
      <div className="my-6 flex flex-wrap justify-center text-4xl">
        {stickers.map((sticker, i) => (
          <span key={i} className="mx-2 animate-bounce">{sticker}</span>
        ))}
      </div>

      <button
        className="w-full py-3 mb-3 bg-yellow-400 text-lg rounded-xl shadow hover:bg-yellow-300 font-bold"
        onClick={onReplay}
      >
        Rejouer ce niveau
      </button>

      {onNextLevel && (
        <button
          className="w-full py-3 mb-3 bg-green-500 text-white rounded-xl shadow hover:bg-green-400 font-bold"
          onClick={onNextLevel}
        >
          Passer au niveau suivant
        </button>
      )}

      <button
        className="w-full py-2 bg-pink-400 text-white rounded-xl shadow hover:bg-pink-300"
        onClick={onBack}
      >
        Retour à l’accueil
      </button>
    </div>
  );
}
