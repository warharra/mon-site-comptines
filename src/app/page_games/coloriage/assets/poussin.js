export default function PoussinSVG({ colors, onZoneClick }) {
  return (
    <svg viewBox="0 0 320 220" className="w-full h-full">
      {/* Corps */}
      <ellipse
        id="body"
        cx="160" cy="120" rx="65" ry="60"
        fill={colors.body}
        stroke="#333"
        strokeWidth="3"
        onClick={e => onZoneClick("body", e)}
        style={{cursor:"pointer"}}
      />
      {/* Tête */}
      <circle
        id="head"
        cx="160" cy="65" r="38"
        fill={colors.head}
        stroke="#333"
        strokeWidth="3"
        onClick={e => onZoneClick("head", e)}
        style={{cursor:"pointer"}}
      />
      {/* Bec */}
      <polygon
        id="beak"
        points="160,90 150,100 170,100"
        fill={colors.beak}
        stroke="#333"
        strokeWidth="2"
        onClick={e => onZoneClick("beak", e)}
        style={{cursor:"pointer"}}
      />
      {/* Aile gauche */}
      <ellipse
        id="wingLeft"
        cx="110" cy="120" rx="22" ry="18"
        fill={colors.wingLeft}
        stroke="#333"
        strokeWidth="2"
        onClick={e => onZoneClick("wingLeft", e)}
        style={{cursor:"pointer"}}
      />
      {/* Aile droite */}
      <ellipse
        id="wingRight"
        cx="210" cy="120" rx="22" ry="18"
        fill={colors.wingRight}
        stroke="#333"
        strokeWidth="2"
        onClick={e => onZoneClick("wingRight", e)}
        style={{cursor:"pointer"}}
      />
      {/* Patte gauche */}
      <rect
        id="legLeft"
        x="135" y="178" width="8" height="25"
        fill={colors.legLeft}
        stroke="#333"
        strokeWidth="2"
        rx="4"
        onClick={e => onZoneClick("legLeft", e)}
        style={{cursor:"pointer"}}
      />
      {/* Patte droite */}
      <rect
        id="legRight"
        x="177" y="178" width="8" height="25"
        fill={colors.legRight}
        stroke="#333"
        strokeWidth="2"
        rx="4"
        onClick={e => onZoneClick("legRight", e)}
        style={{cursor:"pointer"}}
      />
    </svg>
  );
}