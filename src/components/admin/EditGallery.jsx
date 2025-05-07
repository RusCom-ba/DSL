import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  doc,
  getDoc,
  updateDoc,
  arrayRemove,
  arrayUnion,
} from "firebase/firestore";
import { db, auth } from "../../firebase";
import axios from "axios";
import { Link } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

const EditGallery = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [gallery, setGallery] = useState(null);
  const [images, setImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        navigate("/admin-dash");
        return;
      }

      const snap = await getDoc(doc(db, "clanice", user.uid));
      if (!snap.exists() || !snap.data().isAdmin) {
        navigate("/admin-dash");
        return;
      }

      const ref = doc(db, "galerije", id);
      const snapGallery = await getDoc(ref);
      if (snapGallery.exists()) {
        setGallery(snapGallery.data());
        setImages(snapGallery.data().images || []);
      }
    });

    return () => unsubscribe();
  }, [id, navigate]);

  const handleDeleteImage = async (imageUrl) => {
    const confirmed = window.confirm("Ali ste prepričani, da želite izbrisati to sliko?");
    if (!confirmed) return;

    try {
      setImages((prev) => prev.filter((img) => img !== imageUrl));
      await updateDoc(doc(db, "galerije", id), {
        images: arrayRemove(imageUrl),
      });
    } catch (err) {
      console.error("Napaka pri brisanju slike:", err);
      alert("Napaka pri brisanju slike.");
    }
  };

  const handleNewImages = (e) => {
    const files = Array.from(e.target.files);
    setNewImages(files);
  };

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "dsl_upload");

    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/duvaqx6mc/image/upload",
      formData
    );
    return res.data.secure_url;
  };

  const handleUploadNewImages = async () => {
    if (newImages.length === 0) return;
    setUploading(true);
    try {
      const urls = [];
      for (const image of newImages) {
        const url = await uploadToCloudinary(image);
        urls.push(url);
        setImages((prev) => [...prev, url]); 
      }

      await updateDoc(doc(db, "galerije", id), {
        images: arrayUnion(...urls),
      });

      setNewImages([]);
    } catch (err) {
      console.error("Napaka pri nalaganju slik:", err);
      alert("Napaka pri nalaganju slik.");
    } finally {
      setUploading(false);
    }
  };

  if (!gallery) return <p>Galerija se nalaga...</p>;

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-24">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-green-800 mb-6">
          Uredi galerijo: {gallery.title}
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
          {images.map((img, i) => (
            <div key={i} className="relative group">
              <img
                src={img}
                alt={`img-${i}`}
                className="w-full h-40 object-cover rounded-lg shadow"
              />
              <button
                onClick={() => handleDeleteImage(img)}
                className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 text-xs opacity-0 group-hover:opacity-100 transition"
                title="Izbriši sliko"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Dodaj nove slike</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleNewImages}
          />
        </div>

        {newImages.length > 0 && (
          <div className="mb-4">
            <p className="text-sm text-gray-700 mb-2">
              Izbrane slike za nalaganje:
            </p>
            <ul className="list-disc pl-5 text-sm text-gray-600">
              {newImages.map((file, i) => (
                <li key={i}>{file.name}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex justify-between items-center mt-6">
          <button
            onClick={handleUploadNewImages}
            className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded transition"
            disabled={uploading}
          >
            {uploading ? "Nalagam..." : "Naloži nove slike"}
          </button>

          <Link
            to="/admin-dash"
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded transition"
          >
            Nazaj na Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EditGallery;
