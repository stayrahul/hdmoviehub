import Hero from "@/components/ui/Hero";
import BentoGrid from "@/components/ui/BentoGrid";
import { 
  getTrendingIndia, 
  getBollywoodTrending, 
  getBollywoodTopRated, 
  getIndianSeries, 
  getSouthIndianMovies, 
  getIndianUpcoming,
  getHindiActionMovies,
  getHindiRomanticMovies,
  getHindiThrillers
} from "@/lib/tmdb";
import { Movie } from "@/types";

export default async function Home() {
  let trendingIndia: Movie[] = [];
  let bollywoodPopular: Movie[] = [];
  let bollywoodTopRated: Movie[] = [];
  let indianSeries: Movie[] = [];
  let southIndian: Movie[] = [];
  let upcomingIndian: Movie[] = [];
  let hindiAction: Movie[] = [];
  let hindiRomance: Movie[] = [];
  let hindiThriller: Movie[] = [];

  try {
    trendingIndia = await getTrendingIndia();
    bollywoodPopular = await getBollywoodTrending();
    southIndian = await getSouthIndianMovies();
    bollywoodTopRated = await getBollywoodTopRated();
    indianSeries = await getIndianSeries();
    upcomingIndian = await getIndianUpcoming();
    hindiAction = await getHindiActionMovies();
    hindiRomance = await getHindiRomanticMovies();
    hindiThriller = await getHindiThrillers();
  } catch (error) {
    console.error("Failed to fetch movies from TMDB:", error);
  }

  return (
    <main className="min-h-screen">
      <Hero movies={bollywoodPopular.slice(0, 5)} />
      <div className="relative z-20 space-y-1 mt-8 sm:mt-12 pb-16">
        <BentoGrid title="🔥 Trending in India" movies={trendingIndia} ranked />
        <BentoGrid title="🎬 Bollywood Blockbusters" movies={bollywoodPopular} />
        <BentoGrid title="💥 Action Packed Hindi" movies={hindiAction} />
        <BentoGrid title="⭐ Top Rated Hindi" movies={bollywoodTopRated} />
        <BentoGrid title="🔪 Gripping Hindi Thrillers" movies={hindiThriller} />
        <BentoGrid title="📺 Indian Web Series" movies={indianSeries} />
        <BentoGrid title="❤️ Hindi Romance" movies={hindiRomance} />
        <BentoGrid title="🌴 South Indian Hits" movies={southIndian} />
        <BentoGrid title="🍿 Coming Soon" movies={upcomingIndian} />
      </div>
    </main>
  );
}
