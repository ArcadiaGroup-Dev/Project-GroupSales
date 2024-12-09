"use client";
import { useState } from "react";
import CategoryDropdown from "../Navbar/Dropdown"; // Importa el componente de subcategorías

export default function CategoryNavbar() {
  const [categoryOpen, setCategoryOpen] = useState("");

  const handleCategoryClick = (category: string) => {
    setCategoryOpen(category === categoryOpen ? "" : category);
  };

  return (
    <nav className="bg-teal-800 p-4 text-white">
      <div className="container mx-auto flex justify-between space-x-8">
        <div
          className="cursor-pointer hover:text-tertiary hover:scale-105 transition-all"
          onClick={() => handleCategoryClick("indumentaria")}
        >
          Indumentaria
          {categoryOpen === "indumentaria" && (
            <CategoryDropdown category="indumentaria" />
          )}
        </div>

        <div
          className="cursor-pointer hover:text-tertiary hover:scale-105 transition-all"
          onClick={() => handleCategoryClick("decoracion")}
        >
          Decoración
          {categoryOpen === "decoracion" && (
            <CategoryDropdown category="decoracion" />
          )}
        </div>

        <div
          className="cursor-pointer hover:text-tertiary hover:scale-105 transition-all"
          onClick={() => handleCategoryClick("electronica")}
        >
          Electrónica
          {categoryOpen === "electronica" && (
            <CategoryDropdown category="electronica" />
          )}
        </div>

        <div
          className="cursor-pointer hover:text-tertiary hover:scale-105 transition-all"
          onClick={() => handleCategoryClick("hogar")}
        >
          Hogar
          {categoryOpen === "hogar" && <CategoryDropdown category="hogar" />}
        </div>

        <div
          className="cursor-pointer hover:text-tertiary hover:scale-105 transition-all"
          onClick={() => handleCategoryClick("deportes")}
        >
          Deportes
          {categoryOpen === "deportes" && (
            <CategoryDropdown category="deportes" />
          )}
        </div>

        <div
          className="cursor-pointer hover:text-tertiary hover:scale-105 transition-all"
          onClick={() => handleCategoryClick("juguetes")}
        >
          Juguetes
          {categoryOpen === "juguetes" && (
            <CategoryDropdown category="juguetes" />
          )}
        </div>

        <div
          className="cursor-pointer hover:text-tertiary hover:scale-105 transition-all"
          onClick={() => handleCategoryClick("otros")}
        >
          Otros
          {categoryOpen === "otros" && <CategoryDropdown category="otros" />}
        </div>
      </div>
    </nav>
  );
}
