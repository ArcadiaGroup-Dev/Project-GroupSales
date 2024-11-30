"use client"
import React from 'react'
import { useState } from "react";

const NewPartner = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert("Formulario enviado con éxito!");
    } else {
      alert("Hubo un problema al enviar el formulario.");
    }
  };

  
  return (
    <div className="mx-auto mt-24 sm:px-6 lg:px-8">
      <form
        onSubmit={handleSubmit}
        className="mx-auto bg-white mb-0 mt-16 max-w-4xl space-y-8 p-8 shadow-2xl shadow-gray-500/50 rounded-lg"
      >
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold text-gray-600 sm:text-3xl">Formulario de contacto</h1>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8">
          {/* Nombre */}
          <div className="col-span-3 flex justify-center">
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full sm:w-2/3 rounded-lg border-2 border-gray-200 p-4 text-sm shadow-md shadow-gray-400 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
              placeholder="Nombre"
            />
          </div>
          {/* Correo electrónico */}
          <div className="col-span-3 flex justify-center">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full sm:w-2/3 rounded-lg border-2 border-gray-200 p-4 text-sm shadow-md shadow-gray-400 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
              placeholder="Correo electrónico"
            />
          </div>
          {/* Mensaje */}
          <div className="col-span-3 flex justify-center">
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full sm:w-2/3 rounded-lg border-2 border-gray-200 p-4 text-sm shadow-md shadow-gray-400 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
              placeholder="Escribe tu mensaje"
            />
          </div>
        </div>
        <button
          type="submit"
          className="mx-auto flex justify-center items-center w-1/3 py-3 px-4 bg-tertiary text-white font-bold rounded-md hover:bg-orange-400 focus:outline-none shadow-md shadow-gray-400"
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

export default NewPartner;
