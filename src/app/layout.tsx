import type { Metadata } from "next";
import { ReactNode } from "react";
import "./globals.css";
import LanguageSelector from "./LanguageSelector";
import Footer from "./Footer";
import Link from "next/link";
import { LanguageProvider } from "./LanguageContext";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  metadataBase: new URL("https://comptines-kids.fr"),
  title: "Comptines pour enfants - Comptines de Fun4kids LUDIZIO",
  description:
    "Découvrez des comptines, berceuses et chansons pour enfants. Une souris verte, Frère Jacques, et bien d’autres comptines à chanter et écouter.",
  keywords: [
    "comptines",
    "comptines pour enfants",
    "berceuses",
    "chansons enfants",
    "histoires",
    "une souris verte",
    "frère jacques",
    "Au clair de la lune",
    "Il était un petit navire",
    "Ah vous dirai-je maman",
    "Alouette gentille alouette",
    "Petit escargot",
    "A Ram Sam Sam",
    "Cadet Rousselle",
    "Lundi matin",
    "Les petits poissons",
    "Savez-vous planter les choux",
    "ah les crocodiles",
    "Fun4kids",
    "apprentissage en chansons",
    "comptines éducatives",
    "histoires pour enfants",
    "chansons éducatives maternelle",
    "comptines pour apprendre les jours",
    "comptines pour apprendre les chiffres",
  ],
  openGraph: {
    title: "Ah les crocodiles et ses amis🐊 - Comptines de LUDIZIO Fun4kids",
    description:
      "Chansons et comptines pour enfants : berceuses, apprentissage, histoires et compilations Ah les crocodiles et ses amis🐊",
    images: [{ url: "/images/ludizio192x192.png" }], 
  },
   icons: {
    icon: "/images/favicon.png",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ff4081" />
      </head>
      <body className="bg-yellow-300 min-h-screen">
        <LanguageProvider>
          {/* HEADER */}
          <header className="bg-white shadow-md py-4 px-6 flex items-center justify-between">
            {/* Titre cliquable */}
            <Link
              href="/"
              className="text-2xl font-bold text-pink-600 hover:scale-110 transition-transform"
            >
              🎵 Comptines de LUDIZIO
            </Link>

            {/* Liste déroulante Langues */}
            <nav>
              <LanguageSelector />
            </nav>
          </header>

          {/* CONTENU */}
          <main className="p-6">{children}</main>

          {/* FOOTER */}
          <Footer />
        </LanguageProvider>
         <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}


