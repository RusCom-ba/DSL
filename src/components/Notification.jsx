import React from "react";
import { LogIn } from "lucide-react";
import { Link } from "react-router-dom";

const Notification = () => {
  return (
    <section
      id="obvestila"
      className="bg-white py-24 px-6 border-t border-b border-green-100"
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-green-900 uppercase mb-6 tracking-wider">
          OBVESTILA
        </h2>

        <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-10">
          Za dostop do obvestil in informacij društva je potrebna prijava. Le članice z dostopom lahko spremljajo vse pomembne objave in dogodke.
        </p>

        <Link
          to="/prijava"
          className="inline-flex items-center gap-3 bg-green-700 hover:bg-green-800 text-white font-semibold text-lg px-8 py-3 rounded-full shadow-lg transition duration-300"
        >
          <LogIn size={22} />
          Prijava za članice
        </Link>
      </div>
    </section>
  );
};

export default Notification;
