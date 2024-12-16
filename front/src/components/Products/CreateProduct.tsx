"use client";
import { useState, useEffect } from "react";
import { fetchUploadProduct } from "../Fetchs/FetchProducts";
import { ICreateProduct, IProduct } from "@/Interfaces/IProduct";
import { NotifFormsUsers } from "../Notifications/NotifiFormsUsers";

const CreateProduct: React.FC = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Cambié el valor inicial de userId a null
  const [product, setProduct] = useState<ICreateProduct>({
    name: "",
    description: "",
    price: null,
    stock: null,
    imageUrl: "",
    categoryId: "",
    userId: "", // Esto puede ser null también, pero para manejar los casos de error lo dejo en "".
  });

  const resetForm = () => {
    setProduct({
      name: "",
      description: "",
      price: null,
      stock: null,
      imageUrl: "",
      categoryId: "",
      userId: "", // Asegúrate de resetear esto también.
    });
  };
 

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      console.log("Parsed User from localStorage:", parsedUser);
      if (parsedUser?.user?.id) { 
        console.log("User ID:", parsedUser.user.id); 
        setProduct((prevProduct) => ({
          ...prevProduct,
          userId: parsedUser.user.id,
        }));
      }
    }
  }, []);
  
  

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    // Validación: asegúrate de que userId esté correctamente asignado
    if (
      !product.name.trim() ||
      !product.description.trim() ||
      product.price === null ||
      product.price === 0 ||
      product.stock === null ||
      product.stock === 0 ||
      !product.imageUrl.trim() ||
      !product.categoryId.trim() ||
      !product.userId.trim() // Verifica que el userId no esté vacío
    ) {
      setNotificationMessage("Por favor, complete todos los campos.");
      setShowNotification(true);
      setIsSubmitting(false);
      return;
    }

    const productToSubmit = {
      ...product,
      price: product.price !== null ? product.price : 0,
      stock: product.stock !== null ? product.stock : 0,
    };

    try {
      const response = await fetchUploadProduct(productToSubmit);
      if (response) {
        setNotificationMessage("Creado correctamente");
        setShowNotification(true);
        resetForm();
        setTimeout(() => setShowNotification(false), 3000);
      } else {
        setNotificationMessage("Producto o Servicio Inválido");
        setShowNotification(true);
      }
    } catch {
      setNotificationMessage("Ocurrió un error, intenta de nuevo");
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto mt-24 sm:px-6 lg:px-8">
      <form
        onSubmit={onSubmit}
        className="mx-auto bg-white mb-0 mt-16 max-w-4xl space-y-8 p-8 shadow-2xl shadow-gray-500/50 rounded-lg"
      >
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold text-gray-600 sm:text-3xl">Crear productos</h1>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8">
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
            value={product.price !== null ? product.price : ""}
            onChange={(e) =>
              setProduct({ ...product, price: e.target.value === "" ? null : Number(e.target.value) })
            }
            className="col-span-3 sm:col-span-1 w-full rounded-lg border-2 border-gray-200 p-4 text-sm shadow-md shadow-gray-400 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
            placeholder="Precio"
          />
          {/* Stock */}
          <input
            type="number"
            id="stock"
            value={product.stock !== null ? product.stock : ""}
            onChange={(e) =>
              setProduct({ ...product, stock: e.target.value === "" ? null : Number(e.target.value) })
            }
            className="col-span-3 sm:col-span-1 w-full rounded-lg border-2 border-gray-200 p-4 text-sm shadow-md shadow-gray-400 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
            placeholder="Stock"
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
          disabled={isSubmitting}
          className={`mx-auto flex justify-center items-center w-1/3 py-3 px-4 bg-tertiary text-white font-bold rounded-md shadow-md shadow-gray-400 ${
            isSubmitting ? "cursor-not-allowed bg-gray-400" : "hover:bg-orange-400"
          }`}
        >
          {isSubmitting ? "Creando..." : "Crear"}
        </button>
      </form>

      {showNotification && <NotifFormsUsers message={notificationMessage} />}
    </div>
  );
};

export default CreateProduct;
