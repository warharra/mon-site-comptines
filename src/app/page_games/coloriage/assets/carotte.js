export default function CarotteSVG({ colors, onZoneClick }) {
  return (
    <svg viewBox="0 0 320 220" className="w-full h-full">
      {/* Carotte */}
      <polygon
        id="carrot"
        points="160,180 135,70 185,70"
        fill={colors.carrot}
        stroke="#333"
        strokeWidth="3"
        onClick={e => onZoneClick("carrot", e)}
        style={{cursor:"pointer"}}
      />
      {/* Feuille gauche */}
      <path
        id="leafLeft"
        d="M150,70 Q140,40 155,60"
        fill={colors.leafLeft}
        stroke="#333"
        strokeWidth="2"
        onClick={e => onZoneClick("leafLeft", e)}
        style={{cursor:"pointer"}}
      />
      {/* Feuille droite */}
      <path
        id="leafRight"
        d="M170,70 Q180,40 165,60"
        fill={colors.leafRight}
        stroke="#333"
        strokeWidth="2"
        onClick={e => onZoneClick("leafRight", e)}
        style={{cursor:"pointer"}}
      />
    </svg>
  );
}