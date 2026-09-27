import { getRevenueByOutlet } from '../http/service/reports';
import { useFetch } from './useFetch';

const fetchRevenueByOutlet = () => getRevenueByOutlet();

export const useRevenueReport = () => {
  const { data, loading, error, reload } = useFetch(fetchRevenueByOutlet);
  return { report: data, loading, error, reload };
}
