import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { fetchCreateOrder } from "../Fetchs/FetchsOrders";
import { IProduct } from "@/Interfaces/IProduct";
import { ICreateOrder } from "@/Interfaces/IOrders";
import { UserContext } from "@/context/userContext";
import { useCart } from "@/context/cartContext";
import { useRouter } from "next/navigation";
import { fetchProductById } from "../Fetchs/FetchProducts";
import { sendPurchaseEmailNotification } from "../Fetchs/FetchsEmail";

interface TransferButtonProps {
  cart: IProduct[];
  onClose: () => void;
}

export function TransferButton({ cart, onClose }: TransferButtonProps) {
  const { user, token } = useContext(UserContext);
  const { clearCart } = useCart();
  const router = useRouter();
  const [product, setProduct] = useState<IProduct | null>(null);

  // Obtener el ID del producto (supongamos que lo pasas como prop o lo tienes en el carrito)
  const productId = cart[0]?.id; // Aquí se asume que el primer producto del carrito es el que deseas obtener

  useEffect(() => {
    if (productId) {
      const fetchData = async () => {
        try { 
          const productData = await fetchProductById(productId);
          setProduct(productData);
          console.log("Vendedor email:", productData.user.email);  // Verificar que el correo del vendedor está correctamente obtenido
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

    // Asegurarte que el carrito tiene productos con la información necesaria
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

    // Estructura de la orden que se envía al backend
    const orderData: ICreateOrder = {
      userId: user.id,
      products: cartItems,
    };

    try {
      // Llamada a la función para crear la orden
      const orderResponse = await fetchCreateOrder(orderData, token);
      console.log("Respuesta de la orden:", orderResponse);
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

      // Redirigir al usuario a la página de compra exitosa
      router.push("/compra-exitosa");

      // Limpiar el carrito después de la compra
      clearCart();

      // Cerrar el modal o la vista de la transferencia
      onClose();
    }catch (error) {
      console.error("Error al crear la orden:", error);
    
      Swal.fire({
        icon: "error",
        title: "Error al crear la orden",
        text: "Hubo un problema al procesar tu orden. Por favor, intenta nuevamente.",
      });
    }
  };

  return (
    <div>
      {product ? (
        product.user.bank && product.user.account && product.user.cardHolder && product.user.alias && product.user.cbu ? (
          <div className="bg-white p-4 rounded-md shadow-md text-center">
            <h3 className="text-lg font-semibold">Detalles de la Cuenta Bancaria</h3>
            <p><strong>Banco:</strong> {product.user.bank}</p>
            <p><strong>Cuenta:</strong> {product.user.account}</p>
            <p><strong>Titular:</strong> {product.user.cardHolder}</p>
            <p><strong>Alias:</strong> {product.user.alias}</p>
            <p><strong>CBU:</strong> {product.user.cbu}</p>
            <p className="text-sm text-gray-600">Realiza la transferencia y confirma la operación.</p>

            <button
              onClick={handleConfirmTransfer}
              className="bg-green-600 text-white px-4 py-2 mt-4 rounded-lg justify-center"
            >
              Confirmar Transferencia
            </button>
          </div>
        ) : (
          <div className="bg-white p-4 rounded-md shadow-md text-center">
            <p>El vendedor no ha cargado datos para compra por transferencia. Puedes realizar la compra a través de Mercado Pago.</p>
          </div>
        )
      ) : (
        <p>Cargando producto...</p>
      )}
    </div>
  );
}
