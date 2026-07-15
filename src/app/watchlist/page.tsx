"use client";

import { useWatchlistStore } from "@/store/store";
import MovieCard from "@/components/ui/MovieCard";
import { Bookmark, Film } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function WatchlistPage() {
  const { watchlist } = useWatchlistStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsClient(true);
  }, []);

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex items-center gap-3 mb-8">
          <Bookmark className="w-6 h-6 text-brand-primary" />
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
              My Watchlist
            </h1>
            <p className="text-silver/60 text-sm mt-0.5">
              {isClient ? watchlist.length : 0} {isClient && watchlist.length === 1 ? 'title' : 'titles'} saved
            </p>
          </div>
        </div>

        {!isClient ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="w-full aspect-[2/3] rounded-lg bg-white/[0.03] animate-pulse" />
            ))}
          </div>
        ) : watchlist.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 rounded-full bg-white/[0.04] flex items-center justify-center mb-5 border border-white/[0.06]">
              <Film className="w-8 h-8 text-white/15" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Your watchlist is empty</h2>
            <p className="text-silver/50 text-sm max-w-sm mb-6">
              Start adding movies and series to keep track of what you want to watch.
            </p>
            <Link href="/movies">
              <button className="px-6 py-2.5 bg-brand-primary text-black font-bold rounded-md text-sm hover:bg-brand-primary/90 transition-all">
                Browse Movies
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {watchlist.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
