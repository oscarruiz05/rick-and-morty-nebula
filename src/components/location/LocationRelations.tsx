"use client";

import { ArrowLeft, Globe, Users } from "lucide-react";
import { Location } from "@/types/api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useLocationRelations } from "@/hooks/useLocationRelations";
import { ErrorMessage } from "@/components/ErrorMessage";
import { CharactersSection } from "@/components/character/CharactersSection";

interface LocationRelationsProps {
  location: Location;
  onBack: () => void;
}

export default function LocationRelations({
  location,
  onBack,
}: LocationRelationsProps) {
  const { residents, loading, error } = useLocationRelations(location);

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

      {/* Información de la ubicación */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-blue-500">
              <Globe className="h-8 w-8 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold">{location.name}</h2>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                <Badge variant="outline" className="flex items-center gap-1">
                  <Globe className="h-3 w-3" />
                  {location.type}
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <div className="h-2 w-2 rounded-full bg-purple-500" />
                  {location.dimension}
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {location.residents.length} residentes
                </Badge>
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-medium text-muted-foreground">Tipo:</span>
              <p className="font-semibold">{location.type}</p>
            </div>
            <div>
              <span className="font-medium text-muted-foreground">Dimensión:</span>
              <p className="font-semibold">{location.dimension}</p>
            </div>
            <div>
              <span className="font-medium text-muted-foreground">Residentes:</span>
              <p className="font-semibold">{location.residents.length}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sección de residentes */}
      <CharactersSection 
        characters={residents} 
        loading={loading} 
        error={error}
      />
    </div>
  );
}
