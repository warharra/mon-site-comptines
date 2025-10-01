import gamesDataRaw from "../../../../games.json";
import GamePageClient from "./GamePageClient"; // 👉 crée un composant comme VideoPageClient mais pour jeux
import { game } from "../../types/games"; // 👉 crée un type Game comme ton type Video

// ✅ On caste le JSON pour qu’il corresponde bien au type Game
const gamesData: game[] = gamesDataRaw as game[];

type PageProps = {
  params: {
    slug: string;
  };
};

// ✅ Page affichage jeu
export default function Page({ params }: PageProps) {
  const game = gamesData.find((g) => g.slug === params.slug);

  if (!game) {
    return <div className="p-6 text-center text-red-500">❌ Jeu non trouvé</div>;
  }

  return <GamePageClient game={game} />;
}

// ✅ SEO dynamique
export async function generateMetadata({ params }: PageProps) {
  const game = gamesData.find((g) => g.slug === params.slug);

  if (!game) {
    return {
      title: "Jeu non trouvé - Comptines Kids",
      description: "Ce jeu éducatif est introuvable ou a été supprimé."
    };
  }

  return {
    title: `${game.title} - Jeux éducatifs Comptines Kids`,
    description: game.description,
    openGraph: {
      title: `${game.title} - Jeux éducatifs Comptines Kids`,
      description: game.description,
      images: [{ url: game.thumbnail }]
    },
    twitter: {
      card: "summary_large_image",
      title: `${game.title} - Jeux éducatifs Comptines Kids`,
      description: game.description,
      images: [game.thumbnail]
    }
  };
}
