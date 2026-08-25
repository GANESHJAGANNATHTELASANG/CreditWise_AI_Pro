import HomeBackground from "../components/HomeBackground";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <HomeBackground>
      <div className="min-h-screen">
        <Navbar />
      </div>
    </HomeBackground>
  );
};

export default Home;
