"use client";
import { Video } from "../../types/video";
import Link from "next/link";
import { ThumbsUp, Youtube } from "lucide-react";
import videos from "../../../../videos.json";

export default function VideoPageClient({ video }: { video: Video }) {
  // Autres vidéos (exclure celle en cours)
  const otherVideos = videos.filter((v) => v.slug !== video.slug).slice(0, 20);

  return (
    <div className="bg-[#E6FBFF] min-h-screen p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Partie gauche (vidéo + infos) */}
      <div className="lg:col-span-2">
        {/* Vidéo */}
        <div className="w-full aspect-video bg-black rounded-lg overflow-hidden shadow-lg">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${video.youtubeId}`}
            title={video.title}
            allowFullScreen
          />
        </div>

        {/* Titre */}
        <h1 className="text-2xl font-bold text-[#ee6d6d] mt-4 flex items-center gap-2">
          {video.title}
        </h1>

        {/* Boutons */}
        <div className="flex gap-4 mt-4">
          <button className="flex items-center gap-2 bg-white hover:bg-pink-300 text-pink-800 font-bold px-4 py-2 rounded-lg shadow">
            <ThumbsUp className="w-5 h-5" /> J’aime
          </button>
          <a
            href="https://www.youtube.com/@ComptinesdeLudizio"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-bold px-4 py-2 rounded-lg shadow"
          >
            <Youtube className="w-5 h-5" /> S’abonner
          </a>
        </div>

        {/* Description */}
        <div className="bg-white rounded-lg shadow mt-6 p-4">
          <h2 className="text-lg font-bold text-[#ee6d6d] mb-2">
            📖 Description
          </h2>
          <p className="text-gray-700 whitespace-pre-line">
            {video.description}
          </p>
        </div>
      </div>

      {/* Sidebar : Autres vidéos */}
      <aside className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-bold text-[#ee6d6d] mb-4">
          🎬 Autres vidéos
        </h2>
        <div className="space-y-4 max-h-[600px] overflow-y-auto">
          {otherVideos.map((v) => (
            <Link
              key={v.slug}
              href={`/video/${v.slug}`} // ✅ URL avec slug
              className="flex gap-3 items-center"
            >
              <img
                src={v.thumbnail}
                alt={`Comptine ${v.title} pour enfants`}
                className="w-24 h-16 object-cover rounded"
              />
              <div>
                <p className="text-sm font-bold text-gray-800">{v.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </aside>
    </div>
  );
}
