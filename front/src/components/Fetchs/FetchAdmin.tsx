import { IUser } from "@/Interfaces/IUser";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// Función para obtener los usuarios
export const getUsers =  async (): Promise<IUser[]> => {
    try {
      const response = await fetch(`${apiUrl}/users`); 
      if (!response.ok) {
        throw new Error('Error al obtener los usuarios');
      }
      const users: IUser[] = await response.json();
      return users;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  export const fetchToSeller = async (userId: string) => {
    try {
        const response = await fetch(`${apiUrl}/users/${userId}/seller`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: userId }),
        });

        if (!response.ok) {
            throw new Error('Error al convertir el usuario a vendedor');
        }

        console.log('Usuario convertido a vendedor exitosamente');
       
    } catch (error) {
        console.error('Error:', error);
    }
};

export const fetchToAdmin = async (userId: string) => {
    try {
        const response = await fetch(`${apiUrl}/users/${userId}/admin`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: userId }),
        });

        if (!response.ok) {
            throw new Error('Error al convertir el usuario a administrador');
        }

        console.log('Usuario convertido a administrador exitosamente');
       
    } catch (error) {
        console.error('Error:', error);
    }
};

export const fetchDeleteUser = async (userId: string) => {
    try {
        const response = await fetch(`${apiUrl}/users/${userId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: userId }),
        });

        if (!response.ok) {
            throw new Error('Error al eliminar usuario');
        }

        console.log('Usuario eliminado');
       
    } catch (error) {
        console.error('Error:', error);
    }
};