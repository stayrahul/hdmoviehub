import BentoGrid from "@/components/ui/BentoGrid";
import { getMoviesByCategory, getBollywoodMovies } from "@/lib/tmdb";
import { Movie } from "@/types";

export const metadata = {
  title: "Movies | AuraStream",
  description: "Browse the best movies on AuraStream",
};

export default async function MoviesPage() {
  let popularMovies: Movie[] = [];
  let nowPlayingMovies: Movie[] = [];
  let topRatedMovies: Movie[] = [];
  let upcomingMovies: Movie[] = [];
  let bollywoodMovies: Movie[] = [];

  try {
    popularMovies = await getMoviesByCategory("popular");
    nowPlayingMovies = await getMoviesByCategory("now_playing");
    topRatedMovies = await getMoviesByCategory("top_rated");
    upcomingMovies = await getMoviesByCategory("upcoming");
    bollywoodMovies = await getBollywoodMovies();
  } catch (error) {
    console.error("Failed to fetch movies:", error);
  }

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6 md:px-10 mb-8">
        <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">Movies</h1>
        <p className="text-silver/50 mt-2 text-sm">Explore feature films from around the world.</p>
      </div>
      <div className="space-y-2">
        <BentoGrid title="🔥 Popular" movies={popularMovies} ranked />
        <BentoGrid title="🇮🇳 Bollywood" movies={bollywoodMovies} />
        <BentoGrid title="🎬 Now Playing" movies={nowPlayingMovies} />
        <BentoGrid title="⭐ Top Rated" movies={topRatedMovies} />
        <BentoGrid title="🚀 Coming Soon" movies={upcomingMovies} />
      </div>
    </main>
  );
}
