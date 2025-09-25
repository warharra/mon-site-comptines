
import { Metadata } from "next";
import HomePageClient from "./HomePageClient";


export const metadata: Metadata = {
  title: "Comptines pour enfants - Comptines de LUDIZIO",
  description: "Découvrez des comptines, berceuses et chansons pour enfants. Retrouvez vos comptines préférées comme Une souris verte, Frère Jacques, et bien d’autres !",
  keywords: ["comptines", "comptines pour enfants", "berceuses", "chansons enfants", "histoires"],
  openGraph: {
    title: "Comptines pour enfants - Comptines de LUDIZIO",
    description: "Découvrez des comptines, berceuses et chansons pour enfants.",
    images: [{ url: "/logo.png" }], // tu mets ton logo ou une image d’accueil
  },
};


export default function HomePage() {
  return <HomePageClient />;
}