"use client";
import { FaUser, FaShoppingCart } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";
import { useContext } from "react";
import { UserContext } from "@/context/userContext";

export default function TopNavbar() {
  const { isActive } = useContext(UserContext);
  return (
    <nav className="fixed top-0 left-0 w-full bg-teal-800 p-4 text-white z-50 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <Link href={"/"}>
          <div className="text-2xl font-bold flex items-center space-x-2">
            <Image
              src="/LogoMutual.webp"
              alt="Logo mutual"
              width={150}
              height={150}
              className="rounded-lg hover:scale-110 transition-all"
            />
          </div>
        </Link>

        <div className="flex items-center space-x-6">
        <Link href={isActive ? "/myAccount" : "/login"}>
            <FaUser className="text-xl cursor-pointer hover:text-tertiary transition-colors duration-300" />
          </Link>

         <Link href={isActive ? "/Cart" : "/login"} className="relative">
            <FaShoppingCart className="text-xl cursor-pointer hover:text-tertiary transition-colors duration-300" />
          </Link>
       
        </div>
      </div>
    </nav>
  );
}
