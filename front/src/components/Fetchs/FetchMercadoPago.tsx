import { IProduct } from "@/Interfaces/IProduct";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function createPayment(cart:IProduct[]) {
  try {
    const response = await fetch(`${apiUrl}/payments/sell-request`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items: cart }), 
    });

    if (!response.ok) {
      throw new Error("Error al comunicarse con el backend");
    }

    const data = await response.json();
    return data; 
  } catch (error) {
    console.error("Error al generar el pago:", error);
    throw error; 
  }
}


export const createPreference = async (cart: IProduct[]) => {
  try {
    const response = await fetch(`${apiUrl}/mercadopago/create-preference`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: cart.map((product) => ({
          title: product.name,
          quantity: product.quantity,
          unit_price: parseFloat(product.price),
        }))
      }),
    });

    if (!response.ok) {
      console.error("Error en la solicitud:", response.statusText);
      throw new Error("Error al crear la preferencia");
    }

    const data = await response.json();
    console.log("Respuesta del backend:", data);

    // Devolvemos tanto el preferenceId como el init_point
    return {
      preferenceId: data.id,
      initPoint: data.init_point,
    };
  } catch (error) {
    console.error("Error al obtener preference_id:", error);
    throw new Error("Error al crear la preferencia");
  }
};




