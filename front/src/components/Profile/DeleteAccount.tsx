import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { NotifFormsUsers } from "../Notifications/NotifiFormsUsers";
import { UserContext } from "@/context/userContext";
import { deleteUserAccount } from "../Fetchs/FetchsUser";

interface DeleteAccountProps {
  userId: string;
  handleCloseDeleteAccount: () => void;
}


export default function DeleteAccount({ userId, handleCloseDeleteAccount }: DeleteAccountProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const { logOut } = useContext(UserContext);
  const router = useRouter();
  const [notificationMessage, setNotificationMessage] = useState<string | null>(null);

  const handleConfirmDelete = async () => {
    setIsProcessing(true);
    const success = await deleteUserAccount(userId); 

    if (success) {
      setNotificationMessage("Cuenta eliminada con éxito");

    
      localStorage.removeItem('token');
      logOut();

  
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } else {
      setNotificationMessage("Error al eliminar la cuenta");
    }
    
    setIsProcessing(false); // Detener el procesamiento
  };

  return (
    <>
      {notificationMessage && <NotifFormsUsers message={notificationMessage} />}
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="rounded-2xl border border-blue-100 bg-white p-4 shadow-lg sm:p-6 lg:p-8">
          <p className="mt-4 text-gray-500">
            ¿Estás seguro que deseas eliminar tu cuenta? Esta acción es irreversible.
          </p>
          <div className="mt-6 sm:flex sm:gap-4">
            <button
              onClick={handleConfirmDelete}
              disabled={isProcessing}
              className={`inline-block w-full rounded-lg px-5 py-3 text-center text-sm font-semibold text-white sm:w-auto ${
                isProcessing ? "bg-gray-400" : "bg-red-500 hover:bg-red-400"
              }`}
            >
              {isProcessing ? "Procesando..." : "Sí, Eliminar"}
            </button>
            <button
              onClick={handleCloseDeleteAccount}
              className="mt-2 inline-block w-full rounded-lg bg-gray-50 px-5 py-3 text-center text-sm font-semibold text-gray-500 sm:mt-0 sm:w-auto"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
