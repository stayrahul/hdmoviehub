export interface Movie {
  id: number;
  title?: string;
  original_title?: string;
  name?: string;
  first_air_date?: string;
  media_type?: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date?: string;
  vote_average: number;
  genre_ids: number[];
  adult: boolean;
}

export interface MovieDetails extends Movie {
  runtime: number;
  genres: { id: number; name: string }[];
  tagline: string;
  status: string;
  external_ids?: {
    imdb_id?: string;
  };
  credits: {
    cast: CastMember[];
    crew: CrewMember[];
  };
  recommendations?: TMDBResponse<Movie>;
  similar?: TMDBResponse<Movie>;
  videos?: {
    results: VideoResult[];
  };
  number_of_seasons?: number;
  seasons?: SeasonInfo[];
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface CrewMember {
  id: number;
  name: string;
  job: string;
  department: string;
}

export interface VideoResult {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
}

export interface SeasonInfo {
  id: number;
  name: string;
  season_number: number;
  episode_count: number;
  poster_path: string | null;
}

export interface TMDBResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}
