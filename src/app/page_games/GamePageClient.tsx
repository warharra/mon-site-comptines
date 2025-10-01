"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gamesData from "../../../games.json"; // ✅ Nouveau fichier JSON
import { useLanguage } from "../LanguageContext";

export default function GamePageClient() {
  const [category, setCategory] = useState("Jeux");
  const [search, setSearch] = useState("");
  const { language } = useLanguage();

  // Catégories de jeux
  const categories = [
    { name: "Coloriage", nameEn: "Coloring", emoji: "🎨", color: "bg-red-300" },
    { name: "Puzzle", nameEn: "Puzzle", emoji: "🧩", color: "bg-blue-300" },
    { name: "Mémoire", nameEn: "Memory", emoji: "🧠", color: "bg-green-300" },
    { name: "Apprentissage", nameEn: "Learning", emoji: "📚", color: "bg-yellow-300" }
  ];
  // Trier les jeux par langue
  const sortedGames = [...gamesData];

  let filteredGames = sortedGames;

  if (search.trim() !== "") {
    filteredGames = sortedGames.filter((game) =>
      game.title.toLowerCase().includes(search.toLowerCase())
    );
  } else if (category !== "Jeux") {
    if (category === "Populaire") {
      filteredGames = sortedGames.filter((game) => game.popular);
    } else {
      filteredGames = sortedGames.filter((game) =>
        game.categories?.includes(category)
      );
    }
  } else {
    filteredGames = sortedGames.filter((game) => game.popular);
  }

  const displayedGames = filteredGames.slice(0, 50);

  return (
    <div className="bg-[#E6FBFF] min-h-screen p-4">
      {/* 🎨 Titre magique */}
      <div className="bg-gradient-to-r from-yellow-300 to-pink-300 text-center py-8 hidden md:block">
        <h2 className="text-3xl font-bold mb-2 text-white">
          {language === "fr"
            ? "🎮 Le monde magique des jeux éducatifs 🌈"
            : "🎮 The magical world of educational games 🌈"}
        </h2>
        <p className="mb-4 text-white font-bold">
          {language === "fr"
            ? "Joue, apprends et découvre en t’amusant !"
            : "Play, learn and discover while having fun!"}
        </p>
      </div>

      {/* 📌 Catégories + recherche */}
      <div className="flex justify-center gap-4 p-4 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() =>
              setCategory(category === cat.name ? "Jeux" : cat.name)
            }
            className={`
              ${cat.color} px-4 py-2 rounded-xl font-bold text-base
              transform transition duration-300
              hover:scale-110 hover:shadow-lg
              ${category === cat.name ? "ring-4 ring-[#ee6d6d]" : ""}
            `}
          >
            {cat.emoji} {language === "fr" ? cat.name : cat.nameEn}
          </button>
        ))}

        <input
          type="text"
          placeholder={language === "fr" ? "🔍 Rechercher un jeu..." : "🔍 Search a game..."}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-3 py-1"
        />
      </div>

      {/* 🃏 Liste des jeux */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 place-items-center">
  {displayedGames.map((game) => (
    <Link
      key={game.id}
      href={`/games/${game.slug}`}
      className="bg-white shadow-md rounded-xl overflow-hidden hover:scale-105 transition transform max-w-[300px] w-full"
    >
      {/* carré réduit */}
      <div className="aspect-square w-full">
        <Image
          src={game.thumbnail}
          alt={`Jeu ${game.title} pour enfants`}
          width={300}
          height={300}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-2">
        <h3 className="text-sm font-bold text-[#ee6d6d] line-clamp-2 text-center">
          {game.title}
        </h3>
      </div>
    </Link>
  ))}
</div>

    </div>
  );
}
