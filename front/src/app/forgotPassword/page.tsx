"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { forgotPassword } from "@/components/Fetchs/FetchsUser";


export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      setMessage("Por favor, ingresa tu email.");
      return;
    }

    const { success, message } = await forgotPassword(email);
    setMessage(message);

    if (success) {
      setTimeout(() => router.push("/login"), 3000);
    }
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
              type="email"
              placeholder="Escribe tu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg border-2 border-gray-200 text-gray-400 p-4 pe-12 text-sm shadow-md shadow-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
          </div>

          {message && <p className="text-secondary">{message}</p>}
          <button
            type="submit"
            className="inline-block shadow-md shadow-gray-400 rounded-lg bg-tertiary hover:bg-orange-400 px-5 py-3 text-sm font-medium text-white"
          >
            Solicitar restablecer contraseña
          </button>
          
        </form>
      </div>
    </div>
  );
}
