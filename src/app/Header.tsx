"use client";

import Link from "next/link";
import { useLanguage } from "./LanguageContext";
import LanguageSelector from "./LanguageSelector";

export default function Header() {
  const { language } = useLanguage();

  const texts = {
    fr: { comptines: "Comptines", jeux: "Jeux", titre: "🎵 Ludizio" },
    en: { comptines: "Nursery Rhymes", jeux: "Games", titre: "🎵 Ludizio" },
  };

  return (
    <header className="bg-white shadow-md py-4 px-6 flex items-center justify-between relative">
      {/* Boutons à gauche */}
      <div className="flex gap-4 text-sky-700">
        <Link href="/" className="text-1xl font-bold text-sky-700 hover:text-pink-600 transition">
          {texts[language].comptines}
        </Link>
        <Link href="/page_games" className="text-1xl font-bold text-sky-700 hover:text-pink-600 transition">
          {texts[language].jeux}
        </Link>
      </div>

      {/* Titre centré */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <Link href="/" className="text-2xl font-bold text-pink-600 hover:scale-110 transition-transform">
          {texts[language].titre}
        </Link>
      </div>

      {/* Sélecteur de langue à droite */}
      <nav>
        <LanguageSelector />
      </nav>
    </header>
  );
}
