export interface IProduct {
  id: string;
  name: string;
  description: string;
  price: string;
  stock?: number;
  imageUrl: string;
  seller: string;
  categoryId: string;
  currency: string;
  quantity: number;
  user: {
    id: string | null;
    email:string | null;
    name: string | null;
    bank: string | null;
    account: string | null;
    cardHolder: string | null;
    alias: string | null;
    cbu: string | null;
    phone:string | null;
  }
}

export interface ICreateProduct {
    name: string;
    description: string;
    price: number | null; 
    stock: number | null;
    imageUrl: string;
    categoryId: string;
    userId:string;
  }

export interface ICategory {
  id?:string;
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