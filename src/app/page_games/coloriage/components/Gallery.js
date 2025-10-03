"use client";

import MaisonSVG from "../assets/maison";
import VoitureSVG from "../assets/voiture";
import PapillonSVG from "../assets/Papillon";


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

export default function Gallery({ onSelectDrawing, onFreeDraw }) {
  return (
    <div className="flex flex-col items-center py-6 px-4">
      <h1 className="text-3xl font-bold mb-6 text-violet-700 text-center">Jeu de coloriage magique 🎨</h1>

      {/* Grid responsive */}
      <div className="grid grid-cols-2 gap-6 mb-6 w-full max-w-lg sm:grid-cols-1">
        {DRAWINGS.map(d => (
          <button
            key={d.key}
            onClick={() => onSelectDrawing(d.key)}
            className="bg-white rounded shadow hover:scale-105 transition cursor-pointer p-2 border-2 border-gray-200 flex flex-col items-center"
            aria-label={`Colorier ${d.name}`}
          >
            {/* Conteneur carré pour SVG */}
            <div className="w-40 h-40 flex items-center justify-center overflow-hidden">
              <d.svg
                className="w-full h-full"
                preserveAspectRatio="xMidYMid meet"
                colors={Object.fromEntries(d.zones.map(z => [z, "#fff"]))}
                onZoneClick={()=>{}}
              />
            </div>

            <div className="mt-2 font-semibold text-gray-700 text-center">{d.name}</div>
          </button>
        ))}
      </div>

      <button
        onClick={onFreeDraw}
        className="mt-4 px-4 py-2 bg-yellow-200 rounded shadow hover:bg-yellow-300 font-bold"
      >
        ✏️ Créer ton dessin libre
      </button>
    </div>
  );
}

export { DRAWINGS };
