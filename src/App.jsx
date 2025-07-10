// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Populares from "./pages/Populares";
import UltimosLanzamientos from "./pages/UltimosLanzamientos";
import DetallePelicula from "./pages/DetallePelicula";
import MejoresPuntuadas from './pages/MejoresPuntuadas';
import Favoritos from './pages/Favoritos'; // ✅ Nueva importación
import Header from "./components/Header";

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/populares" element={<Populares />} />
        <Route path="/ultimos-lanzamientos" element={<UltimosLanzamientos />} />
        <Route path="/mejores-puntuadas" element={<MejoresPuntuadas />} />
        <Route path="/favoritos" element={<Favoritos />} /> {/* ✅ Nueva ruta */}
        <Route path="/pelicula/:id" element={<DetallePelicula />} />
      </Routes>
    </Router>
  );
}



