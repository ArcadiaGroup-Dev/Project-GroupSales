"use client";

import React, { useState } from "react";
import { useCart } from "@/context/cartContext";
import Image from "next/image";
import PaymentModal from "./PaymentModal";

export default function CartPage() {
  const { cart, removeFromCart, clearCart, getTotal } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);

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
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg transition-colors duration-200 hover:bg-blue-700"
            >
              Seleccionar método de pago
            </button>
          </div>
        </>
      )}
      {isModalOpen && <PaymentModal onClose={() => setIsModalOpen(false)} cart={cart} />}
    </div>
  );
}
