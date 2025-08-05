"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Calendar, Tv, Users } from "lucide-react";
import { Episode } from "@/types/api";
import { isEpisodeFavorite, toggleEpisodeFavorite } from "@/services/favorites";

interface EpisodeCardProps {
  episode: Episode;
  onClick?: (episode: Episode) => void;
  onFavoriteChange?: () => void;
}

export function EpisodeCard({
  episode,
  onClick,
  onFavoriteChange,
}: EpisodeCardProps) {
  const [isFavorite, setIsFavorite] = useState(() =>
    isEpisodeFavorite(episode.id)
  );

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newFavoriteState = toggleEpisodeFavorite(episode.id);
    setIsFavorite(newFavoriteState);
    onFavoriteChange?.();
  };

  const getSeasonAndEpisode = (episodeCode: string) => {
    const match = episodeCode.match(/S(\d+)E(\d+)/);
    if (match) {
      return {
        season: parseInt(match[1], 10),
        episode: parseInt(match[2], 10),
      };
    }
    return null;
  };

  const seasonEpisode = getSeasonAndEpisode(episode.episode);

  return (
    <Card
      className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg h-full"
      onClick={() => onClick?.(episode)}
    >
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex-1 mr-2">
            <CardTitle className="text-lg font-bold line-clamp-2 mb-1">
              {episode.name}
            </CardTitle>
            <Badge variant="outline" className="text-xs">
              <Tv className="h-3 w-3 mr-1" />
              {episode.episode}
            </Badge>
          </div>
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
          {seasonEpisode && (
            <div className="flex gap-2">
              <Badge className="bg-blue-500 text-white">
                Temporada {seasonEpisode.season}
              </Badge>
              <Badge variant="secondary">
                Episodio {seasonEpisode.episode}
              </Badge>
            </div>
          )}

          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-orange-500" />
            <span className="text-sm font-medium">Fecha de emisión:</span>
            <span className="text-sm text-muted-foreground">
              {episode.air_date}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-green-500" />
            <span className="text-sm font-medium">Personajes:</span>
            <Badge variant="secondary">{episode.characters.length}</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
