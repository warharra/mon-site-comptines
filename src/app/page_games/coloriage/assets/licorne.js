export default function LicorneSVG({ colors, onZoneClick }) {
  return (
    <svg viewBox="0 0 320 220" className="w-full h-full">
      {/* Corps */}
      <ellipse
        id="body"
        cx="160" cy="140" rx="70" ry="40"
        fill={colors.body}
        stroke="#333"
        strokeWidth="3"
        onClick={e => onZoneClick("body", e)}
        style={{cursor:"pointer"}}
      />
      {/* Tête */}
      <ellipse
        id="head"
        cx="230" cy="90" rx="32" ry="24"
        fill={colors.head}
        stroke="#333"
        strokeWidth="3"
        onClick={e => onZoneClick("head", e)}
        style={{cursor:"pointer"}}
      />
      {/* Crinière */}
      <path
        id="mane"
        d="M245,70 Q250,100 230,110 Q215,90 245,70"
        fill={colors.mane}
        stroke="#333"
        strokeWidth="2"
        onClick={e => onZoneClick("mane", e)}
        style={{cursor:"pointer"}}
      />
      {/* Corne */}
      <polygon
        id="horn"
        points="240,65 245,45 250,65"
        fill={colors.horn}
        stroke="#333"
        strokeWidth="2"
        onClick={e => onZoneClick("horn", e)}
        style={{cursor:"pointer"}}
      />
      {/* Patte avant */}
      <rect
        id="legFront"
        x="205" y="170" width="12" height="30"
        fill={colors.legFront}
        stroke="#333"
        strokeWidth="2"
        rx="4"
        onClick={e => onZoneClick("legFront", e)}
        style={{cursor:"pointer"}}
      />
      {/* Patte arrière */}
      <rect
        id="legBack"
        x="120" y="170" width="12" height="30"
        fill={colors.legBack}
        stroke="#333"
        strokeWidth="2"
        rx="4"
        onClick={e => onZoneClick("legBack", e)}
        style={{cursor:"pointer"}}
      />
      {/* Queue */}
      <path
        id="tail"
        d="M90,150 Q80,180 120,180"
        stroke="#333"
        strokeWidth="5"
        fill="none"
        onClick={e => onZoneClick("tail", e)}
        style={{cursor:"pointer"}}
      />
    </svg>
  );
}