import HeroBanner from "../components/HeroBanner";
import PhotoGallery from "../components/PhotoGallery";
import AboutSection from "../components/AboutSection";
import BoardMembers from "../components/BoardMembers";
import Footer from "../layout/Footer";

const Home = () => {
    return (
      <>
        <HeroBanner />
        <BoardMembers />
        <PhotoGallery />
        <AboutSection />
      </>
    );
  };
  
  export default Home;
  