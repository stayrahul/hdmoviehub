"use client";

import Image from "next/image";
import Link from "next/link";
import { Play, Plus, Check } from "lucide-react";
import { Movie } from "@/types";
import { getImageUrl } from "@/lib/tmdb";
import { useWatchlistStore } from "@/store/store";
import { useEffect, useState } from "react";

interface MovieCardProps {
  movie: Movie;
  rank?: number;
}

export default function MovieCard({ movie, rank }: MovieCardProps) {
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlistStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsClient(true);
  }, []);

  const inWatchlist = isClient ? isInWatchlist(movie.id) : false;
  const isSeries = !!movie.name || !!movie.first_air_date;
  const href = isSeries ? `/series/${movie.id}` : `/movie/${movie.id}`;
  const year = (movie.release_date || movie.first_air_date)?.split('-')[0];

  const toggleWatchlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (inWatchlist) removeFromWatchlist(movie.id);
    else addToWatchlist(movie);
  };

  return (
    <Link href={href} className="block group w-full h-full">
      <div className="relative row-card cursor-pointer flex flex-col items-center">
        <div className="relative w-full aspect-[2/3] rounded-lg sm:rounded-xl overflow-hidden bg-white/5 z-10 shadow-lg border border-white/5 group-hover:border-brand-primary/40 transition-colors duration-300">
          
          {/* Premium Gold Rank Badge */}
          {rank && (
            <div className="absolute top-0 left-0 bg-gradient-to-br from-brand-primary to-brand-secondary text-obsidian font-black px-3 py-1 sm:px-4 sm:py-1.5 rounded-br-xl sm:rounded-br-2xl shadow-[2px_2px_10px_rgba(0,0,0,0.5)] z-30 flex items-center justify-center border-b border-r border-white/20">
              <span className="text-sm sm:text-lg tracking-tighter">#{rank}</span>
            </div>
          )}
          {/* Poster */}
          <Image
            src={getImageUrl(movie.poster_path, "w500") || "/no-poster.svg"}
            alt={movie.title || movie.name || "Movie"}
            fill
            sizes="(max-width: 640px) 160px, (max-width: 768px) 200px, 240px"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
          
          {/* Hover Overlay Gradient (Desktop Only) */}
          <div className="hidden sm:block absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          
          {/* Interactive Elements Overlay (Desktop Only Hover, Mobile Visible Watchlist) */}
          <div className="absolute inset-0 flex flex-col justify-between p-2 sm:p-4 z-20 pointer-events-none">
            
            {/* Top Bar (Watchlist) */}
            <div className="flex justify-end transform sm:-translate-y-4 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 transition-all duration-300 ease-out pointer-events-auto">
              <button
                onClick={toggleWatchlist}
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all shadow-md hover:scale-110 ${
                  inWatchlist 
                    ? 'bg-brand-primary text-obsidian' 
                    : 'bg-obsidian/60 backdrop-blur-md text-white hover:bg-brand-primary hover:text-obsidian border border-white/20'
                }`}
              >
                {inWatchlist ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              </button>
            </div>
            
            {/* Center Play Button (Desktop Hover Only) */}
            <div className="hidden sm:flex justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <div className="w-12 h-12 rounded-full bg-brand-primary/90 backdrop-blur-sm text-obsidian flex items-center justify-center transform scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 ease-out delay-75 shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                <Play className="w-5 h-5 ml-0.5 fill-obsidian" />
              </div>
            </div>

            {/* Bottom Metadata (Desktop Hover Only) */}
            <div className="hidden sm:block transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out delay-75 pointer-events-none">
              <h3 className="text-sm sm:text-base font-bold text-white line-clamp-1 mb-1 drop-shadow-md">
                {movie.title || movie.name}
              </h3>
              <div className="flex items-center gap-2 text-[10px] sm:text-xs text-white/80 font-medium">
                <span className="px-1.5 py-0.5 bg-white/10 rounded-sm backdrop-blur-md border border-white/10">{year}</span>
                {movie.vote_average > 0 && (
                  <div className="flex items-center gap-1">
                    <span className="text-brand-primary font-bold drop-shadow-md">★</span>
                    <span>{movie.vote_average.toFixed(1)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile-Only Bottom Metadata (Always Visible) */}
        <div className="sm:hidden w-full mt-1.5 text-left z-20 relative px-1">
          <h3 className="text-[11px] sm:text-xs font-bold text-white/90 line-clamp-1">
            {movie.title || movie.name}
          </h3>
          <div className="flex items-center gap-2 mt-0.5 text-[9px] sm:text-[10px] text-white/50 font-medium">
            <span>{year}</span>
            {movie.vote_average > 0 && (
              <div className="flex items-center gap-0.5 text-brand-primary/90">
                <span>★</span>
                <span>{movie.vote_average.toFixed(1)}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
