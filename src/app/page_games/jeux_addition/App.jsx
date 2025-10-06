"use client";

import React, { useState, useEffect } from "react";
import HomeScreen from "./components/HomeScreen";
import LevelSelection from "./components/LevelSelection";
import ExerciseScreen from "./components/ExerciseScreen";
import RewardScreen from "./components/RewardScreen";
import StickerBar from "./components/StickerBar";

const ICONS = ["🎁", "🎈", "🍏", "⭐", "🧸"];

// --- Gestion locale du progrès joueur ---
function getProgress() {
  if (typeof window === "undefined") return {}; // Évite l’erreur SSR
  return JSON.parse(localStorage.getItem("mathGameProgress") || "{}");
}

function saveProgress(data) {
  if (typeof window !== "undefined") {
    localStorage.setItem("mathGameProgress", JSON.stringify(data));
  }
}

// --- Configuration des niveaux ---
const LEVELS = [
  { id: 1, label: "Niveau 1 (1+1 à 4+1)", min: 1, max: 5 },
  { id: 2, label: "Niveau 2 (jusqu’à 10)", min: 1, max: 10 },
  { id: 3, label: "Niveau 3 (jusqu’à 20)", min: 1, max: 20 },
];

// --- Génération aléatoire d’un sticker ---
function getSticker() {
  const stickers = ["🎉", "⭐", "🎁", "🎈", "🍎", "🍌", "🐻"];
  return stickers[Math.floor(Math.random() * stickers.length)];
}

export default function App() {
  const [screen, setScreen] = useState("home");
  const [level, setLevel] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [stickers, setStickers] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  // --- Charger la progression sauvegardée ---
  useEffect(() => {
    const saved = getProgress();
    if (saved?.stickers) setStickers(saved.stickers);
  }, []);

  // --- Génération des exercices ---
  function generateExercises(min, max) {
    const arr = [];
    for (let i = 0; i < 8; i++) {
      const a = Math.floor(Math.random() * (max - min + 1)) + min;
      const b = Math.floor(Math.random() * (max - min + 1)) + min;
      const icon = ICONS[Math.floor(Math.random() * ICONS.length)];
      arr.push({ a, b, icon });
    }
    return arr;
  }

  // --- Démarrer un niveau ---
  function startLevel(levelConfig) {
    setLevel(levelConfig);
    setExercises(generateExercises(levelConfig.min, levelConfig.max));
    setScore(0);
    setCurrentIdx(0);
    setStartTime(performance.now());
    setEndTime(null);
    setScreen("exercise");
  }

  // --- Gérer la réponse de l’utilisateur ---
  function handleAnswer(correct) {
    if (correct) {
      // +1 au score et ajout d’un sticker
      setScore((s) => s + 1);
      setStickers((prev) => {
        const next = [...prev, getSticker()];
        saveProgress({ stickers: next });
        return next;
      });

      // Passe à la question suivante ou récompense
      if (currentIdx + 1 < exercises.length) {
        setTimeout(() => setCurrentIdx((i) => i + 1), 900);
      } else {
        // Fin du niveau 🎉
        setEndTime(performance.now());
        setScreen("reward");

        // 🔊 Lecture du son d’applaudissement
        const applause = document.getElementById("sndApplause");
        if (applause) {
          applause.currentTime = 0;
          applause.play().catch(() => {});
        }
      }
    } else {
      // Réponse incorrecte : le son d’erreur est joué dans ExerciseScreen.jsx
    }
  }

  // --- Retour à l’accueil ---
  function goHome() {
    setScreen("home");
    setLevel(null);
    setExercises([]);
    setCurrentIdx(0);
    setScore(0);
    setStartTime(null);
    setEndTime(null);
  }

  // --- Rendu principal ---
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-100 to-yellow-100 flex flex-col items-center justify-center">
      <StickerBar stickers={stickers} />

      {screen === "home" && (
        <HomeScreen
          onPlay={() => setScreen("levelSelect")}
          onFreeMode={() => setScreen("levelSelect")}
        />
      )}

      {screen === "levelSelect" && (
        <LevelSelection
          levels={LEVELS}
          onSelect={startLevel}
          onFreeMode={(max) =>
            startLevel({ id: "free", label: `Mode libre (${max})`, min: 1, max })
          }
          onBack={goHome}
        />
      )}

      {screen === "exercise" && (
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
          onBack={goHome}
          onReplay={() => startLevel(level)}
          startTime={startTime}
          endTime={endTime}
        />
      )}

      {/* 🎧 Les sons (doivent être dans /public/sounds/) */}
      <audio id="sndApplause" src="/sounds/applause.mp3" preload="auto"></audio>
      <audio id="sndError" src="/sounds/error.mp3" preload="auto"></audio>
    </div>
  );
}
