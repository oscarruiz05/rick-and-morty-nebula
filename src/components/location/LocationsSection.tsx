"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin, Globe, Users } from "lucide-react";
import { Location } from "@/types/api";

interface LocationsSectionProps {
  locations: Location[];
  loading: boolean;
}

export function LocationsSection({
  locations,
  loading,
}: LocationsSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Ubicaciones
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
        ) : (
          <div className="space-y-4">
            {locations.map((location) => (
              <div key={location.id} className="p-4 border rounded-lg">
                <h4 className="font-semibold">{location.name}</h4>
                <div className="flex items-center gap-2 mt-2">
                  <Globe className="h-4 w-4 text-blue-500" />
                  <span className="text-sm text-muted-foreground">
                    {location.type}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <div className="h-3 w-3 rounded-full bg-purple-500" />
                  <span className="text-sm text-muted-foreground">
                    {location.dimension}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <Users className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-muted-foreground">
                    {location.residents.length} residentes
                  </span>
                </div>
              </div>
            ))}
            {locations.length === 0 && (
              <p className="text-muted-foreground text-center py-4">
                No se encontraron ubicaciones
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
