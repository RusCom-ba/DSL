import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./layout/Navbar";
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import Footer from "./layout/Footer";
import EnrollmentForm from "./components/EnrollmentForm";
import GalleryDetail from "./components/GalleryDetail";
import GalleryOverview from "./components/GalleryOverview";
import LoginNews from "./components/LoginNews";
import RegisterForAccess from "./components/RegisterForAccess";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin-dash" element={<AdminDashboard />} />
        <Route path="/vclanitev-forma" element={<EnrollmentForm />} />
        <Route path="/galerija" element={<GalleryOverview />} />
        <Route path="/galerija/:id" element={<GalleryDetail />} />
        <Route path="/prijava" element={<LoginNews />} />
        <Route path="/register" element={<RegisterForAccess />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
