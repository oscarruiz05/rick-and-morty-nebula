import { Favorites } from '@/types/api';

const FAVORITES_KEY = 'rick-morty-favorites';

// Obtener favoritos del localStorage
export function getFavorites(): Favorites {
  if (typeof window === 'undefined') {
    return { characters: [], locations: [], episodes: [] };
  }
  
  try {
    const stored = localStorage.getItem(FAVORITES_KEY);
    console.log('📖 Obteniendo favoritos del localStorage:', stored);
    if (stored) {
      const parsed = JSON.parse(stored);
      console.log('📋 Favoritos parseados:', parsed);
      return parsed;
    }
  } catch (error) {
    console.error('❌ Error al obtener favoritos:', error);
  }
  
  console.log('📝 Retornando favoritos vacíos');
  return { characters: [], locations: [], episodes: [] };
}

// Guardar favoritos en localStorage
export function saveFavorites(favorites: Favorites): void {
  if (typeof window === 'undefined') return;
  
  try {
    console.log('🔄 Guardando favoritos:', favorites);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    console.log('✅ Favoritos guardados exitosamente');
    // Verificar que se guardó correctamente
    const saved = localStorage.getItem(FAVORITES_KEY);
    console.log('🔍 Verificación - Datos guardados:', JSON.parse(saved || '{}'));
  } catch (error) {
    console.error('❌ Error al guardar favoritos:', error);
  }
}

// Agregar un personaje a favoritos
export function addCharacterToFavorites(characterId: number): void {
  const favorites = getFavorites();
  if (!favorites.characters?.includes(characterId)) {
    favorites.characters = favorites.characters || [];
    favorites.characters.push(characterId);
    saveFavorites(favorites);
  }
}

// Remover un personaje de favoritos
export function removeCharacterFromFavorites(characterId: number): void {
  const favorites = getFavorites();
  favorites.characters = (favorites.characters || []).filter(id => id !== characterId);
  saveFavorites(favorites);
}

// Verificar si un personaje está en favoritos
export function isCharacterFavorite(characterId: number): boolean {
  const favorites = getFavorites();
  return favorites.characters?.includes(characterId) || false;
}

// Agregar una ubicación a favoritos
export function addLocationToFavorites(locationId: number): void {
  const favorites = getFavorites();
  if (!favorites.locations?.includes(locationId)) {
    favorites.locations = favorites.locations || [];
    favorites.locations.push(locationId);
    saveFavorites(favorites);
  }
}

// Remover una ubicación de favoritos
export function removeLocationFromFavorites(locationId: number): void {
  const favorites = getFavorites();
  favorites.locations = (favorites.locations || []).filter(id => id !== locationId);
  saveFavorites(favorites);
}

// Verificar si una ubicación está en favoritos
export function isLocationFavorite(locationId: number): boolean {
  const favorites = getFavorites();
  return favorites.locations?.includes(locationId) || false;
}

// Agregar un episodio a favoritos
export function addEpisodeToFavorites(episodeId: number): void {
  const favorites = getFavorites();
  if (!favorites.episodes?.includes(episodeId)) {
    favorites.episodes = favorites.episodes || [];
    favorites.episodes.push(episodeId);
    saveFavorites(favorites);
  }
}

// Remover un episodio de favoritos
export function removeEpisodeFromFavorites(episodeId: number): void {
  const favorites = getFavorites();
  favorites.episodes = (favorites.episodes || []).filter(id => id !== episodeId);
  saveFavorites(favorites);
}

// Verificar si un episodio está en favoritos
export function isEpisodeFavorite(episodeId: number): boolean {
  const favorites = getFavorites();
  return favorites.episodes?.includes(episodeId) || false;
}

// Toggle favorito para personaje
export function toggleCharacterFavorite(characterId: number): boolean {
  if (isCharacterFavorite(characterId)) {
    removeCharacterFromFavorites(characterId);
    return false;
  } else {
    addCharacterToFavorites(characterId);
    return true;
  }
}

// Toggle favorito para ubicación
export function toggleLocationFavorite(locationId: number): boolean {
  if (isLocationFavorite(locationId)) {
    removeLocationFromFavorites(locationId);
    return false;
  } else {
    addLocationToFavorites(locationId);
    return true;
  }
}

// Toggle favorito para episodio
export function toggleEpisodeFavorite(episodeId: number): boolean {
  if (isEpisodeFavorite(episodeId)) {
    removeEpisodeFromFavorites(episodeId);
    return false;
  } else {
    addEpisodeToFavorites(episodeId);
    return true;
  }
}