"use client";

import { useState } from "react";
import videosData from "../../../videos.json";

const CATEGORIES = ["Berceuse", "Histoire", "Apprentissage", "Compilation", "Populaire"];

export default function AdminPage() {
  const [videos, setVideos] = useState(videosData);
  const [editingVideo, setEditingVideo] = useState<any | null>(null);

  // Ouvrir le formulaire d’édition
  const handleEdit = (video: any) => {
    setEditingVideo({ ...video });
  };

  // Sauvegarder la modification
  const handleSave = async () => {
    try {
      const res = await fetch("/api/update-video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingVideo),
      });

      const result = await res.json();
      if (result.success) {
        // mettre à jour la vidéo localement
        setVideos((prev) =>
          prev.map((v) => (v.id === result.video.id ? result.video : v))
        );
        setEditingVideo(null);
      } else {
        alert("Erreur lors de la mise à jour : " + result.error);
      }
    } catch (err) {
      console.error("Erreur update :", err);
      alert("Impossible de mettre à jour la vidéo.");
    }
  };

  // Toggle des catégories (multi-sélection)
  const toggleCategory = (cat: string) => {
    if (!editingVideo) return;

    const hasCat = editingVideo.categories?.includes(cat);
    const newCats = hasCat
      ? editingVideo.categories.filter((c: string) => c !== cat)
      : [...(editingVideo.categories || []), cat];

    setEditingVideo({ ...editingVideo, categories: newCats });
  };

  return (
    <div className="p-6 bg-yellow-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">🎵 Admin - Modifier mes vidéos</h1>

      {/* Liste des vidéos */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {videos.map((video) => (
          <div key={video.id} className="bg-white rounded-lg shadow p-4">
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-32 object-cover rounded"
            />
            <h2 className="font-bold mt-2">{video.title}</h2>
            <p className="text-sm text-gray-600">
              {video.description.slice(0, 50)}...
            </p>
            <button
              onClick={() => handleEdit(video)}
              className="mt-2 px-3 py-1 bg-pink-400 text-white rounded"
            >
              Modifier
            </button>
          </div>
        ))}
      </div>

      {/* Formulaire d’édition */}
      {editingVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h2 className="text-lg font-bold mb-4">
              Modifier {editingVideo.title}
            </h2>

            {/* Description */}
            <label className="block mb-2">Description :</label>
            <textarea
              value={editingVideo.description}
              onChange={(e) =>
                setEditingVideo({ ...editingVideo, description: e.target.value })
              }
              className="w-full border rounded p-2 mb-4"
            />

            {/* Catégories */}
            <label className="block mb-2">Catégories :</label>
            <div className="flex flex-wrap gap-2 mb-4">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => toggleCategory(cat)}
                  className={`px-3 py-1 rounded ${
                    editingVideo.categories?.includes(cat)
                      ? "bg-pink-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Boutons */}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditingVideo(null)}
                className="px-3 py-1 bg-gray-400 text-white rounded"
              >
                Annuler
              </button>
              <button
                onClick={handleSave}
                className="px-3 py-1 bg-green-500 text-white rounded"
              >
                Sauvegarder
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
