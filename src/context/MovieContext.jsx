// src/context/MovieContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import axios from '../api/axios';

const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [populares, setPopulares] = useState([]);
  const [mejoresPuntuadas, setMejoresPuntuadas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [sessionId, setSessionId] = useState(null);
  const [error, setError] = useState(null);

  // 👉 NUEVO: estado para favoritos
  const [favoritos, setFavoritos] = useState([]);

  // 👉 NUEVO: función para alternar favorito
  const toggleFavorito = (pelicula) => {
    setFavoritos((prev) => {
      const yaEsta = prev.find((p) => p.id === pelicula.id);
      return yaEsta ? prev.filter((p) => p.id !== pelicula.id) : [...prev, pelicula];
    });
  };

  // 👉 NUEVO: función para verificar si una película está en favoritos
  const esFavorito = (peliculaId) => {
    return favoritos.some((p) => p.id === peliculaId);
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const popularesRes = await axios.get('movie/popular');
        const mejoresRes = await axios.get('movie/top_rated');
        setPopulares(popularesRes.data.results);
        setMejoresPuntuadas(mejoresRes.data.results);
        setCargando(false);
      } catch (error) {
        setError('Error al cargar películas.');
      }
    };

    fetchMovies();
  }, []);

  const obtenerToken = async () => {
    const response = await axios.post('authentication/token/new');
    return response.data.request_token;
  };

  const redirigirAutenticacion = (requestToken) => {
    window.location.href = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=http://www.tusitio.com/callback`;
  };

  const crearSesion = async (requestToken) => {
    const response = await axios.post('authentication/session/new', {
      request_token: requestToken,
    });
    setSessionId(response.data.session_id);
  };

  return (
    <MovieContext.Provider
      value={{
        populares,
        mejoresPuntuadas,
        cargando,
        sessionId,
        error,
        obtenerToken,
        redirigirAutenticacion,
        crearSesion,
        favoritos,        // ✅ Exportamos favoritos
        toggleFavorito,   // ✅ Exportamos la función
        esFavorito        // ✅ Exportamos la función
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

// Hook para consumir el contexto
export const useMovies = () => useContext(MovieContext);

