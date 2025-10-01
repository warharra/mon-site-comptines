"use client";

import MaisonSVG from "../assets/maison";
import VoitureSVG from "../assets/voiture";

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
    zones: ["body", "roof", "wheelLeft", "wheelRight", "window"]
  }
];

export default function Gallery({ onSelectDrawing, onFreeDraw }) {
  return (
    <div className="flex flex-col items-center py-6">
      <h1 className="text-3xl font-bold mb-6 text-violet-700">Jeu de coloriage magique 🎨</h1>
      <div className="grid grid-cols-2 gap-6 mb-6">
        {DRAWINGS.map(d => (
          <button
            key={d.key}
            onClick={() => onSelectDrawing(d.key)}
            className="bg-white rounded shadow hover:scale-105 transition cursor-pointer p-2 border-2 border-gray-200"
            aria-label={`Colorier ${d.name}`}
          >
            <div className="w-40 h-40 flex items-center justify-center">
              <d.svg colors={Object.fromEntries(d.zones.map(z => [z, "#fff"]))} onZoneClick={()=>{}} />
            </div>
            <div className="mt-2 font-semibold text-gray-700">{d.name}</div>
          </button>
        ))}
      </div>
      <button
        onClick={onFreeDraw}
        className="mt-4 px-4 py-2 bg-yellow-200 rounded shadow hover:bg-yellow-300 font-bold"
      >✏️ Créer ton dessin libre</button>
    </div>
  );
}

export { DRAWINGS };