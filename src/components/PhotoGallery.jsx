import React from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";

const images = [
  {
    src: "/assets/photo1.jpg",
    alt: "Dogodek 1",
  },
  {
    src: "/assets/photo2.jpg",
    alt: "Dogodek 2",
  },
  {
    src: "/assets/photo3.jpg",
    alt: "Dogodek 3",
  },
  {
    src: "/assets/photo4.jpg",
    alt: "Dogodek 4",
  },
];

const PhotoGallery = () => {
  return (
    <section id="galerija" className="bg-white px-6 py-24 text-gray-800">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center text-green-800 uppercase tracking-wider">
          Fotogalerija
        </h2>

        <PhotoProvider>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {images.map((img, index) => (
              <PhotoView key={index} src={img.src}>
                <div className="cursor-pointer group relative overflow-hidden rounded-lg shadow-md">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="object-cover w-full h-64 transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white text-lg font-semibold">
                    {img.alt}
                  </div>
                </div>
              </PhotoView>
            ))}
          </div>
        </PhotoProvider>
      </div>
    </section>
  );
};

export default PhotoGallery;
