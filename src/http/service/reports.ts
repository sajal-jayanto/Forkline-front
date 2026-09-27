import { http } from '../client';

export interface OutletRevenue {
  outletId: number;
  outletName: string;
  totalSales: number;
  totalRevenue: string;
}

export interface RevenueByOutletReport {
  from: string | null;
  to: string | null;
  totalRevenue: string;
  sales: OutletRevenue[];
}

export interface RevenueByOutletQuery {
  from?: string;
  to?: string;
}

export async function getRevenueByOutlet(
  query: RevenueByOutletQuery = {},
): Promise<RevenueByOutletReport> {
  const { data } = await http.get<RevenueByOutletReport>('/report/revenue-by-outlet', {
    params: query,
  });
  return data;
}

export interface TopItem {
  menuItemId: number;
  menuItemName: string;
  quantitySold: number;
}

export interface TopItemsByOutletReport {
  outletId: number;
  outletName: string;
  items: TopItem[];
}

export async function getTopItemsByOutlet(outletId: number): Promise<TopItemsByOutletReport> {
  const { data } = await http.get<TopItemsByOutletReport>('/report/top-items-by-outlet', {
    params: { outletId },
  });
  return data;
}
