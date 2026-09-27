import { http } from '../client';

export interface Outlet {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  location: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export async function getOutlets(): Promise<Outlet[]> {
  const { data } = await http.get<Outlet[]>('/outlet');
  return data;
}

export interface CreateOutletInput {
  name: string;
  description?: string;
  location?: string;
}

export async function createOutlet(payload: CreateOutletInput): Promise<Outlet> {
  const { data } = await http.post<Outlet>('/outlet/create', payload);
  return data;
}
