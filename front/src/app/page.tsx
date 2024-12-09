"use client";
import React, { useState, useEffect } from "react";
import { mocksProducts } from "@/components/mockProduct";
import CardProduct from "@/components/Products/CardProduct";
import Image from "next/image";
import WhatsApp from "@/components/WhatsApp/WhatsApp";

export default function ProductList() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      text: "¡Bienvenido a nuestra tienda!",
      bgColor: "bg-gray-100",
      textColor: "text-[#195252]",
      imgSrc:
        "https://res.cloudinary.com/dbtfna8ev/image/upload/v1724691637/samples/ecommerce/accessories-bag.jpg", // Este slide sigue mostrando texto
    },
    {
      text: "", // Este slide no tendrá texto
      bgColor: "bg-white",
      textColor: "text-[#195252]",
      imgSrc:
        "https://res.cloudinary.com/dbtfna8ev/image/upload/v1724691637/samples/ecommerce/accessories-bag.jpg", // La URL de la imagen
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 2000); // Cambiar el slide cada 2 segundos
    return () => clearInterval(interval); // Limpiar el intervalo al desmontar el componente
  }, [slides.length]);

  return (
    <div className="mt-12 md:mt-24 lg:mt-24">
      {/* Carrusel */}
      <div className="relative w-full h-64  mb-10 overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
              currentSlide === index ? "translate-x-0" : "translate-x-full"
            } ${slide.bgColor} flex items-center justify-center`}
            style={{
              transform: `translateX(${(index - currentSlide) * 100}%)`,
            }}
          >
            {slide.imgSrc ? (
              <div className="w-full h-full relative">
                <Image
                  src={slide.imgSrc}
                  alt="Slide"
                  fill
                  className="absolute top-0 left-0 object-cover"
                  priority
                />
              </div>
            ) : (
              <h2 className={`text-3xl font-bold ${slide.textColor}`}>
                {slide.text}
              </h2>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {mocksProducts.map((product, index) => (
          <CardProduct key={index} product={product} />
        ))}
      </div>
      <WhatsApp />
    </div>
  );
}
