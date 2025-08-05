import { ErrorMessage } from "../ErrorMessage";

interface FavoritesErrorStateProps {
  error: string;
  onRetry: () => void;
}

export function FavoritesErrorState({
  error,
  onRetry,
}: FavoritesErrorStateProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Mis Favoritos</h2>
      </div>
      <ErrorMessage message={error} onRetry={onRetry} />
    </div>
  );
}
