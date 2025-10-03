import React from "react";

export default function RewardScreen({ score, total, stickers, onBack, onReplay }) {
  return (
    <div className="w-full max-w-md mx-auto py-10 flex flex-col items-center">
      <div className="text-3xl font-bold text-pink-700 mb-4">
        Félicitations ! 🌟
      </div>
      <div className="mb-2 text-xl text-purple-700">
        Tu as fini le niveau avec <span className="font-bold">{score}</span> bonnes réponses !
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
      <button
        className="w-full py-2 bg-pink-400 text-white rounded-xl shadow hover:bg-pink-300"
        onClick={onBack}
      >
        Retour à l’accueil
      </button>
    </div>
  );
}