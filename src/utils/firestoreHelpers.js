// src/utils/firestoreHelpers.js
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase";

export const addGallery = async ({ title, location, date, imageUrls }) => {
  try {
    const docRef = await addDoc(collection(db, "galerije"), {
      title,
      location,
      date,
      images: imageUrls,
      createdAt: Timestamp.now()
    });
    return docRef.id;
  } catch (err) {
    console.error("Greška prilikom dodavanja galerije:", err);
    throw err;
  }
};
