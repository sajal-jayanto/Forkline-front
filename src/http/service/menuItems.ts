import { http } from '../client';

export type MenuItem = {
  id: number;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  masterPrice: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export async function getMenuItems(): Promise<MenuItem[]> {
  const { data } = await http.get<MenuItem[]>('/menu-item');
  return data;
}

export type CreateMenuItemInput = {
  name: string;
  masterPrice: number;
  description?: string;
  imageUrl?: string;
};

export async function createMenuItem(input: CreateMenuItemInput): Promise<MenuItem> {
  const { data } = await http.post<MenuItem>('/menu-item/create', input);
  return data;
}
