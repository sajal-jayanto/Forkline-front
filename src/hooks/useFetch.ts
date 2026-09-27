import { useCallback, useEffect, useState } from 'react';

export const useFetch = <T>(fetcher: () => Promise<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(() => {
    fetcher()
      .then((result) => {
        setData(result);
        setError(null);
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [fetcher]);

  useEffect(() => reload(), [reload]);

  return { data, loading, error, reload };
}
