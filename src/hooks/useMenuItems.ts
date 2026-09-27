import { useCallback } from 'react';
import { getMenuItems } from '../http/service/menuItems';
import { useFetch } from './useFetch';

export const useMenuItems = (outletId?: number) => {
  const fetchMenuItems = useCallback(() => getMenuItems(outletId), [outletId]);
  const { data, loading, error, reload } = useFetch(fetchMenuItems);
  return { items: data ?? [], loading, error, reload };
}
