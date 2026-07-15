import { Movie, MovieDetails, TMDBResponse } from "@/types";

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY || "mock_key_here";
const BASE_URL = "https://api.themoviedb.org/3";

export async function fetchTMDB<T>(
  endpoint: string,
  params: Record<string, string> = {}
): Promise<T> {
  const searchParams = new URLSearchParams({
    api_key: TMDB_API_KEY,
    ...params,
  });

  const response = await fetch(`${BASE_URL}${endpoint}?${searchParams.toString()}`, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch TMDB data: ${response.statusText}`);
  }

  return response.json();
}

// Indian content fetchers
export async function getBollywoodTrending(): Promise<Movie[]> {
  const data = await fetchTMDB<TMDBResponse<Movie>>("/discover/movie", {
    with_original_language: "hi",
    sort_by: "popularity.desc",
    region: "IN",
  });
  return data.results;
}

export async function getBollywoodTopRated(): Promise<Movie[]> {
  const data = await fetchTMDB<TMDBResponse<Movie>>("/discover/movie", {
    with_original_language: "hi",
    sort_by: "vote_average.desc",
    "vote_count.gte": "200",
    region: "IN",
  });
  return data.results;
}

export async function getIndianSeries(): Promise<Movie[]> {
  const data = await fetchTMDB<TMDBResponse<Movie>>("/discover/tv", {
    with_original_language: "hi",
    sort_by: "popularity.desc",
  });
  return data.results;
}

export async function getHindiActionMovies(): Promise<Movie[]> {
  const data = await fetchTMDB<TMDBResponse<Movie>>("/discover/movie", {
    with_original_language: "hi",
    with_genres: "28", // Action
    sort_by: "popularity.desc",
    region: "IN",
  });
  return data.results;
}

export async function getHindiRomanticMovies(): Promise<Movie[]> {
  const data = await fetchTMDB<TMDBResponse<Movie>>("/discover/movie", {
    with_original_language: "hi",
    with_genres: "10749", // Romance
    sort_by: "popularity.desc",
    region: "IN",
  });
  return data.results;
}

export async function getHindiThrillers(): Promise<Movie[]> {
  const data = await fetchTMDB<TMDBResponse<Movie>>("/discover/movie", {
    with_original_language: "hi",
    with_genres: "53", // Thriller
    sort_by: "popularity.desc",
    region: "IN",
  });
  return data.results;
}

export async function getTrendingIndia(): Promise<Movie[]> {
  const data = await fetchTMDB<TMDBResponse<Movie>>("/discover/movie", {
    with_original_language: "hi|te|ta",
    sort_by: "popularity.desc",
    region: "IN",
  });
  return data.results;
}

export async function getSouthIndianMovies(): Promise<Movie[]> {
  const data = await fetchTMDB<TMDBResponse<Movie>>("/discover/movie", {
    with_original_language: "te|ta|ml|kn",
    sort_by: "popularity.desc",
    region: "IN",
  });
  return data.results;
}

export async function getIndianUpcoming(): Promise<Movie[]> {
  const futureDate = new Date();
  futureDate.setMonth(futureDate.getMonth() + 1);
  const data = await fetchTMDB<TMDBResponse<Movie>>("/discover/movie", {
    with_original_language: "hi|te|ta",
    sort_by: "popularity.desc",
    "primary_release_date.gte": new Date().toISOString().split("T")[0],
    "primary_release_date.lte": futureDate.toISOString().split("T")[0],
    region: "IN",
  });
  return data.results;
}

// General fetchers
export async function getTrendingMovies(): Promise<Movie[]> {
  const data = await fetchTMDB<TMDBResponse<Movie>>("/trending/all/day");
  return data.results;
}

export async function getMoviesByCategory(category: string): Promise<Movie[]> {
  const data = await fetchTMDB<TMDBResponse<Movie>>(`/movie/${category}`, { region: "IN" });
  return data.results;
}

export async function getTrendingSeries(): Promise<Movie[]> {
  const data = await fetchTMDB<TMDBResponse<Movie>>("/trending/tv/day");
  return data.results;
}

export async function getSeriesByCategory(category: string): Promise<Movie[]> {
  const data = await fetchTMDB<TMDBResponse<Movie>>(`/tv/${category}`);
  return data.results;
}

export async function getBollywoodMovies(): Promise<Movie[]> {
  return getBollywoodTrending();
}

export async function getMovieDetails(id: string): Promise<MovieDetails> {
  return fetchTMDB<MovieDetails>(`/movie/${id}`, {
    append_to_response: "credits,external_ids,recommendations,similar,videos",
  });
}

export async function getSeriesDetails(id: string): Promise<MovieDetails> {
  return fetchTMDB<MovieDetails>(`/tv/${id}`, {
    append_to_response: "credits,external_ids,recommendations,similar,videos",
  });
}

export async function searchMulti(query: string): Promise<Movie[]> {
  if (!query) return [];
  const data = await fetchTMDB<TMDBResponse<Movie>>("/search/multi", { query });
  return data.results.filter(
    (item: Movie & { media_type?: string }) => item.media_type === "movie" || item.media_type === "tv"
  );
}

export async function searchMovies(query: string): Promise<Movie[]> {
  if (!query) return [];
  const data = await fetchTMDB<TMDBResponse<Movie>>("/search/movie", { query });
  return data.results;
}

export function getImageUrl(path: string | null, size: "w500" | "w780" | "original" = "original") {
  if (!path) return "/no-poster.svg";
  return `https://image.tmdb.org/t/p/${size}${path}`;
}
