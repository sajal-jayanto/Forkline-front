import { http } from '../client';

export interface SaleItemInput {
  menuItemId: number;
  quantity: number;
}

export interface CreateSaleInput {
  outletId: number;
  items: SaleItemInput[];
}

export interface Sale {
  id: number;
  outletId: number;
  receiptNumber: number;
  taxAmount: string;
  totalAmount: string;
  createdAt: string;
}

export async function createSale(payload: CreateSaleInput): Promise<Sale> {
  const { data } = await http.post<Sale>('/sale/new', payload);
  return data;
}
