import BentoGrid from "@/components/ui/BentoGrid";
import { getSeriesByCategory } from "@/lib/tmdb";
import { Movie } from "@/types";

export const metadata = {
  title: "Series | AuraStream",
  description: "Browse the best TV series on AuraStream",
};

export default async function SeriesListPage() {
  let popularShows: Movie[] = [];
  let airingToday: Movie[] = [];
  let topRatedShows: Movie[] = [];
  let onTheAir: Movie[] = [];

  try {
    popularShows = await getSeriesByCategory("popular");
    airingToday = await getSeriesByCategory("airing_today");
    topRatedShows = await getSeriesByCategory("top_rated");
    onTheAir = await getSeriesByCategory("on_the_air");
  } catch (error) {
    console.error("Failed to fetch series:", error);
  }

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6 md:px-10 mb-8">
        <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">TV Series</h1>
        <p className="text-silver/50 mt-2 text-sm">Binge-worthy shows, all in one place.</p>
      </div>
      <div className="space-y-2">
        <BentoGrid title="🔥 Popular Shows" movies={popularShows} ranked />
        <BentoGrid title="📺 Airing Today" movies={airingToday} />
        <BentoGrid title="⭐ Top Rated" movies={topRatedShows} />
        <BentoGrid title="🎬 On The Air" movies={onTheAir} />
      </div>
    </main>
  );
}
