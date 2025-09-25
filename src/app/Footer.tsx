"use client";

import { Youtube, Music } from "lucide-react"; // Icônes vectorielles (TikTok = Music)

export default function Footer() {
  return (
    <footer className="bg-[#E6FBFF] text-center py-6 mt-8">
      {/* Texte accroche */}
      <p className="font-bold text-pink-800 mb-4 text-lg">
        🌟 Merci de me soutenir 💖 et abonne-toi à mes chaînes pour plus de comptines 🎶
      </p>

      {/* Logos réseaux */}
      <div className="flex justify-center gap-8">
        {/* YouTube */}
        <a
          href="https://www.youtube.com/@ComptinesdeLudizio"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center transform hover:scale-125 transition"
        >
          <Youtube className="w-10 h-10 text-red-600" />
          <span className="text-sm font-semibold text-pink-800">YouTube</span>
        </a>

        {/* TikTok */}
        <a
          href="https://www.tiktok.com/@comptines_ludizio"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center transform hover:scale-125 transition"
        >
          <Music className="w-10 h-10 text-black" />
          <span className="text-sm font-semibold text-pink-800">TikTok</span>
        </a>
      </div>
    </footer>
  );
}
