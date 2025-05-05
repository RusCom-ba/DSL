import React, { useState } from "react";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../firebase";
import axios from "axios";

const GalleryUploadForm = () => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "dsl_upload");

    const response = await axios.post(
        "https://api.cloudinary.com/v1_1/duvaqx6mc/image/upload",
      formData
    );

    return response.data.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !location || !date || images.length === 0) {
      alert("Molimo popunite sva polja i dodajte slike.");
      return;
    }

    setUploading(true);
    try {
      const uploadedUrls = [];
      for (const image of images) {
        const url = await uploadToCloudinary(image);
        uploadedUrls.push(url);
      }

      await addDoc(collection(db, "galerije"), {
        title,
        location,
        date,
        images: uploadedUrls,
        createdAt: Timestamp.now()
      });

      setSuccess(true);
      setTitle("");
      setLocation("");
      setDate("");
      setImages([]);
    } catch (err) {
      console.error("Greška prilikom dodavanja galerije:", err);
      alert("Greška prilikom slanja galerije.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block font-medium mb-1">Naslov galerije</label>
        <input
          type="text"
          className="input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Lokacija</label>
        <input
          type="text"
          className="input"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Datum</label>
        <input
          type="date"
          className="input"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Dodaj slike</label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>

      <button
        type="submit"
        className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded transition"
        disabled={uploading}
      >
        {uploading ? "Dodavanje..." : "Objavi galeriju"}
      </button>

      {success && (
        <p className="text-green-700 font-medium mt-4">Galerija uspješno dodana!</p>
      )}
    </form>
  );
};

export default GalleryUploadForm;
