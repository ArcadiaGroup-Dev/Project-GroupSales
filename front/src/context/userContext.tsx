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
  isActive: false,
  isAdmin: false,
  setIsAdmin: () => {},
  setIsActive: () => {},
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
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const signIn = async (credentials: ILoginUser): Promise<boolean> => {
    try {
      const data: ILoginResponse = await fetchLoginUser(credentials);

      if (data && data.access_token) {
        console.log("Token set:", data.access_token);

        if (typeof window !== "undefined") {
          const user = {
            token: data.access_token,
            role: data.user.role,
            user:data.user,
            isActive: data.user.isActive 
          };
          localStorage.setItem("user", JSON.stringify(user));

          setUser(data.user);
          setToken(data.access_token);
          setIsActive(data.user.isActive);
          setIsAdmin(data.user.role === "admin");

          console.log("Response data from login:", data);
          return true;
        }
      } else {
        console.error(
          "Login failed. User data may be incomplete or user may not exist."
        );
      }
    } catch (error) {
      console.error("Error during sign in:", error);
    }

    return false;
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
        setIsActive(true);
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
  
  

  const [setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedAuthData = localStorage.getItem("user");

      if (storedAuthData) {
        try {
          const parsedSession = JSON.parse(storedAuthData);
          const { token, role } = parsedSession;

          setToken(token);
          setIsActive(Boolean(token));
          setIsAdmin(role === "admin"); // Establece el rol correctamente
        } catch (error) {
          console.error("Error al parsear authData:", error);
          setIsActive(false);
          setIsAdmin(false);
        }
      } else {
        setIsActive(false);
        setIsAdmin(false);
      }
    }
  }, []);
  

  const logOut = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("user");
      setUser(null);
      setToken(null);
      setIsActive(false);
      setIsAdmin(false);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isActive,
        setIsActive,
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