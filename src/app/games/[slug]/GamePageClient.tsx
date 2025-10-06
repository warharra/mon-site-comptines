"use client";

import { motion } from "framer-motion";
import { game } from "../../types/games";
import ColoringGame from "../../page_games/coloriage/ColoringGame";
import AdditionGame from "../../page_games/jeux_addition/AdditionGame";

import { useRouter } from "next/navigation";
import MultiplicationGame from "@/app/page_games/jeux_addition/multiplication/MultiplicationGame";
import SoustractionGame from "@/app/page_games/jeux_addition/soustraction/SoustractionGame";


export default function GamePageClient({ game }: { game: game }) {
  const router = useRouter();

  return (
    
    <div>
      
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
       className="flex w-full justify-center "
      >
              {game.slug === "coloriage" ? (
          <ColoringGame />
        ) : game.slug === "jeux_addition" ? (
          <AdditionGame />
        ) : game.slug === "jeux_Multiplication" ? (
          <MultiplicationGame />
        ) : game.slug === "soustraction" ? (
          <SoustractionGame />
        ) :
        (
          <iframe
            src={game.gamePath}
            title={game.title}
            className="w-full h-[100vh] max-w-8xl "
            allowFullScreen
          />
        )}

      </motion.div>
    </div>
  );
}
