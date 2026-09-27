import { getOutlets } from '../http/service/outlets';
import { useFetch } from './useFetch';

export const useOutlets = () => {
  const { data, loading, error, reload } = useFetch(getOutlets);
  return { outlets: data ?? [], loading, error, reload };
}
