import React, { useEffect, useState } from 'react';
import { getOrders } from '../Fetchs/FetchsOrders';
import { IOrder } from '@/Interfaces/IOrders';
import Link from 'next/link';

const MisVentas: React.FC = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [allOrders, setAllOrders] = useState<IOrder[]>([]); // Para almacenar todas las órdenes
  const [loading, setLoading] = useState<boolean>(true);
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [selectedDate, setSelectedDate] = useState<string>(''); // Fecha seleccionada

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedAuthData = localStorage.getItem("user");

      if (storedAuthData) {
        try {
          const parsedSession = JSON.parse(storedAuthData);
          const { user } = parsedSession;
          
          console.log("User ID obtenido:", user.id);
          
          setUserId(user.id);
        } catch (error) {
          console.error("Error al parsear authData:", error);
        }
      }
    }
  }, []);
  
  useEffect(() => {
    const loadOrders = async () => {
      if (!userId) return;

      try {
        const ordersData = await getOrders();
        
        console.log("Órdenes obtenidas:", ordersData);
        
        const filteredOrders = ordersData
          .filter(order => order.seller && order.seller.id === userId)
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Ordenar por fecha descendente
        
        setOrders(filteredOrders);
        setAllOrders(filteredOrders); // Almacenar todas las órdenes
      } catch (error) {
        console.error('Error al obtener órdenes:', error);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, [userId]);

  // Filtrar por fecha
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.value;
    setSelectedDate(selected);

    if (selected) {
      const selectedDateFormatted = selected; // Ya está en formato yyyy-mm-dd

      const filteredOrders = allOrders.filter(order => {
        // Convertir las fechas a formato yyyy-mm-dd para comparación
        const orderDate = new Date(order.date).toISOString().split('T')[0]; // YYYY-MM-DD
        return orderDate === selectedDateFormatted;
      });
      setOrders(filteredOrders);
    } else {
      setOrders(allOrders); // Restaurar todas las órdenes si no hay fecha seleccionada
    }
  };

  return (
    <div className="container mx-auto px-4">
      {/* Filtro de fecha siempre visible */}
      <div className="mb-4">
        <label htmlFor="date-filter" className="mr-2 text-gray-700">Filtrar por fecha:</label>
        <input 
          id="date-filter"
          type="date" 
          value={selectedDate} 
          onChange={handleDateChange}
          className="border border-gray-300 p-2 rounded"
        />
      </div>

      {/* Mostrar las órdenes */}
      {loading ? (
        <div className="text-center text-gray-600">Cargando tus ventas...</div>
      ) : orders.length === 0 ? (
        <div className="text-center text-gray-600">No hay ventas para esta fecha.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white shadow-lg rounded-lg p-4 border border-gray-200">
              <h4 className="text-md font-semibold mb-2">Orden ID: {order.id}</h4>
              <p className="text-gray-700"><strong>Fecha de compra:</strong> {new Date(order.date).toLocaleDateString()}</p>
              <Link 
                href={`/order/${order.id}`} 
                className="mt-3 inline-block bg-tertiary text-white py-2 px-4 rounded hover:bg-orange-400 transition"
              >
                Ver detalles
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MisVentas;
