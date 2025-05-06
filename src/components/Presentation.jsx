import React from "react";
import { motion } from "framer-motion"; 

const Presentation = () => {
  return (
    <section
      id="predstavitev"
      className="relative bg-gradient-to-b from-green-50 to-white py-24 px-6 overflow-hidden"
    >
      <img
        src="/assets/leaf-pattern.svg"
        alt="leaf"
        className="absolute opacity-10 top-0 left-0 w-64 rotate-12 hidden md:block pointer-events-none"
      />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-6 text-gray-800"
        >
          <h2 className="text-4xl md:text-5xl font-bold uppercase text-green-900 tracking-wide mb-6">
            O nas
          </h2>

          <p className="text-lg leading-relaxed">
            Društvo slovenskih lovk je skupnost žensk, ki jih združuje strast do lova, narave in bogate slovenske lovske tradicije. Naša zgodba sega v čas, ko je bil lov izključno domena moških, a smo ženske s svojo vztrajnostjo in ljubeznijo do narave postopoma osvojile svoje mesto v tej dejavnosti.
          </p>

          <p className="text-lg leading-relaxed">
            Za nas je lov več kot le šport ali konjiček. Je način življenja, ki nam omogoča neposreden stik s svetom okoli nas, z njegovo naravno lepoto in tudi z njegovo kruto realnostjo. Ponosne smo, da smo lovke, in hkrati poudarjamo, da je naša ljubezen do živali in narave temelj našega delovanja.
          </p>

          <p className="text-lg leading-relaxed">
            Zavezujemo se za zavesten in sodoben lov, ki temelji na spoštovanju do živali in okolja. Ponosne smo, da lahko s svojo prisotnostjo razbijamo stereotipe in prispevamo k bolj vključujočemu in raznolikemu lovskemu okolju.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="rounded-3xl overflow-hidden shadow-xl"
        >
          <img
            src="/assets/o-nas-slika.jpg"
            alt="lovka"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-in-out"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Presentation;
