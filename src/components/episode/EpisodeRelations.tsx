"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tv, Calendar, Users, ArrowLeft } from "lucide-react";
import { Episode } from "@/types/api";
import { useEpisodeRelations } from "@/hooks/useEpisodeRelations";
import { ErrorMessage } from "../ErrorMessage";
import { CharactersSection } from "../character/CharactersSection";

interface EpisodeRelationsProps {
  episode: Episode;
  onBack: () => void;
}

export function EpisodeRelations({ episode, onBack }: EpisodeRelationsProps) {
  const { characters, loading, error } = useEpisodeRelations(episode);

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

      {/* Información del episodio */}
      <Card>
        <CardHeader>
          <CardTitle>
            <h2 className="text-2xl font-bold mb-3">{episode.name}</h2>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <Tv className="h-5 w-5 text-blue-500" />
                <Badge variant="outline">{episode.episode}</Badge>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-green-500" />
                <span className="text-sm text-muted-foreground">
                  {episode.air_date}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-purple-500" />
                <span className="text-sm text-muted-foreground">
                  {episode.characters.length} personajes
                </span>
              </div>
            </div>
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Personajes */}
      <CharactersSection
        characters={characters}
        loading={loading}
        error={error}
      />
    </div>
  );
}
