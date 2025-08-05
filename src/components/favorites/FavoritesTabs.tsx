import { Character, Location, Episode } from "@/types/api";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Users, MapPin, Play } from "lucide-react";
import { CharacterCard } from "../character/CharacterCard";
import { LocationCard } from "../location/LocationCard";
import { EpisodeCard } from "../episode/EpisodeCard";

interface FavoritesData {
  characters: Character[];
  locations: Location[];
  episodes: Episode[];
}

interface FavoritesTabsProps {
  favorites: FavoritesData;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onFavoriteChange: () => void;
}

export function FavoritesTabs({
  favorites,
  activeTab,
  onTabChange,
  onFavoriteChange,
}: FavoritesTabsProps) {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="characters" className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          Personajes
          {favorites.characters.length > 0 && (
            <Badge variant="secondary" className="ml-1">
              {favorites.characters.length}
            </Badge>
          )}
        </TabsTrigger>
        <TabsTrigger value="locations" className="flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          Ubicaciones
          {favorites.locations.length > 0 && (
            <Badge variant="secondary" className="ml-1">
              {favorites.locations.length}
            </Badge>
          )}
        </TabsTrigger>
        <TabsTrigger value="episodes" className="flex items-center gap-2">
          <Play className="h-4 w-4" />
          Episodios
          {favorites.episodes.length > 0 && (
            <Badge variant="secondary" className="ml-1">
              {favorites.episodes.length}
            </Badge>
          )}
        </TabsTrigger>
      </TabsList>

      <TabsContent value="characters" className="mt-6">
        {favorites.characters.length === 0 ? (
          <EmptyTabContent
            icon={Users}
            message="No tienes personajes favoritos"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favorites.characters.map((character) => (
              <CharacterCard
                key={character.id}
                character={character}
                onFavoriteChange={onFavoriteChange}
              />
            ))}
          </div>
        )}
      </TabsContent>

      <TabsContent value="locations" className="mt-6">
        {favorites.locations.length === 0 ? (
          <EmptyTabContent
            icon={MapPin}
            message="No tienes ubicaciones favoritas"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.locations.map((location) => (
              <LocationCard
                key={location.id}
                location={location}
                onFavoriteChange={onFavoriteChange}
              />
            ))}
          </div>
        )}
      </TabsContent>

      <TabsContent value="episodes" className="mt-6">
        {favorites.episodes.length === 0 ? (
          <EmptyTabContent
            icon={Play}
            message="No tienes episodios favoritos"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.episodes.map((episode) => (
              <EpisodeCard
                key={episode.id}
                episode={episode}
                onFavoriteChange={onFavoriteChange}
              />
            ))}
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}

/**
 * Componente para mostrar el estado vacío de una pestaña específica
 */
function EmptyTabContent({
  icon: Icon,
  message,
}: {
  icon: React.ComponentType<{ className?: string }>;
  message: string;
}) {
  return (
    <div className="text-center py-8">
      <Icon className="h-12 w-12 text-gray-300 mx-auto mb-3" />
      <p className="text-gray-500">{message}</p>
    </div>
  );
}
