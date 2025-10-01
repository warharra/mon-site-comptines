import { Metadata } from "next";
import GamePageClient from "./GamePageClient";

export const metadata: Metadata = {
  title: "Jeux éducatifs pour enfants - Comptines Kids",
  description: "Découvre nos jeux éducatifs en ligne adaptés aux enfants : puzzles, memory, apprentissage des lettres et bien plus.",
  keywords: ["jeux éducatifs", "puzzle enfant", "jeux memory", "apprentissage", "Comptines Kids"],
};

export default function JeuxPage() {
  return <GamePageClient />;
}
