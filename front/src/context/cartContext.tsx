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
  const { user } = useContext(UserContext);

  // Cargar carrito cuando el usuario cambia
  useEffect(() => {
    if (!user) {
      setCart([]); // Limpiar el carrito si no hay usuario autenticado
      return;
    }

    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem(`cart_${user.id}`);
      if (savedCart) {
        try {
          setCart(JSON.parse(savedCart));
        } catch (error) {
          console.error("Error parsing cart from localStorage:", error);
          setCart([]);
        }
      } else {
        setCart([]); // Si no hay carrito guardado, inicializar vacío
      }
    }
  }, [user]);

  // Guardar carrito en localStorage cuando cambia
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
          p.id === product.id ? { ...p, quantity: (p.quantity ?? 1) + 1 } : p
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((product) => product.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      setCart((prevCart) =>
        prevCart.map((product) =>
          product.id === id ? { ...product, quantity } : product
        )
      );
    }
  };

  const getTotal = () => {
    return cart.reduce(
      (total, product) => total + Number(product.price) * (product.quantity ?? 1),
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
