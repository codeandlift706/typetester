import NavBar from "../components/NavBar";
import TypingGame from '../components/TypingGame/TypingGame'
import Footer from "../components/Footer";


const Home = () => {
  return (
    <div className="container">
      <NavBar />
      <TypingGame />
      <Footer />
    </div>
  );
};

export default Home;
