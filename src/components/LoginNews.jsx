import React, { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth, db } from "../firebase";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import { Megaphone, CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";

const LoginNews = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accessGranted, setAccessGranted] = useState(false);
  const [error, setError] = useState("");
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userSnap = await getDoc(doc(db, "clanice", user.uid));
          if (!userSnap.exists()) return;

          const userData = userSnap.data();
          if (userData.odobreno) {
            setAccessGranted(true);
            await fetchNews();
          }
        } catch (err) {
          console.error("Napaka pri preverjanju uporabnika:", err);
        }
      }
      setInitializing(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCred.user.uid;

      const userSnap = await getDoc(doc(db, "clanice", uid));
      if (!userSnap.exists()) {
        setError("Vašega računa ni mogoče najti v sistemu.");
        return;
      }

      const userData = userSnap.data();
      if (!userData.odobreno) {
        setError("Vaš račun še ni bil odobren s strani administratorja.");
        return;
      }

      setAccessGranted(true);
      fetchNews();
    } catch (err) {
      console.error("Napaka pri prijavi:", err);
      setError("Nepravilen e-mail ali geslo.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setAccessGranted(false);
  };

  const fetchNews = async () => {
    const q = query(collection(db, "obvestila"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setNews(data);
  };

  if (initializing) {
    return (
        <div className="h-screen flex items-center justify-center bg-green-50">
          <p className="text-green-700 text-lg font-medium">Nalagam...</p>
        </div>
    );
  }
  if (accessGranted) {
    return (
        <div className="max-w-4xl mx-auto py-24 px-6">
          <div className="relative mb-8">
            <h1 className="text-3xl font-bold text-green-800 text-center">Društvena obvestila</h1>
            <button
                onClick={handleLogout}
                className="absolute top-1 right-0 text-white bg-green-700 hover:bg-green-800 px-3 py-1 rounded shadow transition"
            >
              Odjava
            </button>
          </div>


          {news.length === 0 ? (
              <p className="text-gray-600 text-center">Ni objavljenih obvestil.</p>
          ) : (
              <ul className="space-y-6">
                {news.map((item) => (
                    <li
                        key={item.id}
                        className="bg-white border border-green-100 shadow p-6 rounded-lg"
                    >
                      <h3 className="text-xl font-semibold text-green-900 mb-2 flex items-center gap-2">
                        <Megaphone size={20} /> {item.title}
                      </h3>
                      <p className="text-gray-700 whitespace-pre-line">
                        {item.content}
                      </p>

                      {item.pdfUrl && (
                          <a
                              href={item.pdfUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-blue-700 mt-3 inline-block hover:underline"
                          >
                            📎 Odpri PDF dokument
                          </a>
                      )}

                      {item.createdAt?.toDate && (
                          <p className="text-sm text-gray-500 mt-2 flex items-center gap-1">
                            <CalendarDays size={16} />
                            {item.createdAt.toDate().toLocaleDateString("sl-SI")}
                          </p>
                      )}
                    </li>
                ))}
              </ul>
          )}
        </div>
    );
  }

  return (
      <div className="h-screen flex items-center justify-center bg-green-50 px-4">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
          <h2 className="text-2xl font-bold text-green-800 mb-4 text-center">
            Prijava za članice
          </h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
                type="email"
                placeholder="E-mail"
                className="w-full px-4 py-2 border rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Geslo"
                className="w-full px-4 py-2 border rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <button
                type="submit"
                className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-800 transition disabled:opacity-50"
                disabled={loading}
            >
              {loading ? "Prijava..." : "Prijava"}
            </button>
          </form>

          <p className="text-sm text-center text-gray-600 mt-4">
            Niste registrirani?{" "}
            <Link
                to="/register"
                className="text-green-700 font-semibold hover:underline"
            >
              Pošlji zahtevo
            </Link>
          </p>
        </div>
      </div>
  );
};

export default LoginNews;
