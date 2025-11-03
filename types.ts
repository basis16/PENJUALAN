// Fix: Defined and exported Sale and Product interfaces to resolve module and type errors.
export interface Sale {
  id: string;
  accountName: string;
  purchasePrice: number;
  sellingPrice: number;
  quantity: number;
  date: string; // ISO date string
}

export interface Product {
  id: string;
  name: string;
  purchasePrice: number;
  sellingPrice: number;
}

export type FilterPreset = 'today' | 'last7' | 'last30' | 'custom';
