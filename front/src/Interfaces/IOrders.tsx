import { IUser } from "./IUser";

  export interface IOrderDetails {
    id: string;
    price: string;
    quantity: number;
  }
  
 export interface IOrder {
    id: string;
    date: string;
    user: IUser;
    orderDetails: IOrderDetails;
  }

  export interface ICreateOrder {
    userId: string;
    products: {
      id: string;
      quantity: number;
    }[];
  }
  
  