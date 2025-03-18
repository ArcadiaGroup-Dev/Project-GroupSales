import React, { useState, useEffect } from "react";
import Link from "next/link";
import { fetchUserId } from "../Fetchs/FetchsUser";
import { NotifFormsUsers } from "../Notifications/NotifiFormsUsers";
import { sendPermissionRequestEmail } from "../Fetchs/FetchsEmail";

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
  
    // Verifica si el userId existe
    if (userId) {
      try {
        // Obtener datos del usuario desde el localStorage
        const storedAuthData = localStorage.getItem("user");
        
        if (storedAuthData) {
          const parsedSession = JSON.parse(storedAuthData);
          const sellerEmail = parsedSession.user.email; // Correo del vendedor
          console.log("Correo del vendedor (sellerEmail):", sellerEmail);
  
          const adminEmail = "mmipyme@gmail.com"; // Correo del administrador
          console.log("Correo del administrador (adminEmail):", adminEmail);
  
          // Aquí se llama a la función que envía el correo
          await sendPermissionRequestEmail(adminEmail, sellerEmail);
  
          // Guardamos en localStorage que se ha solicitado el permiso
          localStorage.setItem(`permissionRequested_${userId}`, "true");
  
          // Cambiamos el estado para mostrar una notificación de éxito
          setHasRequestedPermission(true);
          setNotificationMessage('Solicitud de permiso enviada correctamente.');
          setNotificationVisible(true);
  
        }
      } catch (error) {
        console.error("Error al procesar la solicitud de permiso:", error);
        // Puedes agregar aquí un mensaje de error si es necesario
        setNotificationMessage('Hubo un error al procesar la solicitud de permiso.');
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
  <div className="space-y-6">
   <div className="flex flex-col items-center sm:items-start space-y-4">
    <Link href="/myAccount/dataTransfer">
      <button className="bg-secondary text-white rounded-md px-6 py-3 w-full sm:w-[250px] transition-all duration-300 transform hover:bg-white hover:border-secondary hover:text-secondary hover:scale-105 shadow-lg">
        Datos para pagos por transferencia
      </button>
    </Link>
    <p className="text-sm text-gray-600 text-center sm:text-left sm:w-1/2">
      Agrega o modifica tus datos para pagos por transferencia
    </p>
  </div>

  <div className="flex flex-col items-center sm:items-start space-y-4">
    <Link href="/myAccount/create/product">
      <button className="bg-secondary text-white rounded-md px-6 py-3 w-full sm:w-[250px] transition-all duration-300 transform hover:bg-white hover:border-secondary hover:text-secondary hover:scale-105 shadow-lg">
        Crear productos / servicios
      </button>
    </Link>
    <p className="text-sm text-gray-600 text-center sm:text-left sm:w-1/2">
      Crea o modifica tus productos o servicios
    </p>
  </div>

  <div className="flex flex-col items-center sm:items-start space-y-4">
    <Link href="/myAccount/view">
      <button className="bg-secondary text-white rounded-md px-6 py-3 w-full sm:w-[250px] transition-all duration-300 transform hover:bg-white hover:border-secondary hover:text-secondary hover:scale-105 shadow-lg">
        Ver productos / servicios
      </button>
    </Link>
    <p className="text-sm text-gray-600 text-center sm:text-left sm:w-1/2">
      Visualiza y gestiona tus productos y servicios
    </p>
  </div>
</div>

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
