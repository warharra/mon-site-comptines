"use client";

import React, { useRef, useState } from "react";
import Palette, { COLORS } from "./Palette";
import Toolbar from "./Toolbar";

// Feuille blanche dessin libre
export default function FreeDrawPage({ onBack }) {
  const canvasRef = useRef();
  const [color, setColor] = useState(COLORS[0]);
  const [size, setSize] = useState(8);
  const [drawing, setDrawing] = useState(false);

  // Dessiner sur canvas
  const handlePointerDown = e => {
    setDrawing(true);
    draw(e);
  };
  const handlePointerUp = () => setDrawing(false);
  const handlePointerMove = e => {
    if (!drawing) return;
    draw(e);
  };

  // Dessin
  const draw = e => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
    ctx.beginPath();
    ctx.arc(x, y, size / 2, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
  };

  // Effacer tout
  const handleReset = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  // Sauvegarde en PNG
  const handleSave = () => {
    const canvas = canvasRef.current;
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = "dessin-libre.png";
    a.click();
  };

  // Gomme = blanc
  const handleErase = () => setColor("#fff");

  return (
    <div className="flex flex-col items-center pt-6">
      <div className="mb-2 text-xl font-semibold text-violet-700">Feuille blanche : dessine librement !</div>
      <div className="bg-white rounded shadow p-2 mb-2 relative"
        style={{width:320, height:320, touchAction:"none"}}
      >
        <canvas
          ref={canvasRef}
          width={320}
          height={320}
          className="w-full h-full border border-gray-300 rounded"
          style={{background:"#fff"}}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          onPointerMove={handlePointerMove}
          onTouchStart={handlePointerDown}
          onTouchEnd={handlePointerUp}
          onTouchMove={handlePointerMove}
        />
      </div>
      <Palette selected={color} onSelect={setColor} />
      <div className="flex items-center gap-3 my-2">
        <label className="font-semibold text-gray-700">Taille du pinceau:</label>
        <input
          type="range"
          min="4"
          max="24"
          value={size}
          onChange={e => setSize(Number(e.target.value))}
          className="w-32"
        />
        <span className="font-mono text-violet-600">{size}px</span>
        <button
          onClick={handleErase}
          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >🧽 Gomme</button>
      </div>
      <Toolbar
        onErase={handleErase}
        onReset={handleReset}
        onSave={handleSave}
        onBack={onBack}
        canErase={true}
        canReset={true}
        canSave={true}
        canBack={true}
      />
    </div>
  );
}