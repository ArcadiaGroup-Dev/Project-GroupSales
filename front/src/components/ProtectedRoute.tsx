"use client"
import { useRouter } from "next/navigation";
import { useContext,useEffect } from "react";
import { UserContext } from "@/context/userContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isActive } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (!isActive) {
      router.push("/"); // Redirige al usuario si no está logueado
    }
  }, [isActive, router]);

  // Si el usuario no está logueado, no renderiza el contenido hasta que se realice la redirección
  if (!isActive) {
    return null;
  }

  return <>{children}</>;
}
