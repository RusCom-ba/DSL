import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GalleryUploadForm from "../components/admin/GalleryUploadForm";
import AdminNews from "../components/admin/AdminNews";
import AdminApproval from "../components/admin/AdminApproval";
import { auth, db } from "../firebase";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";

const AdminDashboard = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [galleries, setGalleries] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docSnap = await getDoc(doc(db, "clanice", user.uid));
        if (docSnap.exists() && docSnap.data().isAdmin) {
          setLoggedIn(true);
          fetchGalleries();
        } else {
          setLoggedIn(false);
        }
      }
      setCheckingAuth(false);
    });
    return () => unsubscribe();
  }, []);

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

  if (checkingAuth) return null; 

  if (!loggedIn) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100 px-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
          className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full"
        >
          <h2 className="text-2xl font-bold mb-4 text-center">Admin Prijava</h2>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail"
            className="w-full border px-4 py-2 rounded mb-4"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Geslo"
            className="w-full border px-4 py-2 rounded mb-4"
            required
          />
          {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-800 transition"
          >
            Prijava
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-10 py-24">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-green-800">
          Admin Dashboard
        </h1>
        <button
          onClick={async () => {
            await signOut(auth);
            setLoggedIn(false);
          }}
          className="text-sm text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded shadow"
        >
          Odjava
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-white shadow rounded-lg">
          <h2 className="text-xl font-semibold mb-2">📤 Dodaj nove slike</h2>
          <GalleryUploadForm refreshGalleries={fetchGalleries} />
        </div>

        <div className="p-6 bg-white shadow rounded-lg">
          <h2 className="text-xl font-semibold mb-4">
            🖼️ Upravljanje galerijama
          </h2>
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
                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/admin-dash/gallery/${g.id}/edit`)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                  >
                    Uredi
                  </button>
                  <button
                    onClick={() => handleDelete(g.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                  >
                    Izbriši
                  </button>
                </div>
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
