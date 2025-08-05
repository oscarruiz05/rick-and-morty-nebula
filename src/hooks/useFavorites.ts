import { useState, useEffect } from "react";
import { Character, Episode, Location } from "@/types/api";
import { getFavorites } from "@/services/favorites";
import { getMultipleCharacters } from "@/services/characters";
import { getMultipleEpisodes } from "@/services/episodes";
import { getMultipleLocations } from "@/services/locations";

interface UseFavoritesResult {
  favoriteCharacters: Character[];
  favoriteEpisodes: Episode[];
  favoriteLocations: Location[];
  loading: boolean;
  error: string | null;
  refreshFavorites: () => void;
}

export function useFavorites(): UseFavoritesResult {
  const [favoriteCharacters, setFavoriteCharacters] = useState<Character[]>([]);
  const [favoriteEpisodes, setFavoriteEpisodes] = useState<Episode[]>([]);
  const [favoriteLocations, setFavoriteLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadFavorites = async () => {
    try {
      setLoading(true);
      setError(null);

      const favorites = getFavorites();

      // Cargar personajes favoritos
      const characters = favorites.characters.length > 0 
        ? await getMultipleCharacters(favorites.characters)
        : [];

      // Cargar episodios favoritos
      const episodes = favorites.episodes.length > 0
        ? await getMultipleEpisodes(favorites.episodes)
        : [];

      // Cargar ubicaciones favoritas
      const locations = favorites.locations.length > 0
        ? await getMultipleLocations(favorites.locations)
        : [];

      setFavoriteCharacters(characters);
      setFavoriteEpisodes(episodes);
      setFavoriteLocations(locations);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar favoritos");
      console.error("Error loading favorites:", err);
    } finally {
      setLoading(false);
    }
  };

  const refreshFavorites = () => {
    loadFavorites();
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  return {
    favoriteCharacters,
    favoriteEpisodes,
    favoriteLocations,
    loading,
    error,
    refreshFavorites,
  };
}
