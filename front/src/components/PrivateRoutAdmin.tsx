"use client";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "@/context/userContext";

const PrivateRouteAdmin: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAdmin, isActive, user } = useContext(UserContext);
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

  if (!isActive || !isAdmin) {
    router.replace("/login"); // Usar replace para no agregar al historial
    return null;
  }

  return <>{children}</>;
};

export default PrivateRouteAdmin;
