import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const data = await req.json(); // contient { id, title?, description?, categories?, ... }

    const filePath = path.join(process.cwd(), "videos.json");

    // lire le fichier existant
    const file = fs.readFileSync(filePath, "utf8");
    const videos = JSON.parse(file);

    // chercher la vidéo à modifier
    const index = videos.findIndex((v: any) => v.id === data.id);
    if (index === -1) {
      return NextResponse.json(
        { error: "Vidéo introuvable." },
        { status: 404 }
      );
    }

    // mise à jour (on remplace seulement les champs envoyés)
    videos[index] = {
      ...videos[index],
      ...data,
    };

    // écrire dans le fichier
    fs.writeFileSync(filePath, JSON.stringify(videos, null, 2), "utf8");

    return NextResponse.json({ success: true, video: videos[index] });
  } catch (err) {
    console.error("API update-video error:", err);
    return NextResponse.json(
      { error: "Erreur serveur lors de la mise à jour." },
      { status: 500 }
    );
  }
}
