"use client"
import PrivateRouteAdmin from "@/components/PrivateRoutAdmin";
import MyAccount from "@/components/Profile/MyAccount";
import ProtectedRoute from "@/components/ProtectedRoute";
import { UserContext } from "@/context/userContext";
import React, { useContext, useState, useEffect } from "react";
import MyAccountAdmin from "../dashboardAdmin/myAccountAdmin/page";
import { useRouter } from "next/navigation";

export default function Page() {
  const { isAdmin, user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Si no hay usuario o el token ha expirado, redirige al login
    if (!user || !user.name) {
      router.push("/login"); // Si no hay usuario, redirige al login
    } else {
      setLoading(false);
    }
  }, [user, router]);

  if (loading) {
    return <p className="mt-32">Cargando...</p>;
  }

  // Si ya hay usuario, redirige inmediatamente, no es necesario seguir renderizando.
  if (!user) {
    return null; // No renderiza nada mientras redirige al login.
  }

  if (isAdmin) {
    return (
      <PrivateRouteAdmin>
        <MyAccountAdmin />
      </PrivateRouteAdmin>
    );
  }

  return (
    <ProtectedRoute>
      <MyAccount />
    </ProtectedRoute>
  );
}
