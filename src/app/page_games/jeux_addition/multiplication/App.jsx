"use client";

import React, { useState, useEffect } from "react";
import HomeScreen from "./components/HomeScreen";
import LevelSelection from "./components/LevelSelection";
import ExerciseScreen from "./components/ExerciseScreen";
import RewardScreen from "./components/RewardScreen";
import StickerBar from "./components/StickerBar";

// ---------- Sauvegarde ----------
function getProgress() {
  if (typeof window === "undefined") return {};
  return JSON.parse(localStorage.getItem("multiplicationGameProgress") || "{}");
}
function saveProgress(data) {
  if (typeof window === "undefined") return;
  localStorage.setItem("multiplicationGameProgress", JSON.stringify(data));
}

// ---------- Niveaux ----------
const LEVELS = [
  // Tables spécifiques
  { id: "table2", label: "Table de 2", min: 2, max: 2 },
  { id: "table3", label: "Table de 3", min: 3, max: 3 },
  { id: "table4", label: "Table de 4", min: 4, max: 4 },
  { id: "table5", label: "Table de 5", min: 5, max: 5 },
  { id: "table6", label: "Table de 6", min: 6, max: 6 },
  { id: "table7", label: "Table de 7", min: 7, max: 7 },
  { id: "table8", label: "Table de 8", min: 8, max: 8 },
  { id: "table9", label: "Table de 9", min: 9, max: 9 },
  // Niveaux de difficulté globale
  { id: "diff1", label: "Niveau 1 (1×1 à 5×5)", min: 1, max: 5 },
  { id: "diff2", label: "Niveau 2 (jusqu’à 8×8)", min: 1, max: 8 },
  { id: "diff3", label: "Niveau 3 (jusqu’à 10×10)", min: 1, max: 10 },
  { id: "diff4", label: "Niveau 4 (jusqu’à 12×12)", min: 1, max: 12 },
];

// ---------- Stickers ----------
function getSticker() {
  const stickers = ["🎯", "⭐", "🏆", "💪", "🔥", "🎉"];
  return stickers[Math.floor(Math.random() * stickers.length)];
}

// ---------- Fonction pour table suivante ----------
function getNextLevel(current) {
  const tables = ["table2","table3","table4","table5","table6","table7","table8","table9"];
  const idx = tables.indexOf(current.id);
  if (idx >= 0 && idx < tables.length - 1) {
    return LEVELS.find(l => l.id === tables[idx + 1]);
  }
  return null;
}

// ---------- App principale ----------
export default function App() {
  const [screen, setScreen] = useState("home");
  const [level, setLevel] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [errors, setErrors] = useState(0);
  const [stickers, setStickers] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  // Charger la progression
  useEffect(() => {
    const saved = getProgress();
    if (saved?.stickers) setStickers(saved.stickers);
  }, []);

  // Génération des exercices
  function generateExercises(min, max) {
    const arr = [];
    if (min === max) {
      // Table spécifique
      for (let b = 1; b <= 10; b++) arr.push({ a: min, b });
    } else {
      // Difficulté générale
      for (let i = 0; i < 10; i++) {
        const a = Math.floor(Math.random() * (max - min + 1)) + min;
        const b = Math.floor(Math.random() * (max - min + 1)) + min;
        arr.push({ a, b });
      }
    }
    return arr.sort(() => Math.random() - 0.5);
  }

  // Lancer un niveau
  function startLevel(levelConfig) {
    setLevel(levelConfig);
    setExercises(generateExercises(levelConfig.min, levelConfig.max));
    setScore(0);
    setErrors(0);
    setCurrentIdx(0);
    setStartTime(performance.now());
    setEndTime(null);
    setScreen("exercise");
  }

  // Réponse de l’enfant
  function handleAnswer(correct) {
    if (correct) {
      setScore(s => s + 1);
      setStickers(prev => {
        const next = [...prev, getSticker()];
        saveProgress({ stickers: next });
        return next;
      });
      if (currentIdx + 1 < exercises.length) {
        setTimeout(() => setCurrentIdx(i => i + 1), 800);
      } else {
        const applause = document.getElementById("sndApplause");
        if (applause) {
          applause.currentTime = 0;
          applause.play().catch(() => {});
        }
        setEndTime(performance.now());
        setScreen("reward");
      }
    } else {
      setErrors(e => e + 1);
      const error = document.getElementById("sndError");
      if (error) {
        error.currentTime = 0;
        error.play().catch(() => {});
      }
    }
  }

  // Retour accueil
  function goHome() {
    setScreen("home");
    setLevel(null);
    setExercises([]);
    setCurrentIdx(0);
    setScore(0);
    setErrors(0);
    setStartTime(null);
    setEndTime(null);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-cyan-100 flex flex-col items-center">
      <StickerBar stickers={stickers} />

      {screen === "home" && (
        <HomeScreen
          title="Jeu des Tables de Multiplication ✖️"
          subtitle="Choisis ta table ou ton niveau"
          onPlay={() => setScreen("levelSelect")}
        />
      )}

      {screen === "levelSelect" && (
        <LevelSelection levels={LEVELS} onSelect={startLevel} onBack={goHome} />
      )}

      {screen === "exercise" && exercises.length > 0 && (
        <ExerciseScreen
          exercise={exercises[currentIdx]}
          number={currentIdx + 1}
          total={exercises.length}
          onAnswer={handleAnswer}
          startTime={startTime}
        />
      )}

      {screen === "reward" && (
        <RewardScreen
          score={score}
          total={exercises.length}
          stickers={stickers.slice(-score)}
          errors={errors}
          onBack={goHome}
          onReplay={() => startLevel(level)}
          onNextLevel={getNextLevel(level) ? () => startLevel(getNextLevel(level)) : null}
          startTime={startTime}
          endTime={endTime}
        />
      )}

      {/* Sons */}
      <audio id="sndApplause" src="/sounds/applause.mp3" preload="auto" />
      <audio id="sndError" src="/sounds/error.mp3" preload="auto" />
    </div>
  );
}
