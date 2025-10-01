import gamesDataRaw from "../../../../games.json";
import GamePageClient from "./GamePageClient"; 
import { game } from "../../types/games"; 

const gamesData: game[] = gamesDataRaw as game[];

// ✅ Page affichage jeu
export default function Page({ params }: any) {
  const game = gamesData.find((g) => g.slug === params.slug);

  if (!game) {
    return <div className="p-6 text-center text-red-500">❌ Jeu non trouvé</div>;
  }

  return <GamePageClient game={game} />;
}

// ✅ SEO dynamique
export async function generateMetadata(
  { params }: any
) {
  const game = gamesData.find((g) => g.slug === params.slug);

  if (!game) {
    return {
      title: "Jeu non trouvé - Comptines Kids",
      description: "Ce jeu éducatif est introuvable ou a été supprimé."
    };
  }

  return {
    title: `${game.title} - Jeux éducatifs`,
    description: game.description,
    openGraph: {
      title: `${game.title} - Jeux éducatifs`,
      description: game.description,
      images: [{ url: game.thumbnail }]
    },
    twitter: {
      card: "summary_large_image",
      title: `${game.title} - Jeux éducatifs`,
      description: game.description,
      images: [game.thumbnail]
    }
  };
}
