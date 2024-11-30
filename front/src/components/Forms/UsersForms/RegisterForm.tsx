"use client"
import React, { useState } from 'react';

export default function RegisterForm() {
  const countries = [
    { code: 'AR', name: 'Argentina' },
    { code: 'BR', name: 'Brasil' },
    { code: 'CL', name: 'Chile' },
    { code: 'CO', name: 'Colombia' },
    { code: 'MX', name: 'México' },
    { code: 'PE', name: 'Perú' },
    { code: 'UY', name: 'Uruguay' },
    { code: 'OT', name: 'Otro' },
  ];

  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [birthdate, setBirthdate] = useState<Date | null>(null);

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(e.target.value);
  };

  const handleChangeBirthdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(event.target.value);  
    setBirthdate(newDate);
  };

  return (
    <div className="mx-auto mt-28 max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold text-gray-600 sm:text-3xl">¡Hola, bienvenido(a)!</h1>
        <p className="mt-4 text-gray-500">
          Regístrate para disfrutar de todos los productos y servicios que tenemos para ofrecerte. 
        </p>
      </div>

      <div className="rounded-lg mt-4 bg-white p-8 shadow-2xl shadow-gray-500/50 lg:col-span-3 lg:p-12">
        <form action="#" className="space-y-4">
          {/* Nombre y Email */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-3">
            <div>
              <label className="sr-only" htmlFor="name">Nombre</label>
              <input
                className="w-full text-gray-500 rounded-lg border-2 border-gray-200 p-4 text-sm shadow-md shadow-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 hover:cursor-pointer"
                placeholder="Nombre"
                type="text"
                id="name"
              />
            </div>
            <div>
              <label className="sr-only" htmlFor="email">Email</label>
              <input
                className="w-full text-gray-500 rounded-lg border-2 border-gray-200 p-4 text-sm shadow-md shadow-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 hover:cursor-pointer"
                placeholder="Email"
                type="email"
                id="email"
              />
            </div>
          

          {/* Teléfono */}
          
            <div>
              <label className="sr-only" htmlFor="phone">Celular</label>
              <input
                className="w-full text-gray-500 rounded-lg border-2 border-gray-200 p-4 text-sm shadow-md shadow-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 hover:cursor-pointer"
                placeholder="Celular"
                type="number"
                id="phone"
              />
            </div>
          

          {/* País */}
          
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700"></label>
              <select
                id="country"
                value={selectedCountry}
                onChange={handleCountryChange}
                className="w-full rounded-lg border-2 border-gray-200 p-4 text-sm shadow-md shadow-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 hover:cursor-pointer text-gray-700"
              >
                <option value="" className='text-sm font-medium text-gray-700'>Selecciona un País</option>
                {countries.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
          
         

          {/* Ciudad */}
          
            <div>
              <label className="sr-only" htmlFor="city">Ciudad</label>
              <input
                className="w-full text-gray-500 rounded-lg border-2 border-gray-200 p-4 text-sm shadow-md shadow-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 hover:cursor-pointer"
                placeholder="Ciudad"
                type="text"
                id="city"
              />
            </div>
        

          {/* Dirección */}
         
            <div>
              <label className="sr-only" htmlFor="address">Dirección</label>
              <input
                className="w-full text-gray-500 rounded-lg border-2 border-gray-200 p-4 text-sm shadow-md shadow-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 hover:cursor-pointer"
                placeholder="Dirección"
                type="text"
                id="address"
              />
            </div>
        
          
          {/* Fecha de nacimiento */}
        
          <div>
              <label htmlFor="birthdate" className="block text-sm font-medium text-gray-700"></label>
              <input
                id="birthdate"
                type="date"
                value={birthdate ? birthdate.toISOString().split('T')[0] : ''}
                onChange={handleChangeBirthdate}
                className="w-full rounded-lg border-2 border-gray-200 p-4 text-sm shadow-md shadow-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 hover:cursor-pointer text-gray-700"
              />
            </div>


          {/* Contraseña */}
          
            <div>
              <label className="sr-only" htmlFor="password">Contraseña</label>
              <input
                className="w-full text-gray-500 rounded-lg border-2 border-gray-200 p-4 text-sm shadow-md shadow-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 hover:cursor-pointer"
                placeholder="Contraseña"
                type="password"
                id="password"
              />
            </div>
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
