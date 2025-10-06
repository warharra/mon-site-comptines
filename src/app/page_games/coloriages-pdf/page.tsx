
import Image from "next/image";

const pdfColoriages = [
  { name: "Coloriage Ours", file: "/pdf/coloriages/ours.pdf" },
  { name: "Coloriage Licorne", file: "/pdf/coloriages/licorne.pdf" },
  { name: "Coloriage Voiture", file: "/pdf/coloriages/voiture.pdf" },
  { name: "Coloriage Princesse", file: "/pdf/coloriages/princesse.pdf" }
];

export const metadata = {
  title: "Coloriages à imprimer pour enfants - Comptines Kids",
  description:
    "Télécharge gratuitement des coloriages à imprimer pour enfants : animaux, princesses, voitures et plus. Amuse-toi à colorier à la maison !",
  keywords: [
    "coloriage à imprimer",
    "coloriage enfant gratuit",
    "dessins à colorier",
    "activités manuelles",
    "Comptines Kids"
  ]
};

export default function ColoriagesPDFPage() {
  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        🖍️ Coloriages à imprimer
      </h1>
      <p className="text-center text-gray-600 mb-8">
        Choisis ton dessin préféré, télécharge le PDF et amuse-toi à le colorier à la maison !
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {pdfColoriages.map((pdf) => (
          <div
            key={pdf.file}
            className="flex flex-col items-center p-4 border rounded-2xl shadow-sm hover:shadow-md transition"
          >
            <Image
              src="/images/coloriage-preview.png"
              alt={pdf.name}
              width={150}
              height={150}
              className="rounded-xl mb-3"
            />
            <h2 className="text-lg font-semibold mb-2">{pdf.name}</h2>
            <a
              href={pdf.file}
              download
              className="px-4 py-2 bg-pink-500 text-white rounded-xl hover:bg-pink-600 transition"
            >
              Télécharger le PDF
            </a>
          </div>
        ))}
      </div>
    </main>
  );
}
