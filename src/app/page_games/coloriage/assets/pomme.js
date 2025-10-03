export default function PommeSVG({ colors, onZoneClick }) {
  return (
    <svg viewBox="0 0 320 220" className="w-full h-full">
      {/* Pomme */}
      <ellipse
        id="apple"
        cx="160" cy="130" rx="50" ry="55"
        fill={colors.apple}
        stroke="#333"
        strokeWidth="3"
        onClick={e => onZoneClick("apple", e)}
        style={{cursor:"pointer"}}
      />
      {/* Feuille */}
      <ellipse
        id="leaf"
        cx="130" cy="80" rx="16" ry="8"
        fill={colors.leaf}
        stroke="#333"
        strokeWidth="2"
        onClick={e => onZoneClick("leaf", e)}
        style={{cursor:"pointer"}}
      />
      {/* Tige */}
      <rect
        id="stem"
        x="153" y="70" width="14" height="23"
        fill={colors.stem}
        stroke="#333"
        strokeWidth="2"
        rx="4"
        onClick={e => onZoneClick("stem", e)}
        style={{cursor:"pointer"}}
      />
    </svg>
  );
}