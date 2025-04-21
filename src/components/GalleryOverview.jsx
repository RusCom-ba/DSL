import React from "react";
import { galleries } from "../data/galleryData";
import { Link } from "react-router-dom";

const GalleryOverview = () => {
  return (
    <section className="min-h-screen bg-white px-6 py-20">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-12 text-center text-green-800">
          Fotogalerije
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {galleries.map((gallery) => (
            <Link
              key={gallery.id}
              to={`/fotogalerija/${gallery.id}`}
              className="block bg-white shadow-lg rounded-lg overflow-hidden hover:scale-[1.02] transition transform"
            >
              {/* Title */}
              <div className="bg-green-800 text-white text-center px-4 py-3 font-semibold">
                {gallery.title}
              </div>

              {/* Image */}
              <div className="aspect-w-4 aspect-h-3">
                <img
                  src={gallery.coverImage}
                  alt={gallery.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Footer: Location & Date */}
              <div className="bg-green-800 text-white text-center px-4 py-2 text-sm">
                {gallery.location} {gallery.date}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GalleryOverview;
