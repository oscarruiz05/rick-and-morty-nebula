import { useState, useEffect } from "react";

interface UseEntityLoaderOptions<T> {
  id: string;
  fetchFunction: (id: number) => Promise<T>;
  entityName: string;
}

interface UseEntityLoaderResult<T> {
  entity: T | null;
  loading: boolean;
  error: string | null;
}

export function useEntityLoader<T>({
  id,
  fetchFunction,
  entityName,
}: UseEntityLoaderOptions<T>): UseEntityLoaderResult<T> {
  const [entity, setEntity] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEntity = async () => {
      try {
        setLoading(true);
        setError(null);
        const entityData = await fetchFunction(parseInt(id));
        setEntity(entityData);
      } catch (err) {
        setError(`Error al cargar ${entityName}`);
        console.error(`Error fetching ${entityName}:`, err);
      } finally {
        setLoading(false);
      }
    };

    if (id && !isNaN(parseInt(id))) {
      fetchEntity();
    } else {
      setError(`ID de ${entityName} inválido`);
      setLoading(false);
    }
  }, [id, fetchFunction, entityName]);

  return { entity, loading, error };
}
