"use client";
import AdminDashboard from "@/components/Admin/AdminDashboard";
import PrivateRouteAdmin from "@/components/PrivateRoutAdmin";
import MyAccount from "@/components/Profile/MyAccount";
import ProtectedRoute from "@/components/ProtectedRoute";
import { UserContext } from "@/context/userContext";
import React, { useContext, useState, useEffect } from "react";
import MyAccountAdmin from "../dashboardAdmin/myAccountAdmin/page";

export default function Page() {
  const { isAdmin, isActive, user } = useContext(UserContext); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user !== null) {
      setLoading(false); // Cuando la información del usuario esté disponible, detén la carga
    }
  }, [user]);

  if (loading) {
    return <p className="mt-32">Cargando...</p>;
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
