"use client";

import { EmptyFavoritesState } from "@/components/favorites/EmptyFavoritesState";
import { FavoritesErrorState } from "@/components/favorites/FavoritesErrorState";
import { FavoritesLoadingState } from "@/components/favorites/FavoritesLoadingState";
import { FavoritesTabs } from "@/components/favorites/FavoritesTabs";
import { useFavorites } from "@/hooks/useFavorites";
import { Heart } from "lucide-react";
import { useState } from "react";

export default function FavoritesPage() {
  const {
    favorites,
    loading,
    error,
    totalFavorites,
    loadFavorites,
    handleFavoriteChange,
  } = useFavorites();

  const [activeTab, setActiveTab] = useState("characters");

  if (loading) {
    return <FavoritesLoadingState />;
  }

  if (error) {
    return <FavoritesErrorState error={error} onRetry={loadFavorites} />;
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Heart className="h-6 w-6 text-red-500 fill-current" />
          <h2 className="text-2xl font-bold text-gray-900">Mis Favoritos</h2>
        </div>
        <p className="text-gray-600">
          {totalFavorites === 0
            ? "No tienes elementos favoritos aún. ¡Explora y agrega algunos!"
            : `Tienes ${totalFavorites} elemento${
                totalFavorites !== 1 ? "s" : ""
              } favorito${totalFavorites !== 1 ? "s" : ""}`}
        </p>
      </div>

      {totalFavorites === 0 ? (
        <EmptyFavoritesState />
      ) : (
        <FavoritesTabs
          favorites={favorites}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onFavoriteChange={handleFavoriteChange}
        />
      )}
    </div>
  );
}
