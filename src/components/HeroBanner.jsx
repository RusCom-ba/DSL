import React, { useEffect, useState } from "react";

const images = [
  "/assets/bear.jpg",
  "/assets/deer.jpg",
  "/assets/ris.jpg",
  "/assets/wildBoar.jpg",
  "/assets/roeDeer.jpg",
  "/assets/chamois.jpg",
  "/assets/mouflon.jpg"
];

const HeroBanner = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentImage((prev) => (prev + 1) % images.length);
        setFade(true);
      }, 300);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black text-white">
      <div className="absolute inset-0">
        <img
          src={images[currentImage]}
          alt="hero"
          className={`w-full h-full object-cover transition-opacity duration-700 ease-in-out scale-110 transform ${
            fade ? "opacity-100" : "opacity-0"
          }`}
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center h-full px-6">
        <div className="text-center max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 font-script">DOBRODOŠLI</h1>
          <h2 className="text-2xl md:text-4xl font-semibold mb-4 font-script">
            NA SPLETNI STRANI DRUŠTVA SLOVENSKIH LOVK
          </h2>
          <p className="text-lg md:text-xl leading-relaxed font-elegant">
            Ta stran je posvečena ženskam, ki delimo ljubezen do narave in lovske tradicije.
            Lov nam predstavlja edinstven način povezovanja s svetom okoli nas, kjer lahko
            izkusimo tako njegovo divjo lepoto kot tudi izzive, ki jih prinaša. Ponosne smo,
            da smo lovke, in hkrati poudarjamo, da je naša ljubezen do živali in narave temelj
            našega delovanja. Združene želimo ohranjati in razvijati lovstvo na trajnosten način.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
