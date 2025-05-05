import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  query,
  where,
} from "firebase/firestore";

const AdminApproval = () => {
  const [korisnici, setKorisnici] = useState([]);

  const fetchKorisnici = async () => {
    const q = query(collection(db, "clanice"), where("odobreno", "==", false));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setKorisnici(data);
  };

  const odobriPristup = async (id) => {
    await updateDoc(doc(db, "clanice", id), {
      odobreno: true,
    });
    fetchKorisnici();
  };

  useEffect(() => {
    fetchKorisnici();
  }, []);

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <h2 className="text-xl font-semibold mb-4">🔐 Odobravanje pristupa</h2>

      {korisnici.length === 0 ? (
        <p className="text-gray-600">Nema zahtjeva za odobravanje.</p>
      ) : (
        <ul className="space-y-3">
          {korisnici.map((k) => (
            <li
              key={k.id}
              className="flex items-center justify-between bg-gray-100 px-4 py-2 rounded"
            >
              <span>{k.email}</span>
              <button
                onClick={() => odobriPristup(k.id)}
                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
              >
                Odobri
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminApproval;
