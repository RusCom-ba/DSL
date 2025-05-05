// GalleryDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

const GalleryDetail = () => {
  const { id } = useParams();
  const [gallery, setGallery] = useState(null);

  useEffect(() => {
    const fetchGallery = async () => {
      const ref = doc(db, "galerije", id);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setGallery(snap.data());
      } else {
        setGallery(undefined); // signal da ne postoji
      }
    };

    fetchGallery();
  }, [id]);

  if (gallery === undefined) {
    return <p className="text-center mt-20">Galerija ne obstaja.</p>;
  }

  if (!gallery) return <p className="text-center mt-20">Učitavanje...</p>;

  return (
    <section className="bg-green-50 py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-green-800 mb-10">
          {gallery.title}
        </h2>
        <PhotoProvider>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {gallery.images.map((src, i) => (
              <PhotoView key={i} src={src}>
                <img
                  src={src}
                  alt={`Slika ${i + 1}`}
                  className="rounded-xl shadow-md cursor-pointer hover:scale-105 transition-transform"
                />
              </PhotoView>
            ))}
          </div>
        </PhotoProvider>
      </div>
    </section>
  );
};

export default GalleryDetail;
