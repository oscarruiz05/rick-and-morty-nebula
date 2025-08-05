"use client";

import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { Character } from "@/types/api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useCharacterRelations } from "@/hooks/useCharacterRelations";
import { getStatusColor, getStatusText } from "@/utils/status";
import { ErrorMessage } from "@/components/ErrorMessage";
import { LocationsSection } from "@/components/location/LocationsSection";
import { EpisodesSection } from "@/components/episode/EpisodesSection";

interface CharacterRelationsProps {
  character: Character;
  onBack: () => void;
}

export default function CharacterRelations({
  character,
  onBack,
}: CharacterRelationsProps) {
  const { episodes, locations, loading, error } =
    useCharacterRelations(character);

  if (error) {
    return (
      <div className="space-y-6">
        <Button onClick={onBack} variant="outline" className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Volver
        </Button>
        <ErrorMessage message={error} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header con botón de volver */}
      <Button onClick={onBack} variant="outline" className="gap-2">
        <ArrowLeft className="h-4 w-4" />
        Volver
      </Button>

      {/* Información del personaje */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Image
              src={character.image}
              alt={character.name}
              width={60}
              height={60}
              className="rounded-full"
            />
            <div>
              <h2 className="text-2xl font-bold">{character.name}</h2>
              <div className="flex items-center gap-2 mt-1">
                <Badge
                  className={`${getStatusColor(character.status)} text-white`}
                >
                  {getStatusText(character.status)}
                </Badge>
                <Badge variant="outline">{character.species}</Badge>
                {character.type && (
                  <Badge variant="outline">{character.type}</Badge>
                )}
              </div>
            </div>
          </CardTitle>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LocationsSection locations={locations} loading={loading} />
        <EpisodesSection episodes={episodes} loading={loading} />
      </div>
    </div>
  );
}
