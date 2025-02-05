"use client";
import { useState } from "react";
import CreateAds from "./CreateAds";
import ViewAds from "./ViewAds";

const FormAds = () => {
  const [section, setSection] = useState("crear");

  return (
    <div className="p-4 mt-20"> {/* Menor padding para hacerlo más compacto */}
      <div className="p-4">
        <h1 className="text-2xl font-semibold mb-3 text-gray-900">
          Panel de <span className="text-tertiary">Publicidad</span> {/* Título más pequeño */}
        </h1>
        <nav className="flex space-x-4 mb-4">
          <button
            onClick={() => setSection("crear")}
            className={`px-5 py-2 rounded-full text-md ${
              section === "crear" ? "bg-tertiary text-white" : "bg-gray-300 text-gray-800"
            } hover:bg-orange-300 hover:text-white transition-colors duration-200`}
          >
            Crear Publicidad
          </button>
          <button
            onClick={() => setSection("ver")}
            className={`px-5 py-2 rounded-full text-md ${
              section === "ver" ? "bg-tertiary text-white" : "bg-gray-300 text-gray-800"
            } hover:bg-orange-300 hover:text-white transition-colors duration-200`}
          >
            Ver Publicidades
          </button>
        </nav>
        <div>
          {section === "crear" && <CreateAds />}
          {section === "ver" && <ViewAds />}
        </div>
      </div>
    </div>
  );
};

export default FormAds;
