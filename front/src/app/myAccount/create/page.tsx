import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function page() {
  return (
    <div className="mt-32 p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">Explora nuestros servicios y productos</h1>
      <p className="text-gray-700 mb-6 text-center">Haz clic en una de las categorías para obtener más detalles.</p>
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
        {/* Card 1 */}
        <div className="relative overflow-hidden rounded-lg shadow-md">
          <Link href={"/myAccount/create/product"}>
            {/* Contenedor con altura específica */}
            <div className="w-full h-40 relative">
              <Image 
                src="https://res.cloudinary.com/dbtfna8ev/image/upload/v1732993631/reuben-mansell-nwOip8AOZz0-unsplash_spktce.jpg"
                alt="Publicar Producto"
                width={500}
                height={300}
                className="w-full h-full object-cover transition duration-500 hover:opacity-90"
              />
            </div>
            <div className="absolute inset-0 flex flex-col items-start justify-end p-4 bg-gradient-to-t from-black via-transparent to-transparent">
              <h3 className="text-lg font-medium text-white">Publicar Producto</h3>
            </div>
          </Link>
        </div>
    
        {/* Card 2 */}
        <div className="relative overflow-hidden rounded-lg shadow-md">
          <Link href={"/myAccount/create/service"}>
            {/* Contenedor con altura específica */}
            <div className="w-full h-40 relative">
              <Image
                src="https://res.cloudinary.com/dbtfna8ev/image/upload/v1732992375/service_u1yaa1.jpg"
                alt="Publicar Servicios"
                width={500}
                height={300}
                className="w-full h-full object-cover transition duration-500 hover:opacity-90"
              />
            </div>
            <div className="absolute inset-0 flex flex-col items-start justify-end p-4 bg-gradient-to-t from-black via-transparent to-transparent">
              <h3 className="text-lg font-medium text-white">Publicar Servicio</h3>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
