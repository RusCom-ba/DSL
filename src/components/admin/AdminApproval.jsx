import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  query,
  where,
} from "firebase/firestore";

const AdminApproval = () => {
  const [uporabnice, setUporabnice] = useState([]);

  const fetchUporabnice = async () => {
    const q = query(collection(db, "clanice"), where("odobreno", "==", false));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setUporabnice(data);
  };

  const odobriPristop = async (id) => {
    await updateDoc(doc(db, "clanice", id), {
      odobreno: true,
    });
    fetchUporabnice();
  };

  useEffect(() => {
    fetchUporabnice();
  }, []);

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <h2 className="text-xl font-semibold mb-4">🔐 Odobritev dostopa</h2>

      {uporabnice.length === 0 ? (
        <p className="text-gray-600">Ni zahtevkov za odobritev.</p>
      ) : (
        <ul className="space-y-3">
          {uporabnice.map((u) => (
            <li
              key={u.id}
              className="flex items-center justify-between bg-gray-100 px-4 py-2 rounded"
            >
              <span>{u.email}</span>
              <button
                onClick={() => odobriPristop(u.id)}
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
