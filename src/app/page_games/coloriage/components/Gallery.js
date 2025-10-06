"use client";


import MaisonSVG from "../assets/maison";
import VoitureSVG from "../assets/voiture";
import PapillonSVG from "../assets/Papillon";

// Nouvelle liste d’images fixes à colorier
const IMAGE_TEMPLATES = [
  {
    key: "chaton",
    name: "Chaton mignon 🐱",
    src: "/images/pdf1.png",
  },
  {
    key: "dinosaure",
    name: "Chaton 🐱",
    src: "/images/pdf2.png",
  },
  {
    key: "licorne",
    name: "Licorne magique 🦄",
    src: "/images/pdf3.png",
  },
  {
    key: "fleurs",
    name: "princesse 🌸",
    src: "/images/pdf4.png", // Possible si tu veux un PDF
  },
];

const DRAWINGS = [
  {
    key: "maison",
    name: "Maison",
    svg: MaisonSVG,
    zones: ["roof", "walls", "door", "window"]
  },
  {
    key: "voiture",
    name: "Voiture",
    svg: VoitureSVG,
    zones: ["body", "roof", "antennaLeft", "antennaRight", "leftTopWing", "leftBottomWing", "rightTopWing", "rightBottomWing", "spotLeft1", "spotLeft2", "spotRight1","spotRight2" ]
  },
  {
    key: "papillon",
    name: "Papillon",
    svg: PapillonSVG,
    zones: ["wingLeft", "wingRight", "body", "head", "antennaLeft", "antennaRight"]
  },
];

export default function Gallery({ onSelectDrawing, onFreeDraw, onSelectTemplate }) {
  return (
    <div className="flex flex-col items-center py-6 px-4">
      <h1 className="text-3xl font-bold mb-6 text-violet-700 text-center">
        Jeu de coloriage magique 🎨
      </h1>

      {/* Section 1 — Dessins interactifs */}
      <h2 className="text-xl font-semibold mb-3 text-gray-700">Dessin magique</h2>
     <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 w-full max-w-6xl">

        {DRAWINGS.map(d => (
          <button
            key={d.key}
            onClick={() => onSelectDrawing(d.key)}
            className="bg-white rounded shadow hover:scale-105 transition cursor-pointer p-2 border-2 border-gray-200 flex flex-col items-center"
          >
            <div className="w-40 h-40 flex items-center justify-center overflow-hidden">
              <d.svg
                className="w-full h-full"
                preserveAspectRatio="xMidYMid meet"
                colors={Object.fromEntries(d.zones.map(z => [z, "#fff"]))}
                onZoneClick={() => {}}
              />
            </div>
            <div className="mt-2 font-semibold text-gray-700 text-center">{d.name}</div>
          </button>
        ))}
      </div>

      {/* Section 2 — Pages à colorier (PNG/PDF) */}
      <h2 className="text-xl font-semibold mb-3 text-gray-700">Pages à colorier</h2>
      <div className="grid  sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 w-full max-w-6xl">
        {IMAGE_TEMPLATES.map(t => (
          <button
            key={t.key}
            onClick={() => onSelectTemplate(t)}
            className="bg-white rounded shadow hover:scale-105 transition cursor-pointer p-2 border-2 border-gray-200 flex flex-col items-center"
          >
            <div className="w-40 h-40 flex items-center justify-center overflow-hidden">
              {t.src.endsWith(".pdf") ? (
                <div className="text-gray-500 text-sm">📄 PDF</div>
              ) : (
                <img src={t.src} alt={t.name} className="w-full h-full object-contain" />
              )}
            </div>
            <div className="mt-2 font-semibold text-gray-700 text-center">{t.name}</div>
          </button>
        ))}
      </div>

      {/* Section 3 — Dessin libre */}
      <button
        onClick={onFreeDraw}
        className="mt-4 px-4 py-2 bg-yellow-200 rounded shadow hover:bg-yellow-300 font-bold"
      >
        ✏️ Créer ton dessin libre
      </button>
      <button
  onClick={() => onSelectTemplate()}
  className="mt-4 px-4 py-2 bg-blue-200 rounded shadow hover:bg-blue-300 font-bold"
>
  🖼️ Colorier une image (PNG / PDF)
</button>
    </div>
  );
}

export { DRAWINGS, IMAGE_TEMPLATES };

