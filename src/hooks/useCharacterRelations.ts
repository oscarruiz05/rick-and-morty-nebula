"use client";

import { useState, useEffect } from "react";
import { Character, Episode, Location } from "@/types/api";
import { extractIdsFromUrls } from "@/services/api";
import { getMultipleEpisodes } from "@/services/episodes";
import { getMultipleLocations } from "@/services/locations";

export function useCharacterRelations(character: Character) {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRelations = async () => {
      try {
        setLoading(true);
        setError(null);

        // Cargar episodios
        const episodeIds = extractIdsFromUrls(character.episode);
        const episodesData = await getMultipleEpisodes(episodeIds);
        setEpisodes(episodesData);

        // Cargar ubicaciones (origen y actual)
        const locationIds: number[] = [];
        if (character.origin.url) {
          const originId = extractIdsFromUrls([character.origin.url])[0];
          if (originId) locationIds.push(originId);
        }
        if (character.location.url) {
          const currentId = extractIdsFromUrls([character.location.url])[0];
          if (currentId && !locationIds.includes(currentId)) {
            locationIds.push(currentId);
          }
        }

        if (locationIds.length > 0) {
          const locationsData = await getMultipleLocations(locationIds);
          setLocations(locationsData);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Error al cargar relaciones"
        );
      } finally {
        setLoading(false);
      }
    };

    loadRelations();
  }, [character]);

  return {
    episodes,
    locations,
    loading,
    error,
  };
}
