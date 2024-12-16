"use client"
import { UserContext } from '@/context/userContext'
import Image from 'next/image'
import React, { useContext } from 'react'

export default function AdminUsers() {
    const {user} = useContext(UserContext)
  return (
    <div className='mt-32 bg-yellow-400'>Bienvenido(a) {user?.name}
        <article className="flex bg-white transition hover:shadow-xl">
  <div className="rotate-180 p-2 [writing-mode:_vertical-lr]">
   
     
  </div>

  <div className="hidden sm:block sm:basis-56">
    <Image
    width={50}
    height={50}
      alt=""
      src="https://images.unsplash.com/photo-1609557927087-f9cf8e88de18?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
      className="aspect-square h-full w-full object-cover"
    />
  </div>

  <div className="flex flex-1 flex-col justify-between">
    <div className="border-s border-gray-900/10 p-4 sm:border-l-transparent sm:p-6">
      <a href="#">
        <h3 className="font-bold uppercase text-gray-900">
          USUARIOS
        </h3>
      </a>

      <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-700">
        Aquí puedes consultar datos relacionados a tus usuarios.
        Sabrás cuantos se han registrado, cuantos se han dado de baja, cuantos clientes y vendedores tienes.
      </p>
    </div>

    <div className="sm:flex sm:items-end sm:justify-end">
      <a
        href="#"
        className="block bg-yellow-300 px-5 py-3 text-center text-xs font-bold uppercase text-gray-900 transition hover:bg-yellow-400"
      >
        Ir a usuarios
      </a>
    </div>
  </div>
</article>
    </div>
  )
}
