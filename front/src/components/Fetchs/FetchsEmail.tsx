const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const sendPermissionRequestEmail = async (adminEmail: string, sellerEmail: string) => {
    try {
      const response = await fetch(`${apiUrl}/email/send-sell-request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          adminEmail,
          sellerEmail,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Error al enviar el correo');
      }
  
      const data = await response.json();
      console.log('Correo enviado:', data.message);
      return data;
    } catch (error) {
      console.error("Error al enviar el correo:", error);
      throw error;  // Propaga el error para manejarlo en el componente
    }
  };
  