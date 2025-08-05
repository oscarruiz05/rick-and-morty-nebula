"use client";

import { EpisodeCard } from "@/components/episode/EpisodeCard";
import { ErrorMessage } from "@/components/ErrorMessage";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { getEpisodes } from "@/services/episodes";
import { Loader2 } from "lucide-react";

export default function EpisodesPage() {
  const {
    data: episodes,
    loading,
    error,
    hasNextPage,
    ref,
    reset,
  } = useInfiniteScroll({
    fetchFunction: getEpisodes,
  });

  if (error && episodes.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <ErrorMessage message={error} onRetry={reset} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Grid de episodios */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {episodes.map((episode) => (
          <EpisodeCard key={episode.id} episode={episode} />
        ))}
      </div>

      {/* Loading skeleton para carga inicial */}
      {loading && episodes.length === 0 && (
        <LoadingSkeleton type="episode" count={8} />
      )}

      {/* Elemento para detectar cuando cargar más */}
      {hasNextPage && (
        <div ref={ref} className="flex justify-center py-8">
          {loading && episodes.length > 0 && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Cargando más episodios...</span>
            </div>
          )}
        </div>
      )}

      {/* Mensaje cuando no hay más datos */}
      {!hasNextPage && episodes.length > 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <p>¡Has visto todos los episodios!</p>
        </div>
      )}

      {/* Error durante la carga de más datos */}
      {error && episodes.length > 0 && (
        <div className="flex justify-center py-4">
          <ErrorMessage message={error} onRetry={reset} />
        </div>
      )}
    </div>
  );
}
