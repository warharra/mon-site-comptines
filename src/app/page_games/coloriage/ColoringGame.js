"use client";

import { useState } from "react";
import Gallery from "./components/Gallery";
import ColoringPage from "./components/ColoringPage";
import FreeDrawPage from "./components/FreeDrawPage";
import MusicPlayer from "./components/MusicPlayer";

export default function ColoringGame() {
  const [page, setPage] = useState("gallery");
  const [drawing, setDrawing] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-100 to-pink-100 flex flex-col items-center">
      <MusicPlayer />

      <div className="w-full max-w-xl mx-auto flex-1">
        {page === "gallery" && (
          <Gallery
            onSelectDrawing={(key) => {
              setDrawing(key);
              setPage("coloring");
            }}
            onFreeDraw={() => setPage("free")}
          />
        )}

        {page === "coloring" && drawing && (
          <ColoringPage
            drawingKey={drawing}
            onBack={() => setPage("gallery")}
          />
        )}

        {page === "free" && (
          <FreeDrawPage onBack={() => setPage("gallery")} />
        )}
      </div>
    </div>
  );
}