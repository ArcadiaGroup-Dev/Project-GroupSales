"use client";

import React, { useState } from "react";
import { TransferButton } from "./TransferButton";
import { IProduct } from "@/Interfaces/IProduct";
import CheckoutButton from "./ButtonMp";

interface PaymentModalProps {
  cart: IProduct[];
  onClose: () => void;
}

export default function PaymentModal({ cart, onClose }: PaymentModalProps): JSX.Element {
  const [isCheckoutClicked, setIsCheckoutClicked] = useState(false);
  const [isTransferSelected, setIsTransferSelected] = useState(false);

  const handleCheckoutClick = () => {
    setIsCheckoutClicked(true);
  };

  const handleTransferSelect = () => {
    setIsTransferSelected(true);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm w-full">
        <h2 className="text-xl font-semibold mb-4">Selecciona un método de pago</h2>

        {/* Mostrar TransferButton solo si se seleccionó transferencia bancaria */}
        {isTransferSelected ? (
          <TransferButton cart={cart} onClose={onClose} />
        ) : (
          <>
            {/* Botón de transferencia bancaria */}
            <div className="mb-4">
              <button
                onClick={handleTransferSelect}
                className="flex items-center justify-center bg-green-500 text-white px-6 py-3 rounded-lg w-full"
              >
                Pagar con Transferencia Bancaria
              </button>
            </div>

            {/* Botón de Mercado Pago */}
            {!isCheckoutClicked ? (
              <button
                onClick={handleCheckoutClick}
                className="flex items-center justify-center bg-blue-500 text-white px-6 py-3 rounded-lg w-full"
              >
                Pagar con Mercado Pago
              </button>
            ) : (
              <div className="w-full">
                <CheckoutButton cart={cart} />
              </div>
            )}
          </>
        )}

        {/* Botón de cancelar */}
        <button
          onClick={onClose}
          className="mt-4 text-red-600 hover:underline"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
