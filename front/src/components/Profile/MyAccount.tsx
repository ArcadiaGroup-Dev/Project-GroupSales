"use client";
import React, { useState, useEffect } from "react";
import { mocksUser } from "../mockUser";
import LogOut from "./LogOut";
import DeleteAccount from "./DeleteAccount";
import EditProfile from "./EditProfile"; 
import { FaUser, FaEnvelope, FaPhone, FaHome, FaFlag, FaCity, FaBirthdayCake } from "react-icons/fa";

export default function MyAccount() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    address: "",
    phone: 0,
  });

  const user = mocksUser[0];

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  const handleOpenLogout = () => setIsLogoutModalOpen(true);
  const handleCloseLogout = () => setIsLogoutModalOpen(false);
  const handleOpenDeleteAccount = () => setIsDeleteModalOpen(true);
  const handleCloseDeleteAccount = () => setIsDeleteModalOpen(false);
  const handleEditClick = () => setIsEditing(true);
  const handleCancelEdit = () => setIsEditing(false);
  const handleSaveEdit = (data: { address: string; phone: number }) => {
    setUserData(data); // Guarda los datos editados
    localStorage.setItem("userData", JSON.stringify(data)); // Guarda los nuevos datos en el localStorage
    setIsEditing(false); // Cierra el formulario de edición
  };

  const sections = [
    {
      title: "Mi Cuenta",
      content: (
        <div className="flex flex-col sm:flex-col md:flex-row md:space-x-4 items-center sm:items-start">
          <div className="w-full sm:w-auto p-2 shadow-md shadow-gray-400">
            {/* Detalles del usuario */}
            <div >
              <div className="flex items-center space-x-2 p-2 border-b border-gray-300">
                <FaUser className="text-gray-600" />
                <span className="font-medium text-gray-600">Nombre:</span>
                <p className="text-gray-700">{user.name}</p>
              </div>
              <div className="flex items-center space-x-2 p-2 border-b border-gray-300">
                <FaEnvelope className="text-gray-600" />
                <span className="font-medium text-gray-600">Correo Electrónico:</span>
                <p className="text-gray-700">{user.email}</p>
              </div>
              <div className="flex items-center space-x-2 p-2 border-b border-gray-300">
                <FaPhone className="text-gray-600" />
                <span className="font-medium text-gray-600">Teléfono:</span>
                <p className="text-gray-700">{user.phone}</p>
              </div>
              <div className="flex items-center space-x-2 p-2 border-b border-gray-300">
                <FaHome className="text-gray-600" />
                <span className="font-medium text-gray-600">Dirección:</span>
                <p className="text-gray-700">{user.address}</p>
              </div>
              <div className="flex items-center space-x-2 p-2 border-b border-gray-300">
                <FaFlag className="text-gray-600" />
                <span className="font-medium text-gray-600">País:</span>
                <p className="text-gray-700">{user.country}</p>
              </div>
              <div className="flex items-center space-x-2 p-2 border-b border-gray-300">
                <FaCity className="text-gray-600" />
                <span className="font-medium text-gray-600">Ciudad:</span>
                <p className="text-gray-700">{user.city}</p>
              </div>
              <div className="flex items-center space-x-2 p-2 border-b border-gray-300">
                <FaBirthdayCake className="text-gray-600" />
                <span className="font-medium text-gray-600">Fecha de Nacimiento:</span>
                <p className="text-gray-700">{user.birthdate.toLocaleDateString()}</p>
              </div>
            </div>

            {/* Botones debajo de la información del usuario */}
            <div className="mt-8 sm:mt-4">
              {!isEditing ? (
                <div className="space-y-4 mr-2">
                  <button
                    onClick={handleEditClick}
                    className=" mr-2 sm:w-auto shadow-md shadow-gray-400 bg-orange-400 text-white py-2 px-4 rounded-md hover:bg-orange-300 transition"
                  >
                    Modificar datos
                  </button>
                  <button
                    onClick={handleOpenLogout}
                    className=" sm:w-auto shadow-md shadow-gray-400 bg-teal-700 text-white py-2 px-4 rounded-md hover:bg-teal-600 transition"
                  >
                    Cerrar Sesión
                  </button>
                  <div className="mt-6 flex justify-end">
        <button
          onClick={handleOpenDeleteAccount}
          className=" border border-red-400 text-red-700 py-2 px-4 rounded-md hover:border-red-700 hover:border-2 hover:shadow-md hover:shadow-gray-400 transition"
        >
          Eliminar Cuenta
        </button>
      </div>

                </div>
              ) : (
                <EditProfile
                  onCancel={handleCancelEdit}
                  onSave={handleSaveEdit}
                />
              )}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Historial",
      content: (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-700">Tus Órdenes</h2>
          <p>Aquí aparecerán las órdenes realizadas por el usuario.</p>
        </div>
      ),
    },
  ];

  return (
    <div className="mt-28 p-8 bg-white shadow-lg rounded-lg">
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

      <div>{sections[activeIndex].content}</div>

      {isLogoutModalOpen && <LogOut handleCloseLogout={handleCloseLogout} />}
      {isDeleteModalOpen && (
        <DeleteAccount userId={user.id} handleCloseDeleteAccount={handleCloseDeleteAccount} />
      )}
    </div>
  );
}
