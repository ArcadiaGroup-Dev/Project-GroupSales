"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ICreateAds, AdType } from "@/Interfaces/IAds";
import { fetchGetAds } from "../Fetchs/FetchAds";
import CardProduct from "@/components/Products/CardProduct";
import RectangularSliderTypeA from "./SliderTypeA";

interface IntercalatedAdsBProps {
  products: any[]; // Tipa correctamente si tienes una interfaz
}

type CombinedItem =
  | { type: "product"; data: any }
  | { type: "ad"; data: ICreateAds }
  | { type: "adA" }; // Tipo para la publicidad tipo A

const IntercalatedAdsB: React.FC<IntercalatedAdsBProps> = ({ products }) => {
  const [adsB, setAdsB] = useState<ICreateAds[]>([]);
  const [loadingAds, setLoadingAds] = useState<boolean>(true);
  const [errorAds, setErrorAds] = useState<string | null>(null);

  // Obtener anuncios y filtrar solo los de tipo B
  useEffect(() => {
    const fetchAdsB = async () => {
      setLoadingAds(true);
      setErrorAds(null);
      try {
        const data = await fetchGetAds();
        const filtered = data.filter((ad: ICreateAds) => ad.type === AdType.B);
        setAdsB(filtered);
      } catch (error) {
        setErrorAds("Error al cargar anuncios tipo B.");
      } finally {
        setLoadingAds(false);
      }
    };

    fetchAdsB();
  }, []);

  // Construir un arreglo combinado intercalando anuncios tipo B y tipo A
  const combinedItems: CombinedItem[] = [];
  for (let i = 0; i < products.length; i++) {
    combinedItems.push({ type: "product", data: products[i] });

    if ((i + 1) % 5 === 0 && adsB.length > 0) {
      const adIndex = Math.floor(i / 5) % adsB.length;
      combinedItems.push({ type: "ad", data: adsB[adIndex] });
    }

    if ((i + 1) % 7 === 0) {
      combinedItems.push({ type: "adA" });
    }
  }

  if (loadingAds) {
    return <p className="text-blue-500">Cargando anuncios...</p>;
  }
  if (errorAds) {
    return <p className="text-red-500">{errorAds}</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {combinedItems.map((item, index) => {
        if (item.type === "product") {
          return <CardProduct key={index} product={item.data} />;
        } else if (item.type === "ad") {
          const ad = item.data;
          return (
            <div key={index} className="bg-gray-100 p-4 rounded shadow relative">
             
              <div className="relative w-full h-80 mt-2">
                <Image
                  src={ad.img}
                  alt={ad.name}
                  fill
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
            </div>
          );
        } else if (item.type === "adA") {
          return (
            <div key={index} className="col-span-full my-4">
              <RectangularSliderTypeA />
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default IntercalatedAdsB;
