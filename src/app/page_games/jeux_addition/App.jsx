"use client";

import React, { useState } from "react";
import HomeScreen from "./components/HomeScreen";
import LevelSelection from "./components/LevelSelection";
import ExerciseScreen from "./components/ExerciseScreen";
import RewardScreen from "./components/RewardScreen";
import StickerBar from "./components/StickerBar";

const ICONS = ["🎁", "🎈", "🍏", "⭐", "🧸"];

function getProgress() {
  return JSON.parse(localStorage.getItem("mathGameProgress") || "{}");
}
function saveProgress(data) {
  localStorage.setItem("mathGameProgress", JSON.stringify(data));
}

const LEVELS = [
  { id: 1, label: "Niveau 1 (1+1 à 4+1)", min: 1, max: 5 },
  { id: 2, label: "Niveau 2 (jusqu’à 10)", min: 1, max: 10 },
  { id: 3, label: "Niveau 3 (jusqu’à 20)", min: 1, max: 20 },
];

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
  const [stickers, setStickers] = useState(getProgress().stickers || []);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

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
  function startLevel(levelConfig) {
    setLevel(levelConfig);
    setExercises(generateExercises(levelConfig.min, levelConfig.max));
    setScore(0);
    setCurrentIdx(0);
    setStartTime(performance.now());
    setEndTime(null);
    setScreen("exercise");
  }
  function handleAnswer(correct) {
    if (correct) {
      setScore((s) => s + 1);
      setStickers((prev) => {
        const next = [...prev, getSticker()];
        saveProgress({ stickers: next });
        return next;
      });
      if (currentIdx + 1 < exercises.length) {
        setTimeout(() => setCurrentIdx((i) => i + 1), 900);
      } else {
        setEndTime(performance.now());
        setScreen("reward");
      }
    } else {
      // On ne change pas d'exercice, on reste sur le même
      // (Le son d’erreur est joué dans ExerciseScreen)
    }
  }
  function goHome() {
    setScreen("home");
    setLevel(null);
    setExercises([]);
    setCurrentIdx(0);
    setScore(0);
    setStartTime(null);
    setEndTime(null);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-100 to-yellow-100 flex flex-col items-center ">
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
      <audio id="sndApplause" src="sounds/applause.mp3" preload="auto"></audio>
      <audio id="sndError" src="sounds/error.mp3" preload="auto"></audio>
    </div>
  );
}