import { useState } from "react";
import { ICreateAds, AdType } from "@/Interfaces/IAds";
import { fetchCreateAds } from "../Fetchs/FetchAds";
import Notification from "./NotificationAds"; 

const CreateAds = () => {
  const [formData, setFormData] = useState<ICreateAds>({
    name: "",
    img: "",
    type: AdType.A,
    link:""
  });

  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNotification(null);
  
    try {
      await fetchCreateAds(formData);
      setNotification({ message: "Publicidad creada con éxito.", type: "success" });
      setFormData({ name: "", img: "", type: AdType.A, link: "" });  
    } catch (error) {
      console.log(error)
      setNotification({ message: "Error al crear la publicidad.", type: "error" });
    }
  };
  

  return (
    <div className="flex justify-center ">
      <div className="shadow-lg  rounded-lg w-full max-w-md p-8  bg-white min-h-fit">
        <h1 className="text-xl font-semibold mb-6 text-gray-700 text-center">
          Crear <span className="text-tertiary">Publicidad</span>
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre de la publicidad</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 p-2 border-2 rounded-md shadow-sm focus:outline-none hover:cursor-pointer"
             
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Imagen ( URL / JPG / PNG / WEBP )</label>
            <input
              type="text"
              name="img"
              value={formData.img}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 border-2 p-2 rounded-md shadow-sm hover:cursor-pointer focus:outline-none"
             
              required
            />
          </div>
          <div>
        <label className="block text-sm font-medium text-gray-700">Link a publicidad (URL)</label>
        <input
          type="text"
          name="link"
          value={formData.link}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 border-2 p-2 rounded-md shadow-sm hover:cursor-pointer focus:outline-none"
        
          required
        />
      </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Tipo de Publicidad</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm hover:cursor-pointer focus:outline-none"
            >
              <option value={AdType.A}>Tipo A</option>
              <option value={AdType.B}>Tipo B</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-secondary text-white px-4 py-2 rounded-full hover:bg-teal-800 transition-colors duration-300 w-full"
          >
            Crear Publicidad
          </button>
        </form>

        {/* Mostrar la notificación */}
        {notification && (
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification(null)}
          />
        )}
      </div>
    </div>
  );
};

export default CreateAds;
