"use client";
import { useRouter } from 'next/navigation';
import React from 'react'

const CompraExitosa = () => {
 const router = useRouter();

  return (
    <div className="mt-24 flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
        <div className="compra-exitosa-header text-center mb-6">
          <h2 className="text-3xl font-semibold text-green-600">Tu compra ha sido procesada</h2>
        </div>
        <div className="compra-exitosa-body text-center text-gray-700">
          <p className="text-xl mb-4">Pronto tendrás noticias del vendedor</p>
         
        </div>
   
      </div>
    </div>
  );
};

export default CompraExitosa;
