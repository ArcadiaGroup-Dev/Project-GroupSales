"use client"
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { IProduct } from "@/Interfaces/IProduct";
import { fetchDeleteProduct, fetchGetProducts, fetchUpdateProduct } from "../Fetchs/FetchProducts";
import { NotifFormsUsers } from "../Notifications/NotifiFormsUsers";

export default function ViewProducts() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<IProduct | null>(null);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [notificationMessage, setNotificationMessage] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  // Cargar userId del localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedAuthData = localStorage.getItem("user");

      if (storedAuthData) {
        try {
          const parsedSession = JSON.parse(storedAuthData);
          const { user } = parsedSession;
          setUserId(user.id);
        } catch (error) {
          console.error("Error al parsear authData:", error);
        }
      }
    }
  }, []);

  // Obtener productos y filtrar por userId
  useEffect(() => {
    const fetchProducts = async () => {
      const data: IProduct[] = await fetchGetProducts(); 
      console.log("Productos obtenidos:", data);

      // Filtrar los productos según el userId
      const filtered = data.filter((product) => product.user.id === userId);
      setFilteredProducts(filtered);
      setProducts(data); 
    };

    if (userId) {
      fetchProducts();
    }
  }, [userId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (editForm) {
      setEditForm({ ...editForm, [e.target.name]: e.target.value });
    }
  };

  const handleSave = async () => {
    if (editForm) {
      try {
        const updatedProduct = await fetchUpdateProduct(editForm.id, editForm);
    
        setProducts((prev) =>
          prev.map((prod) =>
            prod.id === updatedProduct.id ? updatedProduct : prod
          )
        );

        setFilteredProducts((prev) =>
          prev.map((prod) =>
            prod.id === updatedProduct.id ? updatedProduct : prod
          )
        );

        setEditingProductId(null);
        setEditForm(null);
      } catch (error) {
        console.error('Error al guardar los cambios:', error);
         setNotificationMessage("Hubo un error al guardar cambios");
      }
    }
  };

  const handleCancel = () => {
    setEditingProductId(null);
    setEditForm(null);
  };
// Función para abrir el modal de confirmación de eliminación
const handleDeleteClick = (productId: string) => {
  setProductToDelete(productId); // Abre el modal de confirmación
};
const handleDeleteConfirm = async () => {
  if (productToDelete) {
    try {
      const response = await fetchDeleteProduct(productToDelete);

      // Verificar si la respuesta tiene éxito (status 200)
      if (response.ok) {  // Verifica solo si la respuesta es exitosa (200-299)
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

  // Manejar el cambio en el filtro de búsqueda
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Filtrar productos por nombre
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
        <h1 className="text-lg font-semibold text-white bg-secondary mt-28 mb-4 p-2 rounded-lg shadow-lg shadow-gray-400 inline-block px-2">
          Productos / Servicios
        </h1>

        <h2 className="text-lg text-gray-700">
          Aquí puedes ver tus productos/servicios cargados, modificarlos y editarlos. Se actualizarán directamente en la página.
        </h2>

       {/* Filtro por nombre */}
          <div className="mb-4 mt-20">
            <input
              type="text"
              placeholder="Buscar por nombre"
              value={searchTerm}
              onChange={handleSearchChange}
              className="p-2 border border-gray-300 rounded-lg focus:outline-none"
            />
          </div>


        {filteredProducts.length === 0 ? (
          <p>No tienes productos disponibles.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto py-8 px-4">
            {filteredProducts.map((product: IProduct) => (
              <div key={product.id} className="group relative block overflow-hidden rounded-lg border border-gray-300 shadow-lg hover:cursor-pointer">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  className="h-64 w-full object-cover sm:h-72"
                  width={300}
                  height={300}
                  priority
                />
                <div className="relative p-6">
                  {editingProductId === product.id ? (
                    <>
                      <input
                        name="name"
                        value={editForm?.name || ""}
                        onChange={handleInputChange}
                        className="w-full border rounded px-2 py-1 mb-2"
                        placeholder="Nombre del producto"
                      />
                      <textarea
                        name="description"
                        value={editForm?.description || ""}
                        onChange={handleInputChange}
                        className="w-full border rounded px-2 py-1 mb-2"
                        placeholder="Descripción"
                      />
                      <input
                        name="price"
                        type="number"
                        value={editForm?.price || ""}
                        onChange={handleInputChange}
                        className="w-full border rounded px-2 py-1 mb-2"
                        placeholder="Precio"
                      />
                      <input
                        name="stock"
                        type="number"
                        value={editForm?.stock || ""}
                        onChange={handleInputChange}
                        className="w-full border rounded px-2 py-1 mb-2"
                        placeholder="Stock"
                      />
                         <input
                        name="imageUrl"
                        value={editForm?.imageUrl || ""}
                        onChange={handleInputChange}
                        className="w-full border rounded px-2 py-1 mb-2"
                        placeholder="URL de la imagen"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={handleSave}
                          className="block w-full rounded bg-tertiary px-4 py-2 text-sm font-medium text-white transition hover:bg-orange-600"
                        >
                          Guardar
                        </button>
                        <button
                          onClick={handleCancel}
                          className="block w-full rounded bg-gray-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-400"
                        >
                          Cancelar
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 mb-4">{product.description}</p>
                      <div className="flex justify-between items-center mb-4">
                        <span>Stock: {product.stock}</span>
                        <p className="text-xl font-bold text-gray-900">${product.price}</p>
                      </div>
                      <p className="text-md text-gray-700">
                        <span className="text-sm text-gray-500 italic">Vendido por: {product.user.name}</span>
                      </p>

                      <div className="mt-4 flex gap-4">
                        <button
                          onClick={() => {
                            setEditingProductId(product.id);
                            setEditForm(product);
                          }}
                          className="block w-full rounded bg-secondary px-4 py-3 text-sm font-medium text-white transition hover:bg-teal-600 hover:text-primary"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDeleteClick(product.id)}
                          className="block w-full rounded bg-red-500 px-4 py-3 text-sm font-medium text-white transition hover:bg-red-400"
                        >
                          Eliminar
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

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
