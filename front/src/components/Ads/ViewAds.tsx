import { useEffect, useState } from "react";
import { fetchGetAds, fetchDeleteAds, fetchAdsById, fetchUpdateAds } from "../Fetchs/FetchAds";
import { FiTrash2, FiEdit } from "react-icons/fi";
import Notification from "./NotificationAds";

const ViewAds = () => {
  const [ads, setAds] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState({ name: '', type: '' });

  const [isDeleteConfirmVisible, setIsDeleteConfirmVisible] = useState(false);
  const [adToDelete, setAdToDelete] = useState<any | null>(null);

  const [editAd, setEditAd] = useState<any | null>(null);
  const [name, setName] = useState<string>('');
  const [img, setImg] = useState<string>('');
  const [type, setType] = useState<string>('');

  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    loadAds();
  }, []);

  const loadAds = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchGetAds();
      setAds(data);
    } catch (error) {
      setError("Error al cargar las publicidades. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id: string) => {
    setIsDeleteConfirmVisible(true);
    setAdToDelete(id);
  };

  const confirmDelete = async () => {
    try {
      if (adToDelete) {
        await fetchDeleteAds(adToDelete);
        setAds(ads.filter((ad) => ad.id !== adToDelete)); 
        setNotification({ message: "Publicidad eliminada con éxito.", type: "success" });
      }
      setIsDeleteConfirmVisible(false);
      setAdToDelete(null);
    } catch (error) {
      setNotification({ message: "Error al eliminar la publicidad.", type: "error" });
      setIsDeleteConfirmVisible(false);
      setAdToDelete(null);
    }
  };

  const cancelDelete = () => {
    setIsDeleteConfirmVisible(false);
    setAdToDelete(null);
  };

  const handleEdit = async (id: string) => {
    try {
      const adToEdit = await fetchAdsById(id);
      setEditAd(adToEdit);
      setName(adToEdit.name);
      setImg(adToEdit.img);
      setType(adToEdit.type);
    } catch (error) {
      setNotification({ message: "Error al cargar la publicidad para editar.", type: "error" });
    }
  };

  const handleUpdate = async () => {
    try {
      const updatedAd = { ...editAd, name, img, type };
      await fetchUpdateAds(editAd.id, updatedAd);
      setNotification({ message: "Publicidad modificada con éxito.", type: "success" });
      loadAds();
      setEditAd(null); 
    } catch (error) {
      setNotification({ message: "Error al modificar la publicidad.", type: "error" });
    }
  };

  if (loading) {
    return <p className="text-blue-500">Cargando publicidades...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="space-y-4">
      {ads.length === 0 ? (
        <p className="text-gray-700">No hay publicidades disponibles.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ads.map((ad) => (
            <div key={ad.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <h2 className="text-xl font-bold">{ad.name}</h2>
              <img src={ad.img} alt={ad.name} className="w-full h-48 object-cover rounded mt-2" />
              <p className="mt-2 text-gray-600">Tipo: {ad.type}</p>
              <div className="mt-4 flex justify-between">
                <button onClick={() => handleEdit(ad.id)} className="text-blue-500 hover:text-blue-700">
                  <FiEdit className="h-6 w-6" />
                </button>
                <button onClick={() => handleDelete(ad.id)} className="text-red-500 hover:text-red-700">
                  <FiTrash2 className="h-6 w-6" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {isDeleteConfirmVisible && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-600 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-lg font-bold mb-4">Confirmar eliminación</h3>
            <p>¿Estás seguro de que deseas eliminar esta publicidad?</p>
            <div className="mt-4 flex justify-end space-x-4">
              <button onClick={cancelDelete} className="px-4 py-2 bg-gray-300 rounded">Cancelar</button>
              <button onClick={confirmDelete} className="px-4 py-2 bg-red-500 text-white rounded">Eliminar</button>
            </div>
          </div>
        </div>
      )}

      {editAd && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-600 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-bold mb-4">Editar Publicidad</h3>
            <div className="space-y-4">
              <div>
                <label className="block">Nombre</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border p-2 w-full"
                />
              </div>
              <div>
                <label className="block">URL Imagen</label>
                <input
                  type="text"
                  value={img}
                  onChange={(e) => setImg(e.target.value)}
                  className="border p-2 w-full"
                />
              </div>
              <div>
                <label className="block">Tipo</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="border p-2 w-full"
                >
                  <option value="A">A</option>
                  <option value="B">B</option>
                </select>
              </div>
              <div className="mt-4 flex justify-end space-x-4">
                <button onClick={() => setEditAd(null)} className="px-4 py-2 bg-gray-300 rounded">Cancelar</button>
                <button onClick={handleUpdate} className="px-4 py-2 bg-blue-500 text-white rounded">Actualizar</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
};

export default ViewAds;
