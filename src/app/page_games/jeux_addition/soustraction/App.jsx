"use client";

import React, { useState } from "react";
import ExerciseScreenSoustraction from "./components/ExerciseScreen";
import RewardScreen from "./components/RewardScreen";
import HomeScreen from "./components/HomeScreen";
import LevelSelection from "./components/LevelSelection";

function getProgress() {
  if (typeof window === "undefined") return {};
  return JSON.parse(localStorage.getItem("subGameProgress") || "{}");
}
function saveProgress(data) {
  if (typeof window === "undefined") return;
  localStorage.setItem("subGameProgress", JSON.stringify(data));
}

const LEVELS = [
  { id: "lvl1", label: "Niveau 1 (1 à 5)", min: 1, max: 5 },
  { id: "lvl2", label: "Niveau 2 (1 à 10)", min: 1, max: 10 },
  { id: "lvl3", label: "Niveau 3 (1 à 20)", min: 1, max: 20 },
  { id: "lvl4", label: "Niveau 4 (1 à 50)", min: 1, max: 50 },
];

export default function AppSoustraction() {
  const [screen, setScreen] = useState("home");
  const [level, setLevel] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [errors, setErrors] = useState(0);
  const [stickers, setStickers] = useState(getProgress().stickers || []);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  function generateExercises(min, max) {
    const arr = [];
    for (let i = 0; i < 8; i++) {
      let a = Math.floor(Math.random() * (max - min + 1)) + min;
      let b = Math.floor(Math.random() * (max - min + 1)) + min;
      if (b > a) [a, b] = [b, a]; // éviter les résultats négatifs
      arr.push({ a, b });
    }
    return arr;
  }

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

  function handleAnswer(correct) {
    if (correct) {
      setScore((s) => s + 1);
      if (currentIdx + 1 < exercises.length) {
        setTimeout(() => setCurrentIdx((i) => i + 1), 800);
      } else {
        setEndTime(performance.now());
        setScreen("reward");
      }
    } else {
      setErrors((e) => e + 1);
      const errSound = document.getElementById("sndError");
      if (errSound) {
        errSound.currentTime = 0;
        errSound.play();
      }
    }
  }

  function goHome() {
    setScreen("home");
    setLevel(null);
    setExercises([]);
    setScore(0);
    setErrors(0);
    setCurrentIdx(0);
    setStartTime(null);
    setEndTime(null);
  }

  function getNextLevel(current) {
    const idx = LEVELS.findIndex((l) => l.id === current.id);
    if (idx >= 0 && idx < LEVELS.length - 1) {
      return LEVELS[idx + 1];
    }
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-teal-100 to-yellow-100 flex flex-col items-center justify-center">
      {screen === "home" && (
        <HomeScreen
          onPlay={() => setScreen("levelSelect")}
          title="Jeu de Soustraction 🍏"
          subtitle="Apprends à soustraire en t’amusant !"
        />
      )}

      {screen === "levelSelect" && (
        <LevelSelection
          levels={LEVELS}
          onSelect={startLevel}
          onBack={goHome}
        />
      )}

      {screen === "exercise" && (
        <ExerciseScreenSoustraction
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
          stickers={[]}
          errors={errors}
          onBack={goHome}
          onReplay={() => startLevel(level)}
          onNextLevel={
            getNextLevel(level)
              ? () => startLevel(getNextLevel(level))
              : null
          }
          startTime={startTime}
          endTime={endTime}
        />
      )}

      <audio id="sndApplause" src="/sounds/applause.mp3" preload="auto"></audio>
      <audio id="sndError" src="/sounds/error.mp3" preload="auto"></audio>
    </div>
  );
}
