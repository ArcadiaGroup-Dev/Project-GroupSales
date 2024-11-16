"use client" 
import React from "react";
import { IProduct } from "../Interfaces/IProduct";
import Image from "next/image";
import Link from "next/link";

interface CardProductProps {
  product: IProduct;
}

export default function CardProduct({ product }: CardProductProps) {
  return (
    <Link
    key={product.id}
    href={`/product/${product.id}`}
      className="group relative block overflow-hidden rounded-lg border border-gray-300 shadow-lg transition-transform duration-300 hover:scale-105"
    >
      <Image
        src={product.img}
        alt={product.name}
        className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
        width={300}
        height={300}
      />

      <div className="relative bg-white p-6">
        <p className="text-gray-700">
          ${product.price}
          <span className="p-4 text-tertiary">{product.seller}</span>
        </p>

        <h3 className="mt-1.5 text-lg font-medium text-gray-900">
          {product.name}
        </h3>

        <form className="mt-4 flex gap-4">
          <Link href={`/product/${product.id}`}
            className="block w-full rounded bg-gray-100 px-4 py-3 text-sm font-medium text-gray-900 transition hover:bg-orange-300"
          >
            Ver más
          </Link>

          <button
            type="button"
            className="block w-full rounded bg-secondary px-4 py-3 text-sm font-medium text-white transition hover:bg-teal-700"
          >
            Comprar
          </button>
        </form>
      </div>
    </Link>
  );
}
