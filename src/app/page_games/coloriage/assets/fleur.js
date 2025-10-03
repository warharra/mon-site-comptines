export default function FleurSVG({ colors, onZoneClick }) {
  return (
    <svg viewBox="0 0 320 220" className="w-full h-full">
      {/* Tige */}
      <rect
        id="stem"
        x="155" y="120" width="10" height="70"
        fill={colors.stem}
        stroke="#333"
        strokeWidth="2"
        rx="5"
        onClick={e => onZoneClick("stem", e)}
        style={{cursor:"pointer"}}
      />
      {/* Centre */}
      <circle
        id="center"
        cx="160" cy="110" r="25"
        fill={colors.center}
        stroke="#333"
        strokeWidth="2"
        onClick={e => onZoneClick("center", e)}
        style={{cursor:"pointer"}}
      />
      {/* Pétale haut */}
      <ellipse
        id="petalTop"
        cx="160" cy="70" rx="18" ry="30"
        fill={colors.petalTop}
        stroke="#333"
        strokeWidth="2"
        onClick={e => onZoneClick("petalTop", e)}
        style={{cursor:"pointer"}}
      />
      {/* Pétale bas */}
      <ellipse
        id="petalBottom"
        cx="160" cy="150" rx="18" ry="30"
        fill={colors.petalBottom}
        stroke="#333"
        strokeWidth="2"
        onClick={e => onZoneClick("petalBottom", e)}
        style={{cursor:"pointer"}}
      />
      {/* Pétale gauche */}
      <ellipse
        id="petalLeft"
        cx="120" cy="110" rx="30" ry="18"
        fill={colors.petalLeft}
        stroke="#333"
        strokeWidth="2"
        onClick={e => onZoneClick("petalLeft", e)}
        style={{cursor:"pointer"}}
      />
      {/* Pétale droite */}
      <ellipse
        id="petalRight"
        cx="200" cy="110" rx="30" ry="18"
        fill={colors.petalRight}
        stroke="#333"
        strokeWidth="2"
        onClick={e => onZoneClick("petalRight", e)}
        style={{cursor:"pointer"}}
      />
    </svg>
  );
}