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

    
    const products = items.map((item) => ({
      id: item.id,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
    }));

    try {
      
      const { init_point } = await api.message.submitCart(products);

      res.status(200).json({ init_point }); // Devuelve el link de pago
    } catch (error) {
      res.status(500).json({ error: "Error al crear la preferencia de pago" });
    }
  } else {
    res.status(405).json({ error: "Método no permitido" });
  }
}
