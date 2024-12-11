/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextApiRequest, NextApiResponse } from "next";
import api from "../apiMP/api";
import { IProduct, ICartItem } from "@/Interfaces/IProduct"; // Asegúrate de importar también ICartItem

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { items }: { items: IProduct[] } = req.body;

    // Aquí mapeamos los productos para que coincidan con la interfaz ICartItem
    const products: ICartItem[] = items.map((item) => ({
      id: item.id, // Asegúrate de tener el id en tu IProduct
      name: item.name, // Cambia `title` por `name` para que coincida con ICartItem
      quantity: item.quantity,
      price: item.price, // Cambia `unit_price` por `price`
      currency_id: item.currency, // Asegúrate de mapear correctamente `currency` a `currency_id`
    }));

    try {
      // Aquí hacemos la llamada a la API de MercadoPago
      const { init_point } = await api.message.submitCart(products);

      // Devuelve el link de pago
      res.status(200).json({ init_point });
    } catch (error: unknown) {
      console.error("Error al crear la preferencia de pago", error);

      // Asegurarse de que el error tenga la propiedad `response` antes de acceder a ella
      if (error instanceof Error) {
        console.error("Error message:", error.message);
        res.status(500).json({
          error: "Error al crear la preferencia de pago",
          details: error.message,
        });
      } else if (error instanceof Object && "response" in error) {
        // Si el error tiene un campo 'response'
        console.error(
          "Error response from MercadoPago:",
          (error as any).response
        );
        res.status(500).json({
          error: "Error al crear la preferencia de pago",
          details: (error as any).response,
        });
      } else {
        // Si el error no es del tipo conocido, maneja como un error desconocido
        res
          .status(500)
          .json({ error: "Error desconocido al crear la preferencia de pago" });
      }
    }
  } else {
    res.status(405).json({ error: "Método no permitido" });
  }
}
