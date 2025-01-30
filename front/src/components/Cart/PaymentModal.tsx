"use client"
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { createPayment } from "../Fetchs/FetchMercadoPago";
import { IProduct } from "@/Interfaces/IProduct";
import { fetchCreateOrder } from "../Fetchs/FetchsOrders";
import { ICreateOrder } from "@/Interfaces/IOrders";

interface PaymentModalProps {
  cart: IProduct[];
  onClose: () => void;
}

export default function PaymentModal({ cart, onClose }: PaymentModalProps): JSX.Element {
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [token, setToken] = useState<string | undefined>(undefined);

  const handleMercadoPago = async () => {
    setLoading(true);
    try {
      const data = await createPayment(cart);
      const { init_point } = data;
      if (!init_point) throw new Error("No se pudo generar el enlace de pago");
      window.location.href = init_point;
    } catch (error: unknown) {
      console.error("Error al procesar el pago:", error);

      let errorMessage = "Hubo un error inesperado. Inténtalo nuevamente.";

      if (error instanceof Error) {
        errorMessage = error.message;
      }

      Swal.fire({
        icon: "error",
        title: "Error al procesar el pago",
        text: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleTransferenciaBancaria = () => {
    Swal.fire({
      icon: "info",
      title: "Datos para Transferencia Bancaria",
      html: `<p>Banco: XYZ</p>
             <p>CBU: 1234567890123456789012</p>
             <p>Alias: MiEmpresa.Alias</p>
             <p>Enviar comprobante a: pagos@miempresa.com</p>`,
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Confirmar transferencia",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      reverseButtons: true,
      preConfirm: (isConfirm) => {
        if (isConfirm) {
          return Swal.fire({
            icon: "success",
            title: "Transferencia enviada",
            text: "Pronto tendrás novedades sobre tu pedido",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#3085d6",
          }).then((result) => {
            if (result.isConfirmed) {
              handleTransferenciaConfirmada();
              onClose(); 
            }
          });
        } else {
          return Swal.fire({
            icon: "info",
            title: "Operación cancelada",
            text: "No se ha realizado la transferencia.",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#3085d6",
          }).then((result) => {
            if (result.isConfirmed) {
              handleOperacionCancelada();
            }
          });
        }
      },
    });
  };

  useEffect(() => {
    // Verificar si el localStorage contiene datos del usuario
    if (typeof window !== "undefined") {
      const storedAuthData = localStorage.getItem("user");
      const storedToken = localStorage.getItem("token");

      if (storedAuthData && storedToken) {
        try {
          const parsedSession = JSON.parse(storedAuthData);
          const { user } = parsedSession;

          setUserId(user.id); // Guardamos el ID del usuario desde el localStorage
          setToken(storedToken); // Guardamos el token desde el localStorage
        } catch (error) {
          console.error("Error al parsear authData:", error);
        }
      }
    }
  }, []);

  const handleTransferenciaConfirmada = async () => {
    if (!userId || !token) {
      Swal.fire({
        icon: "error",
        title: "Datos faltantes",
        text: "No se pudo obtener la información necesaria para procesar la orden.",
      });
      return;
    }

    const cartItems: { id: string; quantity: number }[] = JSON.parse(localStorage.getItem("cart") || "[]");

    if (cartItems.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Carrito vacío",
        text: "No hay productos en tu carrito. Agrega productos antes de realizar la orden.",
      });
      return;
    }

    const orderData: ICreateOrder = {
      userId,
      products: cartItems.map((item) => ({
        id: item.id,
        quantity: item.quantity,
      })),
    };

    try {
      const orderResponse = await fetchCreateOrder(orderData, token);
      console.log("Orden creada exitosamente:", orderResponse);

      Swal.fire({
        icon: "success",
        title: "Orden creada con éxito",
        text: "Tu orden ha sido procesada. ¡Gracias por tu compra!",
      });

      localStorage.removeItem("cart");
    } catch (error) {
      console.error("Error al crear la orden:", error);
      Swal.fire({
        icon: "error",
        title: "Error al crear la orden",
        text: "Hubo un problema al procesar tu orden. Por favor, intenta nuevamente.",
      });
    }
  };

  const handleOperacionCancelada = () => {
    console.log("La operación fue cancelada.");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-xl font-semibold mb-4">Selecciona un método de pago</h2>
        <button
          onClick={handleMercadoPago}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg mb-3 w-full"
          disabled={loading}
        >
          {loading ? "Procesando..." : "Pagar con MercadoPago"}
        </button>
        <button
          onClick={handleTransferenciaBancaria}
          className="bg-green-600 text-white px-6 py-2 rounded-lg w-full"
        >
          Pagar con Transferencia Bancaria
        </button>
        <button onClick={onClose} className="mt-4 text-red-600 hover:underline">
          Cancelar
        </button>
      </div>
    </div>
  );
}
