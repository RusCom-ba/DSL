import React, { useEffect, useState } from "react";

const images = [
  "/assets/bear.jpg",
  "/assets/deer.jpg",
  "/assets/ris.jpg",
  "/assets/wildBoar.jpg",
  "/assets/roeDeer.jpg",
  "/assets/chamois.jpg",
  "/assets/mouflon.jpg",
];

const HeroBanner = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black text-white">
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt="hero"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out scale-110 ${
            index === currentImage ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-20"></div>

      <div className="relative z-30 flex items-center justify-center h-full px-6">
        <div className="text-center max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 font-script">
            DOBRODOŠLI
          </h1>
          <h2 className="text-2xl md:text-4xl font-semibold mb-4 font-script">
            NA SPLETNI STRANI DRUŠTVA SLOVENSKIH LOVK
          </h2>
          <p className="text-lg md:text-xl leading-relaxed font-elegant">
            Ta stran je posvečena ženskam, ki delimo ljubezen do narave in
            lovske tradicije. Lov nam predstavlja edinstven način povezovanja s
            svetom okoli nas, kjer lahko izkusimo tako njegovo divjo lepoto kot
            tudi izzive, ki jih prinaša. Ponosne smo, da smo lovke, in hkrati
            poudarjamo, da je naša ljubezen do živali in narave temelj našega
            delovanja. Združene želimo ohranjati in razvijati lovstvo na
            trajnosten način.{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
