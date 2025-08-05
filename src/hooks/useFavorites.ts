"use client";

import { useState, useEffect, useCallback } from "react";
import { Character, Location, Episode } from "@/types/api";
import { getFavorites } from "@/services/favorites";
import { getMultipleCharacters } from "@/services/characters";
import { getMultipleLocations } from "@/services/locations";
import { getMultipleEpisodes } from "@/services/episodes";

interface FavoritesData {
  characters: Character[];
  locations: Location[];
  episodes: Episode[];
}

interface UseFavoritesReturn {
  favorites: FavoritesData;
  loading: boolean;
  error: string | null;
  totalFavorites: number;
  loadFavorites: () => Promise<void>;
  handleFavoriteChange: () => void;
}

/**
 * Hook personalizado para manejar la lógica de favoritos
 * Gestiona la carga, estado y actualización de elementos favoritos
 */
export function useFavorites(): UseFavoritesReturn {
  const [favorites, setFavorites] = useState<FavoritesData>({
    characters: [],
    locations: [],
    episodes: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadFavorites = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const favoriteIds = getFavorites();

      // Cargar datos solo si hay favoritos para optimizar rendimiento
      const [characters, locations, episodes] = await Promise.all([
        favoriteIds.characters.length > 0
          ? getMultipleCharacters(favoriteIds.characters)
          : [],
        favoriteIds.locations.length > 0
          ? getMultipleLocations(favoriteIds.locations)
          : [],
        favoriteIds.episodes.length > 0
          ? getMultipleEpisodes(favoriteIds.episodes)
          : [],
      ]);

      setFavorites({ characters, locations, episodes });
    } catch (err) {
      setError("Error al cargar los favoritos");
      console.error("Error loading favorites:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleFavoriteChange = useCallback(() => {
    loadFavorites();
  }, [loadFavorites]);

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  const totalFavorites =
    favorites.characters.length +
    favorites.locations.length +
    favorites.episodes.length;

  return {
    favorites,
    loading,
    error,
    totalFavorites,
    loadFavorites,
    handleFavoriteChange,
  };
}
