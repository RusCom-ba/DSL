import React, { useState } from "react";
import ImageUploader from "../components/ImageUploader";


const AdminDashboard = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (password === "tajna123") {
      setLoggedIn(true);
    } else {
      alert("Netočna lozinka!");
    }
  };

  if (!loggedIn) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Unesi lozinku..."
            className="w-full border px-4 py-2 rounded mb-4"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-800 transition"
          >
            Prijavi se
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <h1 className="text-4xl font-bold mb-6 text-green-800">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-white shadow rounded-lg">
          <h2 className="text-xl font-semibold mb-2">📤 Dodaj nove slike</h2>
          <ImageUploader />
        </div>
        
        <div className="p-6 bg-white shadow rounded-lg">
          <h2 className="text-xl font-semibold mb-2">🖼️ Upravljanje galerijama</h2>
          <p>Pregledaj, uređuj i briši postojeće galerije.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
