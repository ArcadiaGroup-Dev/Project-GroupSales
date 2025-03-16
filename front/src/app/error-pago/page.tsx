import Link from 'next/link';
import React from 'react';

const ErrorPago = () => {
  return (
    <div className="mt-24 flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
        <div className="compra-exitosa-header text-center mb-6">
          <h2 className="text-3xl font-semibold text-green-600">Hubo un error en el pago</h2>
        </div>
        <div className="compra-exitosa-body text-center text-gray-700">
          <p className="text-xl mb-4">Vuelve a intentarlo en unos minutos</p>
        </div>
        <div className="mt-6 flex justify-center">
          <Link href="/" className="bg-green-600 text-white py-2 px-6 rounded-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPago;
