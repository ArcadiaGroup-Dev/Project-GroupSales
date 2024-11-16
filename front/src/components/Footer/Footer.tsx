import Image from 'next/image'
import React from 'react'
import { FaEnvelope, FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-gray-100 mt-16">
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex justify-center text-teal-600">
       <Image 
       src="/LogoMutual3.webp" 
       alt="Logo Mutual"
       width={150}
       height={150}
       className="rounded-lg"/>
        </div>
  
      <p className="mx-auto mt-6 max-w-md text-center leading-relaxed text-gray-500">
        Somos la mutual de las PyMES, Comercios, Profesionales Independientes, Monotributistas y Emprendedores de la Provincia de Santa Fe.
      </p>
  
      <ul className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12">
        <li>
          <a className="text-gray-700 transition hover:text-gray-700/75" href="#"> About </a>
        </li>
  
        <li>
          <a className="text-gray-700 transition hover:text-gray-700/75" href="#"> Careers </a>
        </li>
  
        <li>
          <a className="text-gray-700 transition hover:text-gray-700/75" href="#"> History </a>
        </li>
  
        <li>
          <a className="text-gray-700 transition hover:text-gray-700/75" href="#"> Services </a>
        </li>
  
        <li>
          <a className="text-gray-700 transition hover:text-gray-700/75" href="#"> Projects </a>
        </li>
  
        <li>
          <a className="text-gray-700 transition hover:text-gray-700/75" href="#"> Blog </a>
        </li>
      </ul>
  
    

<ul className="mt-12 flex justify-center gap-6 md:gap-8">
  <li>
    <a
      href="https://www.facebook.com/mipymemutualsantafe"
      rel="noreferrer"
      target="_blank"
      className="text-gray-700 transition hover:text-gray-700/75"
      
    >
      <span className="sr-only">Facebook</span>
      <FaFacebook className="size-6" />
    </a>
  </li>

  <li>
    <a
      href="https://www.instagram.com/mipymemutualsantafe"
      rel="noreferrer"
      target="_blank"
      className="text-gray-700 transition hover:text-gray-700/75"
    >
      <span className="sr-only">Instagram</span>
      <FaInstagram className="size-6" />
    </a>
  </li>

  <li>
    <a
      href="https://wa.me/1234567890"  // Reemplaza con el número de WhatsApp
      rel="noreferrer"
      target="_blank"
      className="text-gray-700 transition hover:text-gray-700/75"
    >
      <span className="sr-only">WhatsApp</span>
      <FaWhatsapp className="size-6" />
    </a>
  </li>

  <li>
    <a
      href="mailto:your-email@example.com"  
      rel="noreferrer"
      target="_blank"
      className="text-gray-700 transition hover:text-gray-700/75"
    >
      <span className="sr-only">Gmail</span>
      <FaEnvelope className="size-6" />
    </a>
  </li>
</ul>

    </div>
  </footer>
  )
}
