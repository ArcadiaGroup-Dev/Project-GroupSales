"use client";
import { NotifFormsUsers } from '@/components/Notifications/NotifiFormsUsers';
import { UserContext } from '@/context/userContext';
import { IUserRegister } from '@/Interfaces/IUser';
import { validationRegister } from '@/utils/validateRegister';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react';
import dayjs from "dayjs";

export default function RegisterForm() {
  const { signUp } = useContext(UserContext);
  const router = useRouter();
  
  const [userRegister, setUserRegister] = useState<IUserRegister>({
    email: '',
    name: '',
    password: '',
    birthdate: '', 
    phone: '',
    address: '',
    country: '',
    city: '',
  });

  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showErrorNotification, setShowErrorNotification] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
) => {
    const { name, value } = e.target;
    const updatedUser = { ...userRegister, [name]: value };

    
    if (name === "birthdate") {
        updatedUser[name] = value;  
    }

    setUserRegister(updatedUser);
    setErrors(validationRegister(updatedUser));
};

const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  console.log("Formulario enviado");
  const user: IUserRegister = { ...userRegister };

  if (user.birthdate) {
    user.birthdate = dayjs(user.birthdate).format("YYYY-MM-DD");
  }

  try {
      const isRegistered = await signUp(user);
      console.log("Resultado de signUp:", isRegistered);
      if (isRegistered) {
          setNotificationMessage("Registro exitoso");
          setShowNotification(true);
          setTimeout(() => {
              router.push("/");
          }, 2000);
      } else {
          setErrors({ ...errors, general: "Registro inválido. Por favor, revisa los datos ingresados." });
      }
  } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Error desconocido.");
      setShowErrorNotification(true);
      setTimeout(() => setShowErrorNotification(false), 3000);
  }
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
        <form onSubmit={onSubmit} className="space-y-4">
          {/* Nombre y Email */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-3">
            <div>
              <label className="sr-only" htmlFor="name">Nombre</label>
              <input
                value={userRegister.name}
                onChange={handleChange}
                className="w-full text-gray-500 rounded-lg border-2 border-gray-200 p-4 text-sm shadow-md shadow-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 hover:cursor-pointer"
                placeholder="Nombre"
                type="text"
                name="name"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className="sr-only" htmlFor="email">Email</label>
              <input
                value={userRegister.email}
                onChange={handleChange}
                className="w-full text-gray-500 rounded-lg border-2 border-gray-200 p-4 text-sm shadow-md shadow-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 hover:cursor-pointer"
                placeholder="Email"
                type="email"
                name="email"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Teléfono */}
            <div>
              <label className="sr-only" htmlFor="phone">Celular</label>
              <input
                value={userRegister.phone}
                onChange={handleChange}
                className="w-full text-gray-500 rounded-lg border-2 border-gray-200 p-4 text-sm shadow-md shadow-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 hover:cursor-pointer"
                placeholder="Celular"
                type="text"
                name="phone"
              />
            </div>

            {/* País */}
            <div>
              <label className="sr-only" htmlFor="country">País</label>
              <input
                value={userRegister.country}
                onChange={handleChange}
                className="w-full text-gray-500 rounded-lg border-2 border-gray-200 p-4 text-sm shadow-md shadow-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 hover:cursor-pointer"
                placeholder="País"
                type="text"
                name="country"
              />
            </div>

            {/* Ciudad */}
            <div>
              <label className="sr-only" htmlFor="city">Ciudad</label>
              <input
                value={userRegister.city}
                onChange={handleChange}
                className="w-full text-gray-500 rounded-lg border-2 border-gray-200 p-4 text-sm shadow-md shadow-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 hover:cursor-pointer"
                placeholder="Ciudad"
                type="text"
                name="city"
              />
            </div>

            {/* Dirección */}
            <div>
              <label className="sr-only" htmlFor="address">Dirección</label>
              <input
                value={userRegister.address}
                onChange={handleChange}
                className="w-full text-gray-500 rounded-lg border-2 border-gray-200 p-4 text-sm shadow-md shadow-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 hover:cursor-pointer"
                placeholder="Dirección"
                type="text"
                name="address"
              />
            </div>

            {/* Fecha de nacimiento */}
            <div>
              <label htmlFor="birthdate" className="block text-sm font-medium text-gray-700 "></label>
              <input
              className="w-full text-gray-500 rounded-lg border-2 border-gray-200 p-4 text-sm shadow-md shadow-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 hover:cursor-pointer"
                type="date"
                name="birthdate"
                value={userRegister.birthdate} 
                onChange={handleChange}
              />
            </div>

            {/* Contraseña */}
            <div>
              <label className="sr-only" htmlFor="password">Contraseña</label>
              <input
                value={userRegister.password}
                onChange={handleChange}
                className="w-full text-gray-500 rounded-lg border-2 border-gray-200 p-4 text-sm shadow-md shadow-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 hover:cursor-pointer"
                placeholder="Contraseña"
                type="password"
                name="password"
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>

          </div>

          {/* Enviar */}
          <div>
          <button
               disabled={Object.keys(errors).length > 0}
               type="submit"
              className="inline-block rounded-lg bg-tertiary hover:bg-orange-400 px-5 py-3 text-sm font-medium text-white shadow-md shadow-gray-400 hover:cursor-pointer"
            >
              Registrarme
            </button>
          </div>
        </form>
      </div>

      {showNotification && <NotifFormsUsers message={notificationMessage} />}
      {showErrorNotification && <NotifFormsUsers message={errorMessage} />}
    </div>
  );
}
