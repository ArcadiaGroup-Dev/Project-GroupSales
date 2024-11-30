export interface IUser {
    id:string;
    name: string;
    email:string;
    password:string;
    birthdate: Date;
    phone: number;
    address:string;
    city: string;
    country: string;
}

export enum UserRole {
    ADMIN = 'admin',
    SELLER = 'seller',
    CLIENT = 'client',
  }