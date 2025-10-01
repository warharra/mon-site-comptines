"use client";

import React, { useState, useRef } from "react";
import Palette, { COLORS } from "./Palette";
import Toolbar from "./Toolbar";
import Effects from "./Effects";
import { DRAWINGS } from "./Gallery";

// Utilitaire pour vérifier si toutes les zones sont coloriées
function isComplete(colors, zones) {
  return zones.every(zone => colors[zone] && colors[zone] !== "#fff");
}

export default function ColoringPage({ drawingKey, onBack }) {
  const drawing = DRAWINGS.find(d => d.key === drawingKey);
  const { svg: SVGComponent, zones } = drawing;
  const [colors, setColors] = useState(Object.fromEntries(zones.map(z => [z, "#fff"])));
  const [selected, setSelected] = useState(COLORS[0]);
  const [effect, setEffect] = useState({ show: false, x: 0, y: 0 });
  const [done, setDone] = useState(false);

  // Clique sur une zone du SVG
  const handleZone = (zone, e) => {
    if (!selected) return;
    setColors(c => ({ ...c, [zone]: selected }));
    // Effet étoile sur clic
    const rect = e.target.getBoundingClientRect();
    setEffect({ show: true, x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
    setTimeout(() => setEffect({ show: false, x: 0, y: 0 }), 600);

    // Vérifie si terminé
    setTimeout(() => {
      if (isComplete({ ...colors, [zone]: selected }, zones)) setDone(true);
    }, 400);
  };

  // Gomme : remet en blanc la dernière zone cliquée (stockée en ref)
  const lastZoneRef = useRef();
  const handleErase = () => {
    if (lastZoneRef.current) {
      setColors(c => ({ ...c, [lastZoneRef.current]: "#fff" }));
      setDone(false);
    }
  };
  // Réinitialise tout
  const handleReset = () => {
    setColors(Object.fromEntries(zones.map(z => [z, "#fff"])));
    setDone(false);
  };

  // Sauvegarde : convertit le SVG en image PNG
  const handleSave = () => {
    const svgElem = document.getElementById("coloring-svg");
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svgElem);
    const canvas = document.createElement("canvas");
    canvas.width = 400; canvas.height = 400;
    const ctx = canvas.getContext("2d");
    const img = new window.Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0, 400, 400);
      const url = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = url;
      a.download = "dessin.png";
      a.click();
    };
    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgString)));
  };

  // On clique une zone
  const handleZoneClick = (zone, e) => {
    lastZoneRef.current = zone;
    handleZone(zone, e);
  };

  return (
    <div className="flex flex-col items-center pt-6">
      <div className="mb-2 text-xl font-semibold text-violet-700">{drawing.name}</div>
      <div className="relative bg-white rounded shadow p-4 mb-2" style={{width:320, height:320}}>
        <SVGComponent
          colors={colors}
          onZoneClick={(zone, e) => handleZoneClick(zone, e)}
          id="coloring-svg"
        />
        <Effects show={effect.show} x={effect.x} y={effect.y} />
        {done && (
          <div className="absolute inset-0 bg-white bg-opacity-70 flex flex-col items-center justify-center z-30">
            <div className="text-2xl font-bold text-green-600 mb-2">Bravo 🎉 Tu as terminé !</div>
            <div>
              <svg width="60" height="60">
                <polygon points="30,5 38,27 55,27 41,38 47,55 30,45 13,55 19,38 5,27 22,27"
                  fill="#FFD700" stroke="#FFC400" strokeWidth="3"/>
              </svg>
              <span className="ml-2 text-yellow-500 font-bold">⭐ Badge magique</span>
            </div>
          </div>
        )}
      </div>
      <Palette selected={selected} onSelect={setSelected} />
      <Toolbar
        onErase={handleErase}
        onReset={handleReset}
        onSave={handleSave}
        onBack={onBack}
        canErase={!!lastZoneRef.current}
        canReset={true}
        canSave={true}
        canBack={true}
      />
    </div>
  );
}