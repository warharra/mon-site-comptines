"use client";

export default function PapillonSVG({ colors, onZoneClick }) {
  return (
    <svg viewBox="0 0 320 320" className="w-full h-full">
      {/* Tête */}
      <circle
        id="head"
        cx="150"
        cy="60"
        r="12"
        fill={colors.head}
        stroke="#333"
        strokeWidth="2"
        onClick={() => onZoneClick("head")}
        style={{ cursor: "pointer" }}
      />
      {/* Corps */}
      <ellipse
        id="bodyTop"
        cx="150"
        cy="100"
        rx="12"
        ry="25"
        fill={colors.bodyTop}
        stroke="#333"
        strokeWidth="2"
        onClick={() => onZoneClick("bodyTop")}
        style={{ cursor: "pointer" }}
      />
      <ellipse
        id="bodyBottom"
        cx="150"
        cy="150"
        rx="12"
        ry="30"
        fill={colors.bodyBottom}
        stroke="#333"
        strokeWidth="2"
        onClick={() => onZoneClick("bodyBottom")}
        style={{ cursor: "pointer" }}
      />

      {/* Antennes */}
      <line
        x1="145" y1="50" x2="130" y2="30"
        stroke="#333" strokeWidth="2"
      />
      <circle cx="130" cy="30" r="4" fill="#ebe2e2ff" />
      <line
        x1="155" y1="50" x2="170" y2="30"
        stroke="#333" strokeWidth="2"
      />
      <circle cx="170" cy="30" r="4" fill="#e4dfdfff" />

      {/* Aile gauche haute */}
      <path
        id="leftTopWing"
        d="M150 70 C 90 10, 40 100, 110 120 Z"
        fill={colors.leftTopWing}
        stroke="#333"
        strokeWidth="2"
        onClick={() => onZoneClick("leftTopWing")}
        style={{ cursor: "pointer" }}
      />
      {/* Aile gauche basse */}
      <path
        id="leftBottomWing"
        d="M150 120 C 70 140, 80 200, 130 180 Z"
        fill={colors.leftBottomWing}
        stroke="#333"
        strokeWidth="2"
        onClick={() => onZoneClick("leftBottomWing")}
        style={{ cursor: "pointer" }}
      />

      {/* Aile droite haute */}
      <path
        id="rightTopWing"
        d="M150 70 C 210 10, 260 100, 190 120 Z"
        fill={colors.rightTopWing}
        stroke="#333"
        strokeWidth="2"
        onClick={() => onZoneClick("rightTopWing")}
        style={{ cursor: "pointer" }}
      />
      {/* Aile droite basse */}
      <path
        id="rightBottomWing"
        d="M150 120 C 230 140, 220 200, 170 180 Z"
        fill={colors.rightBottomWing}
        stroke="#333"
        strokeWidth="2"
        onClick={() => onZoneClick("rightBottomWing")}
        style={{ cursor: "pointer" }}
      />

      {/* Ronds décoratifs aile gauche */}
      <circle
        id="spotLeftTop"
        cx="95" cy="70" r="15"
        fill={colors.spotLeftTop}
        stroke="#333"
        strokeWidth="2"
        onClick={() => onZoneClick("spotLeftTop")}
        style={{ cursor: "pointer" }}
      />
      <circle
        id="spotLeftBottom"
        cx="100" cy="160" r="15"
        fill={colors.spotLeftBottom}
        stroke="#333"
        strokeWidth="2"
        onClick={() => onZoneClick("spotLeftBottom")}
        style={{ cursor: "pointer" }}
      />

      {/* Ronds décoratifs aile droite */}
      <circle
        id="spotRightTop"
        cx="205" cy="70" r="15"
        fill={colors.spotRightTop}
        stroke="#333"
        strokeWidth="2"
        onClick={() => onZoneClick("spotRightTop")}
        style={{ cursor: "pointer" }}
      />
      <circle
        id="spotRightBottom"
        cx="200" cy="160" r="15"
        fill={colors.spotRightBottom}
        stroke="#333"
        strokeWidth="2"
        onClick={() => onZoneClick("spotRightBottom")}
        style={{ cursor: "pointer" }}
      />
    </svg>
  );
}
