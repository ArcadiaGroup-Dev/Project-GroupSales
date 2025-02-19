"use client";
import React, { useContext, useEffect, useState } from "react";
import { fetchUserOrdersById, fetchAllOrders } from "../Fetchs/FetchsUser";
import { UserContext } from "@/context/userContext";
import { IOrder } from "@/Interfaces/IOrders";

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

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-center text-gray-800">
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
                  <li key={product.id} className="flex justify-between">
                    <span className="font-medium">{product.name}</span>
                    <span>${product.price} x {order.orderDetails.quantity}</span>
                  </li>
                ))}
              </ul>
  
              <p className="mt-4 text-lg font-bold text-gray-900">
                💰 Total: ${order.orderDetails.price}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
  
}
