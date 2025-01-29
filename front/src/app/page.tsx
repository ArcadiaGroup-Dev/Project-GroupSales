"use client"; 
import TopNavbar from "../components/Navbar/Navbar"; // Importa TopNavbar
import CategoryNavbar from "../components/Navbar/NavbarInferior"; // Importa CategoryNavbar
import CardProduct from "@/components/Products/CardProduct";
import Image from "next/image";
import WhatsApp from "@/components/WhatsApp/WhatsApp";
import { useState, useEffect } from "react";
import { fetchGetProducts } from "@/components/Fetchs/FetchProducts";

export default function ProductList() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [products, setProducts] = useState<any[]>([]); // Estado para almacenar los productos

  const slides = [
    {
      text: "¡Bienvenido a MiPyme Mutual!",
      bgColor: "bg-gradient-to-r from-[#ee8100] to-[#26676b]", // Color degradado con tertiary y secondary
      textColor: "text-white",
      imgSrc: "",
    },
    {
      text: "",
      bgColor: "bg-gradient-to-r from-[#26676b] to-[#ee8100]",
      textColor: "text-white",
      imgSrc:
        "https://res.cloudinary.com/dbtfna8ev/image/upload/v1724691637/samples/ecommerce/accessories-bag.jpg",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000); // Aumento el tiempo de la transición
    return () => clearInterval(interval);
  }, [slides.length]);

  // Llamar a fetchGetProducts y actualizar el estado
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const fetchedProducts = await fetchGetProducts();
        setProducts(fetchedProducts); // Guardamos los productos en el estado
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    loadProducts();
  }, []); // Este useEffect solo se ejecuta una vez, al montar el componente

  return (
    <div className="mt-12 md:mt-24 lg:mt-24 bg-primary">
      <TopNavbar /> {/* Barra superior */}
      <div className="relative w-full h-96 mb-10 overflow-hidden rounded-lg shadow-xl">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              currentSlide === index ? "opacity-100" : "opacity-0"
            } ${slide.bgColor} flex items-center justify-center`}
          >
            {slide.imgSrc ? (
              <div className="w-full h-full relative">
                <Image
                  src={slide.imgSrc}
                  alt="Slide"
                  fill
                  className="absolute top-0 left-0 object-cover opacity-30"
                  priority
                />
              </div>
            ) : (
              <h2 className={`text-4xl font-extrabold ${slide.textColor} z-10`}>
                {slide.text}
              </h2>
            )}
          </div>
        ))}
      </div>
      <CategoryNavbar /> {/* Barra de categorías */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto py-8 px-4">
        {products.length > 0 ? (
          products.map((product, index) => (
            <CardProduct key={index} product={product} />
          ))
        ) : (
          <p>Cargando productos...</p> // Mensaje mientras se cargan los productos
        )}
      </div>
      <div className="fixed bottom-6 right-6">
        <WhatsApp /> {/* Botón de WhatsApp */}
      </div>
    </div>
  );
}
