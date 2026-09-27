import { http } from '../client';

export interface MenuItem {
  id: number;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  masterPrice: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  outletMenuItems?: OutletMenuItem[];
}

export async function getMenuItems(outletId?: number): Promise<MenuItem[]> {
  const { data } = await http.get<MenuItem[]>('/menu-item', { params: { outletId } });
  return data;
}

export interface CreateMenuItemInput {
  name: string;
  masterPrice: number;
  description?: string;
  imageUrl?: string;
}

export async function createMenuItem(payload: CreateMenuItemInput): Promise<MenuItem> {
  const { data } = await http.post<MenuItem>('/menu-item/create', payload);
  return data;
}

export interface AssignOutletInput {
  outletId: number;
  menuItemId: number;
  priceOverride: number;
  availableUnit: number;
}

export interface OutletMenuItem {
  id: number;
  outletId: number;
  menuItemId: number;
  priceOverride: string | number | null;
  availableUnit: number;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
}

export async function assignOutlet(payload: AssignOutletInput): Promise<OutletMenuItem> {
  const { data } = await http.post<OutletMenuItem>('/menu-item/assign-outlet', payload);
  return data;
}
