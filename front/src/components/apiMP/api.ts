import { MercadoPagoConfig, Preference } from "mercadopago";
import { ICartItem } from "@/Interfaces/IProduct";

export const mercadopago = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!, // Asegúrate de tener la variable de entorno configurada
});

const api = {
  message: {
    // Método para crear la preferencia de pago
    async submitCart(items: ICartItem[]): Promise<{ init_point: string }> {
      try {
        // Creamos la preferencia de pago en MercadoPago
        const preference = await new Preference(mercadopago).create({
          body: {
            items: items.map((item) => ({
              id: item.id,
              title: item.name,
              quantity: item.quantity,
              unit_price: item.price,
            })),
            back_urls: {
              success: "https://xyz123.ngrok.io/success",
              failure: "https://xyz123.ngrok.io/failure",
              pending: "https://xyz123.ngrok.io/pending",
            },
          },
        });

        // Retornamos la URL para redirigir al usuario a MercadoPago
        return { init_point: preference.init_point! }; // Retorna un objeto con la propiedad init_point
      } catch (error) {
        console.error("Error al crear la preferencia de pago", error);
        throw new Error("Error al generar la preferencia de pago.");
      }
    },
  },
};

export default api;
