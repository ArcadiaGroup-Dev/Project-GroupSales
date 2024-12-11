"use client";
import {
  ILoginResponse,
  IUserRegister,
  ILoginUser,
  IUserResponse,
} from "@/Interfaces/IUser";
import { IUserContextType } from "@/Interfaces/IUser";
import {
  fetchLoginUser,
  fetchRegisterUser,
} from "@/components/Fetchs/FetchsUser";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext<IUserContextType>({
  user: null,
  setUser: () => {},
  isLogged: false,
  isAdmin: false,
  setIsAdmin: () => {},
  setIsLogged: () => {},
  signIn:  async (credentials) => { 
   
    return null;  
  },
  signUp: async () => false,
  logOut: () => {},
  token: null,
  setToken: () => {},
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<IUserResponse | null>(null);
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);

  const signIn = async (credentials: ILoginUser): Promise<ILoginResponse | null> => {
    try {
      // Llamar a la función fetchLoginUser que ya se encarga de la solicitud
      const data = await fetchLoginUser(credentials);
  
      // Verificar si los datos tienen el access_token
      if (data?.access_token) {
        return data;
      } else {
        console.error("Error: No se recibió el token");
        return null;
      }
    } catch (error) {
      console.error("Error al autenticar:", error);
      return null;
    }
  };
  

  
const signUp = async (user: IUserRegister): Promise<boolean> => {
  console.log("Entrando a signUp con los datos:", user);  // Este log debería aparecer si la función es llamada

  try {
    console.log("Datos enviados al backend:", user);
    const data = await fetchRegisterUser(user);
    console.log("Respuesta del servidor:", data);
    if (data) {
      return true;
    }
    console.error("Registration failed:", data);
    return false;
  } catch (error) {
    console.error("Error durante sign up:", error instanceof Error ? error.message : "Unknown error");
    throw error;  // Re-throw para que el catch de onSubmit lo maneje
  }
};

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedAuthData = localStorage.getItem("user");

      if (storedAuthData) {
        try {
          const parsedSession = JSON.parse(storedAuthData);
          const { token, role } = parsedSession;

          setToken(token);
          setIsLogged(Boolean(token));
          setIsAdmin(role === "admin"); // Establece el rol correctamente
        } catch (error) {
          console.error("Error al parsear authData:", error);
          setIsLogged(false);
          setIsAdmin(false);
        }
      } else {
        setIsLogged(false);
        setIsAdmin(false);
      }
    }
  }, []);

  const logOut = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("user");
      setUser(null);
      setToken(null);
      setIsLogged(false);
      setIsAdmin(false);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isLogged,
        setIsLogged,
        token,
        setToken,
        isAdmin,
        setIsAdmin,
        signIn,
        signUp,
        logOut,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};