import React from "react";
import Swal from "sweetalert2";
import { fetchCreateOrder } from "../Fetchs/FetchsOrders";
import { IProduct } from "@/Interfaces/IProduct";
import { ICreateOrder } from "@/Interfaces/IOrders";
import { useAuth } from "./useAuth";

interface TransferButtonProps {
  cart: IProduct[];
  onClose: () => void;
}

export function TransferButton({ cart, onClose }: TransferButtonProps) {
  const { user, token } = useAuth(); 

  console.log("user antes de llamar a handle", user);

  const handleTransferenciaConfirmada = async () => {
    if (!user|| !token) {
      console.error("Faltan datos: usuario o token");
      Swal.fire({
        icon: "error",
        title: "Datos faltantes",
        text: "No se pudo obtener la información necesaria para procesar la orden.",
      });
      return;
    }

    const cartItems = cart.map((item) => ({ id: item.id, quantity: item.quantity }));

    console.log("cartItems:", cartItems);

    if (cartItems.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Carrito vacío",
        text: "No hay productos en tu carrito. Agrega productos antes de realizar la orden.",
      });
      return;
    }

    
    const orderData: ICreateOrder = { userId: user?.id, products: cartItems };

    console.log("orderData:", orderData);

    try {
      const orderResponse = await fetchCreateOrder(orderData, token);
      console.log("Orden creada exitosamente:", orderResponse);

      Swal.fire({
        icon: "success",
        title: "Orden creada con éxito",
        text: "Tu orden ha sido procesada. ¡Gracias por tu compra!",
      });
    } catch (error) {
      console.error("Error al crear la orden:", error);
      Swal.fire({
        icon: "error",
        title: "Error al crear la orden",
        text: "Hubo un problema al procesar tu orden. Por favor, intenta nuevamente.",
      });
    }
  };

  return (
    <button
      onClick={handleTransferenciaConfirmada}
      className="bg-green-600 text-white px-6 py-2 rounded-lg w-full"
    >
      Pagar con Transferencia Bancaria
    </button>
  );
}
