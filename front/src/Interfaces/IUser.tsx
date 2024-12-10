export interface IUserRegister {
    name: string;
    email:string;
    password:string;
    birthdate: Date;
    phone: string;
    address:string;
    country: string;
    city: string;
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
    message: string;
    token: string;
    role: Role;
  }

  export interface IUserResponse {
    message: string;
    token: string;
    role: Role;
  }

  export enum Role {
    Admin = "admin",
    Recep = "receptionist",
    Emplo = "employee",
  }

  export interface IUserContextType {
    user: IUserResponse | null;
    setUser: React.Dispatch<React.SetStateAction<IUserResponse | null>>;
    isLogged: boolean;
    isAdmin: boolean;
    setIsAdmin: (isAdmin: boolean) => void;
    setIsLogged: (isLogged: boolean) => void;
    signIn: (credentials: ILoginUser) => Promise<boolean>;
    signUp: (user: IUserRegister) => Promise<boolean>;
    logOut: () => void;
    token: string | null;
    setToken: React.Dispatch<React.SetStateAction<string | null>>;
  }