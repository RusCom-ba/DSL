// GalleryOverview.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const GalleryOverview = () => {
  const [galleries, setGalleries] = useState([]);

  useEffect(() => {
    const fetchGalleries = async () => {
      const snapshot = await getDocs(collection(db, "galerije"));
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setGalleries(data);
    };

    fetchGalleries();
  }, []);

  return (
    <section id="galerija" className="bg-white py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-green-800 text-center mb-14 uppercase">
          Fotogalerija
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {galleries.map((g) => (
            <Link
              to={`/galerija/${g.id}`}
              key={g.id}
              className="bg-white rounded-xl border border-green-200 shadow-md hover:shadow-xl transition duration-300"
            >
              <div className="bg-green-800 text-white text-center font-semibold py-2 rounded-t-xl">
                {g.title}
              </div>

              <div className="flex justify-center py-5 px-2 bg-white">
                <img
                  src={g.images?.[0]}
                  alt={g.title}
                  className="w-full max-w-[280px] h-[200px] object-cover rounded-[30%] "
                  style={{
                    boxShadow: "0 0 35px 10px rgba(0, 93, 41, 0.4)", // zeleni blur oko ivica
                  }}
                />
              </div>

              <div className="bg-green-800 text-white text-center py-2 font-medium rounded-b-xl">
                {g.location} {g.date}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GalleryOverview;
