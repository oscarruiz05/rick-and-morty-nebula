"use client";

import { ErrorMessage } from "@/components/ErrorMessage";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import { LocationCard } from "@/components/location/LocationCard";
import { useEntityNavigation } from "@/hooks/useEntityNavigation";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { getLocations } from "@/services/locations";
import { Location } from "@/types/api";
import { Loader2 } from "lucide-react";

export default function LocationsPage() {
  const {
    data: locations,
    loading,
    error,
    hasNextPage,
    ref,
    reset,
  } = useInfiniteScroll({
    fetchFunction: getLocations,
  });

  const { navigateToEntity } = useEntityNavigation({ entityType: 'locations' });

  const handleLocationClick = (location: Location) => {
    navigateToEntity(location);
  };

  if (error && locations.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <ErrorMessage message={error} onRetry={reset} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Grid de ubicaciones */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {locations.map((location) => (
          <LocationCard 
            key={location.id} 
            location={location} 
            onClick={() => handleLocationClick(location)}
          />
        ))}
      </div>

      {/* Loading skeleton para carga inicial */}
      {loading && locations.length === 0 && (
        <LoadingSkeleton type="location" count={8} />
      )}

      {/* Elemento para detectar cuando cargar más */}
      {hasNextPage && (
        <div ref={ref} className="flex justify-center py-8">
          {loading && locations.length > 0 && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Cargando más ubicaciones...</span>
            </div>
          )}
        </div>
      )}

      {/* Mensaje cuando no hay más datos */}
      {!hasNextPage && locations.length > 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <p>¡Has visto todas las ubicaciones!</p>
        </div>
      )}

      {/* Error durante la carga de más datos */}
      {error && locations.length > 0 && (
        <div className="flex justify-center py-4">
          <ErrorMessage message={error} onRetry={reset} />
        </div>
      )}
    </div>
  );
}
