"use client";

import React, { useEffect, useRef } from "react";

// Affiche une étoile animée à la position du clic
export default function Effects({ show, x, y }) {
  const ref = useRef();

  useEffect(() => {
    if (show && ref.current) {
      ref.current.classList.add("star-pop");
      setTimeout(() => {
        ref.current.classList.remove("star-pop");
      }, 600);
    }
  }, [show]);

  if (!show) return null;
  return (
    <div
      ref={ref}
      className="pointer-events-none fixed z-40"
      style={{
        left: x-16,
        top: y-16,
        width: 32,
        height: 32
      }}
    >
      {/* petite étoile colorée */}
      <svg viewBox="0 0 32 32">
        <polygon points="16,3 20,14 32,14 22,21 26,32 16,25 6,32 10,21 0,14 12,14"
          fill="#FFD700" stroke="#FFC400" strokeWidth="2"/>
      </svg>
    </div>
  );
}