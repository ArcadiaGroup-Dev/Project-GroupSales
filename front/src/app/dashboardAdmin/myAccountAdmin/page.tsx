"use client";

import React, { useState, useEffect } from "react";
import DeleteAccount from "@/components/Profile/DeleteAccount";
import { FaUser, FaEnvelope, FaPhone, FaHome, FaFlag, FaCity, FaBirthdayCake } from "react-icons/fa";
import { IUserResponse } from "@/Interfaces/IUser";
import LogOut from "@/components/Profile/LogOut";
import AdminDashboard from "@/components/Admin/AdminDashboard";

export default function MyAccountAdmin() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userData, setUserData] = useState<IUserResponse | null>(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem("user");

    if (storedUserData) {
      try {
        const parsedUserData = JSON.parse(storedUserData);
        setUserData(parsedUserData);
      } catch (error) {
        console.error("Error al parsear los datos del usuario:", error);
      }
    }
  }, []);

  if (!userData) {
    return <p className="mt-32">Cargando datos del usuario...</p>;
  }

  // Funciones para manejar acciones
  const handleOpenLogout = () => setIsLogoutModalOpen(true);
  const handleCloseLogout = () => setIsLogoutModalOpen(false);
  const handleOpenDeleteAccount = () => setIsDeleteModalOpen(true);
  const handleCloseDeleteAccount = () => setIsDeleteModalOpen(false);

  const sections = [
       {
      title: "Panel de administrador",
      content: (
        <div className="space-y-4">
         
          <AdminDashboard/>
        </div>
      ),
    },
    {
        title: "Mi Cuenta",
        content: (
          <div className="flex flex-col sm:flex-col md:flex-row md:space-x-4 items-center sm:items-start">
            <div className="w-full sm:w-auto p-2 shadow-md shadow-gray-400">
              {/* Detalles del usuario */}
              <div>
                <div className="flex items-center space-x-2 p-2 border-b border-gray-300">
                  <FaUser className="text-gray-600" />
                  <span className="font-medium text-gray-600">Nombre:</span>
                  <p className="text-gray-700">{userData.user.name}</p>
                </div>
                <div className="flex items-center space-x-2 p-2 border-b border-gray-300">
                  <FaEnvelope className="text-gray-600" />
                  <span className="font-medium text-gray-600">Correo Electrónico:</span>
                  <p className="text-gray-700">{userData.user.email}</p>
                </div>
                <div className="flex items-center space-x-2 p-2 border-b border-gray-300">
                  <FaPhone className="text-gray-600" />
                  <span className="font-medium text-gray-600">Teléfono:</span>
                  <p className="text-gray-700">{userData.user.phone}</p>
                </div>
                <div className="flex items-center space-x-2 p-2 border-b border-gray-300">
                  <FaHome className="text-gray-600" />
                  <span className="font-medium text-gray-600">Dirección:</span>
                  <p className="text-gray-700">{userData.user.address}</p>
                </div>
                <div className="flex items-center space-x-2 p-2 border-b border-gray-300">
                  <FaFlag className="text-gray-600" />
                  <span className="font-medium text-gray-600">País:</span>
                  <p className="text-gray-700">{userData.user.country}</p>
                </div>
                <div className="flex items-center space-x-2 p-2 border-b border-gray-300">
                  <FaCity className="text-gray-600" />
                  <span className="font-medium text-gray-600">Ciudad:</span>
                  <p className="text-gray-700">{userData.user.city}</p>
                </div>
                <div className="flex items-center space-x-2 p-2 border-b border-gray-300">
                  <FaBirthdayCake className="text-gray-600" />
                  <span className="font-medium text-gray-600">Fecha de Nacimiento:</span>
                  <p className="text-gray-700">
                    {new Date(userData.user.birthdate).toLocaleDateString()}
                  </p>
                </div>
              </div>
  
              <div className="mt-8 sm:mt-4">
                <button
                  onClick={handleOpenLogout}
                  className="sm:w-auto shadow-md shadow-gray-400 bg-teal-700 text-white py-2 px-4 rounded-md hover:bg-teal-600 transition"
                >
                  Cerrar Sesión
                </button>
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={handleOpenDeleteAccount}
                    className="border border-red-400 text-red-700 py-2 px-4 rounded-md hover:border-red-700 hover:border-2 hover:shadow-md hover:shadow-gray-400 transition"
                  >
                    Eliminar Cuenta
                  </button>
                </div>
              </div>
            </div>
          </div>
        ),
      }
  ];

  return (
    <div className="mt-28 p-8 bg-white shadow-lg rounded-lg">
      <nav className="mb-8 flex space-x-4 border-b pb-2">
        {sections.map((section, index) => (
          <button
            key={index}
            className={`px-4 py-2 ${activeIndex === index
              ? "border-b-2 border-teal-700 text-teal-700 font-semibold"
              : "text-gray-600 hover:text-teal-700"
              }`}
            onClick={() => setActiveIndex(index)}
          >
            {section.title}
          </button>
        ))}
      </nav>

      <div>{sections[activeIndex].content}</div>

      {isLogoutModalOpen && <LogOut handleCloseLogout={handleCloseLogout} />}
      {isDeleteModalOpen && (
        <DeleteAccount userId={userData.user.id} handleCloseDeleteAccount={handleCloseDeleteAccount} />
      )}
    </div>
  );
}
