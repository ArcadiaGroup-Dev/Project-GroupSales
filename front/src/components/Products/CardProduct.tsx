"use client";

import React, { useEffect, useState } from "react";
import { IProduct } from "@/Interfaces/IProduct";
import { useCart } from "@/context/cartContext";
import Image from "next/image";
import Link from "next/link";
import Swal from "sweetalert2";
import { fetchUserId } from "../Fetchs/FetchsUser";

interface CardProductProps {
  product: IProduct;
}

export default function CardProduct({ product }: CardProductProps) {
  const { addToCart } = useCart();
  const [sellerName, setSellerName] = useState<string>("");
  const handleAddToCart = (product: IProduct) => {
    addToCart(product);
    Swal.fire({
      icon: "success",
      title: "Producto agregado",
      text: `${product.name} ha sido agregado al carrito.`,
      confirmButtonText: "¡Genial!",
      timer: 2000, // Desaparece después de 2 segundos
    });
  };

  useEffect(() => {
    const getUserName = async () => {
      
      if (product.userId) {
        try {
          const user = await fetchUserId(product.userId); 
         
          setSellerName(user.name);
        } catch (error) {
          console.error("Error al obtener el nombre del usuario:", error);
        }
      }
    };

    getUserName();
  }, [product.userId]);

  return (
    <div
      key={product.id}
      className="group relative block overflow-hidden rounded-lg border border-gray-300 shadow-lg transition-transform duration-300"
    >
      <Link href={`/product/${product.id}`} className="block">
        <Image
          src={product.imageUrl}
          alt={product.name}
          className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
          width={300}
          height={300}
          priority
        />
      </Link>

      <div className="relative bg-white p-6">
        <p className="text-gray-700">
          ${product.price}
          <span className="p-4 text-tertiary">{sellerName || "Cargando..."}</span>
        </p>

        <h3 className="mt-1.5 text-lg font-medium text-gray-900">
          {product.name}
        </h3>

        <div className="mt-4 flex gap-4">
          <Link
            href={`/product/${product.id}`}
            className="block w-full rounded bg-gray-100 px-4 py-3 text-sm font-medium text-gray-900 transition hover:bg-orange-300 hover:text-primary"
          >
            Ver más
          </Link>

          <button
            onClick={() => handleAddToCart(product)}
            className="block w-full rounded bg-secondary px-4 py-3 text-sm font-medium text-white transition hover:bg-teal-700"
          >
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
}
