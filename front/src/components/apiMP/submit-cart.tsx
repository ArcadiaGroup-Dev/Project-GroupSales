import type { NextApiRequest, NextApiResponse } from "next";
import api from "../apiMP/api"; // Asegúrate de que `api.ts` esté correctamente referenciado.

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const items = req.body;
      const initPoint = await api.message.submitCart(items);
      res.status(200).json({ initPoint });
    } catch (error) {
      console.error("Error al crear la preferencia de pago:", error);
      res.status(500).json({ error: "Error al procesar el pago" });
    }
  } else {
    res.status(405).json({ error: "Método no permitido" });
  }
}
