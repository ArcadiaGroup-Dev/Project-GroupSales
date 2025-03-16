"use client";
import { useState, useEffect } from "react";
import { fetchGetCategories } from "../Fetchs/FetchCategories";
import { ICategories } from "@/Interfaces/ICategories";

interface CategoryNavbarProps {
  onFilterProducts: (category: string) => void;
}

export default function CategoryNavbar({ onFilterProducts }: CategoryNavbarProps) {
  const [categoryOpen, setCategoryOpen] = useState<string>("");
  const [categories, setCategories] = useState<ICategories[]>([]);

  useEffect(() => {
    const loadCategories = async () => {
      const data = await fetchGetCategories();
      setCategories(data);
    };
    loadCategories();
  }, []);

  const handleCategoryClick = (category: string) => {
    setCategoryOpen(category === categoryOpen ? "" : category);
    onFilterProducts(category); // Llamada a la función que viene desde el componente principal
  };

  return (
    <div>
      <nav className="bg-teal-800 p-4 text-white">
        <div className="container mx-auto flex justify-between space-x-8">
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
      </nav>
    </div>
  );
}
