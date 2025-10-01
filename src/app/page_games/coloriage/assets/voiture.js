// SVG Voiture : Chaque zone a un id unique pour le coloriage
"use client";

export default function VoitureSVG({ colors, onZoneClick }) {
  return (
    <svg viewBox="0 0 320 180" className="w-full h-full">
      {/* Carrosserie */}
      <rect
        id="body"
        x="60" y="80" width="200" height="50"
        fill={colors.body}
        stroke="#333"
        strokeWidth="3"
        rx="20"
        onClick={() => onZoneClick("body")}
        style={{cursor:"pointer"}}
      />
      {/* Toit */}
      <rect
        id="roof"
        x="110" y="50" width="100" height="40"
        fill={colors.roof}
        stroke="#333"
        strokeWidth="3"
        rx="12"
        onClick={() => onZoneClick("roof")}
        style={{cursor:"pointer"}}
      />
      {/* Roue gauche */}
      <circle
        id="wheelLeft"
        cx="90" cy="140" r="18"
        fill={colors.wheelLeft}
        stroke="#333"
        strokeWidth="3"
        onClick={() => onZoneClick("wheelLeft")}
        style={{cursor:"pointer"}}
      />
      {/* Roue droite */}
      <circle
        id="wheelRight"
        cx="230" cy="140" r="18"
        fill={colors.wheelRight}
        stroke="#333"
        strokeWidth="3"
        onClick={() => onZoneClick("wheelRight")}
        style={{cursor:"pointer"}}
      />
      {/* Fenêtre */}
      <rect
        id="window"
        x="135" y="60" width="50" height="25"
        fill={colors.window}
        stroke="#333"
        strokeWidth="3"
        rx="7"
        onClick={() => onZoneClick("window")}
        style={{cursor:"pointer"}}
      />
    </svg>
  );
}