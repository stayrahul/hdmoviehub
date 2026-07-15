"use client";

import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { motion } from "framer-motion";
import { searchMulti } from "@/lib/tmdb";
import { Movie } from "@/types";
import MovieCard from "../ui/MovieCard";

export default function GlobalSearch({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Movie[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query.length > 2) {
        searchMulti(query).then(setResults);
      } else {
        setResults([]);
      }
    }, 400);
    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-obsidian/95 backdrop-blur-xl flex flex-col pt-20 px-4 md:px-12 overflow-y-auto"
    >
      <div className="w-full max-w-4xl mx-auto">
        <div className="relative flex items-center">
          <Search className="absolute left-5 w-6 h-6 text-brand-primary" />
          <input
            type="text"
            placeholder="Search movies & series..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl py-4 pl-14 pr-14 text-xl md:text-2xl font-light text-white outline-none focus:border-brand-primary/40 focus:shadow-[0_0_30px_rgba(129,140,248,0.1)] transition-all placeholder:text-white/15"
            autoFocus
          />
          <button 
            onClick={onClose}
            className="absolute right-4 p-2 rounded-full hover:bg-white/10 transition text-silver hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {results.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8"
          >
            <p className="text-silver/50 text-xs font-medium mb-4 uppercase tracking-wider">
              {results.length} result{results.length !== 1 ? 's' : ''}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {results.slice(0, 15).map((movie) => (
                <div key={movie.id} onClick={onClose}>
                  <MovieCard movie={movie} />
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {query.length > 2 && results.length === 0 && (
          <div className="mt-16 text-center">
            <p className="text-white/20 text-lg">No results for &ldquo;{query}&rdquo;</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
