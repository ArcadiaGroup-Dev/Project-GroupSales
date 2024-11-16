import React from 'react';

export default function RegisterForm() {
  return (
    <div className="mx-auto mt-28 max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold text-gray-600 sm:text-3xl">¡Hola, bienvenido!</h1>
        <p className="mt-4 text-gray-500">
          Regístrate para disfrutar de todos los productos y servicios que tenemos para ofrecerte. 
        </p>
      </div>

      {/* Contenedor de formulario con padding y sombra */}
      <div className="rounded-lg bg-white p-8 shadow-2xl shadow-gray-500/50 lg:col-span-3 lg:p-12">
        <form action="#" className="space-y-4">
          {/* Nombre */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
            <label className="sr-only" htmlFor="name">Nombre</label>
            <input
              className="w-full rounded-lg border-2 border-gray-200 p-4 text-sm shadow-md shadow-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
              placeholder="Nombre"
              type="text"
              id="name"
            />
          </div>
          <div>
            <label className="sr-only" htmlFor="lastName">Apellido</label>
            <input
              className="w-full rounded-lg border-2 border-gray-200 p-4 text-sm shadow-md shadow-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
              placeholder="Apellido"
              type="text"
              id="lastName"
            />
          </div>
                </div>
          {/* Correo y Teléfono */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="sr-only" htmlFor="email">Email</label>
              <input
                className="w-full rounded-lg border-2 border-gray-200 p-4 text-sm shadow-md shadow-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
                placeholder="Email"
                type="email"
                id="email"
              />
            </div>

            <div>
              <label className="sr-only" htmlFor="phone">Celular</label>
              <input
                className="w-full rounded-lg border-2 border-gray-200 p-4 text-sm shadow-md shadow-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
                placeholder="Celular"
                type="tel"
                id="phone"
              />
            </div>
          </div>
          <div>
            <label className="sr-only" htmlFor="address">Dirección</label>
            <input
              className="w-full rounded-lg border-2 border-gray-200 p-4 text-sm shadow-md shadow-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
              placeholder="Dirección"
              type="text"
              id="address"
            />
          </div>

          {/* Enlace a Login y Botón de Envío */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              ¿Ya tienes cuenta? 
              <a className="underline hover:font-bold" href="/login"> Inicia sesión aquí</a>
            </p>

            <button
              type="submit"
              className="inline-block rounded-lg bg-tertiary hover:bg-orange-400 px-5 py-3 text-sm font-medium text-white"
            >
              Registrarme
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
