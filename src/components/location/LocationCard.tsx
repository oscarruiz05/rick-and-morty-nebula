"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Globe, Users } from "lucide-react";
import { Location } from "@/types/api";
import {
  isLocationFavorite,
  toggleLocationFavorite,
} from "@/services/favorites";

interface LocationCardProps {
  location: Location;
  onClick?: (location: Location) => void;
  onFavoriteChange?: () => void;
}

export function LocationCard({
  location,
  onClick,
  onFavoriteChange,
}: LocationCardProps) {
  const [isFavorite, setIsFavorite] = useState(() =>
    isLocationFavorite(location.id)
  );

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newFavoriteState = toggleLocationFavorite(location.id);
    setIsFavorite(newFavoriteState);
    onFavoriteChange?.();
  };

  return (
    <Card
      className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg h-full"
      onClick={() => onClick?.(location)}
    >
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-bold line-clamp-2 flex-1 mr-2">
            {location.name}
          </CardTitle>
          <Button
            variant="ghost"
            size="icon"
            className="flex-shrink-0 hover:bg-gray-100 transition-colors"
            onClick={handleFavoriteClick}
            aria-label={
              isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"
            }
          >
            <Heart
              className={`h-5 w-5 transition-colors ${
                isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"
              }`}
            />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-blue-500" />
            <span className="text-sm font-medium">Tipo:</span>
            <Badge variant="outline">{location.type}</Badge>
          </div>

          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full bg-purple-500 flex-shrink-0" />
            <span className="text-sm font-medium">Dimensión:</span>
            <span className="text-sm text-muted-foreground line-clamp-1">
              {location.dimension}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-green-500" />
            <span className="text-sm font-medium">Residentes:</span>
            <Badge variant="secondary">{location.residents.length}</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
