import { useState, useEffect, useCallback } from "react";

const FAVORITES_KEY = "shopeefind_favorites";

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(FAVORITES_KEY);
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch {
        setFavorites([]);
      }
    }
  }, []);

  const saveFavorites = useCallback((newFavorites: string[]) => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
    setFavorites(newFavorites);
  }, []);

  const addFavorite = useCallback(
    (productId: string) => {
      if (!favorites.includes(productId)) {
        saveFavorites([...favorites, productId]);
      }
    },
    [favorites, saveFavorites]
  );

  const removeFavorite = useCallback(
    (productId: string) => {
      saveFavorites(favorites.filter((id) => id !== productId));
    },
    [favorites, saveFavorites]
  );

  const toggleFavorite = useCallback(
    (productId: string) => {
      if (favorites.includes(productId)) {
        removeFavorite(productId);
      } else {
        addFavorite(productId);
      }
    },
    [favorites, addFavorite, removeFavorite]
  );

  const isFavorite = useCallback(
    (productId: string) => favorites.includes(productId),
    [favorites]
  );

  return {
    favorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
    count: favorites.length,
  };
}
