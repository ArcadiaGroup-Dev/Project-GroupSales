/*import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {jwtDecode }from "jwt-decode"; // Instalar con npm install jwt-decode

interface DecodedToken {
  exp: number;
}

export function useAuth() {
  const [user, setUser] = useState<{ id: string; name: string } | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // Estado de carga
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    if (storedToken) {
      try {
        const decoded: DecodedToken = jwtDecode(storedToken);
        const currentTime = Math.floor(Date.now() / 1000); // Tiempo actual en segundos

        if (decoded.exp < currentTime) {
          console.log("Token expirado. Redirigiendo a login...");
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          setUser(null);
          setToken(null);
          router.push("/login");
        } else {
          setToken(storedToken);
        }
      } catch (error) {
        console.error("Error al decodificar el token:", error);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
        setToken(null);
        router.push("/login");
      }
    } else {
      console.log("No hay token almacenado.");
    }
    setLoading(false);
  }, []);

  if (loading) return null; // Evita renderizar hasta que la validación termine

  return { user, token };
}*/
