import React, { useState } from "react";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../../firebase";
import axios from "axios";

const GalleryUploadForm = () => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    setImages((prev) => [...prev, ...files]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleRemoveImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
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
      alert("Prosimo, izpolnite vsa polja in dodajte slike.");
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
        createdAt: Timestamp.now(),
      });

      setSuccess(true);
      setTitle("");
      setLocation("");
      setDate("");
      setImages([]);
    } catch (err) {
      console.error("Napaka pri dodajanju galerije:", err);
      alert("Napaka pri pošiljanju galerije.");
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

      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="border-2 border-dashed border-gray-400 p-6 rounded text-center cursor-pointer bg-gray-50 hover:bg-gray-100"
      >
        <p className="mb-2 text-gray-700">
          Povlecite slike sem ali kliknite spodaj za dodajanje
        </p>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          className="w-full"
        />
      </div>

      {images.length > 0 && (
        <ul className="text-sm text-gray-700 list-disc list-inside space-y-1">
          {images.map((file, idx) => (
            <li key={idx} className="flex justify-between items-center">
              <span>{file.name}</span>
              <button
                type="button"
                onClick={() => handleRemoveImage(idx)}
                className="text-red-600 hover:text-red-800 text-xs ml-4"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}

      <button
        type="submit"
        className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded transition"
        disabled={uploading}
      >
        {uploading ? "Dodajanje..." : "Objavi galerijo"}
      </button>

      {success && (
        <p className="text-green-700 font-medium mt-4">
          Galerija je bila uspešno dodana!
        </p>
      )}
    </form>
  );
};

export default GalleryUploadForm;
