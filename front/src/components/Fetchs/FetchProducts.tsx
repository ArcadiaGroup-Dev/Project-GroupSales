import { ICategory, ICreateProduct, IProduct } from "@/Interfaces/IProduct";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;


//Ver todos los productos
export const fetchGetProducts = async () => {
    const response = await fetch(`${apiUrl}/products`, {
      method: 'GET',
   
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
  
  const data = await response.json();
  return data;
};


  
export const fetchProductById = async (id:string) => {
    const response = await fetch(`${apiUrl}/products/${id}`);
    if (!response.ok) {
      throw new Error(`Error al obtener el producto: ${response.statusText}`);
    }
    return await response.json();
  };
  
const fetchUserEmailByProductId = async (productId: string) => {
  try {
    const response = await fetch(`${apiUrl}/products/${productId}`);

    if (!response.ok) {
      throw new Error("Error al obtener el producto.");
    }

    const productData = await response.json();
    const userEmail = productData.user.email;

    console.log("Email obtenido:", userEmail);

    return userEmail;
  } catch (error) {
    console.error("Error al obtener el email:", error);
    return null;
  }
};

  
  //Modificar producto
  export const fetchUpdateProduct = async(id:string, product:IProduct) => {
    const response = await fetch(`${apiUrl}/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
  
  if (!response.ok) {
  throw new Error("Error al modificar producto");
  }
  
  return response.json();
  };


  //Crear productos

export const fetchUploadProduct = async (product:ICreateProduct) => {
    const response = await fetch(`${apiUrl}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

  if (!response.ok) {
    throw new Error("Error al cargar producto. Por favor, verifica los datos o si el producto ya existe.");
  }

  return response.json();
};


// Cambiar el estado de un producto (usando DELETE)
export const fetchDeleteProduct = async (id: string) => {
  const response = await fetch(`${apiUrl}/products/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Error al eliminar el producto');
  }

  return response; 
};


//Ver categorías

export const fetchCategories = async (): Promise<ICategory[]> => {
  try {
    const response = await fetch(`${apiUrl}/categories`);
     
    if (!response.ok) {
      throw new Error("Error al obtener las categorías");
    }
    const categories: ICategory[] = await response.json(); 
    return categories;
  } catch (error) {
    console.error(error);
    return []; 
  }
};