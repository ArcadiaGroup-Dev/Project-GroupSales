"use client"
import React, { useState } from "react";

interface EditProductProps {
    product: {
      name: string;
      description: string;
      price: number | null;
      stock: number | null;
      imageUrl: string;
      categoryId: string;
    };
    onCancel: () => void;
    onSave: (data: {
      name: string;
      description: string;
      price: number | null;
      stock: number | null;
      imageUrl: string;
      categoryId: string;
    }) => void;
  }
  

const EditProduct: React.FC<EditProductProps> = ({ product, onCancel, onSave }) => {
  const [name, setName] = useState<string>(product.name);
  const [description, setDescription] = useState<string>(product.description);
  const [price, setPrice] = useState<number | null>(product.price);
  const [stock, setStock] = useState<number | null>(product.stock);
  const [imageUrl, setImageUrl] = useState<string>(product.imageUrl);
  const [categoryId, setCategoryId] = useState<string>(product.categoryId);

  const handleSave = () => {
    onSave({ name, description, price, stock, imageUrl, categoryId });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="font-medium text-gray-600">Nombre del producto:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="font-medium text-gray-600">Descripción:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="font-medium text-gray-600">Precio:</label>
        <input
          type="number"
          value={price || ""}
          onChange={(e) => setPrice(e.target.value ? parseFloat(e.target.value) : null)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="font-medium text-gray-600">Stock:</label>
        <input
          type="number"
          value={stock || ""}
          onChange={(e) => setStock(e.target.value ? parseInt(e.target.value) : null)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="font-medium text-gray-600">URL de la imagen:</label>
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="font-medium text-gray-600">Categoría:</label>
        <input
          type="text"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="mt-4 flex gap-4">
        <button
          onClick={handleSave}
          className="bg-tertiary text-white px-4 py-2 rounded-md hover:bg-orange-600"
        >
          Guardar
        </button>
        <button
          onClick={onCancel}
          className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-400"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default EditProduct;
