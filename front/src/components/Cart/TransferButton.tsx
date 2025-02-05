import React, { useState } from "react";
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
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleConfirmTransfer = async () => {
    if (!user || !token) {
      Swal.fire({
        icon: "error",
        title: "Datos faltantes",
        text: "No se pudo obtener la información necesaria para procesar la orden.",
      });
      return;
    }

    const cartItems = cart.map((item) => ({ id: item.id, quantity: item.quantity }));

    if (cartItems.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Carrito vacío",
        text: "No hay productos en tu carrito. Agrega productos antes de realizar la orden.",
      });
      return;
    }

    const orderData: ICreateOrder = { userId: user.id, products: cartItems };

    try {
      const orderResponse = await fetchCreateOrder(orderData, token);
      console.log("Orden creada exitosamente:", orderResponse);

      Swal.fire({
        icon: "success",
        title: "Orden creada con éxito",
        text: "Tu orden ha sido procesada. ¡Gracias por tu compra!",
      });

      onClose();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al crear la orden",
        text: "Hubo un problema al procesar tu orden. Por favor, intenta nuevamente.",
      });
    }
  };

  return (
    <>
      {!showConfirmation ? (
        <button
          onClick={() => setShowConfirmation(true)}
          className="bg-green-600 text-white px-6 py-2 rounded-lg w-full"
        >
          Pagar con Transferencia Bancaria
        </button>
      ) : (
        <div className="bg-white p-4 rounded-md shadow-md text-center">
          <h3 className="text-lg font-semibold">Detalles de la Cuenta Bancaria</h3>
          <p><strong>Banco:</strong> Banco XYZ</p>
          <p><strong>Cuenta:</strong> 123-456789-00</p>
          <p><strong>Titular:</strong> Juan Pérez</p>
          <p className="text-sm text-gray-600">Realiza la transferencia y confirma la operación.</p>

            <button
              onClick={handleConfirmTransfer}
              className="bg-green-600 text-white px-4 py-2 mt-4 rounded-lg justify-center"
            >
              Confirmar Transferencia
            </button>
           
        
        </div>
      )}
    </>
  );
}
