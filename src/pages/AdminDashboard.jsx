import React, { useState, useEffect } from "react";
import GalleryUploadForm from "../components/GalleryUploadForm";
import AdminNews from "../components/AdminNews";
import AdminApproval from "../components/AdminApproval";
import { auth, db } from "../firebase";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";

const AdminDashboard = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [galleries, setGalleries] = useState([]);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCred.user.uid;

      const docSnap = await getDoc(doc(db, "clanice", uid));
      if (!docSnap.exists() || !docSnap.data().isAdmin) {
        setError("Nemate administratorski pristup.");
        return;
      }

      setLoggedIn(true);
      fetchGalleries();
    } catch (err) {
      console.error(err);
      setError("Netočen e-mail ili geslo.");
    }
  };

  const fetchGalleries = async () => {
    const querySnapshot = await getDocs(collection(db, "galerije"));
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setGalleries(data);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Da li ste sigurni da želite obrisati ovu galeriju?")) {
      await deleteDoc(doc(db, "galerije", id));
      fetchGalleries();
    }
  };

  if (!loggedIn) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-bold mb-4 text-center">Admin Prijava</h2>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail"
            className="w-full border px-4 py-2 rounded mb-4"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Geslo"
            className="w-full border px-4 py-2 rounded mb-4"
          />
          {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
          <button
            onClick={handleLogin}
            className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-800 transition"
          >
            Prijava
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-10 py-24">
      <h1 className="text-4xl font-bold mb-6 text-green-800">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-white shadow rounded-lg">
          <h2 className="text-xl font-semibold mb-2">📤 Dodaj nove slike</h2>
          <GalleryUploadForm refreshGalleries={fetchGalleries} />
        </div>

        <div className="p-6 bg-white shadow rounded-lg">
          <h2 className="text-xl font-semibold mb-4">🖼️ Upravljanje galerijama</h2>
          <ul className="space-y-3">
            {galleries.map((g) => (
              <li
                key={g.id}
                className="flex items-center justify-between bg-gray-100 px-4 py-2 rounded"
              >
                <div>
                  <p className="font-medium">{g.title}</p>
                  <p className="text-sm text-gray-600">
                    {g.location} | {g.date}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(g.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                >
                  Obriši
                </button>
              </li>
            ))}
          </ul>
        </div>

        <AdminNews />
        <AdminApproval />
      </div>
    </div>
  );
};

export default AdminDashboard;
