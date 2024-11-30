"use client"
import { NotifFormsUsers } from '@/components/Notifications/NotifiFormsUsers';
import { UserContext } from '@/context/userContext';
import { ILoginClientProps } from '@/Interfaces/IUser';
import { validationLogin } from '@/utils/validateLogin';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react'

export default function LoginForm({ setToken }: ILoginClientProps) {
const { signIn } = useContext(UserContext);
const router = useRouter();
const [userData, setUserData] = useState({
  email: "",
  password: "",
});
const [showNotification, setShowNotification] = useState(false);
const [notificationMessage, setNotificationMessage] = useState("");
const [errors, setErrors] = useState({} as { [key: string]: string });

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setUserData({ ...userData, [name]: value });

  const { errors } = validationLogin({ ...userData, [name]: value });
  setErrors(errors);
};

const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const { formIsValid, errors } = validationLogin(userData);

  if (formIsValid) {
    const credentials = {
      email: userData.email,
      password: userData.password,
    };

    try {
      const success = await signIn(credentials);
      if (success) {
        const token =
          typeof window !== "undefined"
            ? localStorage.getItem("token")
            : null;
        if (token) {
          setToken(token);
          setNotificationMessage("Has ingresado correctamente");
          setShowNotification(true);
          setTimeout(() => setShowNotification(false), 3000);
          router.push("/");
        } else {
          setNotificationMessage("Usuario Inválido");
          setShowNotification(true);
          setTimeout(() => setShowNotification(false), 3000);
        }
      }
    } catch {
      setNotificationMessage("Ocurrió un error, intenta de nuevo");
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    }
  } else {
    setErrors(errors);
  }
};


  return (
    <div className="mx-auto mt-28 max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold text-gray-600 sm:text-3xl">¡Nos alegra verte aquí!</h1>
        <p className="mt-4 text-gray-500">
          Ingresa a tu cuenta para disfrutar de todos los productos y servicios que tenemos para ofrecerte. ¡Te estamos esperando!
        </p>
      </div>

      {/* Formulario con más padding y sombra */}
      <form  onSubmit={onSubmit} className="mx-auto bg-white mb-0 mt-16 max-w-md space-y-4 p-8 shadow-2xl shadow-gray-500/50 rounded-lg">
        <div>
          <label htmlFor="email" className="sr-only">Email</label>
          <div className="relative">
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              className="w-full rounded-lg border-2 border-gray-200 p-4 pe-12 text-sm shadow-md shadow-gray-400 text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
              placeholder="Ingresar email"
            />
            <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
            </span>
          </div>
          {errors.email && (
              <p className="text-red-500 text-sm mt-2">{errors.email}</p>
            )}
        </div>

        <div>
          <label htmlFor="password" className="sr-only">Password</label>
          <div className="relative">
            <input
              type="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              className="w-full rounded-lg border-2 border-gray-200 text-gray-400 p-4 pe-12 text-sm shadow-md shadow-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
              placeholder="Ingresar contraseña"
            />
            <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </span>
          </div>
          {errors.password && (
              <p className="text-red-500 text-sm mt-2">{errors.password}</p>
            )}
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            ¿No tienes cuenta?
            <Link className="underline hover:font-bold" href="/register"> Registrate aquí</Link>
          </p>

          <button
             disabled={Object.keys(errors).length > 0}
              type="submit"
            className="inline-block shadow-md shadow-gray-400 rounded-lg bg-tertiary hover:bg-orange-400 px-5 py-3 text-sm font-medium text-white"
          >
            Ingresar
          </button>
        </div>
        {showNotification && (
            <div className="absolute top-12 left-0 right-0 mx-auto w-max">
              <NotifFormsUsers message={notificationMessage} />
            </div>
          )}
      </form>
    </div>
  )
}
