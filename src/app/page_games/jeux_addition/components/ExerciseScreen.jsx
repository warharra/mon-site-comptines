import React, { useState } from "react";

// Illustrations simples pour les nombres
function renderObjects(count) {
  const icons = ["🎁", "🎈", "🍏", "⭐", "🧸"];
  const icon = icons[count % icons.length];
  return (
    <div className="flex flex-wrap justify-center mb-2">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="text-3xl mx-1">{icon}</span>
      ))}
    </div>
  );
}

export default function ExerciseScreen({ exercise, number, total, onAnswer }) {
  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState(null);
  const { a, b } = exercise;
  const correct = a + b;

  // Propositions : la bonne et deux fausses
  const answers = React.useMemo(() => {
    const set = new Set([correct]);
    while (set.size < 3) {
      set.add(correct + Math.floor(Math.random() * 3) - 1);
    }
    return Array.from(set).sort(() => Math.random() - 0.5);
  }, [correct]);

  function handleClick(ans) {
    if (selected !== null) return;
    setSelected(ans);
    const isCorrect = ans === correct;
    setResult(isCorrect ? "bravo" : "fail");
    setTimeout(() => {
      setSelected(null);
      setResult(null);
      onAnswer(isCorrect);
    }, 900);
  }

  return (
    <div className="max-w-md w-full mx-auto p-4 bg-white rounded-xl shadow-lg flex flex-col items-center">
      <div className="mb-2 text-lg text-purple-700 font-bold">
        Exercice {number} / {total}
      </div>
      <div className="mb-4 text-2xl font-bold text-pink-700">
        {a} + {b} = ?
      </div>
      <div className="mb-2 flex items-center justify-center space-x-4">
        {renderObjects(a)}
        <span className="text-3xl font-bold text-purple-600">+</span>
        {renderObjects(b)}
      </div>
      <div className="w-full flex flex-col items-center mt-2">
        {answers.map((ans) => (
          <button
            key={ans}
            className={`w-full py-4 my-2 rounded-xl text-xl font-bold shadow transition
              ${selected === ans
                ? ans === correct
                  ? "bg-green-400 text-white scale-105"
                  : "bg-red-400 text-white scale-105"
                : "bg-yellow-200 text-purple-700 hover:bg-yellow-300"}
            `}
            onClick={() => handleClick(ans)}
            disabled={selected !== null}
          >
            {ans}
          </button>
        ))}
      </div>
      <div className="h-8 mt-2 text-center text-2xl font-bold">
        {result === "bravo" && <span className="text-green-600 animate-bounce">Bravo 🎉</span>}
        {result === "fail" && <span className="text-red-600">Essaie encore !</span>}
      </div>
    </div>
  );
}