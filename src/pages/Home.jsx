import HeroBanner from "../components/HeroBanner";
import PhotoGallery from "../components/PhotoGallery";
import AboutSection from "../components/AboutSection";
import BoardMembers from "../components/BoardMembers";
import Presentation from "../components/Presentation";
import Notification from "../components/Notification";
import Enrollment from "../components/Enrollment";

const Home = () => {
    return (
      <>
        <HeroBanner />
        <Presentation />
        <BoardMembers />
        <Notification />
        <Enrollment />
        <AboutSection />
      </>
    );
  };
  
  export default Home;
  