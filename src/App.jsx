import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Products from "./components/Products";
import Sliders from "./components/Sliders";
import Footer from "./components/Footer";
import FloatingBackground from "./components/FloatingBackground";

function App() {
  return (
    <>
      <FloatingBackground />
      <Navbar />
      <Hero />
      <Sliders />
      <Products />
      <Footer />
    </>
  );
}

export default App;
