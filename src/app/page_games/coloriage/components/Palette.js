"use client";


// Palette de couleurs (modifiable facilement)
const COLORS = [
  "#F44336", "#FF9800", "#FFEB3B", "#4CAF50",
  "#2196F3", "#673AB7", "#E91E63", "#795548"
];

export default function Palette({ selected, onSelect }) {
  return (
    <div className="flex justify-center gap-2 py-2">
      {COLORS.map((color, idx) => (
        <button
          key={color}
          className={`w-8 h-8 rounded-full border-2 ${selected === color ? "border-black" : "border-gray-300"}`}
          style={{background: color}}
          aria-label={`Choisir la couleur ${color}`}
          onClick={() => onSelect(color)}
        />
      ))}
    </div>
  );
}
export { COLORS };