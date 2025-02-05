import React, { useState, useEffect } from "react";
import Link from "next/link";
import { fetchUserId } from "../Fetchs/FetchsUser";
import { sendPermissionRequestEmail } from "../Fetchs/FetchsEmail";
import { NotifFormsUsers } from "../Notifications/NotifiFormsUsers";

const PublishSection: React.FC = () => {
  const [role, setRole] = useState<string | undefined>(undefined);
  const [hasRequestedPermission, setHasRequestedPermission] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationVisible, setNotificationVisible] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedAuthData = localStorage.getItem("user");

      if (storedAuthData) {
        try {
          const parsedSession = JSON.parse(storedAuthData);
          const { user } = parsedSession;
          setUserId(user.id);

          fetchUserId(user.id).then((data) => {
            if (data) {
              setRole(data.role);
              parsedSession.role = data.role;
              localStorage.setItem("user", JSON.stringify(parsedSession));
            }
          });

          const permissionStatus = localStorage.getItem(`permissionRequested_${user.id}`);
          if (permissionStatus === "true") {
            setHasRequestedPermission(true);
          }
        } catch (error) {
          console.error("Error al parsear authData:", error);
        }
      }
    }
  }, []);


  const handleRequestPermission = async () => {
    console.log("User ID: ", userId);
    if (userId) {
      try {
        const storedAuthData = localStorage.getItem("user");
        if (storedAuthData) {
          const parsedSession = JSON.parse(storedAuthData);
          const sellerEmail = parsedSession.user.email;
          console.log("Correo del vendedor (sellerEmail):", sellerEmail);
  
          const adminEmail = "gimenapascuale@gmai.com";
          console.log("Correo del administrador (adminEmail):", adminEmail);
  
          const data = await sendPermissionRequestEmail(adminEmail, sellerEmail);
  
          localStorage.setItem(`permissionRequested_${userId}`, "true");
          setHasRequestedPermission(true);
  
          setNotificationMessage('Solicitud de permiso enviada correctamente.');
          setNotificationVisible(true);
          console.log(data); 
        }
      } catch (error) {
        console.error("Error al procesar la solicitud de permiso:", error);
        
      
        setNotificationMessage('Error al enviar la solicitud de permiso.');
        setNotificationVisible(true);
      }
    }
  };
  
  
  
  

  if (role === undefined) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="text-center space-y-6 px-4 sm:px-8 md:px-16 lg:px-32">
      {role === "client" ? (
        <div className="space-y-4">
          {!hasRequestedPermission ? (
            <>
              <p className="text-sm md:text-md text-gray-600 font-semibold">
                Debes solicitar permiso para vender: Al hacer click aqui, el administrador evaluará tu solicitud y responderá a la brevedad.
              </p>
              <button
                onClick={handleRequestPermission}
                className="bg-secondary text-white rounded-lg px-8 py-4 transition-all duration-300 transform hover:bg-white hover:border-secondary hover:border-2 hover:text-secondary hover:cursor-pointer  hover:shadow-2xl focus:outline-none"
              >
                <span className="font-semibold text-lg">Solicitar Permiso</span>
              </button>
            </>
          ) : (
            <button className="bg-gray-300 text-gray-600 rounded-lg px-6 py-3 cursor-not-allowed transition-all duration-300 transform shadow-lg">
              Permiso solicitado, pronto tendrás una respuesta
            </button>
          )}
        </div>
      ) : role === "seller" ? (
        <>
          <Link href="/myAccount/create/product">
            <button className="bg-secondary text-white rounded-lg w-full sm:w-auto px-6 py-3 transition-all duration-300 transform hover:bg-white hover:border-secondary hover:text-secondary hover:scale-105 shadow-lg hover:shadow-xl">
              Crear Productos / Servicios
            </button>
          </Link>
          <h2 className="text-lg text-gray-700 pb-4 font-medium sm:text-xl">Selecciona para crear productos o servicios.</h2>

          <Link href="/myAccount/view">
            <button className="bg-secondary text-white rounded-lg w-full sm:w-auto px-6 py-3 transition-all duration-300 transform hover:bg-white hover:border-secondary hover:text-secondary hover:scale-105 shadow-lg hover:shadow-xl">
              Ver mis productos/servicios publicados
            </button>
          </Link>
          <h2 className="text-lg text-gray-700 font-medium sm:text-xl">Selecciona para ver, modificar o eliminar productos o servicios.</h2>
        </>
      ) : (
        <p className="text-red-500">Rol desconocido</p>
      )}
       {notificationVisible && (
      <NotifFormsUsers message={notificationMessage} />
    )}
    </div>
  );
};

export default PublishSection;
