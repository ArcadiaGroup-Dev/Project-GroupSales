import Image from 'next/image'
import Link from 'next/link'
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
  
     
  
    

<ul className="mt-12 flex justify-center gap-6 md:gap-8">
  <li>
    <Link
      href="https://www.facebook.com/mipymemutualsantafe"
      rel="noreferrer"
      target="_blank"
      className="text-gray-700 transition hover:text-gray-700/75"
      
    >
      <span className="sr-only">Facebook</span>
      <FaFacebook className="size-6" />
    </Link>
  </li>

  <li>
    <Link
      href="https://www.instagram.com/mipymemutualsantafe"
      rel="noreferrer"
      target="_blank"
      className="text-gray-700 transition hover:text-gray-700/75"
    >
      <span className="sr-only">Instagram</span>
      <FaInstagram className="size-6" />
    </Link>
  </li>

  <li>
    <Link
      href="https://wa.me/3424383363"  
      rel="noreferrer"
      target="_blank"
      className="text-gray-700 transition hover:text-gray-700/75"
    >
      <span className="sr-only">WhatsApp</span>
      <FaWhatsapp className="size-6" />
    </Link>
  </li>

  <li>
    <Link
      href="mailto:mutualmipymesfe@gmail.com"  
      rel="noreferrer"
      target="_blank"
      className="text-gray-700 transition hover:text-gray-700/75"
    >
      <span className="sr-only">Gmail</span>
      <FaEnvelope className="size-6" />
    </Link>
  </li>
</ul>

    </div>
  </footer>
  )
}
