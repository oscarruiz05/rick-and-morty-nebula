import { useState, useEffect, useCallback } from "react";
import { useInView } from "react-intersection-observer";

interface UseInfiniteScrollProps<T> {
  fetchFunction: (
    page: number
  ) => Promise<{ results: T[]; info: { next: string | null } }>;
  initialPage?: number;
}

interface UseInfiniteScrollReturn<T> {
  data: T[];
  loading: boolean;
  error: string | null;
  hasNextPage: boolean;
  loadMore: () => void;
  ref: (node?: Element | null) => void;
  inView: boolean;
  reset: () => void;
}

export function useInfiniteScroll<T>({
  fetchFunction,
  initialPage = 1,
}: UseInfiniteScrollProps<T>): UseInfiniteScrollReturn<T> {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(initialPage);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "100px",
  });

  const loadMore = useCallback(async () => {
    if (loading || !hasNextPage) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetchFunction(page);

      setData((prevData) => {
        // Evitar duplicados
        const existingIds = new Set(prevData.map((item: any) => item.id));
        const newItems = response.results.filter(
          (item: any) => !existingIds.has(item.id)
        );
        return [...prevData, ...newItems];
      });

      setHasNextPage(response.info.next !== null);
      setPage((prevPage) => prevPage + 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar datos");
    } finally {
      setLoading(false);
      setInitialLoad(false);
    }
  }, [fetchFunction, page, loading, hasNextPage]);

  const reset = useCallback(() => {
    setData([]);
    setPage(initialPage);
    setHasNextPage(true);
    setError(null);
    setInitialLoad(true);
  }, [initialPage]);

  // Cargar datos iniciales
  useEffect(() => {
    if (initialLoad) {
      loadMore();
    }
  }, [loadMore, initialLoad]);

  // Cargar más datos cuando el elemento esté en vista
  useEffect(() => {
    if (inView && !initialLoad) {
      loadMore();
    }
  }, [inView, loadMore, initialLoad]);

  return {
    data,
    loading,
    error,
    hasNextPage,
    loadMore,
    ref,
    inView,
    reset,
  };
}
