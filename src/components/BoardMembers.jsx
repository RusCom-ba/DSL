import React from "react";
import {
  Phone,
  User,
  Users,
  ShieldCheck,
  Mail,
} from "lucide-react"; // Dodan Mail

const upravniOdbor = [
  {
    ime: "Ivica Kocjančič",
    slika: "/assets/predsednica.png",
    pozicija: "Predsednica društva",
    email: "drustvo.slovenskih.lovk@lovskazveza.si",
    tel: "+386 41 786 620",
  },
  {
    ime: "Tjaša Žgur",
    pozicija: "Podpredsednica",
    email: "drustvo.slovenskih.lovk@lovskazveza.si",
    tel: "+386 40 662 848",
  },
  {
    ime: "Magda Sluga",
    pozicija: "Poslovna sekretarka",
    email: "drustvo.slovenskih.lovk@lovskazveza.si",
    tel: "+386 41 657 905",
  },
];

const nadzorniOdbor = {
  predsednica: "Janja Pavlič Razgoršek",
  clanice: ["Jana Mravljak", "Jožica Založnik"],
};

const disciplinskaKomisija = {
  predsednica: "Katka Kovačec",
  clanice: ["Anica Ščap", "Nives Marka"],
};

const BoardMembers = () => {
  return (
    <section id="upravni-odbor" className="bg-gradient-to-b from-white to-green-50 px-6 py-24 text-gray-800">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-14 uppercase tracking-widest text-green-800">
          Upravni odbor
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 mb-20">
          {upravniOdbor.map((clan, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-xl p-6 text-center hover:shadow-2xl transition-all duration-300"
            >
              {clan.slika ? (
                <img
                  src={clan.slika}
                  alt={clan.ime}
                  className="w-36 h-36 object-cover rounded-full mx-auto mb-5 border-4 border-green-300 shadow-md"
                />
              ) : (
                <div className="w-28 h-28 flex items-center justify-center bg-green-100 rounded-full mx-auto mb-4">
                  <User className="text-green-600 w-10 h-10" />
                </div>
              )}
              <h3 className="text-xl font-bold text-green-900">{clan.ime}</h3>
              <p className="text-sm text-gray-600 flex items-center justify-center gap-2 mt-1">
                <ShieldCheck className="w-4 h-4 text-green-500" />
                {clan.pozicija}
              </p>
              <p className="text-sm text-gray-500 mt-2 flex items-center justify-center gap-2">
                <Mail className="w-4 h-4 text-green-500" />
                <a href={`mailto:${clan.email}`} className="hover:underline">{clan.email}</a>
              </p>
              <p className="text-sm text-gray-500 mt-2 flex items-center justify-center gap-2">
                <Phone className="w-4 h-4 text-green-500" />
                {clan.tel}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row justify-evenly items-start gap-10 mt-10">
          <div>
            <h3 className="text-2xl font-semibold text-green-800 mb-2 flex items-center gap-2">
              <Users className="w-5 h-5" />
              Nadzorni odbor
            </h3>
            <p><strong>Predsednica:</strong> {nadzorniOdbor.predsednica}</p>
            <p><strong>Članice:</strong> {nadzorniOdbor.clanice.join(", ")}</p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-green-800 mb-2 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5" />
              Disciplinska komisija
            </h3>
            <p><strong>Predsednica:</strong> {disciplinskaKomisija.predsednica}</p>
            <p><strong>Članice:</strong> {disciplinskaKomisija.clanice.join(", ")}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BoardMembers;
