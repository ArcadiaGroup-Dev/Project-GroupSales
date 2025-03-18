import { useState, useEffect } from "react";
import { IProduct } from "@/Interfaces/IProduct";
import { createPreference } from "../Fetchs/FetchMercadoPago";

interface CheckoutButtonProps {
  cart: IProduct[];
}

export default function CheckoutButton({ cart }: CheckoutButtonProps) {
  const [preferenceId, setPreferenceId] = useState<string>("");
  const [initPoint, setInitPoint] = useState<string>("");

  useEffect(() => {
    if (cart.length === 0) return;

   
    createPreference(cart)
      .then(({ preferenceId, initPoint }) => {
        setPreferenceId(preferenceId);
        setInitPoint(initPoint);
      })
      .catch((err) => console.error("Error al obtener preferenceId", err));
  }, [cart]);
  useEffect(() => {
    if (preferenceId) {
      // Aquí podrías hacer algo más con preferenceId
      console.log("Preference ID utilizado", preferenceId);
    }
  }, [preferenceId]);
  
  useEffect(() => {
    // Si el initPoint ya está disponible, redirigimos al usuario
    if (initPoint) {
      window.location.href = initPoint;
    }
  }, [initPoint]);

  return (
    <div>
      {/* Mostrar un mensaje mientras cargamos */}
      {!initPoint && <p className="flex items-center justify-center bg-blue-500 text-white px-6 py-3 rounded-lg w-full">Redirigiendo a Mercado Pago...</p>}
    </div>
  );
}

