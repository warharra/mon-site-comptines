"use client";

import React, { useState, useMemo, useEffect } from "react";

// ---------- AUDIO helpers ----------
function playSequence(sounds) {
  if (!sounds || sounds.length === 0) return;
  const audio = new window.Audio(sounds[0]);
  audio.play().catch(() => {});
  audio.onended = () => playSequence(sounds.slice(1));
}
function playNumberSound(number) {
  try {
    const audio = new window.Audio(`/sounds/${number}.mp3`);
    audio.play().catch(() => {});
  } catch (e) {}
}
function playErrorSound() {
  const el = document.getElementById("sndError");
  if (el) {
    el.currentTime = 0;
    el.play().catch(() => {});
  }
}

export default function ExerciseScreen({ exercise, number, total, onAnswer, startTime }) {
  if (!exercise) return null;

  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState(null);
  const { a, b } = exercise;
  const correct = a * b;

  // Chrono
  const [elapsed, setElapsed] = useState(0);
  useEffect(() => {
    if (!startTime) return;
    let raf;
    function update() {
      setElapsed(Math.max(0, Math.floor((performance.now() - startTime) / 1000)));
      raf = requestAnimationFrame(update);
    }
    update();
    return () => cancelAnimationFrame(raf);
  }, [startTime]);

  // Génération réponses
  const answers = useMemo(() => {
    const s = new Set([correct]);
    const candidates = [
      a * Math.max(1, b - 1),
      (a + 1) * b,
      a * (b + 1),
      Math.max(1, correct + (Math.floor(Math.random() * 7) - 3)),
    ];
    for (let i = 0; s.size < 3 && i < candidates.length; i++) {
      if (candidates[i] > 0) s.add(candidates[i]);
    }
    while (s.size < 3) {
      const rand = Math.max(1, correct + (Math.floor(Math.random() * 11) - 5));
      s.add(rand);
    }
    return Array.from(s).sort(() => Math.random() - 0.5);
  }, [a, b, correct]);

  function handleClick(ans) {
    if (selected !== null) return;
    setSelected(ans);
    playNumberSound(ans);
    const isCorrect = ans === correct;
    setResult(isCorrect ? "bravo" : "fail");
    if (!isCorrect) playErrorSound();
    setTimeout(() => {
      setSelected(null);
      setResult(null);
      onAnswer(isCorrect);
    }, 800);
  }

  function formatTime(s) {
    const min = Math.floor(s / 60);
    const sec = s % 60;
    return `${min}:${sec.toString().padStart(2, "0")}`;
  }

  function handleListen() {
    playSequence([`/sounds/${a}.mp3`, `/sounds/fois.mp3`, `/sounds/${b}.mp3`]);
  }

  return (
    <div className="max-w-md w-full mx-auto p-4 bg-white rounded-xl shadow-lg flex flex-col items-center">
      <div className="mb-2 text-lg text-gray-800 font-semibold">
        Exercice {number} / {total}
      </div>

      <div className="mb-2 text-sm text-gray-600">⏱ {formatTime(elapsed)}</div>

      <div className="mb-4 text-3xl font-extrabold text-gray-900">
        {a} × {b} = ?
      </div>

      <div className="w-full flex flex-col items-center mt-2">
        {answers.map((ans) => (
          <button
            key={ans}
            onClick={() => handleClick(ans)}
            disabled={selected !== null}
            className={`w-full py-4 my-2 rounded-xl text-xl font-medium shadow transition
              ${selected === ans
                ? ans === correct
                  ? "bg-green-500 text-white scale-105"
                  : "bg-red-500 text-white scale-105"
                : "bg-white text-gray-900 hover:bg-gray-50"}
            `}
            aria-pressed={selected === ans}
          >
            {ans}
          </button>
        ))}
      </div>

      <div className="h-8 mt-2 text-center text-lg font-bold">
        {result === "bravo" && <span className="text-green-600 animate-bounce">Bravo 🎉</span>}
        {result === "fail" && <span className="text-red-600">Essaie encore !</span>}
      </div>
    </div>
  );
}
