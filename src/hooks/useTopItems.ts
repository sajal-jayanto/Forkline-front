import { useCallback } from 'react';
import { getTopItemsByOutlet } from '../http/service/reports';
import { useFetch } from './useFetch';

export const useTopItems = (outletId: number) => {
  const fetchTopItems = useCallback(() => getTopItemsByOutlet(outletId), [outletId]);
  const { data, loading, error } = useFetch(fetchTopItems);
  return { report: data, loading, error };
}
