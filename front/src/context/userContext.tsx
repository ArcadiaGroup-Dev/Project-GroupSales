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
  signIn: async () => false,
  signUp: async () => false,
  logOut: () => {},
  token: null,
  setToken: () => {},
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<IUserResponse['user'] | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const signIn = async (credentials: ILoginUser): Promise<boolean> => {
    try {
      // Intentamos autenticar al usuario
      const response: IUserResponse = await fetchLoginUser(credentials);
  
      // Verificamos si la respuesta contiene el token y los detalles del usuario
      if (response.access_token) {
        return true;  // La autenticación fue exitosa
      } else {
        console.error('Error: Respuesta incompleta del servidor');
        return false;
      }
    } catch (error) {
      console.error('Error al autenticar:', error);
      return false;
    }
  };
  
  const signUp = async (user: IUserRegister): Promise<boolean> => {
    console.log("Entrando a signUp con los datos:", user);  // Este log debería aparecer si la función es llamada
  
    try {
      console.log("Datos enviados al backend:", user);
      const data = await fetchRegisterUser(user);
      console.log("Respuesta del servidor:", data);
  
      if (data) {
        // Suponiendo que la respuesta del servidor tiene la estructura que muestras
        const { access_token, ...userDetails } = data;
        
        // Guardamos tanto el access_token como los detalles del usuario en localStorage
        localStorage.setItem('user', JSON.stringify({ user: userDetails, token: access_token, role: userDetails.role }));
  
        // Actualizamos el estado
        setUser(userDetails);  // Establecer el usuario en el estado
        setToken(access_token); // Establecer el token en el estado
        setIsLogged(true);
        setIsAdmin(userDetails.role === 'admin');  // Establecer si es administrador
  
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