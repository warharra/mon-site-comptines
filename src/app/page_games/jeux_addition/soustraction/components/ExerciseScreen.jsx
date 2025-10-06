"use client";
import React, { useState, useEffect, useMemo } from "react";

export default function ExerciseScreenSoustraction({
  question,
  exercise,
  options: optionsProp,
  onAnswer,
  current,
  number,
  total,
  startTime,
}) {
  const q = question || exercise;
  if (!q) {
    return (
      <div className="flex justify-center items-center h-64 text-lg text-gray-500">
        Chargement de la question...
      </div>
    );
  }

  const { a = 0, b = 0 } = q;
  const correct = a - b;

  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState(null);
  const [elapsedSec, setElapsedSec] = useState(0);

  // Chronomètre
  useEffect(() => {
    let raf;
    if (!startTime) return;
    const tick = () => {
      setElapsedSec(Math.floor((performance.now() - startTime) / 1000));
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(raf);
  }, [startTime]);

  // Génère les propositions
  const options = useMemo(() => {
    if (Array.isArray(optionsProp) && optionsProp.length) return optionsProp;
    const s = new Set([correct]);
    while (s.size < 3) {
      const val = correct + (Math.floor(Math.random() * 5) - 2);
      if (val >= 0) s.add(val);
    }
    return Array.from(s).sort(() => Math.random() - 0.5);
  }, [correct, optionsProp]);

  const formatTime = (s) => {
    const min = Math.floor(s / 60);
    const sec = s % 60;
    return `${min}:${sec.toString().padStart(2, "0")}`;
  };

  function handleClick(option) {
    if (selected !== null) return;
    setSelected(option);
    const isCorrect = option === correct;
    setResult(isCorrect ? "bravo" : "fail");
    setTimeout(() => {
      setSelected(null);
      setResult(null);
      if (typeof onAnswer === "function") onAnswer(isCorrect);
    }, 800);
  }

  const fullApple = "/images/apple_full.png";
  const eatenApple = "/images/apple_eaten.png";

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto py-6 px-4">
      <h2 className="text-lg font-bold text-purple-700 mb-1">
        Exercice {current ?? number} / {total}
      </h2>
      <div className="text-blue-700 text-sm mb-3">
        ⏱ {formatTime(elapsedSec)}
      </div>

      <div className="text-3xl font-extrabold text-pink-600 mb-4">
        {a} − {b} = ?
      </div>

      {/* 🍎🍎🍎🍎 - 🍏🍏 */}
      <div className="flex items-center justify-center mb-6 flex-wrap">
        {/* Pommes pleines */}
        <div className="flex flex-wrap justify-center">
          {Array.from({ length: a }).map((_, i) => (
            <img
              key={`full-${i}`}
              src={fullApple}
              alt="pomme pleine"
              className="w-12 h-12 mx-1 my-1"
              draggable={false}
            />
          ))}
        </div>

        {/* Le signe - */}
        <span className="text-4xl font-bold text-purple-700 mx-3">−</span>

        {/* Pommes croquées */}
        <div className="flex flex-wrap justify-center">
          {Array.from({ length: b }).map((_, i) => (
            <img
              key={`eaten-${i}`}
              src={eatenApple}
              alt="pomme croquée"
              className="w-12 h-12 mx-1 my-1"
              draggable={false}
            />
          ))}
        </div>
      </div>

      {/* Boutons de réponse */}
      <div className="w-full flex flex-col gap-3">
        {options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => handleClick(opt)}
            disabled={selected !== null}
            className={`w-full py-3 rounded-xl text-xl font-bold shadow transition
              ${
                selected === opt
                  ? opt === correct
                    ? "bg-green-500 text-white scale-105"
                    : "bg-red-500 text-white scale-105"
                  : "bg-yellow-300 text-purple-700 hover:bg-yellow-200"
              }`}
          >
            {opt}
          </button>
        ))}
      </div>

      {/* Bravo / erreur */}
      <div className="h-8 mt-3 text-center text-lg font-semibold">
        {result === "bravo" && (
          <span className="text-green-600 animate-bounce">Bravo 🎉</span>
        )}
        {result === "fail" && (
          <span className="text-red-600">Essaie encore !</span>
        )}
      </div>
    </div>
  );
}
