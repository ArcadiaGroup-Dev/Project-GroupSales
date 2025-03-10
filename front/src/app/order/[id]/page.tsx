"use client"
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IOrder } from "@/Interfaces/IOrders"; 
import { fetchOrdersById } from "@/components/Fetchs/FetchsOrders";
import Link from "next/link";

const OrderDetail = () => {
  const { id } = useParams(); // Obtener el ID de la URL
  const [order, setOrder] = useState<IOrder | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) return; // Evitar hacer la llamada sin un ID válido

    const fetchOrder = async () => {
      try {
        const orderData = await fetchOrdersById(id as string);
        setOrder(orderData);
      } catch (error) {
        console.error("Error al obtener la orden:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) return <p className="text-center">Cargando detalles de la orden...</p>;
  if (!order) return <p className="text-center">Orden no encontrada</p>;

  const handleBackToOrders = () => {
    window.history.back(); // Vuelve a la sección anterior en la historia del navegador
  };

  return (
        <div className="container mx-auto px-6 py-8">
          
          <h2 className="text-2xl font-semibold mt-24 mb-6 text-center text-gray-700">Detalles de la Orden</h2>
          
          <div className="flex justify-end mb-4">
            <button 
              onClick={handleBackToOrders} 
              className="bg-tertiary text-white py-2 px-4 rounded hover:bg-orange-400"
            >
              Volver a Mis Ventas
            </button>
          </div>
      
          <div className="bg-white shadow-xl rounded-lg p-6 border border-gray-300 mt-4">
            {/* Detalles de la Orden */}
            <div className="mb-4">
              <p className="text-md text-gray-600"><strong>ID:</strong> <span className="font-medium">{id}</span></p>
              <p className="text-md text-gray-600"><strong>Fecha de compra:</strong> <span className="font-medium">{new Date(order.date).toLocaleDateString()}</span></p>
              <p className="text-md text-gray-600"><strong>Precio total:</strong> <span className="font-medium">${order.orderDetails.price}</span></p>
              <p className="text-md text-gray-600"><strong>Cantidad:</strong> <span className="font-medium">{order.orderDetails.quantity}</span></p>
            </div>
      
            {/* Productos */}
            <div className="mb-4">
              <h4 className="text-lg font-semibold text-gray-700 mb-2">Productos:</h4>
              <ul className="space-y-2">
                {order.orderDetails.products.map((product, index) => (
                  <li key={index} className="bg-gray-50 p-4 rounded-lg shadow-md border border-gray-200">
                    <p className="text-sm text-gray-600"><strong>Nombre:</strong> <span className="font-medium">{product.name}</span></p>
                    <p className="text-sm text-gray-500"><strong>Descripción:</strong> <span className="font-medium">{product.description}</span></p>
                    <p className="text-sm text-gray-600"><strong>Precio:</strong> <span className="font-medium">${product.price}</span></p>
                  </li>
                ))}
              </ul>
            </div>
      
            {/* Datos del Usuario */}
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-2">Datos del Usuario:</h4>
              <p className="text-md text-gray-600"><strong>Nombre:</strong> <span className="font-medium">{order.user.name}</span></p>
              <p className="text-md text-gray-600"><strong>Email:</strong> <span className="font-medium">{order.user.email}</span></p>
              <p className="text-md text-gray-600"><strong>Teléfono:</strong> <span className="font-medium">{order.user.phone}</span></p>
              <p className="text-md text-gray-600"><strong>Dirección:</strong> <span className="font-medium">{order.user.address}</span></p>
              <p className="text-md text-gray-600"><strong>Ciudad:</strong> <span className="font-medium">{order.user.city}</span></p>
              <p className="text-md text-gray-600"><strong>País:</strong> <span className="font-medium">{order.user.country}</span></p>
            </div>
          </div>
          
        </div>
      );

  
}  

export default OrderDetail;
