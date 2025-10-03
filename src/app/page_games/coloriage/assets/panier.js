export default function PanierSVG({ colors, onZoneClick }) {
  return (
    <svg viewBox="0 0 320 220" className="w-full h-full">
      {/* Panier */}
      <ellipse
        id="basket"
        cx="160" cy="150" rx="60" ry="30"
        fill={colors.basket}
        stroke="#333"
        strokeWidth="3"
        onClick={e => onZoneClick("basket", e)}
        style={{cursor:"pointer"}}
      />
      {/* Anse */}
      <path
        id="handle"
        d="M100,150 Q160,60 220,150"
        stroke="#333"
        strokeWidth="6"
        fill="none"
        onClick={e => onZoneClick("handle", e)}
        style={{cursor:"pointer"}}
      />
      {/* Œuf 1 */}
      <ellipse
        id="egg1"
        cx="135" cy="145" rx="13" ry="18"
        fill={colors.egg1}
        stroke="#333"
        strokeWidth="2"
        onClick={e => onZoneClick("egg1", e)}
        style={{cursor:"pointer"}}
      />
      {/* Œuf 2 */}
      <ellipse
        id="egg2"
        cx="160" cy="145" rx="13" ry="18"
        fill={colors.egg2}
        stroke="#333"
        strokeWidth="2"
        onClick={e => onZoneClick("egg2", e)}
        style={{cursor:"pointer"}}
      />
      {/* Œuf 3 */}
      <ellipse
        id="egg3"
        cx="185" cy="145" rx="13" ry="18"
        fill={colors.egg3}
        stroke="#333"
        strokeWidth="2"
        onClick={e => onZoneClick("egg3", e)}
        style={{cursor:"pointer"}}
      />
    </svg>
  );
}