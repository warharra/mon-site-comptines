import React, { useState, useEffect } from "react";
import HomeScreen from "./components/HomeScreen";
import LevelSelection from "./components/LevelSelection";
import ExerciseScreen from "./components/ExerciseScreen";
import RewardScreen from "./components/RewardScreen";
import StickerBar from "./components/StickerBar";

// Gestion du son
const musicUrl = "https://cdn.pixabay.com/audio/2022/10/16/audio_12b1b7e1e0.mp3";

const LEVELS = [
  { id: 1, label: "Niveau 1 (1+1 à 4+1)", min: 1, max: 5 },
  { id: 2, label: "Niveau 2 (jusqu’à 10)", min: 1, max: 10 },
  { id: 3, label: "Niveau 3 (jusqu’à 20)", min: 1, max: 20 },
];

function getProgress() {
  return JSON.parse(localStorage.getItem("mathGameProgress") || "{}");
}

function saveProgress(data) {
  localStorage.setItem("mathGameProgress", JSON.stringify(data));
}

export default function App() {
  const [screen, setScreen] = useState("home"); // home, levelSelect, exercise, reward
  const [level, setLevel] = useState(null); // {id, min, max}
  const [exercises, setExercises] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [stickers, setStickers] = useState(getProgress().stickers || []);
  const [music, setMusic] = useState(false);

  // Musique de fond
  useEffect(() => {
    let audio = document.getElementById("bgmusic");
    if (!audio) {
      audio = document.createElement("audio");
      audio.id = "bgmusic";
      audio.src = musicUrl;
      audio.loop = true;
      audio.volume = 0.2;
      document.body.appendChild(audio);
    }
    if (music) audio.play();
    else audio.pause();
  }, [music]);

  // Démarrage niveau ou mode libre
  function startLevel(levelConfig) {
    setLevel(levelConfig);
    setExercises(generateExercises(levelConfig.min, levelConfig.max));
    setScore(0);
    setCurrentIdx(0);
    setScreen("exercise");
  }

  // Générer les exercices
  function generateExercises(min, max) {
    const arr = [];
    for (let i = 0; i < 8; i++) {
      const a = Math.floor(Math.random() * (max - min + 1)) + min;
      const b = Math.floor(Math.random() * (max - min + 1)) + min;
      arr.push({ a, b });
    }
    return arr;
  }

  // Réponse à un exercice
  function handleAnswer(correct) {
    if (correct) {
      setScore((s) => s + 1);
      setStickers((prev) => {
        const next = [...prev, getSticker()];
        saveProgress({ stickers: next });
        return next;
      });
    }
    if (currentIdx + 1 < exercises.length) {
      setTimeout(() => setCurrentIdx((i) => i + 1), 900);
    } else {
      setScreen("reward");
    }
  }

  // Sticker aléatoire
  function getSticker() {
    const stickers = ["🎉", "⭐", "🎁", "🎈", "🍎", "🍌", "🐻"];
    return stickers[Math.floor(Math.random() * stickers.length)];
  }

  // Revenir à l’accueil
  function goHome() {
    setScreen("home");
    setLevel(null);
    setExercises([]);
    setCurrentIdx(0);
    setScore(0);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-100 to-yellow-100 flex flex-col items-center justify-center">
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
        />
      )}
      {screen === "reward" && (
        <RewardScreen
          score={score}
          total={exercises.length}
          stickers={stickers.slice(-score)}
          onBack={goHome}
          onReplay={() => startLevel(level)}
        />
      )}
    </div>
  );
}