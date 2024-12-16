"use client";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "@/context/userContext";

const PrivateRouteAdmin: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAdmin, isActive, user } = useContext(UserContext);
  const [loading, setLoading] = useState(true); // Estado local de carga
  const router = useRouter();

  
  useEffect(() => {
        if (user !== null) {
      setLoading(false); 
    }
  }, [user]); 

  if (loading) {
    return <p className="mt-32">Cargando...</p>;
  }


  if (!isActive || !isAdmin) {
    router.push("/login");
    return null;
  }

  return <>{children}</>;
};

export default PrivateRouteAdmin;
