import { Heart } from "lucide-react";

export function EmptyFavoritesState() {
  return (
    <div className="text-center py-12">
      <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        No hay favoritos
      </h3>
      <p className="text-gray-500 mb-4">
        Comienza explorando personajes, ubicaciones y episodios.
      </p>
      <p className="text-sm text-gray-400">
        Haz clic en el ❤️ para agregar elementos a favoritos.
      </p>
    </div>
  );
}
