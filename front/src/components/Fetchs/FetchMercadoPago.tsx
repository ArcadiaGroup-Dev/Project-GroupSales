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
