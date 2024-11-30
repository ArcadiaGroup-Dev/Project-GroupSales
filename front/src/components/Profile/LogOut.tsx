import React from "react";

// Definir los tipos de las props
interface LogOutProps {
  handleCloseLogout: () => void; // La función para cerrar el modal
}

export default function LogOut({ handleCloseLogout }: LogOutProps) {
  const handleLogout = () => {
    // Lógica de cerrar sesión
    console.log("Usuario ha cerrado sesión");

    // Ejemplo: eliminar token del localStorage
    localStorage.removeItem("token");

    // Redirigir al usuario (puedes usar useNavigate si estás usando react-router)
    window.location.href = "/login";
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="rounded-2xl border border-blue-100 bg-white p-4 shadow-lg sm:p-6 lg:p-8">
        <p className="mt-4 text-gray-500">¿Estás seguro de que deseas cerrar sesión?</p>
        <div className="mt-6 sm:flex sm:gap-4">
          <button
            onClick={handleLogout}
            className="inline-block w-full rounded-lg bg-teal-700 px-5 py-3 text-center text-sm font-semibold text-white sm:w-auto"
          >
            Sí, cerrar sesión
          </button>
          <button
            onClick={handleCloseLogout} // Llama a la función que cierra el modal
            className="mt-2 inline-block w-full rounded-lg bg-gray-50 px-5 py-3 text-center text-sm font-semibold text-gray-500 sm:mt-0 sm:w-auto"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}