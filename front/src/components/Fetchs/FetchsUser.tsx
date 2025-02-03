import {ILoginUser, IUserRegister } from "@/Interfaces/IUser";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

//Formulario Login
export const fetchLoginUser = async (credentials: ILoginUser) => {
  try {
    // Realizar la solicitud POST al backend
    const response = await fetch(`${apiUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    // Verificar si la respuesta fue exitosa
    if (!response.ok) {
      throw new Error("Error en la autenticación");
    }

    // Procesar la respuesta
    const data = await response.json();
    console.log("Response data from login:", data);
    return data;  // Devuelve los datos al frontend (el token y demás información)
  } catch (error) {
    console.error("Error en el login:", error);
    throw error;  // Re-lanzar el error para que signIn lo maneje
  }
};



export const fetchRegisterUser = async (user: IUserRegister) => {
   const response = await fetch(`${apiUrl}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error desconocido");
  }

  const data = await response.json();
  return data;
};

export const fetchUserId = async (userId: string) => {

  try {
    const response = await fetch(`${apiUrl}/users/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error desconocido");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    throw error;
  }
};

export const resetPassword = async (token: string, password: string) => {
  console.log("Token desde fetch", { token, password });
  try {
    const res = await fetch(`${apiUrl}/auth/reset-password`, {
      method: "POST",
      body: JSON.stringify({ token, newPassword: password }),  // Enviar tanto el token como la nueva contraseña en el cuerpo
      headers: { 
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    return { success: res.ok, message: data.message };
  } catch (error) {
    return { success: false, message: "Error al conectar con el servidor." };
  }
};


export const forgotPassword = async (email: string) => {
  try {
    const res = await fetch(`${apiUrl}/auth/forgot-password`, {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    return { success: res.ok, message: data.message };
  } catch (error) {
    return { success: false, message: "Error al conectar con el servidor." };
  }
};
