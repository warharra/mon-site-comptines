"use client";

import { useState } from "react";
import Link from "next/link";
import videosData from "../../videos.json";
import { useLanguage } from "./LanguageContext";

export default function HomePageClient() {
  const [category, setCategory] = useState("Comptines");
  const [search, setSearch] = useState("");
  const { language } = useLanguage(); // ✅ récupère la langue globale

  // Alphabet avec couleurs
  const alphabetColors = [
    "text-red-500",
    "text-white-200",
    "text-yellow-500",
    "text-green-500",
    "text-blue-500",
    "text-indigo-500",
    "text-purple-500",
    "text-pink-500",
  ];

  // Catégories disponibles
  const categories = [
    { name: "Populaire", emoji: "🔥", color: "bg-red-300" },
    { name: "Berceuse", emoji: "🌙", color: "bg-blue-300" },
    { name: "Histoire", emoji: "📖", color: "bg-green-300" },
    { name: "Apprentissage", emoji: "📚", color: "bg-yellow-300" },
    { name: "40 min Compilation", emoji: "🎬", color: "bg-purple-300" },
  ];

  // Trier vidéos par date décroissante (et filtrer par langue active)
  const sortedVideos = [...videosData]
    .filter((video) => video.lang === language)

  // 🔎 Filtrer selon recherche, lettre ou catégorie
  let filteredVideos = sortedVideos;

  if (search.trim() !== "") {
    // Recherche par mot-clé
    filteredVideos = sortedVideos.filter((video) =>
      video.title.toLowerCase().includes(search.toLowerCase())
    );
  } else if (category !== "Comptines") {
    if (category.length === 1) {
      // ✅ Filtre par première lettre du titre
      filteredVideos = sortedVideos.filter((video) =>
        video.title.toUpperCase().startsWith(category.toUpperCase())
      );
    } else if (category === "Populaire") {
      filteredVideos = sortedVideos.filter((video) => video.popular);
    } else {
      filteredVideos = sortedVideos.filter((video) =>
        video.categories?.includes(category)
      );
    }
  } else {
    // ⚡ Par défaut → vidéos populaires
    filteredVideos = sortedVideos.filter((video) => video.popular);
  }

  // Limiter à 28 vidéos max
  const displayedVideos = filteredVideos.slice(0, 28);

  return (
    <div className="bg-[#E6FBFF] min-h-screen p-6">
      {/* 🎨 Texte magique */}
      <div className="bg-gradient-to-r from-yellow-300 to-pink-300 text-center py-8 hidden md:block">
        <h2 className="text-3xl font-bold mb-2 text-white">
          🌞 Le monde magique des comptines 🌈
        </h2>
        <p className="mb-4 text-white font-bold">
          Découvre nos chansons, berceuses et histoires
        </p>
      </div>

      {/* 🎥 Vidéo à la une */}
      {sortedVideos.length > 0 && (
        <div className="max-w-6xl mx-auto p-4 hidden md:block">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Vidéo réduite */}
            <div className="w-full">
              <iframe
                width="100%"
                height="260"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                className="rounded-lg"
                src={`https://www.youtube.com/embed/${sortedVideos[0].youtubeId}`}
                title={sortedVideos[0].title}
                allowFullScreen
              />
            </div>
            {/* Titre + description */}
            <div>
              <h2 className="text-xl font-bold text-[#ee6d6d] mb-2 line-clamp-2">
                {sortedVideos[0].title}
              </h2>
              <p className="text-sm text-gray-600 line-clamp-5">
                {sortedVideos[0].description}
              </p>
              <Link
                href={`/video/${sortedVideos[0].slug}`}
                className="mt-3 inline-block bg-[#ee6d6d] text-white px-4 py-2 rounded-lg shadow hover:scale-105 transition"
              >
                ▶️ Voir la vidéo
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* 📌 Catégories + recherche */}
      <div className="flex justify-center gap-4 p-4 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() =>
              setCategory(category === cat.name ? "Comptines" : cat.name)
            }
            className={`
              ${cat.color} px-4 py-2 rounded-xl font-bold text-base
              transform transition duration-300
              hover:scale-110 hover:shadow-lg
              ${category === cat.name ? "ring-4 ring-[#ee6d6d]" : ""}
            `}
          >
            {cat.emoji} {cat.name}
          </button>
        ))}

        <input
          type="text"
          placeholder="🔍 Rechercher..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-3 py-1"
        />
      </div>
       {/* 🔤 Alphabet coloré */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter, i) => (
            <button
              key={letter}
              onClick={() =>
                setCategory(category === letter ? "Comptines" : letter)
              }
              className={`font-bold text-lg transition-transform hover:scale-125 ${
                alphabetColors[i % alphabetColors.length]
              } ${category === letter ? "underline" : ""}`}
            >
              {letter}
            </button>
          ))}
        </div>

      {/* 🃏 Liste des vidéos */}
      <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-4 p-6 rounded-xl shadow-md">
        {displayedVideos.map((video) => (
          <Link
            key={video.id}
            href={`/video/${video.slug}`}
            className="bg-white shadow-md rounded-xl overflow-hidden hover:scale-105 transition transform"
          >
            <img
              src={video.thumbnail}
              alt={`Comptine ${video.title} pour enfants`}
              className="w-full h-40 object-cover rounded-lg"
            />
            <div className="p-2">
              <h3 className="text-sm font-bold text-[#ee6d6d] line-clamp-2">
                {video.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
