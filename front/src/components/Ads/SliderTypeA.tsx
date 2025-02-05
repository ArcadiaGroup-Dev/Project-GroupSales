"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ICreateAds, AdType } from "@/Interfaces/IAds";
import { fetchGetAds } from "../Fetchs/FetchAds";

interface RectangularSliderTypeAProps {}

const RectangularSliderTypeA: React.FC<RectangularSliderTypeAProps> = () => {
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
    }, 2000);
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
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {ads.map((ad) => (
          <div key={ad.id || ad.name} className="w-full flex-shrink-0">
            <Image
              src={ad.img}
              alt={ad.name}
              width={800}
              height={200}
              className="rounded-md object-cover w-full h-48"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RectangularSliderTypeA;
