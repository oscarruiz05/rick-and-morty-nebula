"use client";

import { CharacterCard } from "@/components/character/CharacterCard";
import { ErrorMessage } from "@/components/ErrorMessage";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import { useEntityNavigation } from "@/hooks/useEntityNavigation";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { getCharacters } from "@/services/characters";
import { Character } from "@/types/api";
import { Loader2 } from "lucide-react";

export default function CharactersPage() {
  const {
    data: characters,
    loading,
    error,
    hasNextPage,
    ref,
    reset,
  } = useInfiniteScroll({
    fetchFunction: getCharacters,
  });

  const { navigateToEntity } = useEntityNavigation({ entityType: 'characters' });

  const handleCharacterClick = (character: Character) => {
    navigateToEntity(character);
  };

  return (
    <div className="space-y-6">
      {/* Grid de personajes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {characters.map((character) => (
          <CharacterCard
            key={character.id}
            character={character}
            onClick={() => handleCharacterClick(character)}
          />
        ))}
      </div>

      {/* Loading skeleton para carga inicial */}
      {loading && characters.length === 0 && (
        <LoadingSkeleton type="character" count={8} />
      )}

      {/* Elemento para detectar cuando cargar más */}
      {hasNextPage && (
        <div ref={ref} className="flex justify-center py-8">
          {loading && characters.length > 0 && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Cargando más personajes...</span>
            </div>
          )}
        </div>
      )}

      {/* Mensaje cuando no hay más datos */}
      {!hasNextPage && characters.length > 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <p>¡Has visto todos los personajes!</p>
        </div>
      )}

      {/* Error durante la carga de más datos */}
      {error && characters.length > 0 && (
        <div className="flex justify-center py-4">
          <ErrorMessage message={error} onRetry={reset} />
        </div>
      )}
    </div>
  );
}
