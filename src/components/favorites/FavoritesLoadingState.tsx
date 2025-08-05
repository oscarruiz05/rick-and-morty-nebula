import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoadingSkeleton } from "../LoadingSkeleton";

export function FavoritesLoadingState() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Mis Favoritos</h2>
        <p className="text-gray-600">Cargando tus elementos favoritos...</p>
      </div>
      <Tabs defaultValue="characters" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="characters">Personajes</TabsTrigger>
          <TabsTrigger value="locations">Ubicaciones</TabsTrigger>
          <TabsTrigger value="episodes">Episodios</TabsTrigger>
        </TabsList>
        <TabsContent value="characters">
          <LoadingSkeleton type="character" count={6} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
