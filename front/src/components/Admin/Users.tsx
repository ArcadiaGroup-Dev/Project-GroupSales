"use client"
import React, { useEffect, useState } from 'react';
import { GoPerson } from "react-icons/go";
import { fetchDeleteUser, fetchToAdmin, fetchToSeller, getUsers } from '../Fetchs/FetchAdmin';
import { IUser } from '@/Interfaces/IUser';
import { ConfirmationMessage } from '../Notifications/NotificationAdmin';
import { NotifFormsUsers } from '../Notifications/NotifiFormsUsers';
import { sendApprovalAdmin, sendApprovalRequestEmail } from '../Fetchs/FetchsEmail';

export default function Users() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]); // Estado para usuarios filtrados
  const [searchQuery, setSearchQuery] = useState<string>(''); // Estado para la búsqueda
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState<string | null>(null); 
  const [roleToAssign, setRoleToAssign] = useState<'seller' | 'admin' | 'delete' | null>(null); 

  // Obtener los usuarios al montar el componente
  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getUsers();
      // Filtrar usuarios activos
      const activeUsers = data.filter((user) => user.isActive);
      setUsers(activeUsers);
      setFilteredUsers(activeUsers); // Inicializamos filteredUsers con todos los usuarios activos
    };
    fetchUsers();
  }, []);

  // Función para manejar el cambio en el input de búsqueda
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    // Filtrar usuarios según el query de búsqueda
    const filtered = users.filter((user) => 
      user.name.toLowerCase().includes(query) || 
      user.email.toLowerCase().includes(query) || 
      user.address?.toLowerCase().includes(query) // Puedes añadir más campos para filtrar
    );
    setFilteredUsers(filtered); // Actualizamos los usuarios filtrados
  };

  const confirmToSeller = async () => {
    if (selectedUserId) {
      try {
        // Primero, cambiamos el rol del usuario a 'seller'
        await fetchToSeller(selectedUserId);
  
        // Luego, obtenemos los correos de administrador y vendedor
        const selectedUser = users.find(user => user.id === selectedUserId);
        if (selectedUser) {
          const adminEmail = 'mmipyme@gmail.com'; // Debes obtener el correo del administrador
          const sellerEmail = selectedUser.email; // El correo del vendedor seleccionado
  
          // Llamamos a la función que envía el correo de aprobación
          await sendApprovalRequestEmail(adminEmail, sellerEmail);
        }
  
        // Actualizamos el estado de la lista de usuarios
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === selectedUserId ? { ...user, role: 'seller' } : user
          )
        );
        
        setNotificationMessage('El usuario ahora puede vender');
        setSelectedUserId(null);
        setRoleToAssign(null);
        setIsConfirmationVisible(false);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };
  
  const confirmAdmin = async () => {
    if (selectedUserId) {
      try {
        // Actualizar el rol del usuario a administrador
        await fetchToAdmin(selectedUserId);
  
        // Obtener los datos del usuario actualizado (el que será promovido)
        const updatedUser = users.find(user => user.id === selectedUserId);
        if (updatedUser) {
          // Obtener el correo del usuario que está siendo promovido (el seller)
          const sellerEmail = updatedUser.email;
  
          // Llamar a la función para enviar el correo de notificación al admin
          await sendApprovalAdmin('mmipyme@gmail.com', sellerEmail);  // El correo del admin y del vendedor
  
          // Actualizar la lista de usuarios con el nuevo rol de administrador
          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user.id === selectedUserId ? { ...user, role: 'admin' } : user
            )
          );
  
          setNotificationMessage('El usuario ahora es administrador y se le notificó por correo');
          setSelectedUserId(null);
          setRoleToAssign(null);
          setIsConfirmationVisible(false);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };
  
  

  const confirmDeleteUser = async () => {
    if (selectedUserId) {
      try {
        await fetchDeleteUser(selectedUserId);
        // Filtrar usuarios activos después de eliminar
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user.id !== selectedUserId && user.isActive)
        );
        setNotificationMessage('Usuario eliminado');
        setSelectedUserId(null);
        setRoleToAssign(null);
        setIsConfirmationVisible(false);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const handleRoleChange = (userId: string, role: 'seller' | 'admin' | 'delete') => {
    setSelectedUserId(userId);
    setRoleToAssign(role);
    setIsConfirmationVisible(true);
  };

  // Mensaje a mostrar según el rol
  const roleMessage = roleToAssign === 'seller'
    ? 'Si haces click en aceptar, este usuario tendrá permisos de vendedor.'
    : roleToAssign === 'admin'
    ? 'Si haces click en aceptar, este usuario será convertido en administrador.'
    : roleToAssign === 'delete'
    ? 'Si haces click en aceptar, este usuario será eliminado.'
    : ''; 

  return (
    <div>
      {notificationMessage && <NotifFormsUsers message={notificationMessage} />} 

      {isConfirmationVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <ConfirmationMessage
            roleMessage={roleMessage}
            onAccept={roleToAssign === 'seller' ? confirmToSeller : roleToAssign === 'admin' ? confirmAdmin : confirmDeleteUser}
            onCancel={() => {
              setIsConfirmationVisible(false);
              setSelectedUserId(null);
              setRoleToAssign(null);
            }}
          />
        </div>
      )}
<h1 className="text-secondary bg-gray-300 font-bold border-b border-gray-300 text-center p-2 mt-24">Administrar usuarios</h1>
      {/* Barra de búsqueda */}
      <div className="flex justify-center mt-2">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Buscar por nombre, correo o dirección..."
          className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg"

        />
      </div>

      <div className="mt-24 flex flex-wrap gap-4 md:justify-start justify-center m-4">
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm transition hover:cursor-pointer hover:shadow-lg sm:p-6"
          >
            <div className="flex items-center bg-gray-300  rounded font-bold w-auto p-2">
              <GoPerson className="mr-2 font-bold" />
              <span>{user.name}</span>
            </div>

            <h2 className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
              Email: {user.email}
            </h2>
            <h2 className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
              Dirección: {user.address || 'N/A'}
            </h2>
            <h2 className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
              Teléfono: {user.phone || 'N/A'}
            </h2>
            <h2 className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
              Fecha de nacimiento: {user.birthdate ? new Date(user.birthdate).toLocaleDateString() : 'N/A'}
            </h2>
            <h2 className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
              Ciudad: {user.city || 'N/A'}
            </h2>
            <h2 className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
              País: {user.country || 'N/A'}
            </h2>
            <h2 className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
              Rol: {user.role || 'N/A'}
            </h2>

            <div className="flex flex-col gap-4 mt-4">
              <button onClick={() => handleRoleChange(user.id, 'admin')} className="group inline-flex items-center gap-1 text-sm font-medium text-blue-600 p-1 hover:bg-blue-100">
                Convertir usuario a administrador
              </button>
              <button onClick={() => handleRoleChange(user.id, 'seller')} className="group inline-flex items-center gap-1 text-sm font-medium text-blue-600 p-1 hover:bg-blue-100">
                Permiso de usuario para vendedor
              </button>
              <button onClick={() => handleRoleChange(user.id, 'delete')} className="group inline-flex items-center gap-1 text-sm font-medium text-blue-600 p-1 hover:bg-blue-100">
                Eliminar usuario
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
