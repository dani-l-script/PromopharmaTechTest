import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavoritesState {
  favorites: string[];
  addFavorite: (code: string) => void;
  removeFavorite: (code: string) => void;
  toggleFavorite: (code: string) => void;
  isFavorite: (code: string) => boolean;
}

const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (code: string) =>
        set({ favorites: [...get().favorites, code] }),
      removeFavorite: (code: string) =>
        set({ favorites: get().favorites.filter((fav) => fav !== code) }),
      toggleFavorite: (code: string) =>
        set({
          favorites: get().favorites.includes(code)
            ? get().favorites.filter((fav) => fav !== code)
            : [...get().favorites, code],
        }),
      isFavorite: (code: string) => get().favorites.includes(code),
    }),
    {
      name: "favorites-storage",
    }
  )
);

export default useFavoritesStore;
