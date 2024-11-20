"use client"
import { useState } from 'react';
import { FaUser, FaShoppingCart, FaSearch } from 'react-icons/fa';
import Link from 'next/link'; // Si estás usando Next.js
import Image from 'next/image';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false); 
  const [categoryOpen, setCategoryOpen] = useState(''); 
  const [userMenuOpen, setUserMenuOpen] = useState(false); // Para el menú de usuario

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleCategoryClick = (category: string) => {
    setCategoryOpen(category === categoryOpen ? '' : category);
  };

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-secondary p-4 text-white z-50 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold">
        <Image src="/LogoMutual.webp" alt="Logo mutual" width={150} height={300} className="rounded-lg"/>
        </div>

        {/* Íconos de la Navbar */}
        <div className="flex items-center space-x-6">
          {/* Icono de usuario con opciones */}
          <div className="relative">
            <FaUser className="text-xl cursor-pointer" onClick={toggleUserMenu} />
            {userMenuOpen && (
              <div className="absolute right-0 mt-2 bg-secondary text-white p-2 rounded shadow-lg">
                <ul>
                  <li>
                    <Link href="/login" className="block px-4 py-2 hover:bg-teal-700">Ingresar</Link>
                  </li>
                  <li>
                    <Link href="/register" className="block px-4 py-2 hover:bg-teal-700">Registrarse</Link>
                  </li>
                  <li>
                    <Link href="/myAccount" className="block px-4 py-2 hover:bg-teal-700">Mi Cuenta</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>

          <FaShoppingCart className="text-xl cursor-pointer" />
          <FaSearch className="text-xl cursor-pointer" />
        </div>

        {/* Menú Hamburguesa (para pantallas pequeñas) */}
        <button onClick={toggleMenu} className="md:hidden text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Menú desplegable en móvil */}
      {menuOpen && (
        <div className="md:hidden bg-[#195252] p-4 mt-4 space-y-4">
          <div
            className="text-xl cursor-pointer px-4 py-2"
            onClick={() => handleCategoryClick('productos')}
          >
            Productos
            {categoryOpen === 'productos' && (
              <ul className="ml-4 mt-2 space-y-2">
                <li className="cursor-pointer px-4 py-2">Opción 1</li>
                <li className="cursor-pointer px-4 py-2">Opción 2</li>
                <li className="cursor-pointer px-4 py-2">Opción 3</li>
                <li className="cursor-pointer px-4 py-2">Opción 4</li>
                <li className="cursor-pointer px-4 py-2">Opción 5</li>
              </ul>
            )}
          </div>

          <div
            className="text-xl cursor-pointer px-4 py-2"
            onClick={() => handleCategoryClick('servicios')}
          >
            Servicios
            {categoryOpen === 'servicios' && (
              <ul className="ml-4 mt-2 space-y-2">
                <li className="cursor-pointer px-4 py-2">Opción 1</li>
                <li className="cursor-pointer px-4 py-2">Opción 2</li>
                <li className="cursor-pointer px-4 py-2">Opción 3</li>
                <li className="cursor-pointer px-4 py-2">Opción 4</li>
                <li className="cursor-pointer px-4 py-2">Opción 5</li>
              </ul>
            )}
          </div>
        </div>
      )}

      {/* Menú para pantallas grandes (md y más grandes) */}
      <div className="hidden md:flex items-center space-x-6">
        <div
          className="relative cursor-pointer px-6 py-2"
          onMouseEnter={() => setCategoryOpen('productos')}
          onMouseLeave={() => setCategoryOpen('')}
        >
          <span>Productos</span>
          {categoryOpen === 'productos' && (
            <ul className="absolute bg-secondary text-primary mt-2 p-4 space-y-2 shadow-lg">
              <li className="cursor-pointer px-4 py-2">Opción 1</li>
              <li className="cursor-pointer px-4 py-2">Opción 2</li>
              <li className="cursor-pointer px-4 py-2">Opción 3</li>
              <li className="cursor-pointer px-4 py-2">Opción 4</li>
              <li className="cursor-pointer px-4 py-2">Opción 5</li>
            </ul>
          )}
        </div>

        <div
          className="relative cursor-pointer px-6 py-2"
          onMouseEnter={() => setCategoryOpen('servicios')}
          onMouseLeave={() => setCategoryOpen('')}
        >
          <span>Servicios</span>
          {categoryOpen === 'servicios' && (
            <ul className="absolute bg-secondary text-primary mt-2 p-4 space-y-2 shadow-lg">
              <li className="cursor-pointer px-4 py-2">Opción 1</li>
              <li className="cursor-pointer px-4 py-2">Opción 2</li>
              <li className="cursor-pointer px-4 py-2">Opción 3</li>
              <li className="cursor-pointer px-4 py-2">Opción 4</li>
              <li className="cursor-pointer px-4 py-2">Opción 5</li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}
