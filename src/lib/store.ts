import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Movie } from '@/types';

interface WatchlistState {
  watchlist: Movie[];
  addToWatchlist: (movie: Movie) => void;
  removeFromWatchlist: (id: number) => void;
  isInWatchlist: (id: number) => boolean;
}

export const useWatchlistStore = create<WatchlistState>()(
  persist(
    (set, get) => ({
      watchlist: [],
      addToWatchlist: (movie) =>
        set((state) => {
          if (state.watchlist.find((m) => m.id === movie.id)) return state;
          return { watchlist: [...state.watchlist, movie] };
        }),
      removeFromWatchlist: (id) =>
        set((state) => ({
          watchlist: state.watchlist.filter((m) => m.id !== id),
        })),
      isInWatchlist: (id) => get().watchlist.some((m) => m.id === id),
    }),
    {
      name: 'aurastream-watchlist',
    }
  )
);
