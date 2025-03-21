"use client";
import React, { useState, useEffect, useContext } from "react";
import { IUpdateUserData } from "@/Interfaces/IUser";
import { fetchEditUser, fetchUserId } from "../Fetchs/FetchsUser";
import { NotifFormsUsers } from "../Notifications/NotifiFormsUsers";
import { UserContext } from "@/context/userContext";

export default function DatosTransferencia() {
  const [data, setData] = useState<IUpdateUserData>({
    bank: "",
    account: "",
    cardHolder: "",
    alias: "",
    cbu: "",
  });
  const { user } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notificationMessage, setNotificationMessage] = useState<string | null>(null);
  const [warningMessage, setWarningMessage] = useState<string | null>(null); // Mensaje de advertencia

  const userId = user?.id;
  console.log("User ID desde el contexto:", userId);

  useEffect(() => {
    if (!userId) {
      console.error("No se encontró el ID de usuario en el contexto");
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        console.log("Obteniendo datos de transferencia para el usuario:", userId);
        const result = await fetchUserId(userId);
        console.log("Datos de transferencia recibidos:", result);
        setData(result);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [userId]);

  const handleChange = (key: keyof IUpdateUserData, value: string) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    if (!userId) {
      setError("ID de usuario no encontrado");
      return;
    }

    // Validación de campos completos
    if (!data.bank || !data.account || !data.cardHolder || !data.alias || !data.cbu) {
      setWarningMessage("Todos los campos son obligatorios. Por favor, completa todos los datos.");
      return;
    } else {
      setWarningMessage(null); // Limpiar advertencia si todos los campos están completos
    }

    try {
      setLoading(true);
      console.log("Guardando datos de transferencia para el usuario:", userId);
      await fetchEditUser(userId, data);
      setNotificationMessage("Datos actualizados exitosamente");
      setIsEditing(false);
    } catch (err) {
      const errorText = (err as Error).message;
      setError(errorText);
      setNotificationMessage(`Error al editar datos: ${errorText}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-6 mt-24 max-w-lg mx-auto bg-white shadow-xl rounded-lg">
      {notificationMessage && <NotifFormsUsers message={notificationMessage} />}
      {warningMessage && <p className="text-red-500 text-sm">{warningMessage}</p>} {/* Mostrar advertencia */}

      <h2 className="text-2xl font-semibold text-gray-700 mb-6">Datos de Transferencia</h2>
      <p className="text-gray-500 text-sm mb-4">Completa los siguientes campos con la información bancaria. Será la cuenta a la que tus clientes depositarán cuando elijan la opción transferencia bancaria</p>
      <p className="text-gray-500 font-bold text-sm mb-4">Sé cuidadoso/a, los datos que ingreses aquí serán a los que se realizará la transferencia.
     </p>
      {/* Campo: Banco */}
      <div className="mb-2">
        <label className="block text-gray-700 font-bold mb-1">Banco</label>
        <input
          className={`w-full bg-slate-200 p-1 border ${isEditing ? "border-gray-300 text-gray-700" : "border-transparent"} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary`}
          type="text"
          value={data.bank}
          readOnly={!isEditing}
          onChange={(e) => handleChange("bank", e.target.value)}
        />
      </div>

      {/* Campo: Cuenta */}
      <div className="mb-2">
        <label className="block text-gray-700 font-bold mb-1">Número de Cuenta</label>
        <input
          className={`w-full bg-slate-200 p-1 border ${isEditing ? "border-gray-300 text-gray-700" : "border-transparent"} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary`}
          type="text"
          value={data.account}
          readOnly={!isEditing}
          onChange={(e) => handleChange("account", e.target.value)}
        />
      </div>

      {/* Campo: Titular */}
      <div className="mb-2">
        <label className="block text-gray-700 font-bold mb-1">Titular de la Cuenta</label>
        <input
          className={`w-full bg-slate-200 p-1 border ${isEditing ? "border-gray-300 text-gray-700" : "border-transparent"} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary`}
          type="text"
          value={data.cardHolder}
          readOnly={!isEditing}
          onChange={(e) => handleChange("cardHolder", e.target.value)}
        />
      </div>

      {/* Campo: Alias */}
      <div className="mb-2">
        <label className="block text-gray-700 font-bold mb-1">Alias</label>
        <input
          className={`w-full bg-slate-200 p-1 border ${isEditing ? "border-gray-300 text-gray-700" : "border-transparent"} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary`}
          type="text"
          value={data.alias}
          readOnly={!isEditing}
          onChange={(e) => handleChange("alias", e.target.value)}
        />
      </div>

      {/* Campo: CBU */}
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-1">CBU</label>
        <input
          className={`w-full bg-slate-200 p-1 border ${isEditing ? "border-gray-300 text-gray-700" : "border-transparent"} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary`}
          type="text"
          value={data.cbu}
          readOnly={!isEditing}
          onChange={(e) => handleChange("cbu", e.target.value)}
        />
      </div>

      {/* Botón de guardar o editar */}
      <div className="flex justify-center space-x-4">
        {isEditing ? (
          <button
            onClick={handleSave}
            className="w-2/6 bg-tertiary text-white py-2 rounded-md hover:bg-orange-400 transition duration-300"
          >
            Guardar
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="w-2/6 bg-secondary text-white py-2 rounded-md hover:bg-teal-900 transition duration-300"
          >
            Editar Datos
          </button>
        )}
      </div>
    </div>
  );
}
