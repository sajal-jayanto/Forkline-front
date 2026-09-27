import { useCallback } from 'react';
import { getTopItemsByOutlet } from '../http/service/reports';
import { useFetch } from './useFetch';

export function useTopItems(outletId: number) {
  // Memoised so useFetch only refetches when outletId changes.
  const fetchTopItems = useCallback(() => getTopItemsByOutlet(outletId), [outletId]);
  const { data, loading, error } = useFetch(fetchTopItems);
  return { report: data, loading, error };
}
