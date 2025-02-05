
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function AdminDashboard() {

  const articles = [
    {
      title: "USUARIOS",
      description:
        "Administra la información de tus usuarios. Consulta datos como clientes, venderores, ordenes de compras. Otorga permisos para vender",
      imageSrc: "/persona.webp",
      link: "dashboardAdmin/users",
      linkText: "Ir a usuarios",
    },
    {
      title: "ORDENES",
      description:
        "Gestiona las órdenes de compra realizadas por los clientes. Filtra por vendedor, categoría o estado para un análisis detallado.",
      imageSrc: "/orders.webp",
      link: "dashboardAdmin/orders",
      linkText: "Ir a órdenes",
    },
    {
      title: "PRODUCTOS",
      description:
        "Aqui puedes ver todos los productos o servicios publicados. También puedes eliminar aquellos que no cumplan con las normas requeridas.",
      imageSrc: "/productos.webp",
      link: "dashboardAdmin/product",
      linkText: "Ir a productos",
    },
    {
      title: "PUBLICIDADES",
      description:
        "Aqui puedes administrar publicidades, encontrarás un formulario para crear nuevas y otro para editar. En ver todas , podrás eliminarlas",
      imageSrc: "/adds.jpg",
      link: "dashboardAdmin/ads",
      linkText: "Ir a publicidades",
    },
  ];

  return (
    <div className="mx-auto max-w-6xl p-4 bg-gray-50 font-bold">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {articles.map((article, index) => (
          <Link className="hover:shadow-lg hover:shadow-gray-400" key={index} href={article.link} passHref>
            <article className="flex flex-col rounded-lg shadow-lg bg-white transition hover:shadow-xl">
              <div className="relative h-40 sm:h-48 lg:h-56">
              <Image
                    fill
                    alt={article.title}
                    src={article.imageSrc}
                    className="rounded-t-lg object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
              </div>

              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <h3 className="font-bold uppercase text-gray-900 text-lg mb-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed p-4 mb-4">
                    {article.description}
                  </p>
                </div>

                <div className="mt-4">
                  <span className="block w-full shadow-lg shadow-gray-4200 bg-tertiary px-4 py-2 text-center text-xs font-bold uppercase rounded text-gray-900 transition duration-300 ease-in-out transform hover:bg-orange-400 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-400">
                    {article.linkText}
                  </span>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
