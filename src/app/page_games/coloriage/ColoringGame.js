"use client";

import { useState } from "react";
import Gallery from "./components/Gallery";
import ColoringPage from "./components/ColoringPage";
import FreeDrawPage from "./components/FreeDrawPage";
import ImageColoringPage from "./components/ImageColoringPage";
import MusicPlayer from "./components/MusicPlayer";

export default function ColoringGame() {
  const [page, setPage] = useState("gallery");
  const [drawing, setDrawing] = useState(null);
  const [image, setImage] = useState(null); // image PNG/JPG à colorier

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-100 to-pink-100 flex flex-col items-center">
      <MusicPlayer />

      <div className="w-full max-w-xl mx-auto flex-1">
        {/* 🎨 Page principale - Galerie */}
        {page === "gallery" && (
          <Gallery
            onSelectDrawing={(key) => {
              setDrawing(key);
              setPage("coloring");
            }}
            onFreeDraw={() => setPage("free")}
            onSelectTemplate={(template) => {
              // 🧩 Cas 1 : clic sur le bouton bleu (aucun template)
              if (!template) {
                const input = document.createElement("input");
                input.type = "file";
                input.accept = "image/png, image/jpeg, application/pdf";
                input.onchange = (e) => {
                  const file = e.target.files[0];
                  if (!file) return;

                  // Si c'est un PDF → on l'ouvre dans un nouvel onglet
                  if (file.name.endsWith(".pdf")) {
                    const url = URL.createObjectURL(file);
                    window.open(url, "_blank");
                  } else {
                    // Si c'est une image → on la charge pour coloriage
                    const url = URL.createObjectURL(file);
                    setImage(url);
                    setPage("color-image");
                  }
                };
                input.click();
                return;
              }

              // 🧩 Cas 2 : clic sur une image prédéfinie
              if (template.src?.endsWith(".pdf")) {
                window.open(template.src, "_blank");
                return;
              }

              if (template.src) {
                setImage(template.src);
                setPage("color-image");
              }
            }}
          />
        )}

        {/* 🏠 Page de coloriage SVG (maison, papillon, voiture, etc.) */}
        {page === "coloring" && drawing && (
          <ColoringPage drawingKey={drawing} onBack={() => setPage("gallery")} />
        )}

        {/* ✏️ Page de dessin libre */}
        {page === "free" && <FreeDrawPage onBack={() => setPage("gallery")} />}

        {/* 🖼️ Page de coloriage d'une image PNG/JPG */}
        {page === "color-image" && image && (
          <ImageColoringPage
            imageSrc={image}
            onBack={() => {
              setImage(null);
              setPage("gallery");
            }}
          />
        )}
      </div>
    </div>
  );
}
