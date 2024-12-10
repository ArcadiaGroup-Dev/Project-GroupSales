"use client";

import React, { useState } from "react";
import { useCart } from "@/context/cartContext";
import Image from "next/image";
import Swal from "sweetalert2";

export default function CartPage() {
  const { cart, removeFromCart, clearCart, getTotal } = useCart();
  const [loading, setLoading] = useState(false);

  // Función para manejar el proceso de pago
  const handlePayment = async () => {
    setLoading(true);

    try {
      const response = await fetch("/api/mp/create-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Usar el estado `cart` directamente en lugar de `cartItems`
        body: JSON.stringify({ items: cart }),
      });

      if (!response.ok) {
        throw new Error("Error al generar el pago");
      }

      const data = await response.json();
      const { init_point } = data;
      window.location.href = init_point;
    } catch (error) {
      console.error("Error al procesar el pago", error);

      // Verificar si el error es un error de red o de solicitud
      Swal.fire({
        icon: "error",
        title: "Error al procesar el pago",
        text:
          error instanceof Error
            ? error.message
            : "Hubo un error inesperado. Inténtalo nuevamente.",
      });
    }
  };

  return (
    <div className="min-h-screen mt-24 bg-gray-100 p-8">
      <h1 className="text-3xl font-semibold text-center text-gray-900 mb-6">
        Carrito de compras
      </h1>
      {cart.length === 0 ? (
        <p className="mt-4 text-xl text-center text-gray-600">
          El carrito está vacío.
        </p>
      ) : (
        <>
          <ul className="space-y-6">
            {cart.map((product) => (
              <li
                key={product.id}
                className="flex items-center justify-between bg-white p-6 rounded-lg shadow-md border border-gray-200"
              >
                <div className="flex items-center space-x-4">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    width={100}
                    height={100}
                    className="rounded-md object-cover"
                  />
                  <div>
                    <h3 className="text-xl font-medium text-gray-800">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Cantidad: {product.quantity}
                    </p>
                    <p className="text-sm text-gray-600">
                      Precio unitario: ${product.price}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(product.id)}
                  className="text-red-600 hover:text-red-800 transition-colors duration-200"
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex justify-between items-center bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <p className="text-2xl font-semibold text-gray-800">
              Total: ${getTotal().toFixed(2)}
            </p>
            <button
              onClick={clearCart}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200"
            >
              Vaciar carrito
            </button>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={handlePayment}
              className={`${
                loading ? "bg-gray-400" : "bg-green-600"
              } text-white px-8 py-3 rounded-lg transition-colors duration-200 hover:bg-green-700`}
              disabled={loading}
            >
              {loading ? "Procesando..." : "Pagar con MercadoPago"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
