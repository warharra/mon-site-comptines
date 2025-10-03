"use client";

import { motion } from "framer-motion";
import { game } from "../../types/games";
import ColoringGame from "../../page_games/coloriage/ColoringGame";
import AdditionGame from "../../page_games/jeux_addition/AdditionGame";

import { useRouter } from "next/navigation"; // hook Next.js pour la navigation

export default function GamePageClient({ game }: { game: game }) {
  const router = useRouter();

  return (
    
    <div className="bg-gradient-to-b from-pink-100 via-yellow-100 to-blue-100 min-h-screen p-6 relative">
      
      {/* Bouton retour */}
      <button
        onClick={() => router.back()}
        className=" bg-yellow-400 text-blue-800 px-4 py-2 rounded-full shadow hover:bg-blue-800 hover:text-yellow-400 transition-transform transform hover:scale-105 z-50"
      >
        ⬅ Retour
      </button>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="w-full flex justify-center mt-12"
      >
              {game.slug === "coloriage" ? (
          <ColoringGame />
        ) : game.slug === "jeux_addition" ? (
          <AdditionGame />
        ) : (
          <iframe
            src={game.gamePath}
            title={game.title}
            className="w-full h-[80vh] max-w-5xl border-0"
            allowFullScreen
          />
        )}

      </motion.div>
    </div>
  );
}
