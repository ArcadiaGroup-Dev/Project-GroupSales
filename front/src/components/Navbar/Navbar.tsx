"use client";
import { useState } from "react";
import { FaUser, FaShoppingCart, FaSearch } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/cartContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState("");
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { cart } = useCart();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleCategoryClick = (category: string) => {
    setCategoryOpen(category === categoryOpen ? "" : category);
  };

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  const getTotalItemsInCart = () => {
    return cart.reduce((total, product) => total + (product.quantity || 1), 0);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-teal-800 p-4 text-white z-50 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <Link href={"/"}>
          <div className="text-2xl font-bold flex items-center space-x-2">
            <Image
              src="/LogoMutual.webp"
              alt="Logo mutual"
              width={150}
              height={150}
              className="rounded-lg"
            />
          </div>
        </Link>

        {/* Menú de productos y servicios (visible en pantallas grandes) */}
        <div className="hidden md:flex items-center space-x-8">
          <div
            className="relative cursor-pointer px-6 py-2"
            onMouseEnter={() => setCategoryOpen("productos")}
            onMouseLeave={() => setCategoryOpen("")}
          >
            <span>Productos</span>
            {categoryOpen === "productos" && (
              <ul className="absolute bg-teal-800 text-white mt-2 p-4 space-y-2 shadow-lg">
                <li className="cursor-pointer px-4 py-2">Ropa</li>
                <li className="cursor-pointer px-4 py-2">Alimentos</li>
                <li className="cursor-pointer px-4 py-2">Tecnología</li>
                <li className="cursor-pointer px-4 py-2">Deportes</li>
                <li className="cursor-pointer px-4 py-2">Otros</li>
              </ul>
            )}
          </div>

          <div
            className="relative cursor-pointer px-6 py-2"
            onMouseEnter={() => setCategoryOpen("servicios")}
            onMouseLeave={() => setCategoryOpen("")}
          >
            <span>Servicios</span>
            {categoryOpen === "servicios" && (
              <ul className="absolute bg-teal-800 text-white mt-2 p-4 space-y-2 shadow-lg">
                <li className="cursor-pointer px-4 py-2">Asesoría</li>
                <li className="cursor-pointer px-4 py-2">Envíos</li>
                <li className="cursor-pointer px-4 py-2">Garantías</li>
                <li className="cursor-pointer px-4 py-2">Consultoría</li>
                <li className="cursor-pointer px-4 py-2">Soporte</li>
              </ul>
            )}
          </div>
        </div>

        {/* Íconos de usuario, carrito y búsqueda */}
        <div className="flex items-center space-x-6">
          <div className="relative">
            <FaUser
              className="text-xl cursor-pointer hover:text-teal-300 transition-colors duration-300"
              onClick={toggleUserMenu}
            />
            {userMenuOpen && (
              <div className="absolute right-0 mt-2 bg-teal-800 text-white p-2 rounded shadow-lg">
                <ul>
                  <li>
                    <Link
                      href="/login"
                      className="block px-4 py-2 hover:bg-teal-700"
                    >
                      Ingresar
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/register"
                      className="block px-4 py-2 hover:bg-teal-700"
                    >
                      Registrarse
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/myAccount"
                      className="block px-4 py-2 hover:bg-teal-700"
                    >
                      Mi Cuenta
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Carrito con contador */}
          <Link href={"/Cart"} className="relative">
            <FaShoppingCart className="text-xl cursor-pointer hover:text-teal-300 transition-colors duration-300" />
            {getTotalItemsInCart() > 0 && (
              <span className="absolute top-0 right-0 text-xs bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                {getTotalItemsInCart()}
              </span>
            )}
          </Link>

          <FaSearch className="text-xl cursor-pointer hover:text-teal-300 transition-colors duration-300" />
        </div>
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

      {/* Menú desplegable en móvil (solo productos y servicios) */}
      {menuOpen && (
        <div className="md:hidden bg-teal-800 p-4 mt-4 space-y-4">
          <div
            className="text-xl cursor-pointer px-4 py-2"
            onClick={() => handleCategoryClick("productos")}
          >
            Productos
            {categoryOpen === "productos" && (
              <ul className="ml-4 mt-2 space-y-2">
                <li className="cursor-pointer px-4 py-2">Ropa</li>
                <li className="cursor-pointer px-4 py-2">Alimentos</li>
                <li className="cursor-pointer px-4 py-2">Tecnología</li>
                <li className="cursor-pointer px-4 py-2">Deportes</li>
                <li className="cursor-pointer px-4 py-2">Otros</li>
              </ul>
            )}
          </div>

          <div
            className="text-xl cursor-pointer px-4 py-2"
            onClick={() => handleCategoryClick("servicios")}
          >
            Servicios
            {categoryOpen === "servicios" && (
              <ul className="ml-4 mt-2 space-y-2">
                <li className="cursor-pointer px-4 py-2">Asesoría</li>
                <li className="cursor-pointer px-4 py-2">Envíos</li>
                <li className="cursor-pointer px-4 py-2">Garantías</li>
                <li className="cursor-pointer px-4 py-2">Consultoría</li>
                <li className="cursor-pointer px-4 py-2">Soporte</li>
              </ul>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
