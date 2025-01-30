"use client";

import React from "react";
import { PaymentButton } from "./PaymentButton";
import { TransferButton } from "./TransferButton";
import { IProduct } from "@/Interfaces/IProduct";

interface PaymentModalProps {
  cart: IProduct[];
  onClose: () => void;
}

export default function PaymentModal({ cart, onClose }: PaymentModalProps): JSX.Element {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-xl font-semibold mb-4">Selecciona un método de pago</h2>
        <PaymentButton cart={cart} onClose={onClose} />
        <TransferButton cart={cart} onClose={onClose} />
        <button onClick={onClose} className="mt-4 text-red-600 hover:underline">
          Cancelar
        </button>
      </div>
    </div>
  );
}
