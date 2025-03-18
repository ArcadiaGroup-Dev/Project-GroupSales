"use client";
import TopNavbar from "../components/Navbar/Navbar";
import CategoryNavbar from "../components/Navbar/NavbarInferior";
import IntercalatedAdsB from "@/components/Ads/SlideTypeB";
import WhatsApp from "@/components/WhatsApp/WhatsApp";
import Image from "next/image";
import { useState, useEffect } from "react";
import { fetchGetProducts } from "@/components/Fetchs/FetchProducts";
import { IProduct } from "@/Interfaces/IProduct";

export default function ProductList() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const slides = [
    {
      text: "¡Bienvenido a MiPyme Mutual!",
      bgColor: "bg-gradient-to-r from-[#ee8100] to-[#26676b]",
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
    }, 3000);
    return () => clearInterval(interval);
  }, [slides.length]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const fetchedProducts = await fetchGetProducts();
        setProducts(fetchedProducts);
        setFilteredProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    loadProducts();
  }, []);

  const handleFilterProducts = (category: string) => {
    const filtered = products.filter((product) =>
      product.category.name === category
    );
    setFilteredProducts(filtered);
  };

  // Filtrado por búsqueda
  useEffect(() => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  return (
    <div className="mt-12 md:mt-24 lg:mt-24 bg-primary">
      <TopNavbar />

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

      <CategoryNavbar onFilterProducts={handleFilterProducts} />

      <div className="max-w-7xl mx-auto py-4 px-4">
        <input
          type="text"
          placeholder="Buscar productos por nombre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary"
        />
      </div>

      <div className="max-w-7xl mx-auto py-8 px-4">
        {filteredProducts.length > 0 ? (
          <IntercalatedAdsB products={filteredProducts} />
        ) : (
          <p>No se encontraron productos.</p>
        )}
      </div>

      <div className="fixed bottom-6 right-6">
        <WhatsApp />
      </div>
    </div>
  );
}
