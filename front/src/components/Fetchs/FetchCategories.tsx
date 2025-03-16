const apiUrl = process.env.NEXT_PUBLIC_API_URL;


//Traer categorias
export const fetchGetCategories = async () => {
    try {
      const response = await fetch(`${apiUrl}/categories`, {
        method: "GET",
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
  };
  
