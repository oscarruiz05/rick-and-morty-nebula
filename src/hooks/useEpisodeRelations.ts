"use client";

import { useState, useEffect } from "react";
import { Episode, Character } from "@/types/api";
import { extractIdsFromUrls } from "@/services/api";
import { getMultipleCharacters } from "@/services/characters";

export function useEpisodeRelations(episode: Episode) {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCharacters = async () => {
      try {
        setLoading(true);
        setError(null);

        if (episode.characters.length > 0) {
          const characterIds = extractIdsFromUrls(episode.characters);
          const charactersData = await getMultipleCharacters(characterIds);
          setCharacters(charactersData);
        } else {
          setCharacters([]);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Error al cargar personajes"
        );
      } finally {
        setLoading(false);
      }
    };

    loadCharacters();
  }, [episode]);

  return {
    characters,
    loading,
    error,
  };
}
