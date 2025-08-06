"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
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
      className="group cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl bg-white border border-gray-200/50 shadow-lg overflow-hidden p-0 hover:border-gray-300/50"
      onClick={() => onClick?.(character)}
    >
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={character.image}
          alt={character.name}
          width={300}
          height={300}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          priority={false}
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 h-8 w-8 bg-white/90 hover:bg-white shadow-md backdrop-blur-sm transition-all duration-200"
          onClick={handleFavoriteClick}
          aria-label={
            isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"
          }
        >
          <Heart
            className={`h-4 w-4 transition-all duration-200 ${
              isFavorite ? "fill-red-500 text-red-500 scale-110" : "text-gray-600 hover:text-red-400"
            }`}
          />
        </Button>
        
        <div className="absolute bottom-3 left-3">
          <Badge 
            className={`${getStatusColor(character.status)} text-white border-0 shadow-lg backdrop-blur-sm`}
          >
            <div className={`w-2 h-2 rounded-full mr-2 ${
              character.status === 'Alive' ? 'bg-green-300' : 
              character.status === 'Dead' ? 'bg-red-300' : 'bg-gray-300'
            }`} />
            {getStatusText(character.status)}
          </Badge>
        </div>
      </div>

      <CardContent className="p-4 pt-0 space-y-2">
        {/* Nombre del personaje */}
        <div>
          <h3 className="font-bold text-lg text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
            {character.name}
          </h3>
        </div>
        
        {/* Información del personaje */}
        <div className="space-y-2">
          {/* Especie y tipo */}
          <div className="flex items-center gap-2 text-sm">
            <User className="h-4 w-4 text-blue-500 flex-shrink-0" />
            <span className="font-medium text-gray-700">{character.species}</span>
            {character.type && (
              <Badge variant="secondary" className="text-xs px-2 py-0.5 bg-blue-50 text-blue-700 border-blue-200">
                {character.type}
              </Badge>
            )}
          </div>
          
          {/* Género */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <div className="w-4 h-4 flex items-center justify-center">
              <div className={`w-2 h-2 rounded-full ${
                character.gender === 'Male' ? 'bg-blue-400' :
                character.gender === 'Female' ? 'bg-pink-400' : 'bg-gray-400'
              }`} />
            </div>
            <span>{character.gender}</span>
          </div>
          
          {/* Ubicación actual */}
          <div className="flex items-start gap-2 text-sm">
            <MapPin className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <span className="text-gray-600 block line-clamp-2 leading-tight">
                {character.location.name}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
