import NavBar from "../components/NavBar";
import TypingGame from '../components/TypingGame/TypingGame'
import Footer from "../components/Footer";
import BeginButton from "../components/BeginButton";
import Header from "../components/Header";


const Home = () => {
  return (
    <div className="home-container">
      <Header />
      <BeginButton />
      <NavBar />
      <Footer />
    </div>
  );
};

export default Home;
