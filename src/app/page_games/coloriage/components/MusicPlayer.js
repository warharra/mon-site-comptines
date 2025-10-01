"use client";

import React, { useRef, useState } from "react";

const MUSIC_SRC =
  "https://cdn.pixabay.com/audio/2022/12/19/audio_12a2c3e1e8.mp3"; // Musique douce libre

export default function MusicPlayer() {
  const audioRef = useRef();
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    setPlaying(!playing);
    if (!playing) {
      audioRef.current.volume = 0.15;
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };

  return (
    <div className="absolute top-2 right-2 z-50">
      <button
        className="px-2 py-1 bg-violet-200 rounded hover:bg-violet-300"
        onClick={toggle}
        aria-label={playing ? "Couper la musique" : "Activer la musique"}
      >
        {playing ? "🔊 Musique" : "🔈"}
      </button>
      <audio ref={audioRef} src={MUSIC_SRC} loop />
    </div>
  );
}