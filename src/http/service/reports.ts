import { http } from '../client';

export type OutletRevenue = {
  outletId: number;
  outletName: string;
  totalSales: number;
  totalRevenue: string;
};

export type RevenueByOutletReport = {
  from: string | null;
  to: string | null;
  totalRevenue: string;
  sales: OutletRevenue[];
};

export type RevenueByOutletQuery = {
  from?: string;
  to?: string;
};

export async function getRevenueByOutlet(
  query: RevenueByOutletQuery = {},
): Promise<RevenueByOutletReport> {
  const { data } = await http.get<RevenueByOutletReport>('/report/revenue-by-outlet', {
    params: query,
  });
  return data;
}
