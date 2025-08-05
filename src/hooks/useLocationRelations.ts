"use client";

import { useState, useEffect } from "react";
import { Location, Character } from "@/types/api";
import { extractIdsFromUrls } from "@/services/api";
import { getMultipleCharacters } from "@/services/characters";

export function useLocationRelations(location: Location) {
  const [residents, setResidents] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadResidents = async () => {
      try {
        setLoading(true);
        setError(null);

        if (location.residents.length > 0) {
          const residentIds = extractIdsFromUrls(location.residents);
          const residentsData = await getMultipleCharacters(residentIds);
          setResidents(residentsData);
        } else {
          setResidents([]);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Error al cargar residentes"
        );
      } finally {
        setLoading(false);
      }
    };

    loadResidents();
  }, [location]);

  return {
    residents,
    loading,
    error,
  };
}
