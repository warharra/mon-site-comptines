"use client";

export default function Toolbar({
  onErase, onReset, onSave, onBack, canErase, canReset, canSave, canBack
}) {
  return (
    <div className="flex justify-center gap-3 py-2 flex-wrap"   >
      <button
        onClick={onErase}
        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
        disabled={!canErase}
      >🧽 Gomme</button>
      <button
        onClick={onReset}
        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
        disabled={!canReset}
      >🔄 Réinitialiser</button>
      <button
        onClick={onSave}
        className="px-2 py-1 bg-blue-100 rounded hover:bg-blue-200"
        disabled={!canSave}
      >💾 Sauvegarder</button>
      <button
        onClick={onBack}
        className="px-2 py-1 bg-pink-100 rounded hover:bg-pink-200"
        disabled={!canBack}
      >⬅️ Retour</button>
    </div>
  );
}