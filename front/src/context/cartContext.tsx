/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface CartItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface CartContextType {
  cartItems: CartItem[];
  totalPrice: number;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe ser usado dentro de un CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const addItem = (item: CartItem) => {
    console.log("Agregar item al carrito:", item);

    // Actualizamos el carrito con el nuevo producto o la cantidad si ya existe
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (cartItem) => cartItem.id === item.id
      );

      if (existingItem) {
        console.log("Producto existente, actualizando cantidad...");
        return prevItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      } else {
        console.log("Producto nuevo, agregando al carrito...");
        return [...prevItems, item];
      }
    });

    // Actualizamos el totalPrice después de agregar el item
    setTotalPrice((prevTotal) => {
      return prevTotal + item.price * item.quantity;
    });
  };

  const removeItem = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    setTotalPrice((prevTotal) => {
      return cartItems
        .filter((item) => item.id !== id)
        .reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
    });
  };

  return (
    <CartContext.Provider
      value={{ cartItems, totalPrice, addItem, removeItem }}
    >
      {children}
    </CartContext.Provider>
  );
};
