export interface IUser {
    id:string;
    name: string;
    email:string;
    password:string;
    birthdate: Date;
    phone: number;
    address:string;
    country: string;
    city: string;
}

export enum UserRole {
    ADMIN = 'admin',
    SELLER = 'seller',
    CLIENT = 'client',
  }