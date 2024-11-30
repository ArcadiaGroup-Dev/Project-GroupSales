export interface IProduct {
    id: string;
    name: string;
    description: string;
    price: number;
    stock?: number;
    imageUrl: string;
    seller:string;
    categoryId: string;
  }

  export interface ICategory {
    name: string;
    description?: string;
  }
  