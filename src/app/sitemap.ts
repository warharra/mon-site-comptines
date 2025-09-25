import { MetadataRoute } from "next";
import videos from "../../videos.json";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://comptines-kids.fr";

  const videoUrls = videos.map((video) => ({
    url: `${baseUrl}/video/${video.slug}`,
    lastModified: new Date().toISOString(),
  }));

  return [
    { url: baseUrl, lastModified: new Date().toISOString() },
    ...videoUrls,
  ];
}
