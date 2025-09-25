"use client";
import { useLanguage } from "./LanguageContext";

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  return (
    <select
      value={language}
      onChange={(e) => setLanguage(e.target.value as "fr" | "en")}
      className="bg-[#E6FBFF] text-pink-800 font-bold rounded-xl px-3 py-2 shadow-md cursor-pointer"
    >
      <option value="fr">Français</option>
      <option value="en">English</option>
    </select>
  );
}

