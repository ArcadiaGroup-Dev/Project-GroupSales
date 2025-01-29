import React, { useState } from "react";

interface EditProfileProps {
  onCancel: () => void;
  onSave: (data: { address: string; phone: string }) => void;
  initialAddress: string; 
  initialPhone: string;   
  initialCity:string
}

export const EditProfile: React.FC<EditProfileProps> = ({ 
  onCancel, 
  onSave, 
  initialAddress, 
  initialPhone,
  initialCity 
}) => {
  const [address, setAddress] = useState<string>(initialAddress);
  const [phone, setPhone] = useState<string>(initialPhone);
  const [city, setCity] = useState<string>(initialCity);

  const handleSave = () => {
    
    const updatedData = {
      address: address || initialAddress, 
      phone: phone || initialPhone,  
      city:city || initialCity,
    };
    onSave(updatedData);
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
      <div className="flex space-x-4">
        <button
          onClick={handleSave}
          className="bg-teal-700 text-white py-2 px-4 rounded-md hover:bg-teal-600 transition"
        >
          Guardar
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
