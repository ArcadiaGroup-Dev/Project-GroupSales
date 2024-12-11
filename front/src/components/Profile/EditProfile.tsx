import React, { useState } from "react";

interface EditProfileProps {
  onCancel: () => void;
  onSave: (data: { address: string; phone: string }) => void;
}

const EditProfile: React.FC<EditProfileProps> = ({ onCancel, onSave }) => {
  const [address, setAddress] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  const handleSave = () => {
    onSave({ address, phone }); // Llama a onSave para guardar los datos
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
        <label className="font-medium text-gray-600">Teléfono:</label>
        <input
          type="number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="mt-4 flex gap-4">
        <button
          onClick={handleSave}
          className="bg-tertiary text-white px-4 py-2 rounded-md hover:bg-orange-600"
        >
          Guardar
        </button>
        <button
          onClick={onCancel}
          className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-400"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
