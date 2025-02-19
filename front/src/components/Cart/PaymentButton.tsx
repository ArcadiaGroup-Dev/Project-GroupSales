import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import { createPayment } from "../Fetchs/FetchMercadoPago";
import { IProduct } from "@/Interfaces/IProduct";
import { UserContext } from "@/context/userContext";

interface PaymentButtonProps {
  cart: IProduct[];
  onClose: () => void;
}

export function PaymentButton({ cart, onClose }: PaymentButtonProps) {
  const { token } = useContext(UserContext)
  const [loading, setLoading] = useState(false);

  const handleMercadoPago = async () => {
    if (!token) {
      Swal.fire({
        icon: "error",
        title: "Datos faltantes",
        text: "No se pudo obtener el token para procesar el pago.",
      });
      onClose();
      return;
    }

    setLoading(true);
    try {
      const data = await createPayment(cart);
      const { init_point } = data;
      if (!init_point) throw new Error("No se pudo generar el enlace de pago");
      window.location.href = init_point;
      onClose();
    } catch (error: unknown) {
      console.error("Error al procesar el pago:", error);
      onClose();
      Swal.fire({
        icon: "error",
        title: "Error al procesar el pago",
        text: error instanceof Error ? error.message : "Hubo un error inesperado.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleMercadoPago}
      className="bg-blue-600 text-white px-6 py-2 rounded-lg mb-3 w-full"
      disabled={loading}
    >
      {loading ? "Procesando..." : "Pagar con MercadoPago"}
    </button>
  );
}
