"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    // Redirigir automáticamente a la página de inicio después de 5 segundos
    const timeout = setTimeout(() => {
      router.push("/");
    }, 5000);
    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className="mt-22 relative w-full h-screen flex flex-col items-center justify-center ">
      {/* Imagen de fondo */}
      <Image
        src="/404.webp" 
        alt="404 background"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="-z-10"
      />

      {/* Superposición de opacidad */}
      <div className="absolute inset-0 bg-black/50 -z-10"></div>

      {/* Contenido del mensaje */}
      <div className="relative bg-secondary text-white shadow-sm shadow-gray-400 border-black rounded-lg p-2 z-10 text-center">
        <h1 className="text-4xl font-bold mb-4">Página no encontrada</h1>
      </div>
    </div>
  );
}
