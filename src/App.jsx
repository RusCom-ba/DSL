import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./layout/Navbar";
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import Footer from "./layout/Footer";
import EnrollmentForm from "./components/EnrollmentForm";
import PhotoGallery from "./components/PhotoGallery";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin-dash" element={<AdminDashboard />} />
        <Route path="/vclanitev-forma" element={<EnrollmentForm />} />
        <Route path="/fotogalerija" element={<PhotoGallery />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
