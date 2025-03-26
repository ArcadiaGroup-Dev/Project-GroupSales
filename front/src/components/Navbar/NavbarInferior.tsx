"use client";
import { useState, useEffect } from "react";
import { fetchGetCategories } from "../Fetchs/FetchCategories";
import { ICategories } from "@/Interfaces/ICategories";
import { Menu, X } from "lucide-react"; // Íconos para el menú

interface CategoryNavbarProps {
  onFilterProducts: (category: string) => void;
}

export default function CategoryNavbar({ onFilterProducts }: CategoryNavbarProps) {
  const [categoryOpen, setCategoryOpen] = useState<string>("");
  const [categories, setCategories] = useState<ICategories[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false); // Estado del menú hamburguesa

  useEffect(() => {
    const loadCategories = async () => {
      const data = await fetchGetCategories();
      setCategories(data);
    };
    loadCategories();
  }, []);

  const handleCategoryClick = (category: string) => {
    setCategoryOpen(category === categoryOpen ? "" : category);
    onFilterProducts(category);
  };

  return (
    <nav className="bg-teal-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        {/* Botón de menú hamburguesa en sm y menor */}
        <button 
          className="sm:hidden text-white focus:outline-none" 
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Categorías - visibles en pantallas medianas y grandes */}
        <div className="hidden sm:flex space-x-8">
          {categories.map((category) => (
            <div
              key={category.id}
              className="cursor-pointer hover:text-tertiary hover:scale-105 transition-all"
              onClick={() => handleCategoryClick(category.name)}
            >
              {category.name}
            </div>
          ))}
        </div>
      </div>

      {/* Menú desplegable en sm y menor */}
      {isOpen && (
        <div className="sm:hidden mt-2 flex flex-col space-y-2 bg-teal-700 p-4 rounded-md">
          {categories.map((category) => (
            <div
              key={category.id}
              className="cursor-pointer hover:text-tertiary hover:scale-105 transition-all"
              onClick={() => {
                handleCategoryClick(category.name);
                setIsOpen(false); // Cierra el menú al seleccionar una categoría
              }}
            >
              {category.name}
            </div>
          ))}
        </div>
      )}
    </nav>
  );
}
