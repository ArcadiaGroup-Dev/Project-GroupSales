import { ICreateOrder, IOrder } from "@/Interfaces/IOrders";


const apiUrl = process.env.NEXT_PUBLIC_API_URL;

//Funcion para obtener órdenes
export const getOrders = async (): Promise<IOrder[]> => {
    try {
      const response = await fetch(`${apiUrl}/orders`, {
        method: "GET",
        headers: {
          "Accept": "application/json"
        }
      });
  
      if (!response.ok) {
        throw new Error(`Error al obtener las órdenes: ${response.statusText}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error(error instanceof Error ? error.message : "Error desconocido");
      return [];
    }
  };
  
  
export const fetchOrdersById = async (id:string) => {
  const response = await fetch(`${apiUrl}/orders/${id}`);
  if (!response.ok) {
    throw new Error(`Error al obtener el producto: ${response.statusText}`);
  }
  return await response.json();
};

  export const fetchCreateOrder = async (order:ICreateOrder, token:string) => {
    const response = await fetch(`${apiUrl}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(order),
      });

  if (!response.ok) {
    throw new Error("Error al crear órden.");
  }

  return response.json();
};

