// app/api/add-video/route.ts
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // chemin vers le fichier videos.json (à la racine du projet)
    const filePath = path.join(process.cwd(), "videos.json");

    // lire le fichier
    const file = fs.readFileSync(filePath, "utf8");
    const videos = JSON.parse(file);

    // calculer prochain id (max existant + 1)
    const nextId =
      videos.length > 0 ? Math.max(...videos.map((v: any) => v.id || 0)) + 1 : 1;

    // date ISO automatique (YYYY-MM-DD)
    const isoDate = new Date().toISOString().split("T")[0];

    // normaliser la lettre (majuscule si présente)
    if (data.letter) data.letter = String(data.letter).toUpperCase();

    // construire la nouvelle vidéo — id et date ajoutés côté serveur
    const newVideo = {
      id: nextId,
      date: isoDate,
      ...data,
    };

    // push et écrire
    videos.push(newVideo);
    fs.writeFileSync(filePath, JSON.stringify(videos, null, 2), "utf8");

    // renvoyer la vidéo créée (pratique pour l'admin UI)
    return NextResponse.json({ success: true, video: newVideo });
  } catch (err) {
    console.error("API add-video error:", err);
    return NextResponse.json(
      { error: "Erreur serveur lors de l'ajout de la vidéo." },
      { status: 500 }
    );
  }
}
