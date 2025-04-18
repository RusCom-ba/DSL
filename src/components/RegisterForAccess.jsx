import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { setDoc, doc } from "firebase/firestore";
import { Link } from "react-router-dom";

const RegisterForAccess = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "clanice", userCred.user.uid), {
        email,
        odobreno: false,
      });
      setSuccess(true);
      setEmail("");
      setPassword("");
    } catch (err) {
      console.error(err);
      setError("Napaka pri registraciji. Morda ta e-poštni naslov že obstaja.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold text-green-800 mb-4 text-center">
          Zahteva za dostop
        </h2>

        {success ? (
          <p className="text-green-700 text-center font-medium">
            Vaša zahteva je bila uspešno poslana. Prosimo, počakajte na odobritev s strani administratorja.
          </p>
        ) : (
          <form onSubmit={handleRegister} className="space-y-4">
            <input
              type="email"
              placeholder="E-pošta"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded"
              required
            />
            <input
              type="password"
              placeholder="Geslo"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded"
              required
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-800 transition"
            >
              Pošlji zahtevo
            </button>
            <p className="text-sm text-center mt-2">
              <Link
                to="/prijava"
                className="text-green-700 hover:underline"
              >
                Nazaj na prijavo
              </Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default RegisterForAccess;
