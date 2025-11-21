import sanka from "@utils/sanka";

interface NewApiDetail {
  [key: string]: any;
}

interface animeDetails {
  title: string;
  poster: string;
  score: { value: string; users: string };
  japanese: string;
  synonyms: string;
  english: string;
  status: string;
  type: string;
  source: string;
  duration: string;
  episodes: number | null;
  season: string;
  studios: string;
  producers: string;
  aired: string;
  trailer: string;
  batchList: BatchLinkCard[];
  synopsis: Synopsis;
  genreList: GenreLinkCard[];
  episodeList: EpisodeLinkCard[];
}

export default async function animeInfoService(routeParams: {
  animeId: string;
}) {
  const { animeId } = routeParams;
  const result = await sanka<NewApiDetail>(`/detail/${animeId}`);
  
  const rawData = result.data || {};
  let detail = rawData.data || rawData.anime_detail || rawData.donghua_detail || rawData;

  if (!detail.title && rawData.title) {
      detail = rawData;
  }

  const mappedData: animeDetails = {
      title: detail.title || "???",
      poster: detail.poster || "",
      score: { value: detail.rating || "N/A", users: "" },
      japanese: detail.alter_title || "",
      synonyms: detail.alter_title || "",
      english: detail.title || "",
      status: detail.status || "Unknown",
      type: detail.type || "TV",
      source: "Original",
      duration: detail.duration || "-",
      episodes: parseInt(detail.episodes_count) || null,
      season: detail.season || "-",
      studios: detail.studio || "-",
      producers: "",
      aired: detail.released || "-",
      trailer: "",
      batchList: [],
      synopsis: {
          paragraphs: [detail.synopsis || "No synopsis available."],
          connections: []
      },
      genreList: (detail.genres || []).map((g: any) => ({
          title: g.name,
          genreId: g.slug
      })),
      episodeList: (detail.episodes_list || []).map((e: any) => {
          const match = e.episode.match(/Episode\s+(\d+(\.\d+)?)/i);
          
          let displayTitle = e.episode; 

          if (match) {
              displayTitle = ` Ep ${match[1]}`;
          } else {
              const slugParts = e.slug.split('-');
              const numIndex = slugParts.indexOf('episode');
              if (numIndex !== -1 && slugParts[numIndex + 1] && /^\d+$/.test(slugParts[numIndex + 1])) {
                  displayTitle = `Ep ${slugParts[numIndex + 1]}`;
              }
          }

          return {
              title: displayTitle, 
              episodeId: e.slug, 
          };
      }).reverse() 
  };

  return { ...result, data: mappedData };
}