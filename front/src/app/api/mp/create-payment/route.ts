/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";

// Simulando la creación de un pago en MercadoPago
export async function POST(request: Request) {
  try {
    const { items } = await request.json();

    // Aquí deberías implementar la lógica para crear el pago con MercadoPago
    // Simulamos una respuesta exitosa
    const response = {
      init_point:
        "https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=123456",
    };

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { error: "Error al procesar el pago" },
      { status: 500 }
    );
  }
}
