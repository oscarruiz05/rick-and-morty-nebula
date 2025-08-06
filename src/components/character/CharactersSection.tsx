"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { getStatusColor, getStatusText } from "@/utils/status";
import { Character } from "@/types/api";
import { Users } from "lucide-react";

interface CharactersSectionProps {
  characters: Character[];
  loading: boolean;
  error: string | null;
}

export function CharactersSection({
  characters,
  loading,
}: CharactersSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Personajes ({characters.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: 8 }, (_, i) => (
              <Skeleton key={i} className="h-32 w-full" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-h-96 overflow-y-auto">
            {characters.map((character) => (
              <div
                key={character.id}
                className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Image
                    src={character.image}
                    alt={character.name}
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm truncate">
                      {character.name}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge
                        className={`${getStatusColor(
                          character.status
                        )} text-white text-xs`}
                      >
                        {getStatusText(character.status)}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 truncate">
                      {character.species}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            {characters.length === 0 && (
              <div className="col-span-full">
                <p className="text-muted-foreground text-center py-8">
                  No se encontraron personajes
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
