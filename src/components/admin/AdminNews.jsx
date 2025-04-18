import React, { useState, useEffect } from "react";
import { db, storage } from "../../firebase";
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
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { FileText } from "lucide-react";

const AdminNews = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
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

  const handlePdfUpload = async (file) => {
    const pdfPath = `pdfs/${Date.now()}_${file.name}`;
    const storageRef = ref(storage, pdfPath);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return { url, pdfPath };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) return;

    let pdfUrl = null;
    let pdfPath = null;

    if (pdfFile) {
      try {
        const uploadResult = await handlePdfUpload(pdfFile);
        pdfUrl = uploadResult.url;
        pdfPath = uploadResult.pdfPath;
      } catch (error) {
        console.error("Napaka pri nalaganju PDF datoteke:", error);
        return;
      }
    }

    await addDoc(collection(db, "obvestila"), {
      title,
      content,
      pdfUrl: pdfUrl || null,
      pdfPath: pdfPath || null,
      createdAt: Timestamp.now(),
    });

    setTitle("");
    setContent("");
    setPdfFile(null);
    fetchObvestila();
  };

  const handleDelete = async (id, pdfPath) => {
    if (window.confirm("Ali ste prepričani, da želite izbrisati to obvestilo?")) {
      try {
        await deleteDoc(doc(db, "obvestila", id));
        if (pdfPath) {
          const fileRef = ref(storage, pdfPath);
          await deleteObject(fileRef);
        }
        fetchObvestila();
      } catch (error) {
        console.error("Napaka pri brisanju:", error);
      }
    }
  };

  return (
      <div className="p-6 bg-white shadow rounded-lg">
        <h2 className="text-xl font-semibold mb-4">📰 Upravljanje z obvestili</h2>

        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <input
              type="text"
              placeholder="Naslov obvestila"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              required
          />
          <textarea
              placeholder="Vsebina obvestila..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              rows={4}
              required
          />
          <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setPdfFile(e.target.files[0])}
              className="w-full"
          />
          <button
              type="submit"
              className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded"
          >
            Objavi obvestilo
          </button>
        </form>

        <ul className="space-y-4">
          {obvestila.map((item) => (
              <li
                  key={item.id}
                  className="bg-gray-50 p-4 border rounded shadow-sm flex justify-between items-start"
              >
                <div className="flex-1">
                  <p className="font-semibold text-green-800 text-lg">{item.title}</p>
                  <p className="text-gray-700 text-sm mt-1 whitespace-pre-line">
                    {item.content}
                  </p>
                  {item.pdfUrl && (
                      <a
                          href={item.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 mt-3 text-blue-700 text-sm hover:underline"
                      >
                        <FileText size={16} />
                        Odpri PDF dokument
                      </a>
                  )}
                </div>
                <button
                    onClick={() => handleDelete(item.id, item.pdfPath)}
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
