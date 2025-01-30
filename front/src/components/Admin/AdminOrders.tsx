"use client";
import React, { useEffect, useState } from "react";
import { getOrders } from "../Fetchs/FetchsOrders";
import { IOrder } from "@/Interfaces/IOrders";

export default function AdminOrders() {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Estados para los filtros
  const [nameFilter, setNameFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [addressFilter, setAddressFilter] = useState("");
  const [emailFilter, setEmailFilter] = useState("");
  const [cityFilter, setCityFilter] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrders();
        const sortedOrders = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setOrders(sortedOrders);
        setFilteredOrders(sortedOrders); // Inicialmente mostrar todas las órdenes
      } catch (err) {
        setError("Error al obtener las órdenes.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Filtrado dinámico
  useEffect(() => {
    let filtered = orders;

    if (nameFilter) {
      filtered = filtered.filter(order =>
        order.user.name.toLowerCase().includes(nameFilter.toLowerCase())
      );
    }

    if (dateFilter) {
      filtered = filtered.filter(order => 
        new Date(order.date).toLocaleDateString() === new Date(dateFilter).toLocaleDateString()
      );
    }

    if (addressFilter) {
      filtered = filtered.filter(order =>
        order.user.address.toLowerCase().includes(addressFilter.toLowerCase())
      );
    }

    if (emailFilter) {
      filtered = filtered.filter(order =>
        order.user.email.toLowerCase().includes(emailFilter.toLowerCase())
      );
    }

    if (cityFilter) {
      filtered = filtered.filter(order =>
        order.user.city.toLowerCase().includes(cityFilter.toLowerCase())
      );
    }

    setFilteredOrders(filtered);
  }, [nameFilter, dateFilter, addressFilter, emailFilter, cityFilter, orders]);

  if (loading) return <p className="text-center text-gray-500">Cargando órdenes...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-4 mt-20">
      {/* Filtros */}
      <div className="flex flex-wrap gap-4 mb-4">
        <input type="text" placeholder="Filtrar por Nombre" className="border p-2" value={nameFilter} onChange={(e) => setNameFilter(e.target.value)} />
        <input type="date" className="border p-2" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} />
        <input type="text" placeholder="Filtrar por Dirección" className="border p-2" value={addressFilter} onChange={(e) => setAddressFilter(e.target.value)} />
        <input type="text" placeholder="Filtrar por Email" className="border p-2" value={emailFilter} onChange={(e) => setEmailFilter(e.target.value)} />
        <input type="text" placeholder="Filtrar por Ciudad" className="border p-2" value={cityFilter} onChange={(e) => setCityFilter(e.target.value)} />
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 bg-white text-sm">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="border px-4 py-2">Fecha</th>
              <th className="border px-4 py-2">Nombre</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Dirección</th>
              <th className="border px-4 py-2">Ciudad</th>
              <th className="border px-4 py-2">Teléfono</th>
              <th className="border px-4 py-2">Precio</th>
              <th className="border px-4 py-2">Cantidad</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr key={order.id} className="border-b text-center">
                  <td className="border px-4 py-2">{new Date(order.date).toLocaleDateString()}</td>
                  <td className="border px-4 py-2">{order.user.name}</td>
                  <td className="border px-4 py-2">{order.user.email}</td>
                  <td className="border px-4 py-2">{order.user.address}</td>
                  <td className="border px-4 py-2">{order.user.city}</td>
                  <td className="border px-4 py-2">{order.user.phone}</td>
                  <td className="border px-4 py-2">${parseFloat(order.orderDetails.price).toFixed(2)}</td>
                  <td className="border px-4 py-2">{order.orderDetails.quantity}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="text-center p-4 text-gray-500">
                  No hay órdenes disponibles.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
