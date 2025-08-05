"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, MapPin, User } from "lucide-react";
import { Character } from "@/types/api";
import {
  isCharacterFavorite,
  toggleCharacterFavorite,
} from "@/services/favorites";
import { getStatusColor, getStatusText } from "@/utils/status";

interface CharacterCardProps {
  character: Character;
  onClick?: (character: Character) => void;
  onFavoriteChange?: () => void;
}

export function CharacterCard({
  character,
  onClick,
  onFavoriteChange,
}: CharacterCardProps) {
  const [isFavorite, setIsFavorite] = useState(() =>
    isCharacterFavorite(character.id)
  );

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newFavoriteState = toggleCharacterFavorite(character.id);
    setIsFavorite(newFavoriteState);
    onFavoriteChange?.();
  };

  return (
    <Card
      className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg"
      onClick={() => onClick?.(character)}
    >
      <CardHeader className="p-0">
        <div className="relative">
          <Image
            src={character.image}
            alt={character.name}
            width={300}
            height={300}
            className="w-full h-64 object-cover rounded-t-lg"
            priority={false}
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-white/80 hover:bg-white transition-colors"
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
          <div className="absolute bottom-2 left-2">
            <Badge className={`${getStatusColor(character.status)} text-white`}>
              <div className="w-2 h-2 rounded-full bg-white mr-1" />
              {getStatusText(character.status)}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-lg font-bold mb-2 line-clamp-1">
          {character.name}
        </CardTitle>
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>{character.species}</span>
            {character.type && (
              <Badge variant="outline" className="text-xs">
                {character.type}
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span className="line-clamp-1">{character.location.name}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
