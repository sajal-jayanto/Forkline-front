import { getMenuItems } from '../http/service/menuItems';
import { useFetch } from './useFetch';

export function useMenuItems() {
  const { data, loading, error, reload } = useFetch(getMenuItems);
  return { items: data ?? [], loading, error, reload };
}
