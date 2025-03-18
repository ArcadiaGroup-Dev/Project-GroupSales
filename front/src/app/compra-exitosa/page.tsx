"use client";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchCreateOrder } from "@/components/Fetchs/FetchsOrders";
import Swal from "sweetalert2";
import { useCart } from "@/context/cartContext";
import { UserContext } from "@/context/userContext";
import { IProduct } from "@/Interfaces/IProduct";
import { sendPurchaseEmailNotification } from "@/components/Fetchs/FetchsEmail";
import { ICreateOrder } from "@/Interfaces/IOrders";
import { fetchProductById } from "@/components/Fetchs/FetchProducts";

const CompraExitosa = () => {
  const { user, token } = useContext(UserContext);
  const { cart, clearCart} = useCart();

  const router = useRouter();
  const [product, setProduct] = useState<IProduct | null>(null);
  
 
  const productId = cart[0]?.id;

  useEffect(() => {
    if (productId) {
      const fetchData = async () => {
        try { 
          const productData = await fetchProductById(productId);
          setProduct(productData);
          console.log("Vendedor email:", productData.user.email);
        } catch (error) {
          console.error("Error fetching product:", error);
        }
      };

      fetchData();
    }
  }, [productId]);

  const handleConfirmTransfer = async () => {
    if (!user || !token) {
      Swal.fire({
        icon: "error",
        title: "Datos faltantes",
        text: "No se pudo obtener la información necesaria para procesar la orden.",
      });
      return;
    }

    const cartItems = cart.map((item) => ({
      id: item.id,
      quantity: item.quantity,
      seller: item.user.id,
    }));

    if (cartItems.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Carrito vacío",
        text: "No hay productos en tu carrito. Agrega productos antes de realizar la orden.",
      });
      return;
    }

 
    const orderData: ICreateOrder = {
      userId: user.id,
      products: cartItems,
    };

    try {
      
      const orderResponse = await fetchCreateOrder(orderData, token);

      Swal.fire({
        icon: "success",
        title: "Orden creada con éxito",
        text: "Tu orden ha sido procesada. ¡Gracias por tu compra!",
      });

      // Verificar que el correo del admin, vendedor y usuario se están obteniendo correctamente
      console.log("Correo Admin:", "mmipyme@gmail.com");
      console.log("Correo Usuario:", user.email);

      // Enviar los correos de notificación
      await sendPurchaseEmailNotification(
        "mmipyme@gmail.com",  // Correo del administrador
        product?.user.email || "",   // Correo del vendedor, si no está disponible lo dejamos vacío
        user.email,                  // Correo del usuario
        cart                          // Detalles del producto
      );

      
      router.push("/");

      // Limpiar el carrito después de la compra
      clearCart();

    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al crear la orden",
        text: "Hubo un problema al procesar tu orden. Por favor, intenta nuevamente.",
      });
    }
  };
  return (
    <div className="mt-24 flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
        <div className="compra-exitosa-header text-center mb-6">
          <h2 className="text-3xl font-semibold text-green-600">Tu pago ha sido procesado</h2>
        </div>
        <div className="compra-exitosa-body text-center text-gray-700">
          <p className="text-xl mb-4">Para finalizar,  haz click aquí para notificar al vendedor acerca de tu compra</p>
         
        </div>
        <div className="mt-6 flex justify-center">
          
          <button
              onClick={handleConfirmTransfer}
              className="bg-green-600 text-white px-4 py-2 mt-4 rounded-lg justify-center"
            >
              Confirmar Compra
            </button>
        </div>
      </div>
    </div>
  );
};

export default CompraExitosa;
