import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const ImageUploader = () => {
  const [files, setFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    multiple: true,
  });

  const handleUpload = () => {
    alert(`Uploadano ${files.length} slika!`);
    console.log(files);
  };

  return (
    <div>
      <div
        {...getRootProps()}
        className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer bg-white hover:bg-gray-50 transition"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-gray-600">Pusti slike ovdje...</p>
        ) : (
          <p className="text-gray-600">
            Povuci i pusti slike ovdje, ili klikni za izbor
          </p>
        )}
      </div>

      {files.length > 0 && (
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {files.map((file, index) => (
            <div key={index} className="relative">
              <img
                src={file.preview}
                alt="preview"
                className="h-40 w-full object-cover rounded shadow"
              />
            </div>
          ))}
        </div>
      )}

      {files.length > 0 && (
        <button
          onClick={handleUpload}
          className="mt-6 bg-green-700 text-white font-semibold px-6 py-2 rounded shadow hover:bg-green-800 transition"
        >
          Pošalji slike
        </button>
      )}
    </div>
  );
};

export default ImageUploader;
