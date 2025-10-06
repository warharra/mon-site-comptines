import { Metadata } from "next";
import GamePageClient from "./GamePageClient";

export const metadata: Metadata = {
  title: "Jeux éducatifs pour enfants en ligne | Puzzles, mémoire, coloriage - Comptines Kids",
  description:
    "Joue à des jeux éducatifs en ligne gratuits pour enfants : puzzles, jeux de mémoire, coloriages, additions, multiplications et bien plus. Apprends en t’amusant avec Comptines Kids !",
  keywords: [
    "jeux éducatifs enfants",
    "jeux éducatifs gratuits",
    "jeux en ligne enfants",
    "puzzle enfant",
    "jeux de mémoire",
    "jeux de coloriage",
    "apprentissage ludique",
    "mathématiques enfants",
    "jeux d’addition",
    "jeux de multiplication",
    "jeux de soustraction",
    "Comptines Kids",
    "jeux pour maternelle",
    "jeux pour CP",
    "jeux pédagogiques",
    "apprendre en jouant"
  ],
  openGraph: {
    title: "Jeux éducatifs pour enfants - Comptines Kids",
    description:
      "Découvre une collection de jeux éducatifs en ligne adaptés aux enfants : puzzles, memory, coloriages et jeux de calcul. Apprends tout en t’amusant avec Comptines Kids !",
    url: "https://www.comptines-kids.fr/page_games",
    siteName: "Comptines Kids",
    images: [
      {
        url: "/images/soustraction.jpg",
        width: 1200,
        height: 630,
        alt: "Jeux éducatifs pour enfants - Comptines Kids"
      }
    ],
    locale: "fr_FR",
    type: "website"
  },
  alternates: {
    canonical: "https://www.comptines-kids.fr/page_games"
  }
};

export default function JeuxPage() {
  return <GamePageClient />;
}
