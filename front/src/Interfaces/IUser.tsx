import { ICartItem, IProduct } from "./IProduct";

export interface IUserRegister {
    name: string;
    email:string;
    password:string;
    birthdate:string;
    phone: string;
    address:string;
    country: string;
    city: string;
}



export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string; 
  birthdate: Date;
  phone: string;
  address: string;
  city: string;
  country: string;
  role: 'admin' | 'seller' | 'client'; 
  isActive: boolean;
}


export enum UserRole {
    ADMIN = 'admin',
    SELLER = 'seller',
    CLIENT = 'client',
  }

  export interface ILoginUser {
    email:string;
    password:string;
  }

  export interface ILoginClientProps {
    setToken: (token: string | null) => void;
  }

  export interface INotificationProps {
    message: string;
  }
  
  export interface ILoginResponse {
    access_token: string;
    user: IUser;  
  }

  export interface IUserResponse {
    access_token: string;
    user: {
      id: string;
      name: string;
      email: string;
      birthdate: Date;
      phone: string;
      address: string;
      city: string;
      country: string;
      role: string;
      isActive: boolean;
    };
  }
  
  export interface IUserContextType {
    user: IUserResponse['user'] | null; // Solo datos del usuario
    setUser: React.Dispatch<React.SetStateAction<IUserResponse['user'] | null>>;
    isActive: boolean;
    isAdmin: boolean;
    setIsAdmin: (isAdmin: boolean) => void;
    setIsActive: (isLogged: boolean) => void;
    signIn: (credentials: ILoginUser) => Promise<boolean>; 
    signUp: (user: IUserRegister) => Promise<boolean>;
    logOut: () => void;
    token: string | null; 
    setToken: React.Dispatch<React.SetStateAction<string | null>>;
  }
  