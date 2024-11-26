"use client";
import React, { useState, useEffect } from "react";
import { mocksUser } from "../mockUser";
import LogOut from "./LogOut";
import DeleteAccount from "./DeleteAccount";
import EditProfile from "./EditProfile"; // Importa el componente de edición

export default function MyAccount() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // Nuevo estado para gestionar la edición
  const [userData, setUserData] = useState({
    address: "", // Inicialmente vacío, se llenará desde el localStorage
    phone: "",   // Inicialmente vacío, se llenará desde el localStorage
  });

  const user = mocksUser[0]; // Asegúrate de que 'user' esté bien definido en tu mock

  // Usamos useEffect para cargar los datos del usuario desde el localStorage
  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData)); // Carga los datos del localStorage si existen
    }
  }, []); // Solo se ejecuta una vez cuando el componente se monta

  const handleOpenLogout = () => {
    setIsLogoutModalOpen(true);
  };

  const handleCloseLogout = () => {
    setIsLogoutModalOpen(false); // Cierra el modal de LogOut
  };

  const handleOpenDeleteAccount = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteAccount = () => {
    setIsDeleteModalOpen(false); // Cierra el modal de DeleteAccount
  };

  const handleEditClick = () => {
    setIsEditing(true); // Cambia el estado a "editar"
  };

  const handleCancelEdit = () => {
    setIsEditing(false); // Vuelve al estado sin editar
  };

  const handleSaveEdit = (data: { address: string; phone: string }) => {
    setUserData(data); // Guarda los datos editados
    localStorage.setItem("userData", JSON.stringify(data)); // Guarda los nuevos datos en el localStorage
    setIsEditing(false); // Cierra el formulario de edición
  };

  const sections = [
    {
      title: "Mi Cuenta",
      content: (
        <div className="flex flex-col sm:flex-col md:flex-row md:space-x-8 items-center sm:items-start">
          <div className="w-full sm:w-auto p-4 shadow-md shadow-gray-400">
            <div>
              <span className="font-medium text-gray-600">Nombre:</span>
              <p>
                {user.name} {user.lastName}
              </p>
            </div>
            <div>
              <span className="font-medium text-gray-600">Correo Electrónico:</span>
              <p>{user.email}</p>
            </div>
            <div>
              <span className="font-medium text-gray-600">Teléfono:</span>
              <p>{user.phone}</p>
            </div>
            <div>
              <span className="font-medium text-gray-600">Dirección:</span>
              <p>{user.address}</p>
            </div>
          </div>

          {!isEditing ? (
            <div className="mt-8 sm:mt-4 md:mt-0 flex flex-col sm:flex-col md:flex-row md:space-x-4">
              <button
                onClick={handleEditClick} // Muestra el formulario de edición
                className="w-full sm:w-auto shadow-md shadow-gray-400  bg-orange-400 text-white py-2 px-4 rounded-md hover:bg-orange-300 transition"
              >
                Modificar datos
              </button>
              <button
                onClick={handleOpenLogout} // Abre el modal de LogOut
                className="w-full sm:w-auto shadow-md shadow-gray-400  bg-teal-700 text-white py-2 px-4 rounded-md hover:bg-teal-600 transition"
              >
                Cerrar Sesión
              </button>
              <button
                onClick={handleOpenDeleteAccount} // Abre el modal de DeleteAccount
                className="w-full sm:w-auto text-red-700 py-2 px-4 rounded-md hover:border-red-700 hover:border-2 hover:shadow-md hover:shadow-gray-400 transition"
              >
                Eliminar Cuenta
              </button>
            </div>
          ) : (
            <EditProfile
              onCancel={handleCancelEdit} // Llama a la función para cancelar
              onSave={handleSaveEdit} // Llama a la función para guardar los cambios
            />
          )}
        </div>
      ),
    },
    {
      title: "Historial",
      content: (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-700">Tus Órdenes</h2>
          <p>Aquí aparecerán las órdenes realizadas por el usuario.</p>
          {/* Agrega contenido dinámico aquí */}
        </div>
      ),
    },
  ];

  return (
    <div className="mt-28 p-8 bg-white shadow-lg rounded-lg">
      {/* Navegación del índice */}
      <nav className="mb-8 flex space-x-4 border-b pb-2">
        {sections.map((section, index) => (
          <button
            key={index}
            className={`px-4 py-2 ${
              activeIndex === index
                ? "border-b-2 border-teal-700 text-teal-700 font-semibold"
                : "text-gray-600 hover:text-teal-700"
            }`}
            onClick={() => setActiveIndex(index)}
          >
            {section.title}
          </button>
        ))}
      </nav>

      {/* Contenido dinámico basado en el índice */}
      <div>{sections[activeIndex].content}</div>

      {/* Renderiza el modal de LogOut si está abierto */}
      {isLogoutModalOpen && <LogOut handleCloseLogout={handleCloseLogout} />}

      {/* Renderiza el modal de DeleteAccount si está abierto */}
      {isDeleteModalOpen && (
        <DeleteAccount userId={user.id} handleCloseDeleteAccount={handleCloseDeleteAccount} />
      )}
    </div>
  );
}
