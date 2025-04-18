import React from "react";
import {
  Building2,
  CreditCard,
  MapPin,
  Mail,
  Globe,
  Phone,
  Info,
} from "lucide-react";

const AboutSection = () => {
  return (
    <section id="o-drustvu" className="bg-white px-6 py-20 text-gray-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div>
          <h2 className="text-4xl font-bold mb-8 text-green-800 flex items-center gap-2">
            <Info className="w-8 h-8" />O Društvu
          </h2>

          <div className="space-y-6 text-lg">
            <div>
              <h3 className="text-2xl font-semibold text-green-700 mb-2 flex items-center gap-2">
                <Building2 className="w-5 h-5" /> Podatki
              </h3>
              <p>
                <strong>DRUŠTVO SLOVENSKIH LOVK</strong>
              </p>
              <p>
                <strong>Matična številka:</strong> 405725200
              </p>
              <p>
                <strong>TRR:</strong> IBAN SI56 1915 5501 1452 792
              </p>
              <p className="text-sm text-gray-500">
                (Deželna banka Tolmin, PE Koper)
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-green-700 mb-2 flex items-center gap-2">
                <Phone className="w-5 h-5" /> Kontakt
              </h3>
              <p>
                <strong>Telefon:</strong> +386 41 786 620 (Ivica Kocjančič)
              </p>
              <p>
                <strong>Spletno mesto:</strong>{" "}
                <a
                  href="https://www.drustvoslovenskihlovk.si"
                  className="text-green-600 underline hover:text-green-800"
                  target="_blank"
                >
                  www.drustvoslovenskihlovk.si
                </a>
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-green-700 mb-2 flex items-center gap-2">
                <MapPin className="w-5 h-5" /> Lokacija društva
              </h3>
              <p>Partizanska cesta 49, 6210 Sežana</p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-green-700 mb-2 flex items-center gap-2">
                <Mail className="w-5 h-5" /> Poštni predal
              </h3>
              <p>Poštni predal 1403, 6105 Koper</p>
            </div>
          </div>
        </div>
        <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2791.2598611194355!2d13.875250215867473!3d45.685447379104154!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477b51a6d6d3517d%3A0x2e6b39dd6c8ff8a1!2sPartizanska%20cesta%2049%2C%206210%20Se%C5%BEana!5e0!3m2!1ssl!2ssi!4v1713361003900!5m2!1ssl!2ssi"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Lokacija društva"
          ></iframe>
        </div>

        <div className="mt-10 text-center md:col-span-2">
          <a
            href="mailto:drustvo@slovenskihlovk.si"
            className="inline-block bg-green-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-green-800 transition duration-300"
          >
            Kontaktirajte nas
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
