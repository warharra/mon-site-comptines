// SVG Maison : Chaque zone a un id unique pour le coloriage
"use client";


export default function MaisonSVG({ colors, onZoneClick }) {
  return (
    <svg viewBox="0 0 320 320" className="w-full h-full">
      {/* Toit */}
      <polygon
        id="roof"
        points="160,60 60,140 260,140"
        fill={colors.roof}
        stroke="#333"
        strokeWidth="3"
        onClick={() => onZoneClick("roof")}
        style={{cursor:"pointer"}}
      />
      {/* Murs */}
      <rect
        id="walls"
        x="80" y="140" width="160" height="100"
        fill={colors.walls}
        stroke="#333"
        strokeWidth="3"
        onClick={() => onZoneClick("walls")}
        style={{cursor:"pointer"}}
      />
      {/* Porte */}
      <rect
        id="door"
        x="150" y="190" width="40" height="50"
        fill={colors.door}
        stroke="#333"
        strokeWidth="3"
        onClick={() => onZoneClick("door")}
        style={{cursor:"pointer"}}
      />
      {/* Fenêtre */}
      <rect
        id="window"
        x="100" y="160" width="30" height="30"
        fill={colors.window}
        stroke="#333"
        strokeWidth="3"
        onClick={() => onZoneClick("window")}
        style={{cursor:"pointer"}}
      />
    </svg>
  );
}