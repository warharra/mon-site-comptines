import { Metadata } from "next";
import videosDataRaw from "../../../../videos.json";
import VideoPageClient from "./VideoPageClient";
import { Video } from "../../types/video";

// ✅ Cast du JSON en tableau typé
const videosData: Video[] = videosDataRaw as Video[];

export default function Page({ params }: any) {
  const video = videosData.find((v) => v.slug === params.slug);

  if (!video) {
    return <div>Vidéo non trouvée</div>;
  }

  return <VideoPageClient video={video} />;
}

export async function generateMetadata({ params }: any) {
  const video = videosData.find((v) => v.slug === params.slug);

  if (!video) {
    return { title: "Comptine non trouvée - Comptines de LUDIZIO" };
  }

  return {
    title: `${video.title} - Comptines de LUDIZIO`,
    description: video.description,
    openGraph: { images: [{ url: video.thumbnail }] },
  };
}
