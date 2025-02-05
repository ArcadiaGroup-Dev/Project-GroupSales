import { ICreateAds } from "@/Interfaces/IAds";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export const fetchCreateAds = async (ads:ICreateAds) => {
    const response = await fetch(`${apiUrl}/ads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ads),
      });

  if (!response.ok) {
    throw new Error("Error al cargar publididad. Por favor, verifica los datos o si ya existe.");
  }

  return response.json();
};


export const fetchGetAds = async () => {
    const response = await fetch(`${apiUrl}/ads`, {
      method: 'GET',
   
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch publicidades');
    }
  
  const data = await response.json();
  return data;
};
  
export const fetchAdsById = async (id:string) => {
    const response = await fetch(`${apiUrl}/ads/${id}`);
    if (!response.ok) {
      throw new Error(`Error al obtener la publicidad: ${response.statusText}`);
    }
    return await response.json();
  };
  
  
  //Modificar producto
  export const fetchUpdateAds = async(id:string, ads:ICreateAds) => {
    const response = await fetch(`${apiUrl}/ads/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ads),
    });
  
  if (!response.ok) {
  throw new Error("Error al modificar publicidad");
  }
  
  return response.json();
  };


  export const fetchDeleteAds = async (id: string) => {
    const response = await fetch(`${apiUrl}/ads/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });
  
    if (!response.ok) {
      throw new Error('Error al eliminar publicidad');
    }
  
    return response; 
  };
  
