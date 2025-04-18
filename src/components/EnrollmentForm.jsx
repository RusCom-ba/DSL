import React, { useState } from "react";

const EnrollmentForm = () => {
  const [formData, setFormData] = useState({
    ime: "",
    datumRojstva: "",
    krajRojstva: "",
    drzavljanstvo: "",
    stalnoPrebivalisce: "",
    zacasnoPrebivalisce: "",
    telefonDomaci: "",
    telefonMobilni: "",
    email: "",
    lovskaDruzina: "",
    obmocnaZveza: "",
    pesInfo: "",
    izobrazba: "",
    sporocilo: ""
  });

  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitted data:", formData);
    setStatus("success");
  };

  return (
    <section className="bg-gradient-to-b from-white to-green-50 py-20 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-xl p-10">
        <h2 className="text-3xl md:text-4xl font-bold text-green-800 text-center mb-10">
          Pristopna izjava – Včlanitev v društvo
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="label">Ime in priimek</label>
              <input name="ime" className="input" value={formData.ime} onChange={handleChange} required />
            </div>
            <div>
              <label className="label">Datum rojstva</label>
              <input type="date" name="datumRojstva" className="input" value={formData.datumRojstva} onChange={handleChange} required />
            </div>
            <div>
              <label className="label">Kraj rojstva</label>
              <input name="krajRojstva" className="input" value={formData.krajRojstva} onChange={handleChange} />
            </div>
            <div>
              <label className="label">Državljanstvo</label>
              <input name="drzavljanstvo" className="input" value={formData.drzavljanstvo} onChange={handleChange} />
            </div>
            <div>
              <label className="label">Stalno prebivališče</label>
              <input name="stalnoPrebivalisce" className="input" value={formData.stalnoPrebivalisce} onChange={handleChange} />
            </div>
            <div>
              <label className="label">Začasno prebivališče</label>
              <input name="zacasnoPrebivalisce" className="input" value={formData.zacasnoPrebivalisce} onChange={handleChange} />
            </div>
            <div>
              <label className="label">Domači telefon</label>
              <input name="telefonDomaci" className="input" value={formData.telefonDomaci} onChange={handleChange} />
            </div>
            <div>
              <label className="label">Mobilni telefon</label>
              <input name="telefonMobilni" className="input" value={formData.telefonMobilni} onChange={handleChange} />
            </div>
            <div>
              <label className="label">E-pošta</label>
              <input type="email" name="email" className="input" value={formData.email} onChange={handleChange} required />
            </div>
            <div>
              <label className="label">Članica lovske družine</label>
              <input name="lovskaDruzina" className="input" value={formData.lovskaDruzina} onChange={handleChange} />
            </div>
            <div>
              <label className="label">Članica območne zveze</label>
              <input name="obmocnaZveza" className="input" value={formData.obmocnaZveza} onChange={handleChange} />
            </div>
            <div>
              <label className="label">Vodnica lovskega psa in ime psa</label>
              <input name="pesInfo" className="input" value={formData.pesInfo} onChange={handleChange} />
            </div>
            <div className="md:col-span-2">
              <label className="label">Izobrazba</label>
              <input name="izobrazba" className="input" value={formData.izobrazba} onChange={handleChange} />
            </div>
            <div className="md:col-span-2">
              <label className="label">Sporočilo</label>
              <textarea name="sporocilo" rows={3} className="input" value={formData.sporocilo} onChange={handleChange} />
            </div>
          </div>

          <button type="submit" className="w-full py-3 bg-green-700 hover:bg-green-800 text-white rounded-md font-semibold text-lg transition">
            Pošlji prijavo
          </button>

          {status === "success" && (
            <p className="text-center text-green-700 font-semibold mt-4">
              Prijava uspešno poslana!
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default EnrollmentForm;
