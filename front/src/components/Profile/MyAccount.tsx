"use client"
import React from 'react';
import { mocksUser } from '../mockUser';

export default function MyAccount() {
  const user = mocksUser[0];
  const handleLogout = () => {
    // Lógica para cerrar sesión
    console.log("Cerrar sesión");
  };

  const handleDeleteAccount = () => {
    // Lógica para eliminar la cuenta
    console.log("Eliminar cuenta");
  };

  return (
    <div className="mt-28 p-8 bg-white shadow-lg rounded-lg">
   <div className="mt-28 p-8 bg-white shadow-lg rounded-lg">
  <h1 className="text-2xl font-bold text-gray-700 mb-4">Mi Cuenta</h1>

  <div className="space-y-4">
    <div>
      <span className="font-medium text-gray-600">Nombre:</span>
      <p>{user.name} {user.lastName}</p>
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

  <div className="mt-8 space-y-4 flex flex-col items-start">
    <button
      onClick={handleLogout}
      className="w-auto bg-teal-700 text-white py-2 px-4 rounded-md hover:bg-teal-600 transition"
    >
      Cerrar Sesión
    </button>

    <button
      onClick={handleDeleteAccount}
      className="w-auto bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-400 transition"
    >
      Eliminar Cuenta
    </button>
  </div>
</div>
</div>
);
}