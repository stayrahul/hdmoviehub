"use client";

import { useState, useEffect, useCallback } from "react";
import { Movie } from "@/types";
import { getImageUrl } from "@/lib/tmdb";
import { Play, Plus, Check, Info } from "lucide-react";
import Link from "next/link";
import { useWatchlistStore } from "@/store/store";
import { motion } from "framer-motion";

interface HeroProps {
  movies: Movie[];
}

export default function Hero({ movies }: HeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlistStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsClient(true);
  }, []);

  const rotate = useCallback(() => {
    if (movies.length > 1) {
      setCurrentIndex((prev) => (prev + 1) % Math.min(movies.length, 5));
    }
  }, [movies.length]);

  useEffect(() => {
    const interval = setInterval(rotate, 10000);
    return () => clearInterval(interval);
  }, [rotate]);

  if (!movies || movies.length === 0) return null;

  const movie = movies[currentIndex];
  const inWatchlist = isClient ? isInWatchlist(movie.id) : false;
  const isSeries = !!movie.name || !!movie.first_air_date;
  const href = isSeries ? `/series/${movie.id}` : `/movie/${movie.id}`;
  const year = (movie.release_date || movie.first_air_date)?.split('-')[0];

  const toggleWatchlist = () => {
    if (inWatchlist) removeFromWatchlist(movie.id);
    else addToWatchlist(movie);
  };

  return (
    <div className="md:pt-24 md:px-6 lg:px-8 w-full max-w-[1600px] mx-auto">
      <div className="relative w-full h-[85vh] md:h-[70vh] min-h-[500px] flex items-end z-0 overflow-hidden md:rounded-[2.5rem] md:border border-white/5 md:shadow-[0_30px_60px_rgba(0,0,0,0.8)] bg-obsidian">
        {/* Background crossfade */}
        {movies.slice(0, 5).map((m, i) => (
          <div
            key={m.id}
            className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
            style={{ opacity: i === currentIndex ? 1 : 0 }}
          >
            <img
              src={getImageUrl(m.backdrop_path, "original")}
              alt=""
              className="w-full h-full object-cover opacity-80 md:opacity-70"
            />
          </div>
        ))}

        {/* Cinematic Gold/Onyx Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/60 to-transparent opacity-100" />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian/90 via-obsidian/40 to-transparent sm:w-2/3" />
        
        {/* Subtle gold accent glow */}
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-brand-primary/10 blur-[100px] rounded-full pointer-events-none mix-blend-screen" />

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-12 pb-16 md:pb-16">
          <div className="max-w-xl md:max-w-4xl space-y-4 md:space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              className="flex items-center gap-3 text-xs md:text-base font-bold tracking-widest uppercase text-white/70"
            >
              <span className="text-brand-primary font-black drop-shadow-md">HDMovieHub</span>
              <span className="w-1.5 h-1.5 bg-brand-primary/50 rounded-full" />
              <span>{isSeries ? 'Series' : 'Film'}</span>
              <span className="w-1.5 h-1.5 bg-white/30 rounded-full" />
              <span>{year}</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-[1.05] drop-shadow-2xl"
            >
              {movie.title || movie.name}
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="text-sm md:text-xl text-white/70 line-clamp-3 leading-relaxed max-w-2xl font-medium"
            >
              {movie.overview}
            </motion.p>

            {/* Actions */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="flex flex-wrap items-center gap-3 md:gap-4 pt-2 md:pt-4"
            >
              <Link href={href}>
                <button className="flex items-center justify-center gap-2 md:gap-3 px-6 md:px-8 py-3 md:py-4 bg-gradient-to-br from-brand-primary to-brand-secondary text-obsidian font-bold rounded-xl md:rounded-2xl text-sm md:text-lg hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all hover:scale-105 active:scale-95">
                  <Play className="w-4 h-4 md:w-6 md:h-6 fill-obsidian" />
                  Watch Now
                </button>
              </Link>
              <Link href={href}>
                <button className="flex items-center gap-2 md:gap-3 px-6 md:px-8 py-3 md:py-4 bg-white/5 backdrop-blur-3xl text-white font-bold rounded-xl md:rounded-2xl text-sm md:text-lg hover:bg-white/10 transition-all border border-white/10 hover:border-brand-primary/50">
                  <Info className="w-4 h-4 md:w-6 md:h-6" />
                  <span className="hidden sm:inline">More Info</span>
                </button>
              </Link>
              <button
                onClick={toggleWatchlist}
                className={`w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center shrink-0 transition-all border ${inWatchlist ? 'bg-brand-primary text-obsidian border-transparent shadow-[0_0_20px_rgba(212,175,55,0.3)]' : 'bg-white/5 backdrop-blur-3xl text-white border-white/10 hover:bg-white/10 hover:border-brand-primary/50'}`}
              >
                {inWatchlist ? <Check className="w-5 h-5 md:w-7 md:h-7" /> : <Plus className="w-5 h-5 md:w-7 md:h-7" />}
              </button>
            </motion.div>
          </div>

          {/* Minimal Progress Indicator */}
          {movies.length > 1 && (
            <div className="flex gap-2 mt-8 md:mt-12">
              {movies.slice(0, 5).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className="relative h-1.5 rounded-full overflow-hidden transition-all duration-700"
                  style={{ width: i === currentIndex ? '3rem' : '1rem' }}
                >
                  <div className="absolute inset-0 bg-white/20 rounded-full" />
                  {i === currentIndex && (
                    <div className="absolute inset-0 bg-brand-primary rounded-full animate-[grow_10s_linear] shadow-[0_0_10px_rgba(212,175,55,0.8)]"
                      style={{ transformOrigin: 'left', animation: 'grow 10s linear' }}
                    />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
