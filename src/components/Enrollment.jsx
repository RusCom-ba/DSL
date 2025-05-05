import React from "react";
import { Download, PencilLine } from "lucide-react";
import { Link } from "react-router-dom"; // za formu

const Enrollment = () => {
  return (
    <section id="vclanitev" className="bg-gradient-to-b from-green-50 to-white py-24 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* TEKSTUALNI DIO */}
        <div>
          <h2 className="text-4xl md:text-5xl font-bold text-green-900 uppercase mb-6 tracking-wide">
            Postani del naše skupnosti
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Si ljubiteljica narave, tradicije in želiš postati aktivni del lovske skupnosti?
            Društvo slovenskih lovk odpira vrata vsem, ki si želijo soustvarjati prihodnost slovenskega lovstva.
            Včlanitev je preprosta – lahko izpolniš pristopno izjavo ročno ali preko spletnega obrazca.
          </p>
          <p className="text-md text-gray-600 mb-4">
            Tvoje članstvo ti prinaša dostop do dogodkov, obvestil, izobraževanj in priložnost,
            da postaneš del izjemne skupine predanih lovk.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            {/* DOWNLOAD PDF */}
            <a
              href="/assets/pristopna-izjava.pdf"
              download
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-white font-semibold bg-green-700 hover:bg-green-800 transition"
            >
              <Download size={20} />
              Prenesi izjavo (PDF)
            </a>

            {/* ONLINE FORMA */}
            <Link
              to="/vclanitev-forma"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-green-800 font-semibold border border-green-700 hover:bg-green-100 transition"
            >
              <PencilLine size={20} />
              Izpolni spletni obrazec
            </Link>
          </div>
        </div>

        {/* SLIKA ILI ILUSTRACIJA */}
        <div className="w-full">
          <img
            src="/assets/pristop-slika.jpg"
            alt="join us"
            className="rounded-xl shadow-lg object-cover w-full max-h-[500px]"
          />
        </div>
      </div>
    </section>
  );
};

export default Enrollment;
