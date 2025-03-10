import { IProduct } from "@/Interfaces/IProduct";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;


//Email cuando usuario solicita permiso para vender
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
  

  //Email cuando administrador otorga permiso para vender
export const sendApprovalRequestEmail = async (adminEmail: string, sellerEmail: string) => {
  try {
    const response = await fetch(`${apiUrl}/email/send-sell-approval`, {
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

  //Email cuando administrador otorga permiso para ser administrador
  export const sendApprovalAdmin = async (adminEmail: string, sellerEmail: string) => {
    try {
      const response = await fetch(`${apiUrl}/email/send-admin-promotion`, {
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

// Email cuando se realiza una compra
export const sendPurchaseEmailNotification = async (
  adminEmail: string,
  sellerEmail: string,
  userEmail: string,
  productDetails: IProduct[], 
) => {
  try {
    const response = await fetch(`${apiUrl}/email/send-purchase-notification`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        adminEmail,
        sellerEmail,
        userEmail,
        productDetails,
      }),
    });

    if (!response.ok) {
      throw new Error('Error al enviar los correos');
    }

    const data = await response.json();
    console.log('Correo enviado:', data.message);
    return data;
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    throw error;  // Propaga el error para manejarlo en el componente
  }
};
