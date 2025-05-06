import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  Timestamp,
  orderBy,
  query,
} from "firebase/firestore";

const AdminNews = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [obvestila, setObvestila] = useState([]);

  const fetchObvestila = async () => {
    const q = query(collection(db, "obvestila"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setObvestila(data);
  };

  useEffect(() => {
    fetchObvestila();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) return;

    await addDoc(collection(db, "obvestila"), {
      title,
      content,
      createdAt: Timestamp.now(),
    });

    setTitle("");
    setContent("");
    fetchObvestila();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Ali ste prepričani, da želite izbrisati to obvestilo?")) {
      await deleteDoc(doc(db, "obvestila", id));
      fetchObvestila();
    }
  };

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <h2 className="text-xl font-semibold mb-4">📰 Upravljanje z obvestili</h2>

      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <div>
          <input
            type="text"
            placeholder="Naslov obvestila"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div>
          <textarea
            placeholder="Vsebina obvestila..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            rows={4}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded"
        >
          Objavi obvestilo
        </button>
      </form>

      <ul className="space-y-3">
        {obvestila.map((item) => (
          <li
            key={item.id}
            className="bg-gray-100 p-4 rounded shadow-sm flex justify-between items-start"
          >
            <div>
              <p className="font-semibold text-green-800">{item.title}</p>
              <p className="text-gray-700 text-sm mt-1 whitespace-pre-line">
                {item.content}
              </p>
            </div>
            <button
              onClick={() => handleDelete(item.id)}
              className="text-sm text-red-600 hover:underline ml-4"
            >
              Izbriši
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminNews;
