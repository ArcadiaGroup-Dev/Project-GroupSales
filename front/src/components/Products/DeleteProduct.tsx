"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { NotifFormsUsers } from "../Notifications/NotifiFormsUsers";

interface DeleteProductProps {
  productId: string;
  handleCloseDeleteProduct: () => void;
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function DeleteProduct({ productId, handleCloseDeleteProduct }: DeleteProductProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();
  const [notificationMessage, setNotificationMessage] = useState<string | null>(null);

  const handleConfirmDelete = async () => {
    setIsProcessing(true);
    try {
      const response = await fetch(`${apiUrl}/products/${productId}`, { method: "DELETE" });

      if (response.ok) {
        setNotificationMessage("Producto eliminado con éxito");
        setTimeout(() => {
          router.refresh(); // Refresca la página para actualizar la lista de productos
        }, 2000);
      } else {
        const errorText = await response.text();
        setNotificationMessage(`Error al eliminar el producto: ${errorText}`);
      }
    } catch (error) {
      setNotificationMessage("Error al procesar la solicitud de eliminación");
      console.error("Error en la solicitud de eliminación:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      {notificationMessage && <NotifFormsUsers message={notificationMessage} />}
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="rounded-2xl border border-blue-100 bg-white p-4 shadow-lg sm:p-6 lg:p-8">
          <p className="mt-4 text-gray-500">
            ¿Estás seguro de que deseas eliminar este producto? Esta acción es irreversible.
          </p>
          <div className="mt-6 sm:flex sm:gap-4">
            <button
              onClick={handleConfirmDelete}
              disabled={isProcessing}
              className={`inline-block w-full rounded-lg px-5 py-3 text-center text-sm font-semibold text-white sm:w-auto ${
                isProcessing ? "bg-gray-400" : "bg-red-500 hover:bg-red-400"
              }`}
            >
              {isProcessing ? "Procesando..." : "Sí, Eliminar"}
            </button>
            <button
              onClick={handleCloseDeleteProduct}
              className="mt-2 inline-block w-full rounded-lg bg-gray-50 px-5 py-3 text-center text-sm font-semibold text-gray-500 sm:mt-0 sm:w-auto"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
