
import { IProduct } from "./IProduct";
import { IUser } from "./IUser";

  export interface IOrderDetails {
    id: string;
    price: string;
    quantity: number;
    products: IProduct[]; 
  }
  
 export interface IOrder {
    id: string;
    date: string;
    user: IUser;
    seller: {
      id:string;
    }
    orderDetails: IOrderDetails;
  }
 

  export interface ICreateOrder {
    userId: string;
    products: {
      id: string;
      quantity: number;
    
    }[];
  }
  
  