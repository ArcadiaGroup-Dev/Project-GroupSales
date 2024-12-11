export interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  stock?: number;
  imageUrl: string;
  seller: string;
  categoryId: string;
  currency: string;
  quantity: number;
}

export interface ICategory {
  name: string;
  description?: string;
}

export interface ICartItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  currency_id: string;
}