"use client";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "@/context/userContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isActive, user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (user !== null) {
      setLoading(false); // Espera que la información del usuario se cargue antes de verificar
    }
  }, [user]);

  if (loading) {
    return <p className="mt-32">Cargando...</p>;
  }

  if (!isActive) {
    router.replace("/"); // Redirige si no está activo
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
