"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchCreateOrder } from "@/components/Fetchs/FetchsOrders";
import Swal from "sweetalert2";
import { useCart } from "@/context/cartContext";
import { UserContext } from "@/context/userContext";
import Link from "next/link";

const CompraExitosa = () => {
  const { user, token } = useContext(UserContext);
  const { cart, clearCart } = useCart();
  const [orderStatus, setOrderStatus] = useState<string>("");
  const router = useRouter();

  // Función para obtener los parámetros de la URL
  const getQueryParams = () => {
    if (typeof window !== "undefined") {
      const search = window.location.search;
      const params = new URLSearchParams(search);
      return {
        status: params.get("status"),
        preferenceId: params.get("preference_id"),
        paymentId: params.get("payment_id"),
        merchantOrderId: params.get("merchant_order_id"),
      };
    }
    return {};
  };

  const handleCreateOrder = async () => {
    if (!user || !token || cart.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo procesar la compra.",
      });
      return;
    }

    // Preparar la información de la orden
    const orderData = {
      userId: user.id,
      products: cart.map((item) => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        seller: item.user.id,
      })),
    };

    try {
      console.log("Enviando datos para la preferencia:", orderData);

      // Crear la orden de compra
      const orderResponse = await fetchCreateOrder(orderData, token);

      if (orderResponse.status === "success") {
        setOrderStatus("success");
        Swal.fire({
          icon: "success",
          title: "Compra exitosa",
          text: "Tu pedido ha sido procesado.",
        });
        clearCart();
      } else {
        setOrderStatus("error");
        Swal.fire({
          icon: "error",
          title: "Error en la compra",
          text: "Hubo un problema al procesar tu orden.",
        });
      }
    } catch (error) {
      setOrderStatus("error");
      Swal.fire({
        icon: "error",
        title: "Error en la compra",
        text: "Hubo un problema al procesar tu orden.",
      });
    }
  };

  useEffect(() => {
    const { status, preferenceId, paymentId, merchantOrderId } = getQueryParams();

    if (status === "approved" && preferenceId) {
      console.log("Pago aprobado. Creando la orden...");
      handleCreateOrder();
    } else {
      console.warn("No se encontraron parámetros o el estado no es aprobado");
    }
  }, []);  // Dependencia vacía para ejecutar solo una vez

  return (
    <div className="mt-24 flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
        <div className="compra-exitosa-header text-center mb-6">
          <h2 className="text-3xl font-semibold text-green-600">¡Compra Exitosa!</h2>
        </div>
        <div className="compra-exitosa-body text-center text-gray-700">
          <p className="text-xl mb-4">Gracias por tu compra. Tu pago ha sido aprobado.</p>
          <p className="text-lg">Tu pedido está siendo procesado.</p>
        </div>
        <div className="mt-6 flex justify-center">
          <Link
            href="/"
            className="bg-green-600 text-white py-2 px-6 rounded-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CompraExitosa;
