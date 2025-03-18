"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { IProduct } from "@/Interfaces/IProduct";
import { fetchDeleteProduct, fetchGetProducts } from "../Fetchs/FetchProducts";
import { NotifFormsUsers } from "../Notifications/NotifiFormsUsers";

export default function AdminProducts() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const [notificationMessage, setNotificationMessage] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Fetch products on mount
  useEffect(() => {
    const fetchProducts = async () => {
      const data: IProduct[] = await fetchGetProducts();
      console.log("Productos obtenidos:", data);
      setProducts(data);
    };
    fetchProducts();
  }, []);

  // Función para abrir el modal de confirmación de eliminación
  const handleDeleteClick = (productId: string) => {
    setProductToDelete(productId); // Abre el modal de confirmación
  };

  const handleDeleteConfirm = async () => {
    if (productToDelete) {
      try {
        const response = await fetchDeleteProduct(productToDelete);

        // Verificar si la respuesta tiene éxito (status 200)
        if (response.ok) {
          // Actualizar los productos en el estado para reflejar la eliminación
          setProducts((prev) => prev.filter((product) => product.id !== productToDelete));
          setFilteredProducts((prev) => prev.filter((product) => product.id !== productToDelete));

          setNotificationMessage('Producto eliminado con éxito.');
          
          // Limpiar la notificación después de 4 segundos
          setTimeout(() => {
            setNotificationMessage('');
          }, 2000);
        } else {
          // Si la respuesta no es exitosa, lanzar un error
          throw new Error('No se pudo eliminar el producto.');
        }
      } catch (error) {
        console.error('Error al eliminar el producto:', error);
        // Mostrar la notificación de error si ocurre un problema
        setNotificationMessage('Hubo un error al eliminar el producto.');
      }

      // Cerrar el modal de eliminación
      setProductToDelete(null);
    }
  };

  // Cancelar eliminación
  const handleDeleteCancel = () => {
    setProductToDelete(null); // Cierra el modal de confirmación
  };

  // Handle search term change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Filter products by name
  useEffect(() => {
    if (searchTerm === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchTerm, products]);

  return (
    <>
      {notificationMessage && <NotifFormsUsers message={notificationMessage} />}
  
      <div className="text-center">
        <h1 className="text-secondary bg-gray-300 font-bold border-b border-gray-300 text-center p-2 mt-24">
          Productos / Servicios
        </h1>
  
        {/* Search filter */}
        <div className="mb-4 mt-8 md:justify-end">
          <input
            type="text"
            placeholder="Buscar por nombre"
            value={searchTerm}
            onChange={handleSearchChange}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none"
          />
        </div>
        <h5 className="text-lg text-gray-700">
          Aquí puedes encontrar productos/servicios por nombre y eliminar los que consideres inadecuados
        </h5>
        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto py-8 px-4">
          {filteredProducts.length === 0 ? (
            <p>No hay productos disponibles.</p>
          ) : (
            filteredProducts.map((product: IProduct) => (
              <div key={product.id} className="group bg-white relative block overflow-hidden rounded-lg border border-gray-300 shadow-lg hover:cursor-pointer">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  className="h-64 w-full object-cover sm:h-72"
                  width={300}
                  height={300}
                  priority
                />
                <div className="p-2">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <p className="text-xl font-bold text-gray-900">${product.price}</p>
                  <p className="text-gray-600 mt-2" >Stock: {product.stock}</p>
                 
                  <p className="text-md text-gray-700">
                    <span className="text-sm mt-2 text-tertiary italic">Vendido por: {product.user.name}</span>
                  </p>
                </div>
                {/* Delete button */}
                <div className="mt-4 flex gap-4 justify-center mb-2">
                  <button
                    onClick={() => handleDeleteClick(product.id)}
                    className="block rounded bg-red-500 px-4 py-3 text-sm font-medium text-white transition hover:bg-red-400"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
  
        {/* Modal de confirmación de eliminación */}
        {productToDelete && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
              <h3 className="text-lg font-semibold text-gray-700">¿Estás seguro que deseas eliminar el producto?</h3>
              <div className="mt-4 flex justify-end gap-4">
                <button
                  onClick={handleDeleteConfirm}
                  className="rounded bg-red-500 px-4 py-2 text-white font-semibold hover:bg-red-400"
                >
                  Aceptar
                </button>
                <button
                  onClick={handleDeleteCancel}
                  className="rounded bg-gray-500 px-4 py-2 text-white font-semibold hover:bg-gray-400"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
