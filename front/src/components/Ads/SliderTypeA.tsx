"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ICreateAds, AdType } from "@/Interfaces/IAds";
import { fetchGetAds } from "../Fetchs/FetchAds";
import Link from "next/link";

const RectangularSliderTypeA: React.FC = () => {
  const [ads, setAds] = useState<ICreateAds[]>([]);
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const loadAds = async () => {
      try {
        const data = await fetchGetAds();
        setAds(data.filter((ad: ICreateAds) => ad.type === AdType.A));
      } catch (error) {
        console.error("Error al cargar las publicidades");
      }
    };
    loadAds();
  }, []);

  useEffect(() => {
    if (ads.length > 0) {
      startSlider();
    }
    return () => stopSlider();
  }, [ads]);

  const startSlider = () => {
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % ads.length);
    }, 3000); // Cambia de publicidad cada 3 segundos
  };

  const stopSlider = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const handleMouseEnter = () => stopSlider();
  const handleMouseLeave = () => startSlider();

  if (ads.length === 0) return null;

  return (
    <div
      className="relative w-full h-48 overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {ads.length > 0 && (
        <Link
          href={ads[current].link || "#"}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="w-full h-48 flex-shrink-0">
            <Image
              src={ads[current].img}
              alt={ads[current].name}
              width={800}
              height={200}
              className="rounded-md object-cover w-full h-48"
            />
          </div>
        </Link>
      )}
    </div>
  );
};

export default RectangularSliderTypeA;
