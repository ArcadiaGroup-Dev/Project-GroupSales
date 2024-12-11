/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextApiRequest, NextApiResponse } from "next";
import api from "../apiMP/api";
import { IProduct } from "@/Interfaces/IProduct";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { items }: { items: IProduct[] } = req.body;

    // Mapear los productos a la estructura que espera la API de MercadoPago
    const products = items.map((item) => ({
      id: item.id,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      currency_id: item.currency,
    }));

    try {
      const { init_point } = await api.message.submitCart(products); // Uso correcto de init_point

      res.status(200).json({ initPoint: init_point }); // Se devuelve la URL de pago
    } catch (error) {
      res.status(500).json({ error: "Error al crear la preferencia de pago" });
    }
  } else {
    res.status(405).json({ error: "Método no permitido" });
  }
}
