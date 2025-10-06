import React, { useState, useMemo, useEffect } from "react";

// --------- AJOUT : fonction pour jouer une séquence de sons ---------
function playSequence(sounds) {
  if (!sounds.length) return;
  const audio = new window.Audio(sounds[0]);
  audio.play();
  audio.onended = () => playSequence(sounds.slice(1));
}

function playNumberSound(number) {
  const audio = new window.Audio(`/sounds/${number}.mp3`);
  audio.play();
}
function playErrorSound() {
  const audioEl = document.getElementById("sndError");
  if (audioEl) {
    audioEl.currentTime = 0;
    audioEl.play();
  }
}

export default function ExerciseScreen({ exercise, number, total, onAnswer, startTime }) {
  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState(null);
  const { a, b, icon } = exercise;
  const correct = a + b;

  // Chronomètre
  const [elapsed, setElapsed] = useState(0);
  useEffect(() => {
    let raf;
    function update() {
      setElapsed(Math.floor((performance.now() - startTime) / 1000));
      raf = requestAnimationFrame(update);
    }
    update();
    return () => cancelAnimationFrame(raf);
  }, [startTime]);

  // Propositions : la bonne et deux fausses
  const answers = useMemo(() => {
    const set = new Set([correct]);
    while (set.size < 3) {
      let val = correct + (Math.floor(Math.random() * 4) - 1);
      if (val > 0) set.add(val);
    }
    return Array.from(set).sort(() => Math.random() - 0.5);
  }, [correct]);

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
    }, 900);
  }

  function renderObjects(count) {
    return (
      <div className="flex flex-wrap justify-center mb-2">
        {Array.from({ length: count }).map((_, i) => (
          <span key={i} className="text-3xl mx-1">{icon}</span>
        ))}
      </div>
    );
  }

  // Format chrono mm:ss
  function formatTime(s) {
    const min = Math.floor(s / 60);
    const sec = s % 60;
    return `${min}:${sec.toString().padStart(2, "0")}`;
  }

  // --------- AJOUT : bouton pour écouter l'énoncé ---------
  function handleListen() {
    playSequence([
      `/sounds/${a}.mp3`,
      `/sounds/plus.mp3`,
      `/sounds/${b}.mp3`
    ]);
  }

  return (
    <div className="max-w-md w-full mx-auto p-4 bg-white rounded-xl shadow-lg flex flex-col items-center">
      <div className="mb-2 text-lg text-purple-700 font-bold">
        Exercice {number} / {total}
      </div>
      <div className="mb-2 text-lg text-blue-700 font-bold">
        ⏱ {formatTime(elapsed)}
      </div>
      <div className="mb-4 text-2xl font-bold text-pink-700">
        {a} + {b} = ?
      </div>
      {/* AJOUT : bouton écouter l'énoncé */}
      <button
        className="mb-2 px-4 py-2 bg-yellow-100 text-lg rounded-full shadow hover:bg-yellow-200 flex items-center"
        onClick={handleListen}
        type="button"
      >
        🔊 Écouter l’énoncé
      </button>
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
