"use client";
import React, { useContext, useEffect, useState } from "react";
import { fetchUserOrdersById, fetchAllOrders } from "../Fetchs/FetchsUser";
import { UserContext } from "@/context/userContext";
import { IOrder } from "@/Interfaces/IOrders";
import Image from "next/image";
import { FaPhone } from "react-icons/fa";

export function HistorySection() {
  const { user } = useContext(UserContext);
  const [orders, setOrders] = useState<IOrder[]>([]);

  useEffect(() => {
    const getOrders = async () => {
      if (!user) return;

      const allOrders: IOrder[] = await fetchAllOrders(); // Traemos todas las órdenes
      const userOrders = allOrders.filter(order => order.user.id === user.id); // Filtramos las del usuario

      // Ahora obtenemos cada orden con su ID
      const ordersWithDetails = await Promise.all(
        userOrders.map(order => fetchUserOrdersById(order.id))
      );

      setOrders(ordersWithDetails);
    };

    getOrders();
  }, [user]);
console.log(orders)
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-center text-gray-700">
        Mis Órdenes de Compra
      </h2>
  
      {orders.length === 0 ? (
        <p className="text-center text-gray-600 mt-6">
          No tienes órdenes de compra registradas.
        </p>
      ) : (
        <div className="flex flex-col gap-6 mt-6">
  {orders.map((order) => (
    <div
      key={order.id}
      className="bg-white border border-gray-300 p-6 rounded-xl shadow-lg transition-transform transform hover:shadow-xl hover:cursor-pointer"
    >
    
      <p className="text-gray-600">📅 Fecha: {new Date(order.date).toLocaleDateString()}</p>
      <h4 className="mt-4 font-semibold text-gray-800">🛍️ Productos:</h4>
      <ul className="mt-2 space-y-2 text-gray-700">
        {order.orderDetails.products.map((product) => (
          <li key={product.id} className="flex items-center p-4 bg-white rounded-lg border border-gray-200">
            <div className="flex-shrink-0 w-16 h-16 mr-4 relative">
              <Image
                src={product.imageUrl} 
                alt={product.name} 
                layout="fill" 
                objectFit="cover" 
                className="rounded-md"
              />
            </div>
            <div className="flex-grow">
              <span className="font-medium text-gray-800">{product.name}</span>
              <div className="text-sm text-gray-600">${product.price} x {order.orderDetails.quantity}</div>
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-4 text-lg font-bold text-gray-900">
        💰 Total: ${order.orderDetails.price}
      </p>

    
                <p className="text-gray-700 flex items-center space-x-2 p-2 border-b"> Contacta al vendedor:  
                <strong className="ml-2">  {order.user.phone || 'No disponible'}
                  </strong><FaPhone className="text-gray-600" /></p>
            
 
    </div>
  ))}
</div>

      )}
    </div>
  );
  
}
