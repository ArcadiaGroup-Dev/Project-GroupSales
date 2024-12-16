"use client"; // Indica que este archivo es un componente de cliente en Next.js

import React, { useEffect, useState } from "react";
import { IUserResponse } from "@/Interfaces/IUser";
import EditProduct from "./EditProduct";
import DeleteProduct from "./DeleteProduct"; // Importamos el componente DeleteProduct
import Link from "next/link";
import Image from "next/image";

interface IProductPropsProps {
  id: string;
  name: string;
  description: string;
  price: number | null;
  stock: number | null;
  seller: string;
  imageUrl: string;
  categoryId: string;
  userId: string;
}

export default function ViewProducts() {
  const [products, setProducts] = useState<IProductPropsProps[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<IProductPropsProps | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null); // Estado para manejar el producto a eliminar

  // Simular productos desde un mock
  useEffect(() => {
    const mockProducts = [
      {
        id: "1",
        name: "Camiseta de Algodón",
        imageUrl:
          "https://http2.mlstatic.com/D_NQ_NP_860706-MLA42620357827_072020-O.webp",
        price: 2000,
        quantity: 1,
        stock: 20,
        userId: "asdsd",
        seller: "SweetClothes",
        categoryId: "Ropa",
        currency: ".",
        description:
          "Camiseta de algodón suave y cómoda, ideal para el día a día. Disponible en varios colores y tamaños. Perfecta para combinar con jeans o shorts durante el verano. Material de alta calidad que garantiza durabilidad y confort.",
      },
      {
        id: "2",
        name: "Pantalones Deportivos",
        imageUrl:
          "https://http2.mlstatic.com/D_NQ_NP_937770-MLA72170096371_102023-O.webp",
        price: 2500,
        quantity: 1,
        stock: 20,
        userId: "asdsd",
        seller: "MegaSport",
        categoryId: "Ropa",
        currency: ".",
        description:
          "Pantalones deportivos de tela elástica y transpirable, diseñados para la comodidad en actividades físicas o para un look casual. Cintura ajustable y fit moderno, disponibles en varios colores. Perfectos para entrenamientos o salidas informales.",
      },
      {
        id: "3",
        name: "Zapatillas Running",
        imageUrl:
          "https://http2.mlstatic.com/D_NQ_NP_892877-MLA76111224166_052024-O.webp",
        price: 3500,
        quantity: 1,
        stock: 20,
        userId: "asdsd",
        seller: "Shoozing",
        categoryId: "Calzado",
        currency: ".",
        description:
          "Zapatillas deportivas con tecnología de amortiguación para mayor confort durante carreras y entrenamientos. Suela antideslizante para mayor seguridad. Perfectas para corredores y personas que buscan rendimiento y estilo.",
      },
      {
        id: "4",
        name: "Smartwatch 2024",
        imageUrl:
          "https://http2.mlstatic.com/D_NQ_NP_913865-MLU78327399902_082024-O.webp",
        price: 4500,
        quantity: 1,
        stock: 20,
        userId: "asdsd",
        seller: "TecnoTodo",
        categoryId: "Tecnología",
        currency: ".",
        description:
          "Smartwatch de última generación con monitoreo de actividad física, seguimiento del sueño y notificaciones inteligentes. Con pantalla táctil HD, batería de larga duración y resistencia al agua. Compatible con iOS y Android.",
      },
      {
        id: "5",
        name: "Auriculares Bluetooth",
        imageUrl:
          "https://res.cloudinary.com/dbtfna8ev/image/upload/v1731727672/mathilde-langevin-baKm-5z7ikk-unsplash_jxei5j.jpg",
        price: 3200,
        quantity: 1,
        stock: 20,
        userId: "asdsd",
        seller: "MegaVenta",
        categoryId: "Tecnología",
        currency: ".",
        description:
          "Auriculares Bluetooth de calidad premium con cancelación de ruido activa. Sonido de alta fidelidad y micrófono integrado para llamadas claras. Conectividad rápida y compatible con dispositivos móviles, tablets y ordenadores.",
      },
      {
        id: "6",
        name: "Mochila de Viaje",
        imageUrl:
          "https://res.cloudinary.com/dbtfna8ev/image/upload/v1731727672/mathilde-langevin-baKm-5z7ikk-unsplash_jxei5j.jpg",
        price: 1800,
        quantity: 1,
        stock: 20,
        userId: "asdsd",
        seller: "MegaVenta",
        categoryId: "Accesorios",
        currency: ".",
        description:
          "Mochila ergonómica de gran capacidad, ideal para viajes largos o aventuras al aire libre. Con múltiples compartimentos y materiales resistentes al agua, garantiza un viaje cómodo y seguro. Diseño moderno y práctico.",
      },
    ];
    setProducts(mockProducts);
  }, []);

  // Función para manejar la edición de un producto
  const handleEdit = (product: IProductPropsProps) => {
    setSelectedProduct(product);
    setIsEditing(true);
  };

  // Función para manejar la guardado después de la edición
  const handleSave = (updatedProduct: IProductPropsProps) => {
    setProducts((prev) =>
      prev.map((prod) => (prod.id === updatedProduct.id ? updatedProduct : prod))
    );
    setIsEditing(false);
    setSelectedProduct(null);
  };

  // Función para manejar la apertura del modal de eliminación
  const handleDelete = (productId: string) => {
    setProductToDelete(productId); // Establecer el ID del producto que se va a eliminar
  };

  // Cerrar el modal de eliminación
  const handleCloseDeleteProduct = () => {
    setProductToDelete(null); // Cerrar el modal
  };

  return (
    <div className="text-center">
      <h1 className="text-lg font-semibold text-white bg-secondary mt-28 mb-4 p-2 rounded-lg shadow-lg shadow-gray-400 inline-block px-2">
        Productos / Servicios
      </h1>

      <h2 className="text-lg text-gray-700">
        Aquí puedes ver tus productos/servicios cargados, modificarlos y editarlos. Se actualizarán directamente en la página.
      </h2>
      {products.length === 0 ? (
        <p>No tienes productos disponibles.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto py-8 px-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative block overflow-hidden rounded-lg border border-gray-300 shadow-lg transition-transform duration-300 hover:scale-105 hover:cursor-pointer"
            >
              <Image
                src={product.imageUrl}
                alt={product.name}
                className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
                width={300}
                height={300}
                priority
              />

              <div className="relative bg-white p-6">
                <p className="text-gray-700">
                  ${product.price}
                  <span className="p-4 text-tertiary">{product.seller}</span>
                </p>

                <h3 className="mt-1.5 text-lg font-medium text-gray-900">
                  {product.name}
                </h3>

                {/* Mostrar los botones de edición y eliminación siempre */}
                <div className="mt-4 flex gap-4">
                  <button
                    onClick={() => handleEdit(product)}
                    className="block w-full rounded bg-gray-100 px-4 py-3 text-sm font-medium text-gray-900 transition hover:bg-orange-300 hover:text-primary"
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => handleDelete(product.id)}
                    className="block w-full rounded bg-red-500 px-4 py-3 text-sm font-medium text-white transition hover:bg-red-400"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Mostrar el modal de eliminación si se ha seleccionado un producto */}
      {productToDelete && (
        <DeleteProduct
          productId={productToDelete}
          handleCloseDeleteProduct={handleCloseDeleteProduct}
        />
      )}

      {/* Componente de edición si está en modo edición */}
      {isEditing && selectedProduct && (
        <EditProduct
          product={selectedProduct}
          onSave={(updatedProduct) =>
            handleSave({
              ...selectedProduct,
              ...updatedProduct,
            })
          }
          onCancel={() => setIsEditing(false)}
        />
      )}
    </div>
  );
}
