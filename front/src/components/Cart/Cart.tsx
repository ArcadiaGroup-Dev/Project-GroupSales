"use client";

import { useState } from "react";
import { useCart } from "../../context/cartContext";

export default function CartPage() {
  const { cartItems, totalPrice } = useCart();
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/submit-cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cartItems),
      });

      const { initPoint } = await response.json();
      window.location.href = initPoint;
    } catch (error) {
      console.error("Error al procesar el pago:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Carrito de compras</h1>
      <ul>
        {cartItems.length === 0 ? (
          <li>No hay productos en el carrito</li>
        ) : (
          cartItems.map((item) => (
            <li key={item.id}>
              {item.name} - {item.quantity} x ${item.price}
            </li>
          ))
        )}
      </ul>
      <p>Total: ${totalPrice}</p>
      <button onClick={handlePayment} disabled={loading}>
        {loading ? "Procesando..." : "Pagar con Mercado Pago"}
      </button>
    </div>
  );
}
