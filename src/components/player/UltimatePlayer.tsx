'use client';

import MultiServerIframe from './MultiServerIframe';
import { SeasonInfo } from '@/types';

interface UltimatePlayerProps {
  movieId: string;
  imdbId?: string;
  type?: "movie" | "tv";
  title?: string;
  seasons?: SeasonInfo[];
  releaseDate?: string;
}

export default function UltimatePlayer({ movieId, imdbId, type = "movie", title = "", seasons, releaseDate }: UltimatePlayerProps) {
  return (
    <MultiServerIframe 
      movieId={movieId} 
      imdbId={imdbId} 
      type={type} 
      title={title}
      seasons={seasons}
      releaseDate={releaseDate}
    />
  );
}
