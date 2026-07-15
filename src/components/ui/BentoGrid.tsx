"use client";

import { useRef } from "react";
import { Movie } from "@/types";
import MovieCard from "./MovieCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

interface BentoGridProps {
  title: string;
  movies: Movie[];
  ranked?: boolean;
}

export default function BentoGrid({ title, movies, ranked = false }: BentoGridProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth * 0.75 : scrollLeft + clientWidth * 0.75;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  if (!movies || movies.length === 0) return null;

  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-12 py-6 sm:py-8">
      {/* Section Title */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-4 mb-6 sm:mb-8"
      >
        <div className="w-1.5 h-6 sm:h-8 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.4)]" />
        <h2 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-white/90 drop-shadow-lg">
          {title}
        </h2>
      </motion.div>
      
      <div className="relative group/row">
        {/* Desktop scroll buttons */}
        <button 
          onClick={() => scroll('left')}
          className="hidden md:flex absolute -left-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 items-center justify-center rounded-full bg-white/5 text-white border border-white/10 opacity-0 group-hover/row:opacity-100 transition-all duration-300 hover:bg-white/20 hover:scale-110 backdrop-blur-xl shadow-2xl"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button 
          onClick={() => scroll('right')}
          className="hidden md:flex absolute -right-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 items-center justify-center rounded-full bg-white/5 text-white border border-white/10 opacity-0 group-hover/row:opacity-100 transition-all duration-300 hover:bg-white/20 hover:scale-110 backdrop-blur-xl shadow-2xl"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Carousel */}
        <div 
          ref={scrollRef}
          className="flex gap-4 sm:gap-6 md:gap-8 overflow-x-auto hide-scroll snap-x snap-mandatory py-4 px-2"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {movies.map((movie, idx) => (
            <motion.div 
              key={movie.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: Math.min(idx * 0.05, 0.4) }}
              className={`snap-start shrink-0 ${ranked ? 'w-[140px] sm:w-[160px] md:w-[200px]' : 'w-[120px] sm:w-[140px] md:w-[180px]'}`}
            >
              <MovieCard movie={movie} rank={ranked ? idx + 1 : undefined} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
