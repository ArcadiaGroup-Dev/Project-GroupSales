"use client";

import Subcategories from "@/Interfaces/INavBar";

interface CategoryDropdownProps {
  category: keyof Subcategories; // Esto asegura que 'category' es una de las claves de 'Subcategories'
}

export default function CategoryDropdown({ category }: CategoryDropdownProps) {
  const subcategories: Subcategories = {
    indumentaria: [
      "Ropa para niños",
      "Ropa para adultos",
      "Calzado",
      "Accesorios",
    ],
    decoracion: ["Muebles", "Lámparas", "Cortinas", "Cuadros", "Espejos"],
    electronica: [
      "Televisores",
      "Celulares",
      "Accesorios",
      "Computadoras",
      "Cámaras",
    ],
    hogar: ["Cocina", "Muebles", "Ropa de cama", "Accesorios", "Jardinería"],
    deportes: ["Fútbol", "Básquet", "Running", "Natación", "Ciclismo"],
    juguetes: ["Niños", "Niñas", "Juguetes educativos", "Juguetes para bebés"],
    otros: [
      "Libros",
      "Artículos de oficina",
      "Herramientas",
      "Mascotas",
      "Arte",
    ],
  };

  return (
    <ul className="bg-teal-800 text-white mt-2 p-4 space-y-2 shadow-lg">
      {subcategories[category]?.map((subcategory: string, index: number) => (
        <li
          key={index}
          className="cursor-pointer px-4 py-2 hover:text-tertiary transition-all"
        >
          {subcategory}
        </li>
      ))}
    </ul>
  );
}
