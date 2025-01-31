"use client"; // Asegura que este componente se ejecute en el cliente

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { resetPassword } from "@/components/Fetchs/FetchsUser";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({ password: "", confirmPassword: "" });
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      setToken(urlParams.get("token"));
    }
  }, []);

  // Función para validar la contraseña en tiempo real
  const validatePassword = (value: string) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/;
    
    if (!value) {
      setErrors((prev) => ({ ...prev, password: "Debes ingresar una contraseña" }));
    } else if (!passwordRegex.test(value)) {
      setErrors((prev) => ({
        ...prev,
        password: "Debe tener 8-15 caracteres, una mayúscula, una minúscula, un número y un carácter especial (!@#$%^&*)",
      }));
    } else {
      setErrors((prev) => ({ ...prev, password: "" }));
    }
  };

  // Función para validar la confirmación en tiempo real
  const validateConfirmPassword = (value: string) => {
    if (!value) {
      setErrors((prev) => ({ ...prev, confirmPassword: "Debes confirmar la contraseña" }));
    } else if (value !== password) {
      setErrors((prev) => ({ ...prev, confirmPassword: "Las contraseñas no coinciden" }));
    } else {
      setErrors((prev) => ({ ...prev, confirmPassword: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (!token) {
      setMessage("Token no encontrado en la URL.");
      return;
    }
  
    if (errors.password || errors.confirmPassword) return;
  
    const { success, message } = await resetPassword(token, password);
    setMessage(message);
  
    if (success) router.push("/login");
  };
  

  return (
    <div className="mx-auto mt-28 max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold text-gray-600 sm:text-3xl">
          Restablecer Contraseña
        </h1>
        <form
          onSubmit={handleSubmit}
          className="mx-auto bg-white mb-0 mt-16 max-w-md space-y-4 p-8 shadow-2xl shadow-gray-500/50 rounded-lg"
        >
          <div>
            <input
              type="password"
              placeholder="Nueva Contraseña"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                validatePassword(e.target.value);
              }}
              required
              className="w-full rounded-lg border-2 border-gray-200 text-gray-400 p-4 pe-12 text-sm shadow-md shadow-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
            {errors.password && <p className="mt-2 text-red-500 text-sm">{errors.password}</p>}
          </div>

          <div>
            <input
              type="password"
              placeholder="Confirmar Contraseña"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                validateConfirmPassword(e.target.value);
              }}
              required
              className="w-full rounded-lg border-2 border-gray-200 text-gray-400 p-4 pe-12 text-sm shadow-md shadow-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
            {errors.confirmPassword && <p className="mt-2 text-red-500 text-sm">{errors.confirmPassword}</p>}
          </div>

          {message && <p className="text-secondary">{message}</p>}
          <button
            type="submit"
            className="inline-block shadow-md shadow-gray-400 rounded-lg bg-tertiary hover:bg-orange-400 px-5 py-3 text-sm font-medium text-white"
          >
            Restablecer
          </button>
        </form>
      </div>
    </div>
  );
}
