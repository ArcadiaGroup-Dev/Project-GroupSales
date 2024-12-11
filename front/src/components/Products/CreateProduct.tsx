"use client";
import { useState, useEffect } from "react";
import { fetchUploadProduct } from "../Fetchs/FetchProducts";
import { IProduct } from "@/Interfaces/IProduct";
import { NotifFormsUsers } from "../Notifications/NotifiFormsUsers";

const CreateProduct: React.FC = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [product, setProduct] = useState<IProduct>({
    id: "",
    name:"",
    description:"",
    price: 0,
    stock: 0,
    imageUrl:"",
    categoryId:"",
    seller:"",
    currency:"",
    quantity:0
  });



  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!product.name || !product.description || !product.price || !product.stock || !product.imageUrl ||!product.categoryId || !product.seller ) {
      setNotificationMessage("Por favor, complete todos los campos.");
      setShowNotification(true);
      return;
    }

    try {
      const response = await fetchUploadProduct(product);
      if (response) {
        setNotificationMessage("Creado correctamente");
        setShowNotification(true);
      } else {
        setNotificationMessage("Producto o Servicio Inválido");
        setShowNotification(true);
      }
    } catch {
      setNotificationMessage("Ocurrió un error, intenta de nuevo");
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    }
  };

  return (
    <div className="mx-auto mt-24  sm:px-6 lg:px-8">
 <form
  onSubmit={onSubmit}
  className="mx-auto bg-white mb-0 mt-16 max-w-4xl space-y-8 p-8 shadow-2xl shadow-gray-500/50 rounded-lg"
>
  <div className="mx-auto max-w-lg text-center">
    <h1 className="text-2xl font-bold text-gray-600 sm:text-3xl">Crear productos</h1>
  </div>
  <div
    className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8"
  >
    {/* Nombre */}
    <input
      type="text"
      id="nombre"
      value={product.name}
      onChange={(e) => setProduct({ ...product, name: e.target.value })}
      className="col-span-3 sm:col-span-1 w-full rounded-lg border-2 border-gray-200 p-4 text-sm shadow-md shadow-gray-400 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
      placeholder="Nombre del producto"
    />
    {/* Descripción */}
    <input
      type="text"
      id="description"
      value={product.description}
      onChange={(e) => setProduct({ ...product, description: e.target.value })}
      className="col-span-3 sm:col-span-2 w-full rounded-lg border-2 border-gray-200 p-4 text-sm shadow-md shadow-gray-400 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
      placeholder="Breve descripción del producto"
    />
    {/* Precio */}
    <input
      type="number"
      id="price"
      value={product.price}
      onChange={(e) => setProduct({ ...product, price: Number(e.target.value) })}
      className="col-span-3 sm:col-span-1 w-full rounded-lg border-2 border-gray-200 p-4 text-sm shadow-md shadow-gray-400 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
      placeholder="Precio"
    />
    {/* Vendedor */}
    <input
      type="text"
      id="seller"
      value={product.seller}
      onChange={(e) => setProduct({ ...product, seller: e.target.value })}
      className="col-span-3 sm:col-span-1 w-full rounded-lg border-2 border-gray-200 p-4 text-sm shadow-md shadow-gray-400 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
      placeholder="Nombre o marca del vendedor"
    />
    {/* Categoría */}
    <input
      type="text"
      id="categoryId"
      value={product.categoryId}
      onChange={(e) => setProduct({ ...product, categoryId: e.target.value })}
      className="col-span-3 sm:col-span-1 w-full rounded-lg border-2 border-gray-200 p-4 text-sm shadow-md shadow-gray-400 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
      placeholder="Seleccione la categoría adecuada"
    />
    {/* Imagen */}
    <input
      id="foto"
      type="text"
      value={product.imageUrl}
      onChange={(e) => setProduct({ ...product, imageUrl: e.target.value })}
      className="col-span-3 sm:col-span-3 w-full rounded-lg border-2 border-gray-200 p-4 text-sm shadow-md shadow-gray-400 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
      placeholder="Imagen del producto en formato .jpg, .png, .webp"
    />
  </div>
  <button
    type="submit"
    className="mx-auto flex justify-center items-center w-1/3 py-3 px-4 bg-tertiary text-white font-bold rounded-md hover:bg-orange-400 focus:outline-none shadow-md shadow-gray-400"
  >
    Crear
  </button>
</form>

        {showNotification && (
          <NotifFormsUsers message={notificationMessage} />
        )}
      </div>
    
  );
};

export default CreateProduct;