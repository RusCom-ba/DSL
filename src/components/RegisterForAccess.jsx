import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { setDoc, doc } from "firebase/firestore";

const RegisterForAccess = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async () => {
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
      setError("Greška prilikom registracije. Korisnik možda već postoji.");
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
          <>
            <input
              type="email"
              placeholder="Email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded mb-4"
              required
            />
            <input
              type="password"
              placeholder="Lozinka..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded mb-4"
              required
            />
            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
            <button
              onClick={handleRegister}
              className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-800 transition"
            >
              Pošlji zahtevo
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default RegisterForAccess;
