"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { IProduct } from "../Interfaces/IProduct";
import { UserContext } from "./userContext";

interface CartContextType {
  cart: IProduct[];
  addToCart: (product: IProduct) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  updateQuantity: (id: string, quantity: number) => void;
  getTotal: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<IProduct[]>([]);
  const { user } = useContext(UserContext)

  // Cargar carrito desde localStorage al montar el componente
  useEffect(() => {
    if (user && typeof window !== "undefined") {
      const savedCart = localStorage.getItem(`cart_${user.id}`);
      if (savedCart) {
        try {
          setCart(JSON.parse(savedCart));
        } catch (error) {
          console.error("Error parsing cart from localStorage:", error);
        }
      }
    }
  }, [user]);

  // Guardar carrito en localStorage cada vez que cambie
  useEffect(() => {
    if (user && typeof window !== "undefined") {
      localStorage.setItem(`cart_${user.id}`, JSON.stringify(cart));
    }
  }, [cart, user]);

  const addToCart = (product: IProduct) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((p) => p.id === product.id);
      if (existingProduct) {
        return prevCart.map((p) =>
          p.id === product.id ? { ...p, quantity: (p.quantity || 1) + 1 } : p
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });

    console.log("Producto agregado:", product);
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((product) => product.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const updateQuantity = (id: string, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((product) =>
        product.id === id ? { ...product, quantity } : product
      )
    );
  };

  const getTotal = () => {
    return cart.reduce(
      (total: number, product) => total + Number(product.price) * (product.quantity ?? 1),
      0
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
        getTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
