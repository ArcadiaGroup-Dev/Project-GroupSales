import React, { useState } from "react";
import { fetchEditUser } from "../Fetchs/FetchsUser";

interface EditProfileProps {
  onCancel: () => void;
  onSave: (data: { address: string; phone: string; city: string }) => void;
  initialAddress: string;
  initialPhone: string;
  initialCity: string;
  userId: string; // Asumimos que el ID de usuario será pasado como propiedad
}

export const EditProfile: React.FC<EditProfileProps> = ({
  onCancel,
  onSave,
  initialAddress,
  initialPhone,
  initialCity,
  userId, // Obtenemos el ID de usuario como propiedad
}) => {
  const [address, setAddress] = useState<string>(initialAddress);
  const [phone, setPhone] = useState<string>(initialPhone);
  const [city, setCity] = useState<string>(initialCity);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    const updatedData = {
      address: address || initialAddress,
      phone: phone || initialPhone,
      city: city || initialCity,
    };

    setIsLoading(true);
    setError(null); // Resetear errores previos

    try {
      // Llamar a la función fetchEditUser que realiza la solicitud PUT
      await fetchEditUser(userId, updatedData);
      
      // Si la actualización es exitosa, se ejecuta onSave y onCancel
      onSave(updatedData);
      setIsLoading(false);
      onCancel(); // Cerrar el formulario

    } catch (error: any) {
      // Manejar errores
      setError(error.message || "Hubo un problema al guardar los datos");
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="font-medium text-gray-600">Dirección:</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="font-medium text-gray-600">Ciudad:</label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="font-medium text-gray-600">Teléfono:</label>
        <input
          type="number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      {error && <p className="text-red-600">{error}</p>}
      <div className="flex space-x-4">
        <button
          onClick={handleSave}
          className="bg-teal-700 text-white py-2 px-4 rounded-md hover:bg-teal-600 transition"
          disabled={isLoading}
        >
          {isLoading ? "Guardando..." : "Guardar"}
        </button>
        <button
          onClick={onCancel}
          className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};
