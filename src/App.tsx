import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Home from "./Routes/Home";
import Movie from "./Routes/Movie";
import Search from "./Routes/Search";
import Tv from "./Routes/Tv";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/kimchiflix" element={<Home />} />
        <Route path="/tv/:movieId" element={<Tv />} />
        <Route path="/tv" element={<Tv />} />
        <Route path="/search/:search/:movieId" element={<Search />} />
        <Route path="/search" element={<Search />} />
        <Route path="/movies/:movieId" element={<Movie />} />
        <Route path="/" element={<Movie />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
