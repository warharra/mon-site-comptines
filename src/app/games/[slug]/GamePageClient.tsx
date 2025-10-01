"use client";

import { motion } from "framer-motion";
import { game } from "../../types/games";
import ColoringGame from "../../page_games/coloriage/ColoringGame";

export default function GamePageClient({ game }: { game: game }) {
  return (
    <div className="bg-gradient-to-b from-pink-100 via-yellow-100 to-blue-100 min-h-screen p-6">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="w-full flex justify-center"
      >
        {game.slug === "coloriage" ? (
          // 👉 Si c'est le jeu de coloriage → affiche le composant React
          <ColoringGame />
        ) : (
          // 👉 Sinon → charge via iframe
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
