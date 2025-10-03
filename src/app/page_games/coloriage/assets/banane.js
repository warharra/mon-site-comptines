"use client";

export default function BananeSVG({ colors, onZoneClick }) {
  return (
    <svg viewBox="0 0 320 220" className="w-full h-full">
      {/* Banane */}
      <path
        id="banana"
        d="M80,160 Q160,40 240,160 Q180,180 80,160"
        fill={colors.banana}
        stroke="#333"
        strokeWidth="3"
        onClick={e => onZoneClick("banana", e)}
        style={{cursor:"pointer"}}
      />
      {/* Extrémité */}
      <ellipse
        id="tip"
        cx="80" cy="160" rx="10" ry="7"
        fill={colors.tip}
        stroke="#333"
        strokeWidth="2"
        onClick={e => onZoneClick("tip", e)}
        style={{cursor:"pointer"}}
      />
    </svg>
  );
}